export interface SearchItem {
    id: string
    title: string
    description: string
    type: string
    icon: string
    route: string
    date?: string
    tags?: string[]
    content?: string
}

// 搜索数据服务
class SearchService {
    private searchData: SearchItem[] = []
    private initialized = false

    // 初始化搜索数据
    async initialize() {
        if (this.initialized) return

        // 基础页面数据
        this.searchData = [
            {
                id: 'page-home',
                title: '首页',
                description: '欢迎来到我的个人博客，这里记录我的技术成长和生活感悟',
                type: '页面',
                icon: '🏠',
                route: '/home',
                tags: ['home', 'index', 'shouye']
            },
            {
                id: 'page-work',
                title: '项目作品',
                description: '查看我的项目和作品集，包括开源项目、商业项目等',
                type: '页面',
                icon: '💼',
                route: '/work',
                tags: ['work', 'project', 'xiangmu', 'zuopin']
            },
            {
                id: 'page-tool',
                title: '实用工具',
                description: '各种实用的在线工具，提高工作效率',
                type: '页面',
                icon: '🛠️',
                route: '/tool',
                tags: ['tool', 'utility', 'gongju']
            },
            {
                id: 'page-blog',
                title: '知识博客',
                description: '技术文章和学习笔记，分享编程经验和心得',
                type: '页面',
                icon: '📚',
                route: '/blog',
                tags: ['blog', 'article', 'boke', 'wenzhang']
            },
            {
                id: 'page-book',
                title: '书籍推荐',
                description: '我的阅读书单和推荐，好书分享',
                type: '页面',
                icon: '📖',
                route: '/book',
                tags: ['book', 'reading', 'shuji', 'yuedu']
            },
            {
                id: 'page-about',
                title: '关于我',
                description: '了解更多关于我的信息，联系方式和个人简介',
                type: '页面',
                icon: '👋',
                route: '/about',
                tags: ['about', 'contact', 'guanyu', 'lianxi']
            }
        ]

        // 可以在这里添加更多数据源
        // 例如：从 API 获取博客文章、项目列表等
        await this.loadDynamicContent()

        this.initialized = true
    }

