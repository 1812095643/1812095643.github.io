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
        highlight2: '10+个实战项目',
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

        // Language Toggle
        switchToEnglish: 'English',
        switchToChinese: '中文'
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
        highlight2: '10+ practical projects',
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

        // Language Toggle
        switchToEnglish: 'English',
        switchToChinese: '中文'
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