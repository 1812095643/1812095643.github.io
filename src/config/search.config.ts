// 搜索配置
export const searchConfig = {
    // DeepSeek AI 配置
    deepseek: {
        apiUrl: '/deepseek/chat/completions',
        // API Key 应该从环境变量获取，这里仅作示例
        // 实际使用时请在 .env 文件中配置 VITE_DEEPSEEK_API_KEY
        apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
        model: 'deepseek-chat',
        maxTokens: 100,
        temperature: 0.7
    },

    // 外部搜索引擎配置
    externalEngines: {
        google: {
            name: 'Google',
            url: 'https://www.google.com/search?q=',
            icon: 'google'
        },
        baidu: {
            name: '百度',
            url: 'https://www.baidu.com/s?wd=',
            icon: 'baidu'
        },
        bing: {
            name: 'Bing',
            url: 'https://www.bing.com/search?q=',
            icon: 'bing'
        }
    },

    // 搜索设置
    settings: {
        debounceDelay: 150, // 防抖延迟（毫秒）
        maxHistoryItems: 5, // 最大历史记录数
        enableAI: true, // 是否启用 AI 建议
        enableExternalSearch: true // 是否启用外部搜索
    }
}
