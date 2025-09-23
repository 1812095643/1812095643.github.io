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

        // Create pet's message object and push it immediately to the reactive array
        const petMessage = { sender: 'pet' as const, text: '' };
        messages.value.push(petMessage);

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

            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${VITE_DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    stream: true
                })
            });

            if (!response.body) {
                isStreaming.value = false;
                petMessage.text = '抱歉，网络似乎有点问题。';
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:')) continue;
                    const jsonStr = trimmed.slice(5).trim();
                    if (jsonStr === '[DONE]') {
                        isStreaming.value = false;
                        return;
                    }
                    try {
                        const parsed = JSON.parse(jsonStr);
                        const delta = parsed?.choices?.[0]?.delta;
                        const content = delta?.content ?? '';
                        if (content) {
                            // Directly modify the text property of the petMessage object
                            petMessage.text += content;
                        }
                    } catch (e) {
                        // ignore partial JSON errors
                    }
                }
            }
            isStreaming.value = false;
        } catch (error) {
            console.error('Error calling DeepSeek API:', error);
            isStreaming.value = false;
            petMessage.text = '我暂时想不出来啦 (＞﹏＜) 稍后再试试～';
        }
    };

    return {
        messages,
        userInput,
        isStreaming,
        sendMessage,
    };
}