    // 加载动态内容 - 从实际页面数据中提取
    private async loadDynamicContent() {
        try {
            // 工具数据（从 Tool.vue 提取）
            const tools = [
                { name: 'Hoppscotch', desc: '开源的API测试客户端，Postman的完美替代品', icon: '🔧', tags: ['api', 'test', 'postman', 'ceshi'] },
                { name: 'JSON Formatter', desc: '在线JSON格式化、验证和美化工具', icon: '📋', tags: ['json', 'format', 'geshihua'] },
                { name: 'RegExr', desc: '强大的正则表达式学习、构建和测试工具', icon: '🔤', tags: ['regex', 'zhengze'] },
                { name: 'Base64 Encoder', desc: '在线Base64编码解码工具', icon: '🔐', tags: ['base64', 'encode', 'bianma'] },
                { name: 'Can I Use', desc: '浏览器兼容性查询工具', icon: '🌐', tags: ['browser', 'compatibility', 'jianrong'] },
                { name: 'Bundle Phobia', desc: '分析npm包大小的工具', icon: '📦', tags: ['npm', 'bundle', 'size', 'fenxi'] },
                { name: 'Lighthouse', desc: 'Google开源的网站质量审计工具', icon: '💡', tags: ['performance', 'seo', 'xingneng'] },
                { name: 'Transform Tools', desc: '多功能在线转换工具集合', icon: '🔄', tags: ['transform', 'convert', 'zhuanhuan'] },
                { name: 'Responsively App', desc: '专为响应式开发设计的浏览器', icon: '📱', tags: ['responsive', 'xiangying'] },
                { name: 'HTTPie', desc: '现代化的命令行HTTP客户端', icon: '🌐', tags: ['http', 'cli', 'mingling'] },
                { name: 'MCP Servers', desc: 'Model Context Protocol服务器集合', icon: '🔌', tags: ['mcp', 'ai', 'protocol'] },
                { name: 'LangChain', desc: '构建LLM应用的开源框架', icon: '🤖', tags: ['ai', 'llm', 'langchain'] },
                { name: 'AutoGen', desc: '微软开源的多Agent对话框架', icon: '🤝', tags: ['ai', 'agent', 'microsoft'] },
                { name: 'AutoGPT', desc: '自主AI代理工具', icon: '🧠', tags: ['ai', 'gpt', 'agent'] },
                { name: 'LlamaIndex', desc: '数据框架，专门为LLM应用提供数据连接', icon: '📚', tags: ['ai', 'llm', 'data', 'shuju'] },
                { name: 'Anthropic SDK', desc: 'Anthropic官方SDK，提供Claude AI模型访问', icon: '🎯', tags: ['ai', 'claude', 'sdk'] },
                { name: 'OpenAI SDK', desc: 'OpenAI官方Python SDK', icon: '🔮', tags: ['ai', 'openai', 'gpt', 'sdk'] }
            ]

            tools.forEach(tool => {
                this.searchData.push({
                    id: `tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: tool.name,
                    description: tool.desc,
                    type: '工具',
                    icon: tool.icon,
                    route: '/tool',
                    tags: tool.tags,
                    content: `${tool.name} ${tool.desc}`
                })
            })

            // 博客分类数据
            const blogCategories = [
                { name: '技术博客', desc: 'Java全栈开发技术分享与经验总结', icon: '📝', tags: ['blog', 'tech', 'boke', 'jishu'] },
                { name: 'Java开发', desc: 'Spring Boot、微服务架构等技术教程', icon: '☕', tags: ['java', 'spring', 'weifuwu'] },
                { name: '前端开发', desc: 'Vue、React等前端技术实践', icon: '🎨', tags: ['frontend', 'vue', 'react', 'qianduan'] },
                { name: 'AI技术', desc: '大模型应用与AI开发实践', icon: '🤖', tags: ['ai', 'llm', 'damoxing'] },
                { name: '项目经验', desc: '实战项目开发心得与复盘', icon: '💼', tags: ['project', 'experience', 'xiangmu', 'jingyan'] }
            ]

            blogCategories.forEach(cat => {
                this.searchData.push({
                    id: `blog-${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: cat.name,
                    description: cat.desc,
                    type: '博客',
                    icon: cat.icon,
                    route: '/blog',
                    tags: cat.tags,
                    content: `${cat.name} ${cat.desc}`
                })
            })

            // 博客文章数据
            const articles = [
                { name: 'Spring Boot 3.0 新特性详解', desc: '详细介绍Spring Boot 3.0的核心新特性', icon: '📄', tags: ['springboot', 'java', 'spring'] },
                { name: '微服务架构设计与实践', desc: '从单体到分布式的完整指南', icon: '📄', tags: ['microservice', 'weifuwu', 'architecture', 'jiagou'] },
                { name: 'Vue 3 + TypeScript 开发实践', desc: '企业级前端开发最佳实践', icon: '📄', tags: ['vue', 'typescript', 'qianduan'] },
                { name: 'Redis 性能优化', desc: 'Redis缓存策略与高可用架构', icon: '📄', tags: ['redis', 'cache', 'huancun', 'youhua'] },
                { name: 'MySQL 数据库优化', desc: '从索引到分库分表的完整实践', icon: '📄', tags: ['mysql', 'database', 'shujuku', 'youhua'] },
                { name: 'Docker + Kubernetes 实战', desc: '容器化部署完整实践', icon: '📄', tags: ['docker', 'k8s', 'kubernetes', 'rongqihua'] },
                { name: '大模型API集成', desc: '智能应用开发实践', icon: '📄', tags: ['ai', 'llm', 'api', 'damoxing'] },
                { name: 'LangChain 框架实战', desc: '构建企业级AI应用', icon: '📄', tags: ['langchain', 'ai', 'llm'] }
            ]

            articles.forEach(article => {
                this.searchData.push({
                    id: `article-${article.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: article.name,
                    description: article.desc,
                    type: '文章',
                    icon: article.icon,
                    route: '/blog',
                    tags: article.tags,
                    content: `${article.name} ${article.desc}`
                })
            })
        } catch (error) {
            console.warn('Failed to load dynamic content:', error)
        }
    }

    // 获取所有搜索数据
    getSearchData(): SearchItem[] {
        return this.searchData
    }

    // 添加搜索项
    addSearchItem(item: SearchItem) {
        this.searchData.push(item)
    }

    // 批量添加搜索项
    addSearchItems(items: SearchItem[]) {
        this.searchData.push(...items)
    }

    // 更新搜索项
    updateSearchItem(id: string, updates: Partial<SearchItem>) {
        const index = this.searchData.findIndex(item => item.id === id)
        if (index !== -1) {
            this.searchData[index] = { ...this.searchData[index], ...updates }
        }
    }

    // 删除搜索项
    removeSearchItem(id: string) {
        this.searchData = this.searchData.filter(item => item.id !== id)
    }

    // 清空搜索数据
    clear() {
        this.searchData = []
        this.initialized = false
    }
}

export const searchService = new SearchService()
