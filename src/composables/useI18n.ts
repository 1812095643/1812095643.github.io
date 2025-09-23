import { ref, computed } from 'vue'

export type Language = 'zh' | 'en'

const currentLanguage = ref<Language>('zh')

const translations = {
    zh: {
        // Hero Section
        greeting: 'Hi, I\'m',
        name: 'Roy·Smee',
        title: '2025届',
        role: '前端开发',
        status: '应届毕业生',
        introduction: '专注于现代Web技术栈、用户体验设计与前端工程化的应届毕业生。拥有扎实的计算机基础知识和丰富的项目实战经验，熟练掌握Vue.js、React、TypeScript等主流技术。',
        detailedIntro: '作为一名充满激情的',
        highlight1: '全栈开发者',
        middleText: '，我在大学期间深入学习了前端、后端、移动端等多个技术领域，完成了',
        highlight2: '30+个实战项目',
        endText: '，涵盖电商平台、管理系统、移动应用等多种类型。我熟练掌握Vue.js、React、Node.js、Python等技术栈，具备从需求分析到产品上线的全流程开发能力。同时，我注重代码质量与用户体验，善于运用现代化的开发工具和最佳实践，致力于打造高性能、可维护的优质产品。',

        // Action Buttons
        downloadResume: '下载简历',
        portfolio: '🚀 个人作品集 →',

        // Skills Section
        skills: {
            frontend: '前端开发',
            frontendDesc: '精通Vue.js、React、TypeScript等现代前端技术栈',
            mobile: '移动端开发',
            mobileDesc: '熟悉微信小程序、uni-app跨平台开发',
            backend: '后端开发',
            backendDesc: '掌握Node.js、Python、数据库设计与API开发',
            ux: '用户体验',
            uxDesc: '注重界面设计、交互体验与用户需求分析',
            architecture: '架构设计',
            architectureDesc: '理解系统架构、模块化设计与性能优化',
            ai: 'AI 集成',
            aiDesc: '探索AI技术在前端开发中的应用与实践',
            engineering: '工程化',
            engineeringDesc: '熟悉构建工具、CI/CD、代码规范与团队协作'
        },

        // Social Links
        social: {
            github: 'GitHub',
            githubDesc: '开源项目与代码分享',
            gitee: 'Gitee',
            giteeDesc: '国内代码托管平台',
            csdn: 'CSDN',
            csdnDesc: '技术博客与经验分享',
            xianyu: '闲鱼店铺',
            xianyuDesc: '二手数码产品交易',
            douyin: '抖音',
            douyinDesc: '搜索"一只小盒"或"biliux"',
            bilibili: '哔哩哔哩',
            bilibiliDesc: '技术视频与教程'
        },

        // Music Player
        musicPlayer: {
            play: '播放',
            pause: '暂停',
            playlist: '播放列表',
            nowPlaying: '正在播放',
            volume: '音量',
            previous: '上一首',
            next: '下一首'
        },

        // Book Section
        book: {
            title: '书籍推荐',
            subtitle1: '精选前端开发经典书籍',
            subtitle2: '分享技术成长心得',
            subtitle3: '构建扎实技术基础'
        },

        // Tech Stack Section
        techStack: {
            title: '本博客的技术栈与特色',
            vue3: 'Vue 3.0',
            vue3Desc: '基于最新的 Vue 3.0 Composition API 构建，享受更好的性能和开发体验',
            responsive: '响应式设计',
            responsiveDesc: '完全适配桌面端、平板端和移动端，提供一致的用户体验',
            typescript: 'TypeScript',
            typescriptDesc: '全面采用 TypeScript 开发，提供更好的类型安全和开发效率',
            pinia: '状态管理',
            piniaDesc: '使用 Pinia 进行状态管理，轻量级且易于维护',
            vite: '现代构建',
            viteDesc: '基于 Vite 构建工具，享受极速的热重载和构建体验',
            i18n: '国际化',
            i18nDesc: '内置中英文双语支持，轻松切换语言环境'
        },

        // Language Toggle
        switchToEnglish: 'English',
        switchToChinese: '中文',

        // About Section
        about: {
            name: '杨国庆',
            introduction: '介绍',
            introductionContent: `
                我是杨国庆，22岁，来自太原，桂林电子科技大学数字媒体技术专业2025届毕业生。专注于Java全栈开发（Web开发、前后端开发），具备扎实的计算机基础和丰富的项目实战经验。<br><br>
                在技术方面，我精通Java(Spring Boot/Spring Security生态)、前端Vue/React框架，熟悉Python、微信小程序开发。特别在AI应用领域，熟悉Gemini、Claude等大模型API调用与LangChain构建智能应用，通过Agent、MCP技术优化多模型协同。<br><br>
                实习期间在广州光迅数字科技担任全栈开发工程师，作为16人团队组长，主导仿MOOC平台开发，承担40%前后端任务，通过Redis缓存等优化将首页加载时间从4.2s降至1.8s。<br><br>
                我注重代码质量与用户体验，具备从需求分析到部署上线的全流程开发能力，同时拥有优秀的团队管理和技术指导能力。期望在Java开发岗位上继续成长，为团队创造更大价值。
            `,
            contact: '联系方式',
            email: '邮箱',
            phone: '电话',
            wechat: '微信',
            copyEmailTip: '点击复制邮箱',
            copyPhoneTip: '点击复制电话',
            copied: '已复制',
            resume: '简历下载',
            resumeDesc: '获取完整简历 (PDF)',
            download: '下载',

            graduationYear: '届毕业生',
            projects: '项目经验',
            techStacks: '技术栈',
            yearsStudy: '年学习',
            skill1: '全栈开发：精通Java Spring生态，熟练Vue/React前端框架',
            skill2: 'AI应用：熟悉大模型API调用，LangChain智能应用构建',
            skill3: '数据库优化：MySQL性能调优，Redis缓存架构设计',
            skill4: '团队协作：丰富的项目管理经验，Git规范制定与执行',
            skill5: '产品思维：UI/UX设计能力，注重用户体验与代码质量',
            present: '至今',
            university: '桂林电子科技大学',
            major: '数字媒体技术专业',
            gpa: 'GPA: 4.2/5.0',
            // 项目经历
            projectExperience: '项目经历',
            project1Title: '贵港文旅+(贵港市智慧旅游与文创互动平台)',
            project1Time: '2024.12-2025.03',
            project1Role: '全栈独立开发者',
            project1Desc1: '独立完成从需求分析到部署的全流程开发，整合AI推荐、个性化攻略、文创交易等功能',
            project1Desc2: '设计前后端分离架构，23张核心表及164张辅助表，核心接口响应从500ms降至180ms',
            project1Desc3: '构建"通用大模型+旅游场景专属Agent"架构，AI攻略准确率从58%升至92%',
            project1Desc4: '获评优秀毕业设计奖，系统稳定性99.8%，支持800+并发无延迟',

            project2Title: '全国大学生创新创业大赛 乡村推荐官',
            project2Time: '2022.06-2023.11',
            project2Role: '技术总监',
            project2Desc1: '负责开发面向乡村农产品销售的微信小程序，Vue3+Node.js+MySQL技术栈',
            project2Desc2: '采用Vue3+CompositionAPI重构前端架构，代码可维护性提升40%',
            project2Desc3: '通过懒加载、图片压缩等优化，首屏加载时间从2.5s降至0.8s',
            project2Desc4: '项目获评国家级优秀结项，申请软件著作权1项',

            project3Title: '互联网+大赛《防诈小熊app》',
            project3Time: '2022.09-2023.02',
            project3Role: '技术总监 & 宣传总监',
            project3Desc1: '开发反诈骗教育移动应用，React Native+Express+MySQL技术栈',
            project3Desc2: '使用React Native跨平台方案，代码复用率达到85%',
            project3Desc3: '实现基于JWT的用户认证系统，安全性测评满分',
            project3Desc4: '项目获校级竞赛二等奖',

            // 社团经历
            organizationExperience: '社团经历',
            orgTitle: '学风思政调研委员会',
            orgTime: '2022.04-2024.05',
            orgRole: '技术部部长 → 会长',
            orgDesc1: '先后担任技术部部长和会长，领导协会的技术开发和运营管理工作',
            orgDesc2: '组织和指导技术团队完成多个校内项目，策划执行多项大型活动',
            orgDesc3: '协助学工处老师处理日常行政事务，积累丰富的行政助理经验',
            orgDesc4: '提升了协会的知名度和影响力，获得校优秀学生干部称号',

            // 教育经历
            mainCourses: '主修课程',

            // 专业技能
            technicalSkills: '专业技能',
            skill1Title: '全栈开发技术',
            skill1Desc: '前端：精通HTML5/CSS3/JavaScript，熟练React、Vue框架，完成30+响应式网站开发；后端：熟练Java(Spring Boot/Spring Security)、Python(Flask/Django)，支撑高并发场景',
            skill2Title: '大模型与AI应用',
            skill2Desc: '熟悉Gemini、Claude等大模型API调用与轻量化微调，结合LangChain构建智能推荐、内容生成类应用；通过Agent、MCP技术优化多模型协同逻辑',
            skill3Title: '跨平台与工具链',
            skill3Desc: '精通微信小程序、Vue多端适配开发；熟练使用Git进行版本管理，掌握Redis缓存、MySQL数据库的性能优化策略',
            skill4Title: '创意与多媒体辅助',
            skill4Desc: '具备UI/UX设计思维，能用Figma、Axure完成产品原型与界面设计；掌握After Effects动效制作、Premiere Pro视频剪辑',

            // 荣誉成就
            achievements: '荣誉奖项',
            achievement1: '校优秀学生干部，二等奖学金获得者',
            achievement2: '学风思政调研委员会会长，优秀的团队管理能力',
            achievement3: '多项国家级、校级竞赛获奖，软件著作权1项',

            // 实习经历
            internshipCompany: '广州光迅数字科技有限公司',
            internshipRole: '全栈开发工程师（实习）',
            internshipContent: '内容',
            internshipContentDesc: '实习期间参与仿MOOC在线智慧视频学习平台开发(Vue3.0+SpringBoot前后端分离架构)，该平台支持课程视频学习、进度追踪等功能，服务校内千余名师生。(作为16人Web开发小组的组长)',
            internshipResponsibilities: '职责',
            internshipResp1: '本人作为全栈核心开发，承担40%前后端任务，主导框架搭建与技术选型：前端用Vue3.0+Pinia构建，封装20+通用组件；后端基于SpringBoot设计分层架构，实现JWT认证等核心模块',
            internshipResp2: '独立开发视频播放页(含倍速播放、进度记忆)、分片上传接口(支持1GB+大文件断点续传)等功能，开发API接口50+个',
            internshipResp3: '同时协调团队分工，制定Git规范，解决技术问题30+个，通过Redis缓存等优化，将首页加载时间从4.2s降至1.8s，稳定支持日均800+用户同时在线',
            internshipResults: '实习成果',
            internshipResult1: '实习期间主导仿MOOC平台核心开发，完成40%任务。搭建的分层架构获公司组长肯定，代码复用率提40%，助新增功能快速集成',
            internshipResult2: '获领导与导师好评，生产实习课程成绩等级为优秀',

            // 项目经历详情
            project1ContentTitle: '内容',
            project1TechStack: 'Vue生态 + Spring Boot/Spring Security+MySQL/Redis+Elasticsearch/LangChain+高德API+Socket.IO',
            project1Description: '独立作为个人毕业设计，完成从需求分析到部署的全流程开发，整合AI推荐、个性化攻略、文创交易等功能，解决当地旅游信息碎片化等痛点，凭借AI算法、架构完整性与实际应用价值获评优秀毕业设计奖',
            project1TechChallenges: '核心技术难点攻克',
            project1Challenge1: '设计前后端分离架构，自定义JWT令牌解析器兼容三角色权限，打通多模块数据；设计23张核心表及164张辅助表，优化索引，核心接口响应从500ms降至180ms',
            project1Challenge2: '攻克AI推荐冷启动，基于用户行为构建多维度特征工程，设计"用户-景点-攻略-文创"模型',
            project1Challenge3: '完成GPT、高德、支付接口等跨平台集成，解决协议兼容与数据格式问题，实现全链路无断点，系统稳定性99.8%',
            project1Challenge4: '设计Redis多级缓存与Elasticsearch专属词库，搜索响应从1.8s缩至0.25s，支持800+并发无延迟',
            project1Achievements: '业绩',
            project1Achievement1: 'AI模型选型与工程化落地：对比Gemini 2.5 Pro与Claude 4.0，创新构建"通用大模型+旅游场景专属Agent"架构，依托MCP(模型控制平台)实现领域知识库动态微调，解决场景适配问题，AI攻略准确率从58%升至92%',
            project1Achievement2: 'Prompt工程与动态决策：设计多层级Prompt策略，结合Agent自主决策能力与MCP多模型协同机制，融合实时数据构建动态行程逻辑，实现"用户反馈-数据输入-AI调整"闭环，响应时间≤100ms，效率较基础方案提升4倍',
            project1Achievement3: 'AI辅助开发协同：借助Claude 4.0完成核心算法校验，通过Agent自动化生成高复杂度代码优化方案；自主掌控推荐算法等核心逻辑，MCP规范模型调用流程，代码可维护性提升45%，开发效率较纯人工高2.8倍',
            project1Achievement4: '内容质量管控：构建"Agent实时校验+MCP迭代优化"体系，将景点、文创数据结构化入库，通过Agent比对校验AI内容，结合用户评价强化学习，内容错误率≤3%',

            project2ContentTitle: '内容',
            project2TechStack: 'Vue3+Vant UI +Node.js +MySQL',
            project2Description: '本人负责开发本项目配套的面向乡村农产品销售的微信小程序，解决乡村信息不对称问题，并用于项目展示',
            project2TeamSize: '5人(小程序为本人独立开发)',
            project2Results: '工作成果',
            project2Result1: '采用Vue3+CompositionAPI重构前端架构，代码可维护性提升40%',
            project2Result2: '实现农产品销售、直播、商户展示等核心功能模块',
            project2Result3: '通过懒加载、图片压缩等技术优化，首屏加载时间从2.5s降至0.8s',
            project2Result4: '引入Axios封装统一请求拦截，错误处理效率提升50%',
            project2Result5: '项目获评国家级优秀结项，申请软件著作权1项，本人获得指导老师的好评',
            project2Achievement: '业绩',
            project2AchievementDesc: '国家级优秀结项项目、指导老师的好评',

            project3ContentTitle: '内容',
            project3RoleDetail: '全栈开发工程师',
            project3TechStack: 'React Native+Express+MySQL',
            project3Description: '开发反诈骗教育移动应用，包含案例展示、风险测评等功能',
            project3Results: '工作成果',
            project3Result1: '使用React Native跨平台方案，代码复用率达到85%',
            project3Result2: '实现基于JWT的用户认证系统，安全性测评满分',
            project3Result3: '采用Redux管理全局状态，复杂交互开发效率提升30%',
            project3Achievement: '业绩',
            project3AchievementDesc: '项目获校级竞赛二等奖',

            // 社团经历
            orgContentTitle: '职责',
            orgContentDesc: '先后担任学风思政调研委员会技术部部长和会长，领导协会的技术开发和运营管理工作',
            orgContributions: '具体贡献',
            orgContribution1: '在担任技术部部长期间，组织和指导技术团队完成多个校内项目',
            orgContribution2: '作为会长，策划和执行了多项大型活动，提升了协会的知名度和影响力',
            orgContribution3: '协助学工处老师处理日常行政事务，积累了丰富的行政助理经验'
        },

        // Work Section
        work: {
            fullStackDev: '全栈开发',
            aiApplications: 'AI 应用',
            moreProjects: '更多项目',
            autoGitee: 'Auto-Gitee',
            autoGiteeDesc: '自动化 Gitee 操作工具',
            seatReservation: '自习室座位预约系统',
            seatReservationDesc: '基于 Spring Boot + Vue 的座位管理系统',
            guigangTourism: '贵港文旅+',
            guigangTourismDesc: '智慧旅游与文创互动平台 (毕业设计)',
            examSystem: '在线考试系统',
            examSystemDesc: '完整的在线考试管理平台',
            faceRecognition: '人脸识别系统',
            faceRecognitionDesc: '基于卷积神经网络的人脸识别',
            ruralRecommendation: '乡村推荐官小程序',
            ruralRecommendationDesc: '全国大学生创新创业大赛项目',
            // Review comments
            reviews: {
                codeQuality: '国庆的代码质量真的很高，架构设计很清晰',
                fullStackAbility: '全栈开发能力很强，前后端都能独立完成',
                aiTechnology: 'AI技术应用得很好，推荐算法效果显著',
                teamwork: '团队协作能力强，技术问题解决得很及时',
                performance: '性能优化做得很到位，系统响应速度提升明显',
                documentation: '文档写得很详细，代码可维护性很好',
                techStack: 'Vue和Spring Boot技术栈掌握得很扎实',
                database: '数据库设计很合理，查询效率很高',
                projectManagement: '项目管理能力不错，进度把控得很好',
                techSelection: '技术选型很合适，解决方案很实用',
                learning: '学习能力很强，新技术上手很快',
                codeStandards: '代码规范性很好，团队开发效率很高',
                productThinking: '有很好的产品思维，用户体验考虑得很周到'
            }
        },

        // Tool Section
        tool: {
            hoppscotch: {
                name: 'Hoppscotch',
                desc: '开源的API测试客户端，Postman的完美替代品。支持REST、GraphQL、WebSocket等多种协议，界面简洁，功能强大。',
                category: 'API测试工具'
            },
            jsonformatter: {
                name: 'JSON Formatter',
                desc: '在线JSON格式化、验证和美化工具。支持JSON压缩、语法高亮、错误检测，是开发者处理JSON数据的必备工具。',
                category: '格式化工具'
            },
            regexr: {
                name: 'RegExr',
                desc: '强大的正则表达式学习、构建和测试工具。提供实时匹配、详细解释和丰富的示例，帮助开发者掌握正则表达式。',
                category: '正则工具'
            },
            base64encoder: {
                name: 'Base64 Encoder',
                desc: '在线Base64编码解码工具，支持文本、文件的Base64转换。界面简洁，操作便捷，是Web开发中常用的编码工具。',
                category: '编码工具'
            },
            caniuse: {
                name: 'Can I Use',
                desc: '浏览器兼容性查询工具，帮助开发者检查HTML、CSS、JavaScript特性在各浏览器中的支持情况。',
                category: '兼容性工具'
            },
            bundlephobia: {
                name: 'Bundle Phobia',
                desc: '分析npm包大小的工具，帮助开发者了解包的体积、依赖关系和加载时间，优化项目性能。',
                category: '性能分析'
            },
            lighthouse: {
                name: 'Lighthouse',
                desc: 'Google开源的网站质量审计工具，从性能、可访问性、SEO等多个维度评估网页质量，提供优化建议。',
                category: '性能工具'
            },
            transformtools: {
                name: 'Transform Tools',
                desc: '多功能在线转换工具集合，支持JSON、TypeScript、GraphQL等多种格式之间的相互转换，提高开发效率。',
                category: '转换工具'
            },
            responsively: {
                name: 'Responsively App',
                desc: '专为响应式开发设计的浏览器，可以同时预览网页在多种设备尺寸下的显示效果，提高响应式开发效率。',
                category: '响应式工具'
            },
            httpie: {
                name: 'HTTPie',
                desc: '现代化的命令行HTTP客户端，支持JSON、语法高亮、会话管理等功能，为开发者提供便捷的HTTP请求方式。',
                category: 'HTTP工具'
            },
            mcpservers: {
                name: 'MCP Servers',
                desc: 'Model Context Protocol服务器集合，为AI模型提供标准化的上下文访问接口，支持文件系统、数据库、API等多种数据源。',
                category: 'MCP工具'
            },
            langchain: {
                name: 'LangChain',
                desc: '构建LLM应用的开源框架，提供链式调用、记忆管理、Agent代理等功能，是开发AI应用的强大工具链。',
                category: 'AI框架'
            },
            autogen: {
                name: 'AutoGen',
                desc: '微软开源的多Agent对话框架，支持多个AI代理之间的协作和对话，可构建复杂的AI工作流。',
                category: 'Agent框架'
            },
            autogpt: {
                name: 'AutoGPT',
                desc: '自主AI代理工具，能够自动执行复杂任务，具备自我改进和目标导向的能力，是AGI探索的重要项目。',
                category: '自主Agent'
            },
            llamaindex: {
                name: 'LlamaIndex',
                desc: '数据框架，专门为LLM应用提供数据连接和索引服务，支持RAG（检索增强生成）等高级AI应用模式。',
                category: '数据框架'
            },
            anthropicsdk: {
                name: 'Anthropic SDK',
                desc: 'Anthropic官方SDK，提供Claude AI模型的完整访问接口，支持对话、工具调用、MCP协议等功能。',
                category: 'AI SDK'
            },
            openaisdk: {
                name: 'OpenAI Python SDK',
                desc: 'OpenAI官方Python SDK，提供GPT、DALL-E、Whisper等模型的完整API访问，是AI开发的基础工具。',
                category: 'AI SDK'
            }
        },

        // Blog Section
        blog: {
            knowledgeSpace: '技术博客',
            knowledgeSpaceDesc: 'Java全栈开发技术分享与经验总结',
            techTutorials: 'Java开发',
            techTutorialsDesc: 'Spring Boot、微服务架构等技术教程',
            frontendDev: '前端开发',
            frontendDevDesc: 'Vue、React等前端技术实践',
            aiTech: 'AI技术',
            aiTechDesc: '大模型应用与AI开发实践',
            projectExp: '项目经验',
            projectExpDesc: '实战项目开发心得与复盘',
            csdn: 'CSDN',
            github: 'GitHub',
            gitee: 'Gitee',

            // 文章标题和描述
            articles: {
                springboot: {
                    title: 'Spring Boot 3.0 新特性详解与实战应用',
                    desc: '详细介绍Spring Boot 3.0的核心新特性，包括原生编译、响应式编程增强等，并通过实际项目案例展示应用方法。'
                },
                microservice: {
                    title: '微服务架构设计与实践：从单体到分布式',
                    desc: '基于Spring Cloud构建微服务架构的完整指南，涵盖服务拆分、配置管理、服务发现、链路追踪等关键技术。'
                },
                vue3: {
                    title: 'Vue 3 + TypeScript 企业级前端开发实践',
                    desc: '结合TypeScript的Vue 3开发最佳实践，包括组合式API、状态管理、组件设计模式等核心技术。'
                },
                redis: {
                    title: 'Redis 性能优化与高可用架构设计',
                    desc: '深入Redis缓存策略、集群部署、数据持久化等核心技术，提升系统性能和稳定性。'
                },
                mysql: {
                    title: 'MySQL 数据库优化：从索引到分库分表',
                    desc: 'MySQL性能调优实战，包括索引优化、查询优化、分库分表策略等数据库核心技能。'
                },
                docker: {
                    title: 'Docker + Kubernetes 容器化部署实战',
                    desc: '容器化技术在企业级项目中的应用，从Docker基础到K8s集群管理的完整实践。'
                },
                ai_integration: {
                    title: '大模型API集成与智能应用开发',
                    desc: '基于GPT、Claude等大模型API开发智能应用，包括Prompt工程、Agent架构设计等实践经验。'
                },
                langchain: {
                    title: 'LangChain 框架实战：构建企业级AI应用',
                    desc: '使用LangChain构建智能问答、文档分析等AI应用，涵盖链式调用、向量数据库等核心技术。'
                },
                security: {
                    title: 'Spring Security 权限管理系统设计',
                    desc: '基于Spring Security构建完整的权限管理系统，包括JWT认证、RBAC权限控制等安全机制。'
                },
                performance: {
                    title: 'Java 应用性能优化：JVM调优与监控',
                    desc: 'JVM参数调优、内存管理、GC优化等性能调优技术，提升Java应用运行效率。'
                },
                devops: {
                    title: 'CI/CD 自动化部署流程设计与实践',
                    desc: '基于GitLab CI、Jenkins等工具构建自动化部署流程，提升开发效率和部署质量。'
                },
                architecture: {
                    title: '高并发系统架构设计与实现',
                    desc: '分布式系统架构设计经验，包括负载均衡、消息队列、缓存策略等核心技术。'
                }
            }
        }
    },

    en: {
        // Hero Section
        greeting: 'Hi, I\'m',
        name: 'Roy·Smee',
        title: 'Class of 2025',
        role: 'Frontend Developer',
        status: 'Fresh Graduate',
        introduction: 'A fresh graduate specializing in modern Web technology stack, user experience design, and frontend engineering. With solid computer science fundamentals and rich project experience, proficient in Vue.js, React, TypeScript and other mainstream technologies.',
        detailedIntro: 'As a passionate',
        highlight1: 'full-stack developer',
        middleText: ', I have deeply studied frontend, backend, and mobile development during university, completing',
        highlight2: '30+ practical projects',
        endText: ', including e-commerce platforms, management systems, and mobile applications. I am proficient in Vue.js, React, Node.js, Python and other tech stacks, with full-cycle development capabilities from requirement analysis to product deployment. I focus on code quality and user experience, skilled in modern development tools and best practices, committed to creating high-performance, maintainable quality products.',

        // Action Buttons
        downloadResume: 'Download Resume',
        portfolio: '🚀 Portfolio →',

        // Skills Section
        skills: {
            frontend: 'Frontend Development',
            frontendDesc: 'Proficient in Vue.js, React, TypeScript and modern frontend stack',
            mobile: 'Mobile Development',
            mobileDesc: 'Familiar with WeChat Mini Programs and uni-app cross-platform development',
            backend: 'Backend Development',
            backendDesc: 'Master Node.js, Python, database design and API development',
            ux: 'User Experience',
            uxDesc: 'Focus on UI design, interaction experience and user needs analysis',
            architecture: 'Architecture Design',
            architectureDesc: 'Understand system architecture, modular design and performance optimization',
            ai: 'AI Integration',
            aiDesc: 'Explore AI technology applications and practices in frontend development',
            engineering: 'Engineering',
            engineeringDesc: 'Familiar with build tools, CI/CD, code standards and team collaboration'
        },

        // Social Links
        social: {
            github: 'GitHub',
            githubDesc: 'Open source projects and code sharing',
            gitee: 'Gitee',
            giteeDesc: 'Domestic code hosting platform',
            csdn: 'CSDN',
            csdnDesc: 'Technical blog and experience sharing',
            xianyu: 'Xianyu Store',
            xianyuDesc: 'Second-hand digital products trading',
            douyin: 'Douyin',
            douyinDesc: 'Search "一只小盒" or "biliux"',
            bilibili: 'Bilibili',
            bilibiliDesc: 'Technical videos and tutorials'
        },

        // Music Player
        musicPlayer: {
            play: 'Play',
            pause: 'Pause',
            playlist: 'Playlist',
            nowPlaying: 'Now Playing',
            volume: 'Volume',
            previous: 'Previous',
            next: 'Next'
        },

        // Book Section
        book: {
            title: 'Book Recommendations',
            subtitle1: 'Selected Classic Frontend Development Books',
            subtitle2: 'Sharing Technical Growth Insights',
            subtitle3: 'Building Solid Technical Foundation'
        },

        // Tech Stack Section
        techStack: {
            title: 'Tech Stack & Features of This Blog',
            vue3: 'Vue 3.0',
            vue3Desc: 'Built with the latest Vue 3.0 Composition API for better performance and development experience',
            responsive: 'Responsive Design',
            responsiveDesc: 'Fully adapted for desktop, tablet and mobile devices, providing consistent user experience',
            typescript: 'TypeScript',
            typescriptDesc: 'Fully developed with TypeScript for better type safety and development efficiency',
            pinia: 'State Management',
            piniaDesc: 'Using Pinia for state management, lightweight and easy to maintain',
            vite: 'Modern Build',
            viteDesc: 'Based on Vite build tool for lightning-fast hot reload and build experience',
            i18n: 'Internationalization',
            i18nDesc: 'Built-in Chinese and English bilingual support, easy language switching'
        },

        // Language Toggle
        switchToEnglish: 'English',
        switchToChinese: '中文',

        // About Section
        about: {
            name: 'Yang Guoqing',
            introduction: 'Introduction',
            introductionContent: `
                I am Yang Guoqing, 22 years old, from Taiyuan, a Class of 2025 graduate majoring in Digital Media Technology at Guilin University of Electronic Technology. I specialize in Java backend development and full-stack development, with solid computer science fundamentals and rich project experience.<br><br>
                Technically, I am proficient in Java (Spring Boot/Spring Security ecosystem), frontend Vue/React frameworks, and familiar with Python and WeChat Mini Program development. Particularly in AI applications, I am experienced with Gemini, Claude and other large model API calls and LangChain for building intelligent applications, optimizing multi-model collaboration through Agent and MCP technologies.<br><br>
                During my internship at Guangzhou Guangxun Digital Technology as a Full-stack Development Engineer, I led a 16-person team and took charge of 40% of frontend and backend tasks for a MOOC-like platform, optimizing homepage loading time from 4.2s to 1.8s through Redis caching.<br><br>
                I focus on code quality and user experience, with full-cycle development capabilities from requirement analysis to deployment. I also possess excellent team management and technical guidance abilities. I look forward to continuing my growth in Java development positions and creating greater value for teams.
            `,
            contact: 'Contact',
            email: 'Email',
            phone: 'Phone',
            wechat: 'WeChat',
            copyEmailTip: 'Click to copy email',
            copyPhoneTip: 'Click to copy phone',
            copied: 'Copied',
            resume: 'Resume',
            resumeDesc: 'Download Complete Resume (PDF)',
            download: 'Download',

            graduationYear: 'Graduate',
            projects: 'Project Experience',
            techStacks: 'Tech Stacks',
            yearsStudy: 'Years Study',
            skill1: 'Full-stack Development: Proficient in Java Spring ecosystem, skilled in Vue/React frontend frameworks',
            skill2: 'AI Applications: Familiar with large model API calls, LangChain intelligent application development',
            skill3: 'Database Optimization: MySQL performance tuning, Redis caching architecture design',
            skill4: 'Team Collaboration: Rich project management experience, Git standards formulation and execution',
            skill5: 'Product Thinking: UI/UX design capabilities, focus on user experience and code quality',
            present: 'Present',
            university: 'Guilin University of Electronic Technology',
            major: 'Digital Media Technology',
            gpa: 'GPA: 4.2/5.0',
            // Project Experience
            projectExperience: 'Project Experience',
            project1Title: 'Guigang Cultural Tourism+ (Smart Tourism & Cultural Creative Interactive Platform)',
            project1Time: '2024.12-2025.03',
            project1Role: 'Full-stack Independent Developer',
            project1Desc1: 'Independently completed full-cycle development from requirement analysis to deployment, integrating AI recommendations, personalized guides, and cultural creative trading',
            project1Desc2: 'Designed frontend-backend separation architecture with 23 core tables and 164 auxiliary tables, optimized core API response from 500ms to 180ms',
            project1Desc3: 'Built "General Large Model + Tourism Scene Specific Agent" architecture, improved AI guide accuracy from 58% to 92%',
            project1Desc4: 'Awarded Excellent Graduation Design, system stability 99.8%, supporting 800+ concurrent users without delay',

            project2Title: 'National College Student Innovation and Entrepreneurship Competition - Rural Recommendation Officer',
            project2Time: '2022.06-2023.11',
            project2Role: 'Technical Director',
            project2Desc1: 'Developed WeChat Mini Program for rural agricultural product sales, Vue3+Node.js+MySQL tech stack',
            project2Desc2: 'Refactored frontend architecture with Vue3+Composition API, improved code maintainability by 40%',
            project2Desc3: 'Optimized through lazy loading and image compression, reduced first screen loading time from 2.5s to 0.8s',
            project2Desc4: 'Project awarded National Excellent Completion, applied for 1 software copyright',

            project3Title: 'Internet+ Competition "Anti-fraud Bear App"',
            project3Time: '2022.09-2023.02',
            project3Role: 'Technical Director & Publicity Director',
            project3Desc1: 'Developed anti-fraud education mobile app, React Native+Express+MySQL tech stack',
            project3Desc2: 'Used React Native cross-platform solution, achieved 85% code reuse rate',
            project3Desc3: 'Implemented JWT-based user authentication system, achieved full marks in security assessment',
            project3Desc4: 'Project won university-level competition second prize',

            // Organization Experience
            organizationExperience: 'Organization Experience',
            orgTitle: 'Academic Style and Ideological Research Committee',
            orgTime: '2022.04-2024.05',
            orgRole: 'Technical Department Director → President',
            orgDesc1: 'Served as Technical Department Director and President, leading technical development and operational management',
            orgDesc2: 'Organized and guided technical teams to complete multiple campus projects, planned and executed large-scale events',
            orgDesc3: 'Assisted Student Affairs Office teachers with daily administrative affairs, accumulated rich administrative assistant experience',
            orgDesc4: 'Enhanced association visibility and influence, awarded Outstanding Student Leader',

            // Education
            mainCourses: 'Main Courses',

            // Technical Skills
            technicalSkills: 'Technical Skills',
            skill1Title: 'Full-stack Development',
            skill1Desc: 'Frontend: Proficient in HTML5/CSS3/JavaScript, skilled in React and Vue frameworks, completed 30+ responsive websites; Backend: Proficient in Java (Spring Boot/Spring Security), Python (Flask/Django), supporting high-concurrency scenarios',
            skill2Title: 'Large Model & AI Applications',
            skill2Desc: 'Familiar with Gemini, Claude large model API calls and lightweight fine-tuning, combined with LangChain to build intelligent recommendation and content generation applications; optimized multi-model collaboration through Agent and MCP technologies',
            skill3Title: 'Cross-platform & Toolchain',
            skill3Desc: 'Proficient in WeChat Mini Programs and Vue multi-platform development; skilled in Git version control, mastered Redis caching and MySQL database performance optimization strategies',
            skill4Title: 'Creative & Multimedia Support',
            skill4Desc: 'UI/UX design thinking, capable of completing product prototypes and interface design with Figma and Axure; mastered After Effects animation and Premiere Pro video editing',

            // Achievements
            achievements: 'Achievements',
            achievement1: 'Outstanding Student Leader, Second-class Scholarship recipient',
            achievement2: 'President of Academic Style and Ideological Research Committee, excellent team management skills',
            achievement3: 'Multiple national and university-level competition awards, 1 software copyright',

            // Internship Experience
            internshipCompany: 'Guangzhou Guangxun Digital Technology Co., Ltd.',
            internshipRole: 'Full-stack Development Engineer (Internship)',
            internshipContent: 'Content',
            internshipContentDesc: 'During the internship, participated in the development of a MOOC-like online intelligent video learning platform (Vue3.0+SpringBoot frontend-backend separation architecture), which supports course video learning, progress tracking and other functions, serving thousands of teachers and students on campus. (As the leader of a 16-person Web development team)',
            internshipResponsibilities: 'Responsibilities',
            internshipResp1: 'As the core full-stack developer, undertook 40% of frontend and backend tasks, led framework construction and technology selection: frontend built with Vue3.0+Pinia, encapsulated 20+ common components; backend designed layered architecture based on SpringBoot, implemented JWT authentication and other core modules',
            internshipResp2: 'Independently developed video playback pages (including speed playback, progress memory), file upload interfaces (supporting 1GB+ large file resumable upload) and other functions, developed 50+ API interfaces',
            internshipResp3: 'Coordinated team division of labor, formulated Git standards, solved 30+ technical problems, optimized homepage loading time from 4.2s to 1.8s through Redis caching, stably supporting 800+ daily active users online',
            internshipResults: 'Internship Results',
            internshipResult1: 'Led the core development of MOOC-like platform during internship, completed 40% of tasks. The layered architecture built was recognized by company team leader, code reuse rate increased by 40%, helping new features integrate quickly',
            internshipResult2: 'Received praise from leaders and mentors, production internship course grade was excellent',

            // Project Experience Details
            project1ContentTitle: 'Content',
            project1TechStack: 'Tech Stack: Vue ecosystem + Spring Boot/Spring Security+MySQL/Redis+Elasticsearch/LangChain+Gaode API+Socket.IO',
            project1Description: 'Project Description: Independently completed full-cycle development from requirement analysis to deployment as personal graduation design, integrating AI recommendations, personalized guides, cultural creative trading and other functions, solving local tourism information fragmentation pain points, awarded Excellent Graduation Design for AI algorithms, architectural completeness and practical application value',
            project1TechChallenges: 'Core Technical Challenges',
            project1Challenge1: 'Designed frontend-backend separation architecture, custom JWT token parser compatible with three-role permissions, connected multi-module data; designed 23 core tables and 164 auxiliary tables, optimized indexes, core interface response from 500ms to 180ms',
            project1Challenge2: 'Overcame AI recommendation cold start, built multi-dimensional feature engineering based on user behavior, designed "user-attraction-guide-cultural creative" model',
            project1Challenge3: 'Completed cross-platform integration of GPT, Gaode, payment interfaces, solved protocol compatibility and data format issues, achieved full-link seamless connection, system stability 99.8%',
            project1Challenge4: 'Designed Redis multi-level caching and Elasticsearch dedicated vocabulary, search response from 1.8s to 0.25s, supporting 800+ concurrent without delay',
            project1Achievements: 'Achievements',
            project1Achievement1: 'AI Model Selection & Engineering Implementation: Compared Gemini 2.5 Pro and Claude 4.0, innovatively built "General Large Model + Tourism Scene Specific Agent" architecture, relied on MCP (Model Control Platform) to achieve domain knowledge base dynamic fine-tuning, solved scene adaptation problems, AI guide accuracy from 58% to 92%',
            project1Achievement2: 'Prompt Engineering & Dynamic Decision: Designed multi-level Prompt strategies, combined Agent autonomous decision-making capabilities with MCP multi-model collaboration mechanism, integrated real-time data to build dynamic itinerary logic, achieved "user feedback-data input-AI adjustment" closed loop, response time ≤100ms, efficiency improved 4 times compared to basic solution',
            project1Achievement3: 'AI-assisted Development Collaboration: Used Claude 4.0 to complete core algorithm verification, generated high-complexity code optimization solutions through Agent automation; independently controlled recommendation algorithms and other core logic, MCP standardized model calling process, code maintainability improved 45%, development efficiency 2.8 times higher than pure manual',
            project1Achievement4: 'Content Quality Control: Built "Agent real-time verification + MCP iterative optimization" system, structured attraction and cultural creative data into database, verified AI content through Agent comparison, combined user evaluation reinforcement learning, content error rate ≤3%',

            project2ContentTitle: 'Content',
            project2TechStack: 'Tech Stack: Vue3+Vant UI +Node.js +MySQL',
            project2Description: 'Project Description: Responsible for developing WeChat Mini Program for rural agricultural product sales supporting this project, solving rural information asymmetry problems, used for project demonstration',
            project2TeamSize: 'Team Size: 5 people (Mini Program independently developed by myself)',
            project2Results: 'Work Results',
            project2Result1: 'Adopted Vue3+Composition API to refactor frontend architecture, code maintainability improved 40%',
            project2Result2: 'Implemented core functional modules including agricultural product sales, live streaming, merchant display',
            project2Result3: 'Through lazy loading, image compression and other technical optimizations, first screen loading time from 2.5s to 0.8s',
            project2Result4: 'Introduced Axios encapsulation unified request interception, error handling efficiency improved 50%',
            project2Result5: 'Project awarded National Excellent Completion, applied for 1 software copyright, received praise from supervising teacher',
            project2Achievement: 'Achievements',
            project2AchievementDesc: 'National Excellent Completion project, praise from supervising teacher',

            project3ContentTitle: 'Content',
            project3RoleDetail: 'Role: Full-stack Development Engineer',
            project3TechStack: 'Tech Stack: React Native+Express+MySQL',
            project3Description: 'Project Description: Developed anti-fraud education mobile application, including case display, risk assessment and other functions',
            project3Results: 'Work Results',
            project3Result1: 'Used React Native cross-platform solution, code reuse rate reached 85%',
            project3Result2: 'Implemented JWT-based user authentication system, security assessment full marks',
            project3Result3: 'Used Redux to manage global state, complex interaction development efficiency improved 30%',
            project3Achievement: 'Achievements',
            project3AchievementDesc: 'Project won university-level competition second prize',

            // Organization Experience
            orgContentTitle: 'Responsibilities',
            orgContentDesc: 'Served as Technical Department Director and President of Academic Style and Ideological Research Committee successively, leading the association\'s technical development and operational management work',
            orgContributions: 'Specific Contributions',
            orgContribution1: 'During tenure as Technical Department Director, organized and guided technical teams to complete multiple campus projects',
            orgContribution2: 'As President, planned and executed multiple large-scale events, enhanced the association\'s visibility and influence',
            orgContribution3: 'Assisted Student Affairs Office teachers with daily administrative affairs, accumulated rich administrative assistant experience'
        },

        // Work Section
        work: {
            fullStackDev: 'Full-stack Development',
            aiApplications: 'AI Applications',
            moreProjects: 'More Projects',
            autoGitee: 'Auto-Gitee',
            autoGiteeDesc: 'Automated Gitee operation tool',
            seatReservation: 'Study Room Seat Reservation System',
            seatReservationDesc: 'Seat management system based on Spring Boot + Vue',
            guigangTourism: 'Guigang Cultural Tourism+',
            guigangTourismDesc: 'Smart tourism & cultural creative interactive platform (Graduation Project)',
            examSystem: 'Online Exam System',
            examSystemDesc: 'Complete online examination management platform',
            faceRecognition: 'Face Recognition System',
            faceRecognitionDesc: 'Face recognition based on convolutional neural networks',
            ruralRecommendation: 'Rural Recommendation Mini Program',
            ruralRecommendationDesc: 'National College Student Innovation and Entrepreneurship Competition Project',
            // Review comments
            reviews: {
                codeQuality: 'Guoqing\'s code quality is really high, architecture design is very clear',
                fullStackAbility: 'Strong full-stack development ability, can complete both frontend and backend independently',
                aiTechnology: 'AI technology application is excellent, recommendation algorithm is very effective',
                teamwork: 'Strong teamwork ability, technical problems are solved promptly',
                performance: 'Performance optimization is well done, system response speed improved significantly',
                documentation: 'Documentation is very detailed, code maintainability is excellent',
                techStack: 'Vue and Spring Boot technology stack is very solid',
                database: 'Database design is reasonable, query efficiency is high',
                projectManagement: 'Project management ability is good, progress control is excellent',
                techSelection: 'Technology selection is appropriate, solutions are practical',
                learning: 'Strong learning ability, quick to master new technologies',
                codeStandards: 'Code standards are excellent, team development efficiency is high',
                productThinking: 'Good product thinking, user experience is well considered'
            }
        },

        // Tool Section
        tool: {
            hoppscotch: {
                name: 'Hoppscotch',
                desc: 'Open-source API testing client, perfect alternative to Postman. Supports REST, GraphQL, WebSocket and other protocols with clean interface and powerful features.',
                category: 'API Testing Tool'
            },
            jsonformatter: {
                name: 'JSON Formatter',
                desc: 'Online JSON formatting, validation and beautification tool. Supports JSON compression, syntax highlighting, and error detection - essential for developers.',
                category: 'Formatting Tool'
            },
            regexr: {
                name: 'RegExr',
                desc: 'Powerful regular expression learning, building and testing tool. Provides real-time matching, detailed explanations and rich examples.',
                category: 'Regex Tool'
            },
            base64encoder: {
                name: 'Base64 Encoder',
                desc: 'Online Base64 encoding and decoding tool supporting text and file conversion. Clean interface, easy operation, commonly used encoding tool in web development.',
                category: 'Encoding Tool'
            },
            caniuse: {
                name: 'Can I Use',
                desc: 'Browser compatibility query tool helping developers check HTML, CSS, JavaScript feature support across different browsers.',
                category: 'Compatibility Tool'
            },
            bundlephobia: {
                name: 'Bundle Phobia',
                desc: 'npm package size analysis tool helping developers understand package size, dependencies and loading time to optimize project performance.',
                category: 'Performance Analysis'
            },
            lighthouse: {
                name: 'Lighthouse',
                desc: 'Google\'s open-source web quality audit tool evaluating webpage quality from multiple dimensions including performance, accessibility, SEO.',
                category: 'Performance Tool'
            },
            transformtools: {
                name: 'Transform Tools',
                desc: 'Multi-functional online conversion tool collection supporting mutual conversion between JSON, TypeScript, GraphQL and other formats.',
                category: 'Conversion Tool'
            },
            responsively: {
                name: 'Responsively App',
                desc: 'Browser designed for responsive development, allowing simultaneous preview of webpage display on multiple device sizes.',
                category: 'Responsive Tool'
            },
            httpie: {
                name: 'HTTPie',
                desc: 'Modern command-line HTTP client supporting JSON, syntax highlighting, session management and other features.',
                category: 'HTTP Tool'
            },
            mcpservers: {
                name: 'MCP Servers',
                desc: 'Model Context Protocol server collection providing standardized context access interfaces for AI models, supporting file systems, databases, APIs.',
                category: 'MCP Tool'
            },
            langchain: {
                name: 'LangChain',
                desc: 'Open-source framework for building LLM applications, providing chain calls, memory management, Agent proxies and other features.',
                category: 'AI Framework'
            },
            autogen: {
                name: 'AutoGen',
                desc: 'Microsoft\'s open-source multi-Agent conversation framework supporting collaboration and dialogue between multiple AI agents.',
                category: 'Agent Framework'
            },
            autogpt: {
                name: 'AutoGPT',
                desc: 'Autonomous AI agent tool capable of automatically executing complex tasks with self-improvement and goal-oriented capabilities.',
                category: 'Autonomous Agent'
            },
            llamaindex: {
                name: 'LlamaIndex',
                desc: 'Data framework specifically providing data connection and indexing services for LLM applications, supporting RAG and other advanced AI patterns.',
                category: 'Data Framework'
            },
            anthropicsdk: {
                name: 'Anthropic SDK',
                desc: 'Official Anthropic SDK providing complete access interface to Claude AI models, supporting dialogue, tool calls, MCP protocol.',
                category: 'AI SDK'
            },
            openaisdk: {
                name: 'OpenAI Python SDK',
                desc: 'Official OpenAI Python SDK providing complete API access to GPT, DALL-E, Whisper and other models - fundamental tool for AI development.',
                category: 'AI SDK'
            },
            devtools: {
                name: 'Browser DevTools',
                desc: 'Built-in browser developer tools for debugging web pages, inspecting elements, monitoring performance and network requests.',
                category: 'Debug Tools'
            },
            postman: {
                name: 'Postman',
                desc: 'API development and testing platform supporting REST, GraphQL API testing, documentation generation and team collaboration.',
                category: 'API Tools'
            },
            figma: {
                name: 'Figma',
                desc: 'Cloud-based interface design tool supporting real-time collaboration, prototyping and design system management.',
                category: 'Design Tools'
            },
            bundlephobia_old: {
                name: 'Bundle Phobia',
                desc: 'npm package size analysis tool showing download size, unpacked size and dependency relationships.',
                category: 'Analysis Tools'
            },
            colorhunt: {
                name: 'Color Hunt',
                desc: 'Color palette inspiration platform providing beautiful color combinations and schemes.',
                category: 'Design Tools'
            },
            tinypng: {
                name: 'TinyPNG',
                desc: 'Online image compression tool supporting PNG and JPEG formats, significantly reducing file size while maintaining quality.',
                category: 'Optimization Tools'
            },
            gitignore: {
                name: 'gitignore.io',
                desc: 'Online tool for generating .gitignore files supporting various programming languages, frameworks and development environments.',
                category: 'Development Tools'
            }
        },

        // Blog Section
        blog: {
            knowledgeSpace: 'Tech Blog',
            knowledgeSpaceDesc: 'Java full-stack development technology sharing and experience summary',
            techTutorials: 'Java Development',
            techTutorialsDesc: 'Spring Boot, microservice architecture and other technical tutorials',
            frontendDev: 'Frontend Development',
            frontendDevDesc: 'Vue, React and other frontend technology practices',
            aiTech: 'AI Technology',
            aiTechDesc: 'Large model applications and AI development practices',
            projectExp: 'Project Experience',
            projectExpDesc: 'Practical project development insights and retrospectives',
            csdn: 'CSDN',
            github: 'GitHub',
            gitee: 'Gitee',

            // Article titles and descriptions
            articles: {
                springboot: {
                    title: 'Spring Boot 3.0 New Features and Practical Applications',
                    desc: 'Detailed introduction to Spring Boot 3.0 core new features, including native compilation, reactive programming enhancements, and practical application methods through real project cases.'
                },
                microservice: {
                    title: 'Microservice Architecture Design and Practice: From Monolith to Distributed',
                    desc: 'Complete guide to building microservice architecture based on Spring Cloud, covering service decomposition, configuration management, service discovery, distributed tracing and other key technologies.'
                },
                vue3: {
                    title: 'Vue 3 + TypeScript Enterprise Frontend Development Practice',
                    desc: 'Vue 3 development best practices with TypeScript, including Composition API, state management, component design patterns and other core technologies.'
                },
                redis: {
                    title: 'Redis Performance Optimization and High Availability Architecture Design',
                    desc: 'Deep dive into Redis caching strategies, cluster deployment, data persistence and other core technologies to improve system performance and stability.'
                },
                mysql: {
                    title: 'MySQL Database Optimization: From Indexing to Sharding',
                    desc: 'MySQL performance tuning practices, including index optimization, query optimization, database sharding strategies and other core database skills.'
                },
                docker: {
                    title: 'Docker + Kubernetes Containerized Deployment Practice',
                    desc: 'Application of containerization technology in enterprise projects, complete practice from Docker basics to K8s cluster management.'
                },
                ai_integration: {
                    title: 'Large Model API Integration and Intelligent Application Development',
                    desc: 'Developing intelligent applications based on GPT, Claude and other large model APIs, including Prompt engineering, Agent architecture design and other practical experiences.'
                },
                langchain: {
                    title: 'LangChain Framework Practice: Building Enterprise AI Applications',
                    desc: 'Using LangChain to build intelligent Q&A, document analysis and other AI applications, covering chain calls, vector databases and other core technologies.'
                },
                security: {
                    title: 'Spring Security Permission Management System Design',
                    desc: 'Building complete permission management system based on Spring Security, including JWT authentication, RBAC permission control and other security mechanisms.'
                },
                performance: {
                    title: 'Java Application Performance Optimization: JVM Tuning and Monitoring',
                    desc: 'JVM parameter tuning, memory management, GC optimization and other performance tuning technologies to improve Java application efficiency.'
                },
                devops: {
                    title: 'CI/CD Automated Deployment Process Design and Practice',
                    desc: 'Building automated deployment processes based on GitLab CI, Jenkins and other tools to improve development efficiency and deployment quality.'
                },
                architecture: {
                    title: 'High Concurrency System Architecture Design and Implementation',
                    desc: 'Distributed system architecture design experience, including load balancing, message queues, caching strategies and other core technologies.'
                }
            }
        }
    }
}

export function useI18n() {
    const t = computed(() => translations[currentLanguage.value])

    const setLanguage = (lang: Language) => {
        currentLanguage.value = lang
        // 保存到localStorage
        localStorage.setItem('language', lang)
    }

    const toggleLanguage = () => {
        setLanguage(currentLanguage.value === 'zh' ? 'en' : 'zh')
    }

    // 初始化时从localStorage读取语言设置
    const initLanguage = () => {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && ['zh', 'en'].includes(savedLang)) {
            currentLanguage.value = savedLang
        }
    }

    return {
        t,
        currentLanguage: computed(() => currentLanguage.value),
        setLanguage,
        toggleLanguage,
        initLanguage
    }
}