import { ref } from 'vue';

export function useChat() {
    const messages = ref<{ sender: 'user' | 'pet'; text: string }[]>([]);
    const userInput = ref('');

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

        const petMessage = { sender: 'pet' as const, text: '' };
        messages.value.push(petMessage);

        try {
            let systemPrompt = "You are a cute AI pet. Be friendly, helpful, and a little playful.";

            const resume = await fetchResume();
            const keywords = ['author', 'creator', 'roys', 'smee', 'developer', '作者', '创建者', '关于你'];

            if (resume && keywords.some(kw => userMessage.toLowerCase().includes(kw))) {
                systemPrompt += `\n\nHere is some information about my creator. Use it to answer questions:\n${resume}`;
            }

            const response = await fetch("https://api.deepseek.com/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${VITE_DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { "role": "system", "content": systemPrompt },
                        { "role": "user", "content": userMessage }
                    ],
                    stream: true
                })
            });

            if (!response.body) return;

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let buffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6);
                        if (jsonStr === '[DONE]') {
                            return;
                        }
                        try {
                            const parsed = JSON.parse(jsonStr);
                            if (parsed.choices && parsed.choices[0].delta.content) {
                                petMessage.text += parsed.choices[0].delta.content;
                            }
                        } catch (e) {
                            console.error("Error parsing stream JSON:", e, "JSON string:", jsonStr);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error calling DeepSeek API:", error);
            petMessage.text = "Sorry, I'm having trouble thinking right now.";
        }
    };

    return {
        messages,
        userInput,
        sendMessage,
    };
}
