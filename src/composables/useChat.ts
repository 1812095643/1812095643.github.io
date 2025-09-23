import { ref } from 'vue';

export function useChat() {
    const messages = ref<{ sender: 'user' | 'pet'; text: string }[]>([]);
    const userInput = ref('');
    const isStreaming = ref(false);

    const VITE_DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

    let resumeContent: string | null = null;

    async function fetchResume() {
        if (!resumeContent) {
            try {
                const response = await fetch('/简历.md');
                if (response.ok) {
                    resumeContent = await response.text();
                } else {
                    console.error('Failed to fetch resume');
                }
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        }
        return resumeContent;
    }

    const sendMessage = async () => {
        if (!userInput.value.trim()) return;

        const userMessage = userInput.value;
        messages.value.push({ sender: 'user', text: userMessage });
        userInput.value = '';

        // 先推入占位消息，记录索引；后续一律通过 messages[petIndex] 写入，确保响应式
        const petMessage = { sender: 'pet' as const, text: '' };
        messages.value.push(petMessage);
        const petIndex = messages.value.length - 1;

        if (!VITE_DEEPSEEK_API_KEY) {
            petMessage.text = '环境未配置 API Key，请在 .env 中设置 VITE_DEEPSEEK_API_KEY。';
            return;
        }

        try {
            isStreaming.value = true;

            let systemPrompt = 'You are a cute AI pet who speaks concise, friendly Chinese by default. Keep responses short, playful, and helpful. Use emotive kaomoji occasionally.';

            const resume = await fetchResume();
            const lower = userMessage.toLowerCase();
            const authorKeywords = [
                'author', 'creator', 'resume', 'cv', 'contact', 'profile', 'about you', 'about author', 'about me',
                '作者', '博主', '简历', '履历', '个人信息', '联系方式', '关于你', '关于作者', '你是谁', '介绍一下你'
            ];
            if (resume && authorKeywords.some(k => lower.includes(k) || userMessage.includes(k))) {
                systemPrompt += `\n\n当且仅当用户询问作者/博主相关内容时，用下述资料作为事实依据作答：\n${resume}\n\n如果资料中没有的信息请说明“我没有确切信息”。`;
            }

            // 通过本地代理以避免 CORS 与中间节点缓冲：/deepseek -> https://api.deepseek.com
            const response = await fetch('/deepseek/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${VITE_DEEPSEEK_API_KEY}`,
                    // 显式声明期望 SSE，有助于部分网关正确协商
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    stream: true
                }),
                // 避免缓存导致的缓冲
                cache: 'no-store'
            });

            if (!response.body) {
                isStreaming.value = false;
                petMessage.text = '抱歉，网络似乎有点问题。';
                return;
            }

            // 基于缓冲区的逐字打字机：
            // 1) SSE 到达时先放入 pendingBuffer
            // 2) 定时器以较小步长将字符逐一转移到 petMessage.text
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let sseBuffer = '';
            let pendingBuffer = '';
            let streamEnded = false;
            let typewriterTimer: number | null = null;

            const startTypewriter = () => {
                if (typewriterTimer !== null) return;
                typewriterTimer = window.setInterval(() => {
                    if (pendingBuffer.length > 0) {
                        // 一次输出 1 个字符，实现更平滑的打字机效果
                        const ch = pendingBuffer[0];
                        pendingBuffer = pendingBuffer.slice(1);
                        messages.value[petIndex].text += ch;
                    } else if (streamEnded) {
                        if (typewriterTimer !== null) {
                            clearInterval(typewriterTimer);
                            typewriterTimer = null;
                        }
                        isStreaming.value = false;
                    }
                }, 16); // ~60fps
            };

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                sseBuffer += decoder.decode(value, { stream: true });

                const lines = sseBuffer.split('\n');
                sseBuffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    // 兼容可能存在的注释/心跳/空行
                    if (!trimmed.startsWith('data:')) continue;
                    const jsonStr = trimmed.slice(5).trim();
                    if (jsonStr === '[DONE]') {
                        // 标记服务端已结束，等待缓冲区刷完后再关闭流式状态
                        streamEnded = true;
                        continue;
                    }
                    try {
                        const parsed = JSON.parse(jsonStr);
                        // DeepSeek 可能返回 reasoning_content + content，这里仅展示对话文本
                        const delta = parsed?.choices?.[0]?.delta;
                        const contentPart = delta?.content ?? '';
                        if (contentPart) {
                            pendingBuffer += contentPart;
                            startTypewriter();
                        }
                    } catch (e) {
                        // ignore partial JSON errors
                    }
                }
            }
            // 读流结束：若缓冲区为空则立刻结束，否则等打字机刷完
            if (pendingBuffer.length === 0) {
                isStreaming.value = false;
                if (typewriterTimer !== null) {
                    clearInterval(typewriterTimer);
                    typewriterTimer = null;
                }
                // 兜底：如果上游未按 SSE 返回而是一次性 JSON（非流式），尝试直接解析完整体
                if (!messages.value[petIndex].text && sseBuffer) {
                    try {
                        const full = JSON.parse(sseBuffer);
                        const fullText = full?.choices?.[0]?.message?.content ?? '';
                        if (fullText) {
                            messages.value[petIndex].text = fullText;
                        }
                    } catch {
                        // ignore
                    }
                }
            } else {
                streamEnded = true;
            }
        } catch (error) {
            console.error('Error calling DeepSeek API:', error);
            isStreaming.value = false;
            messages.value[messages.value.length - 1].text = '我暂时想不出来啦 (＞﹏＜) 稍后再试试～';
        }
    };

    return {
        messages,
        userInput,
        isStreaming,
        sendMessage,
    };
}
