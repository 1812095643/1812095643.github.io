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
            // Home页面内容
            const homeContent = [
                { name: '个人简介', desc: 'Java全栈开发工程师，热爱编程，专注于Web开发和AI应用', icon: '👋', tags: ['home', 'jianjie', 'profile', 'introduction'], route: '/home' },
                { name: '前端开发', desc: 'Vue、React等现代前端框架开发经验', icon: '🎨', tags: ['frontend', 'qianduan', 'vue', 'react', 'web'], route: '/home' },
                { name: '移动开发', desc: '小程序、App开发与优化', icon: '📱', tags: ['mobile', 'yidong', 'app', 'xiaochengxu', 'wechat'], route: '/home' },
                { name: '后端开发', desc: 'Spring Boot、微服务架构设计', icon: '⚙️', tags: ['backend', 'houduan', 'java', 'spring', 'weifuwu'], route: '/home' },
                { name: 'UI/UX设计', desc: '用户体验设计与交互优化', icon: '✨', tags: ['ui', 'ux', 'design', 'sheji', 'jiaohui'], route: '/home' },
                { name: '系统架构', desc: '分布式系统与微服务架构', icon: '🏗️', tags: ['architecture', 'jiagou', 'fenbushi', 'system'], route: '/home' },
                { name: 'AI技术', desc: '大模型应用与智能系统开发', icon: '🤖', tags: ['ai', 'llm', 'damoxing', 'zhineng'], route: '/home' },
                { name: '工程化', desc: 'CI/CD、自动化部署与DevOps', icon: '🔧', tags: ['engineering', 'gongchenghua', 'cicd', 'devops'], route: '/home' },
                { name: 'Vue3', desc: '基于Vue3 + TypeScript的现代化前端开发', icon: '⚡', tags: ['vue3', 'typescript', 'qianduan'], route: '/home' },
                { name: '响应式设计', desc: '移动端适配与响应式布局', icon: '📱', tags: ['responsive', 'xiangying', 'mobile', 'yidong'], route: '/home' },
                { name: 'TypeScript', desc: '类型安全的JavaScript开发', icon: '🔧', tags: ['typescript', 'ts', 'javascript'], route: '/home' },
                { name: 'Pinia', desc: 'Vue3状态管理解决方案', icon: '🏪', tags: ['pinia', 'vuex', 'state', 'zhuangtai'], route: '/home' },
                { name: 'Vite', desc: '下一代前端构建工具', icon: '⚡', tags: ['vite', 'build', 'gouzao'], route: '/home' },
                { name: '国际化', desc: '多语言支持与i18n实现', icon: '🌐', tags: ['i18n', 'guojihua', 'language', 'yuyan'], route: '/home' }
            ]

            homeContent.forEach(item => {
                this.searchData.push({
                    id: `home-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: item.name,
                    description: item.desc,
                    type: '首页',
                    icon: item.icon,
                    route: item.route,
                    tags: item.tags,
                    content: `${item.name} ${item.desc}`
                })
            })

            // 工具数据（包含完整描述）
            const tools = [
                { name: 'Hoppscotch', desc: '开源的API测试客户端，Postman的完美替代品。支持REST、GraphQL、WebSocket等多种协议，界面简洁，功能强大', icon: '🔧', tags: ['api', 'test', 'postman', 'ceshi', 'rest', 'graphql', 'websocket'] },
                { name: 'JSON Formatter', desc: '在线JSON格式化、验证和美化工具。支持JSON压缩、语法高亮、错误检测，是开发者处理JSON数据的必备工具', icon: '📋', tags: ['json', 'format', 'geshihua', 'validate', 'yanzheng', 'meihua'] },
                { name: 'RegExr', desc: '强大的正则表达式学习、构建和测试工具。提供实时匹配、详细解释和丰富的示例，帮助开发者掌握正则表达式', icon: '🔤', tags: ['regex', 'zhengze', 'pattern', 'match', 'pipeipei'] },
                { name: 'Base64 Encoder', desc: '在线Base64编码解码工具，支持文本、文件的Base64转换。界面简洁，操作便捷，是Web开发中常用的编码工具', icon: '🔐', tags: ['base64', 'encode', 'decode', 'bianma', 'jiema'] },
                { name: 'Can I Use', desc: '浏览器兼容性查询工具，帮助开发者检查HTML、CSS、JavaScript特性在各浏览器中的支持情况', icon: '🌐', tags: ['browser', 'compatibility', 'jianrong', 'html', 'css', 'javascript', 'liulanqi'] },
                { name: 'Bundle Phobia', desc: '分析npm包大小的工具，帮助开发者了解包的体积、依赖关系和加载时间，优化项目性能', icon: '📦', tags: ['npm', 'bundle', 'size', 'fenxi', 'performance', 'xingneng', 'youhua'] },
                { name: 'Lighthouse', desc: 'Google开源的网站质量审计工具，从性能、可访问性、SEO等多个维度评估网页质量，提供优化建议', icon: '💡', tags: ['performance', 'seo', 'xingneng', 'google', 'audit', 'shenj', 'youhua'] },
                { name: 'Transform Tools', desc: '多功能在线转换工具集合，支持JSON、TypeScript、GraphQL等多种格式之间的相互转换，提高开发效率', icon: '🔄', tags: ['transform', 'convert', 'zhuanhuan', 'json', 'typescript', 'graphql'] },
                { name: 'Responsively App', desc: '专为响应式开发设计的浏览器，可以同时预览网页在多种设备尺寸下的显示效果，提高响应式开发效率', icon: '📱', tags: ['responsive', 'xiangying', 'mobile', 'yidong', 'preview', 'yulan'] },
                { name: 'HTTPie', desc: '现代化的命令行HTTP客户端，支持JSON、语法高亮、会话管理等功能，为开发者提供便捷的HTTP请求方式', icon: '🌐', tags: ['http', 'cli', 'mingling', 'request', 'qingqiu', 'api'] },
                { name: 'MCP Servers', desc: 'Model Context Protocol服务器集合，为AI模型提供标准化的上下文访问接口，支持文件系统、数据库、API等多种数据源', icon: '🔌', tags: ['mcp', 'ai', 'protocol', 'xieyi', 'model', 'moxing', 'context', 'shangxiawen'] },
                { name: 'LangChain', desc: '构建LLM应用的开源框架，提供链式调用、记忆管理、Agent代理等功能，是开发AI应用的强大工具链', icon: '🤖', tags: ['ai', 'llm', 'langchain', 'agent', 'daili', 'framework', 'kuangjia', 'chain', 'lian'] },
                { name: 'AutoGen', desc: '微软开源的多Agent对话框架，支持多个AI代理之间的协作和对话，可构建复杂的AI工作流', icon: '🤝', tags: ['ai', 'agent', 'microsoft', 'weiruan', 'dialogue', 'duihua', 'workflow', 'gongzuoliu'] },
                { name: 'AutoGPT', desc: '自主AI代理工具，能够自动执行复杂任务，具备自我改进和目标导向的能力，是AGI探索的重要项目', icon: '🧠', tags: ['ai', 'gpt', 'agent', 'daili', 'autonomous', 'zizhu', 'agi', 'task', 'renwu'] },
                { name: 'LlamaIndex', desc: '数据框架，专门为LLM应用提供数据连接和索引服务，支持RAG（检索增强生成）等高级AI应用模式', icon: '📚', tags: ['ai', 'llm', 'data', 'shuju', 'rag', 'index', 'suoyin', 'jiansuo'] },
                { name: 'Anthropic SDK', desc: 'Anthropic官方SDK，提供Claude AI模型的完整访问接口，支持对话、工具调用、MCP协议等功能', icon: '🎯', tags: ['ai', 'claude', 'sdk', 'anthropic', 'api', 'mcp'] },
                { name: 'OpenAI SDK', desc: 'OpenAI官方Python SDK，提供GPT、DALL-E、Whisper等模型的完整API访问，是AI开发的基础工具', icon: '🔮', tags: ['ai', 'openai', 'gpt', 'sdk', 'python', 'dalle', 'whisper', 'api'] }
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

            // 博客文章数据（包含完整描述）
            const articles = [
                { name: 'Spring Boot 3.0 新特性详解', desc: '详细介绍Spring Boot 3.0的核心新特性，包括原生编译、响应式编程增强等，并通过实际项目案例展示应用方法', icon: '📄', tags: ['springboot', 'java', 'spring', 'yuansheng', 'xiangying', 'native', 'reactive'] },
                { name: '微服务架构设计与实践', desc: '基于Spring Cloud构建微服务架构的完整指南，涵盖服务拆分、配置管理、服务发现、链路追踪等关键技术', icon: '📄', tags: ['microservice', 'weifuwu', 'architecture', 'jiagou', 'springcloud', 'fuwu', 'peizhi', 'zhuizong'] },
                { name: 'Vue 3 + TypeScript 开发实践', desc: '结合TypeScript的Vue 3开发最佳实践，包括组合式API、状态管理、组件设计模式等核心技术', icon: '📄', tags: ['vue', 'typescript', 'qianduan', 'composition', 'api', 'zujian', 'zhuangtai'] },
                { name: 'Redis 性能优化', desc: '深入Redis缓存策略、集群部署、数据持久化等核心技术，提升系统性能和稳定性', icon: '📄', tags: ['redis', 'cache', 'huancun', 'youhua', 'jiqun', 'cluster', 'chijiu', 'xingneng'] },
                { name: 'MySQL 数据库优化', desc: 'MySQL性能调优实战，包括索引优化、查询优化、分库分表策略等数据库核心技能', icon: '📄', tags: ['mysql', 'database', 'shujuku', 'youhua', 'suoyin', 'chaxun', 'fenku', 'fenbiao'] },
                { name: 'Docker + Kubernetes 实战', desc: '容器化技术在企业级项目中的应用，从Docker基础到K8s集群管理的完整实践', icon: '📄', tags: ['docker', 'k8s', 'kubernetes', 'rongqihua', 'jiqun', 'bushu', 'deploy'] },
                { name: '大模型API集成', desc: '基于GPT、Claude等大模型API开发智能应用，包括Prompt工程、Agent架构设计等实践经验', icon: '📄', tags: ['ai', 'llm', 'api', 'damoxing', 'gpt', 'claude', 'prompt', 'agent'] },
                { name: 'LangChain 框架实战', desc: '使用LangChain构建智能问答、文档分析等AI应用，涵盖链式调用、向量数据库等核心技术', icon: '📄', tags: ['langchain', 'ai', 'llm', 'wenda', 'fenxi', 'xiangliangku', 'vector', 'chain'] },
                { name: 'Spring Security 权限管理', desc: '基于Spring Security构建完整的权限管理系统，包括JWT认证、RBAC权限控制等安全机制', icon: '📄', tags: ['spring', 'security', 'quanxian', 'jwt', 'rbac', 'anquan', 'renzheng'] },
                { name: 'Java 性能优化', desc: 'JVM参数调优、内存管理、GC优化等性能调优技术，提升Java应用运行效率', icon: '📄', tags: ['java', 'jvm', 'xingneng', 'youhua', 'neicun', 'gc', 'tiaocan'] },
                { name: 'CI/CD 自动化部署', desc: '基于GitLab CI、Jenkins等工具构建自动化部署流程，提升开发效率和部署质量', icon: '📄', tags: ['cicd', 'gitlab', 'jenkins', 'zidonghua', 'bushu', 'devops'] },
                { name: '高并发系统架构', desc: '分布式系统架构设计经验，包括负载均衡、消息队列、缓存策略等核心技术', icon: '📄', tags: ['gaobingfa', 'concurrent', 'fenbushi', 'jiagou', 'fuzai', 'xiaoxi', 'huancun'] }
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

            // 项目作品数据
            const projects = [
                { name: '全栈开发项目', desc: 'Java + Vue 全栈项目开发经验', icon: '💻', tags: ['fullstack', 'quanzhan', 'java', 'vue'] },
                { name: 'AI 应用开发', desc: '大模型应用与智能系统开发', icon: '🤖', tags: ['ai', 'application', 'yingyong'] },
                { name: '微信小程序', desc: '小程序开发与优化', icon: '📱', tags: ['wechat', 'weixin', 'miniprogram', 'xiaochengxu'] },
                { name: '企业级系统', desc: '企业管理系统开发', icon: '🏢', tags: ['enterprise', 'qiye', 'system', 'xitong'] }
            ]

            projects.forEach(project => {
                this.searchData.push({
                    id: `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: project.name,
                    description: project.desc,
                    type: '项目',
                    icon: project.icon,
                    route: '/work',
                    tags: project.tags,
                    content: `${project.name} ${project.desc}`
                })
            })

            // 书籍数据
            const books = [
                { name: '技术书籍', desc: '编程、架构、算法等技术书籍推荐', icon: '📚', tags: ['book', 'tech', 'shu', 'jishu'] },
                { name: '个人成长', desc: '职业发展与个人提升书籍', icon: '📖', tags: ['growth', 'chengzhang', 'career', 'zhiye'] },
                { name: 'AI 相关', desc: '人工智能与机器学习书籍', icon: '🤖', tags: ['ai', 'ml', 'jiqixuexi'] }
            ]

            books.forEach(book => {
                this.searchData.push({
                    id: `book-${book.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: book.name,
                    description: book.desc,
                    type: '书籍',
                    icon: book.icon,
                    route: '/book',
                    tags: book.tags,
                    content: `${book.name} ${book.desc}`
                })
            })

            // 关于页面内容 - 详细信息
            const aboutItems = [
                { name: '个人简介', desc: 'Java全栈开发工程师，长治学院软件工程专业，GPA 4.2/5.0', icon: '👤', tags: ['about', 'profile', 'jianjie', 'guanyu', 'java', 'quanzhan'] },
                { name: '教育经历', desc: '长治学院 软件工程专业 2021-2025 GPA 4.2/5.0', icon: '🎓', tags: ['education', 'jiaoyu', 'xueli', 'university', 'daxue'] },
                { name: '技能特长', desc: 'Java、Spring Boot、Vue、React、微服务、AI应用开发', icon: '💪', tags: ['skills', 'jineng', 'techstack', 'java', 'vue', 'spring'] },
                { name: '联系方式', desc: '邮箱：1812095643@qq.com 电话：15536623157', icon: '📧', tags: ['contact', 'lianxi', 'email', 'phone', 'dianhua', 'youxiang'] },
                { name: '实习经历', desc: '2024.07-2024.09 全栈开发实习生', icon: '💼', tags: ['internship', 'shixi', 'work', 'gongzuo', 'quanzhan'] },
                { name: '项目经验', desc: '贵港文旅系统、自习室预约系统、人脸识别系统等30+项目', icon: '🚀', tags: ['project', 'xiangmu', 'jingyan', 'guigang', 'zixishi'] },
                { name: '获奖证书', desc: '优秀学生干部、优秀毕业设计、省级短视频大赛一等奖', icon: '🏆', tags: ['certificate', 'zhengshu', 'award', 'jiangxiang', 'youxiu'] },
                { name: '社团经历', desc: '技术部部长、会长，组织技术分享与团队建设', icon: '👥', tags: ['organization', 'shetuan', 'leader', 'lingdao', 'jishu'] },
                { name: '论文发表', desc: '学术论文发表与软件著作权', icon: '📝', tags: ['paper', 'lunwen', 'academic', 'xueshu', 'ruanzhu'] },
                { name: '简历下载', desc: '下载或查看完整简历PDF', icon: '📄', tags: ['resume', 'jianli', 'cv', 'download', 'xiazai'] }
            ]

            aboutItems.forEach(item => {
                this.searchData.push({
                    id: `about-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: item.name,
                    description: item.desc,
                    type: '关于',
                    icon: item.icon,
                    route: '/about',
                    tags: item.tags,
                    content: `${item.name} ${item.desc}`
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
