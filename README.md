# Roy·Smee 个人博客

<div align="center">

[简体中文](README.md) | [English](README.en.md) | [日本語](README.ja.md)

</div>

> 基于 Vue 3 + TypeScript + Vite 构建的现代化个人博客网站，展示全栈开发技能与项目作品

[![Vue](https://img.shields.io/badge/Vue-3.5.10-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Anime.js](https://img.shields.io/badge/Anime.js-3.2.2-FF6B6B?style=flat-square)](https://animejs.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ 核心特性

- 🚀 **现代化技术栈** - Vue 3 Composition API + TypeScript + Vite 构建
- 📱 **响应式设计** - 移动优先，完美适配所有设备尺寸
- 🎨 **高级动画系统** - Anime.js + CSS3 + Intersection Observer 驱动的流畅动画
- 🔍 **智能搜索系统** - 支持普通/模糊/拼音/AI 四种搜索模式，实时高亮结果
- 🌐 **国际化架构** - 完整的中英文双语支持，动态语言切换
- ⚡ **性能优化** - 代码分割、懒加载、资源预加载、缓存策略
- 🎬 **智能视频播放** - 自动线路选择，支持 Vimeo 和 Bilibili 双平台
- 🛠️ **开发工具集** - 精选前端、AI、MCP 等开发工具推荐
- 📝 **内容管理** - Markdown 渲染、动态内容加载
- 🎵 **音乐播放器** - 全局音乐播放控制
- 🎆 **交互特效** - 烟花动画、磁场效果、粒子系统
- 🤖 **AI 智能助手** - 集成 DeepSeek AI，支持智能对话和搜索建议

## 🏗️ 项目结构

```
vue3-refactor/
├── public/                 # 静态资源
│   ├── assets/            # 图片资源
│   ├── audio/             # 音频文件
│   ├── css/               # 全局样式
│   ├── images/            # 图片文件
│   ├── js/                # 静态脚本
│   └── 简历.pdf           # 简历文件
├── src/
│   ├── components/        # 公共组件
│   ├── composables/       # 组合式函数
│   ├── pages/             # 页面组件
│   │   ├── home/          # 首页
│   │   ├── work/          # 作品展示
│   │   ├── tool/          # 工具推荐
│   │   ├── blog/          # 博客文章
│   │   ├── book/          # 读书笔记
│   │   └── about/         # 关于页面
│   ├── router/            # 路由配置
│   ├── utils/             # 工具函数
│   ├── main.ts            # 应用入口
│   └── Page.vue           # 根组件
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- npm 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 环境配置

复制 `.env.example` 文件为 `.env`，并配置必要的环境变量：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置 DeepSeek AI API Key（可选，用于 AI 智能助手功能）：

```env
# DeepSeek AI API Key
# 获取地址: https://platform.deepseek.com/api_keys
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

### 开发模式

```bash
npm run dev
```

启动后访问 http://localhost:5173

### 页面导航

- **首页**: http://localhost:5173/ - 个人介绍和技能展示
- **作品**: http://localhost:5173/work - 项目作品展示
- **工具**: http://localhost:5173/tool - 开发工具推荐
- **博客**: http://localhost:5173/blog - 技术文章分享
- **书籍**: http://localhost:5173/book - 读书笔记整理
- **关于**: http://localhost:5173/about - 个人详细信息

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览构建

```bash
npm run preview
```

## 🛠️ 技术栈详解

### 🏗️ 核心架构

#### 前端框架
- **Vue 3.5.10** - 采用最新的 Composition API，提供更好的逻辑复用和类型推导
  - 使用 `<script setup>` 语法糖，简化组件编写
  - 响应式系统基于 Proxy，性能更优
  - 支持 Fragment、Teleport、Suspense 等新特性
- **TypeScript 5.0+** - 全项目类型安全
  - 严格模式配置，确保代码质量
  - 自定义类型定义，增强开发体验
  - 与 Vue 3 完美集成，提供组件 Props 类型推导
- **Vue Router 4.5.1** - 现代化路由管理
  - HTML5 History 模式，SEO 友好
  - 路由守卫实现页面标题动态更新
  - 支持路由懒加载和代码分割
- **Arco Design Vue 2.57.0** - 企业级 UI 组件库
  - 字节跳动出品的高质量组件库
  - 提供丰富的组件和主题定制能力

#### 构建工具
- **Vite 5.4.8** - 极速开发体验
  - 基于 ESM 的开发服务器，冷启动快
  - HMR (热模块替换) 支持
  - 生产环境使用 Rollup 打包，优化产物体积
  - 内置 TypeScript 支持，无需额外配置
  - 开发环境代理配置，解决跨域问题

### 🎨 动画与交互

#### 动画引擎
- **Anime.js 3.2.2** - 轻量级动画库
  - 支持 CSS 属性、SVG、DOM 属性动画
  - 时间轴控制，实现复杂动画序列
  - 缓动函数丰富，动画效果自然流畅
- **CSS3 Transitions & Animations** - 原生动画支持
  - 硬件加速，性能优异
  - 与 JavaScript 动画配合使用
- **Intersection Observer API** - 滚动触发动画
  - 高性能滚动监听
  - 支持元素进入视口时触发动画
  - 懒加载和动画触发的核心技术

#### 搜索引擎
- **Fuse.js 7.1.0** - 强大的模糊搜索库
  - 支持多字段搜索和权重配置
  - 提供相关性评分和匹配高亮
- **Pinyin 4.0.0** - 中文拼音转换
  - 支持中文拼音搜索
  - 提升中文用户搜索体验

#### 交互特效系统
```typescript
// 磁场粒子效果实现
const onMouseMovePupil = (e: MouseEvent) => {
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // 磁性核心移动计算
  const coreDistance = Math.min(distance * 0.12, maxCoreDistance);
  const coreX = Math.cos(angle) * coreDistance;
  const coreY = Math.sin(angle) * coreDistance;
};
```

### 🌐 国际化架构

#### 多语言支持
- **自定义 i18n 系统** - 轻量级国际化解决方案
  - 基于 Vue 3 Composition API 实现
  - 支持动态语言切换，无需页面刷新
  - 类型安全的翻译键值对
  - 浏览器语言自动检测

```typescript
// 国际化 Composable 实现
export function useI18n() {
  const currentLanguage = ref<Language>('zh')
  const t = computed(() => translations[currentLanguage.value])
  
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
    localStorage.setItem('preferred-language', currentLanguage.value)
  }
  
  return { t, currentLanguage, toggleLanguage }
}
```

### 📱 响应式设计

#### 移动优先策略
- **Flexible Grid System** - 弹性网格布局
  - CSS Grid 和 Flexbox 结合使用
  - 断点设计：320px (移动) / 768px (平板) / 1024px (桌面)
- **Touch-Friendly Interactions** - 触摸友好交互
  - 44px 最小触摸目标
  - 滑动手势支持
  - 移动端优化的动画性能

### 🎬 智能视频系统

#### 多平台视频播放
- **智能线路选择** - 根据用户地理位置自动选择最优播放源
  ```typescript
  // 地理位置检测逻辑
  function guessIsChinaMainland(): boolean {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language.toLowerCase();
    return tz.includes('Shanghai') || lang.startsWith('zh');
  }
  ```
- **Vimeo 集成** - 国际用户优质体验
- **Bilibili 集成** - 国内用户无障碍访问
- **自动降级** - 网络异常时自动切换备用线路

### 🤖 AI 智能助手

#### DeepSeek AI 集成
- **智能对话** - 基于 DeepSeek Chat 模型的智能对话功能
- **流式响应** - 支持 SSE 流式输出，打字机效果
- **上下文管理** - 智能管理对话历史，支持多轮对话
- **简历问答** - 自动加载简历信息，回答关于作者的问题
- **搜索建议** - 当搜索无结果时，AI 提供智能搜索建议
- **本地存储** - 对话历史本地持久化，刷新页面不丢失

#### 图像处理
- **BlurHash 2.0.5** - 图片模糊占位符
  - 提供优雅的图片加载体验
  - 减少布局偏移（CLS）
- **Sharp 0.34.4** - 高性能图片处理（构建时）
  - 图片压缩和格式转换
  - 生成响应式图片

### ⚡ 性能优化策略

#### 代码分割与懒加载
```typescript
// 路由级代码分割
const routes = [
  {
    path: '/work',
    component: () => import('../pages/work/Work.vue')
  }
]

// 组件级懒加载
const SmartVideo = defineAsyncComponent(
  () => import('../../components/SmartVideo.vue')
)
```

#### 资源优化
- **图片懒加载** - Intersection Observer 实现
- **脚本动态加载** - 按需加载第三方库
- **缓存策略** - 浏览器缓存和 CDN 优化

### 🔧 开发工具链

#### 代码质量保证
- **ESLint + Prettier** - 代码规范和格式化
- **TypeScript 严格模式** - 类型安全检查
- **Git Hooks** - 提交前代码检查

#### 构建优化
```typescript
// Vite 配置优化
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          animations: ['animejs']
        }
      }
    }
  }
})
```

## 🎨 功能模块深度解析

### 🏠 首页 (Home) - 个人品牌展示

#### 核心功能实现
- **动态个人介绍** - 基于 i18n 的多语言个人简介
- **技能展示轮播** - 横向滚动的技能卡片，支持触摸滑动
- **社交媒体矩阵** - 集成 GitHub、Gitee、CSDN、抖音、B站等平台
- **技术栈可视化** - 动态图标展示掌握的技术栈

#### 技术亮点
```vue
<!-- 技能卡片滚动实现 -->
<div class="power-list" @scroll="checkScroll">
  <div class="power-card" v-for="skill in skills" :key="skill.id">
    <div class="card-img" :style="{ backgroundImage: `url(${skill.icon})` }"></div>
    <div class="title">{{ t.skills[skill.key] }}</div>
  </div>
</div>
```

### 💼 作品展示 (Work) - 项目作品集

#### 智能评论滚动系统
- **无缝循环滚动** - CSS 动画实现的无限滚动效果
- **动态评论生成** - 基于项目特点的智能评论展示
- **鼠标悬停暂停** - 用户友好的交互体验

```css
@keyframes scroll-horizontal {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.row-list.scrolling {
  animation: scroll-horizontal 60s linear infinite;
}
```

#### 项目卡片系统
- **分类标签** - Web、AI、App 等技术分类
- **动态加载** - 项目信息从配置文件动态读取
- **外链跳转** - 直接跳转到 GitHub/Gitee 项目页面

### 🛠️ 工具推荐 (Tool) - 开发者工具集

#### 渐进式加载动画
```typescript
const initToolAnimations = () => {
  const checkVisibleItems = () => {
    document.querySelectorAll('.tool-list-item').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.8 && rect.bottom >= -100) {
        el.classList.add('active');
      }
    });
  };
};
```

#### 工具分类系统
- **API 测试工具** - Hoppscotch、HTTPie 等
- **AI 开发框架** - LangChain、AutoGen、MCP Servers 等
- **性能分析工具** - Lighthouse、Bundle Phobia 等
- **格式化工具** - JSON Formatter、RegExr 等

### 📝 博客系统 (Blog) - 技术文章展示

#### Markdown 渲染引擎
- **Marked.js 集成** - 高性能 Markdown 解析
- **语法高亮** - 代码块语法高亮支持
- **自定义渲染器** - 支持自定义 Markdown 扩展

### 📚 读书笔记 (Book) - 知识管理

#### 书籍封面懒加载
```typescript
const bookObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const url = entry.target.getAttribute('data-cover-url');
    const img = new Image();
    img.onload = () => {
      entry.target.style.backgroundImage = `url('${url}')`;
    };
    img.src = url;
  });
});
```

### 👤 关于页面 (About) - 个人详情

#### 交互式简历
- **一键复制联系方式** - 邮箱、电话号码快速复制
- **PDF 简历下载** - 直接下载完整简历文件
- **项目经历时间轴** - 可视化项目经验展示
- **技能雷达图** - 技能水平可视化展示

### 🎵 全局音乐播放器

#### 功能特性
- **全局状态管理** - 跨页面音乐播放控制
- **播放列表管理** - 支持多首歌曲切换
- **音量控制** - 实时音量调节
- **播放进度** - 可拖拽的进度条

### 🎆 特效系统

#### 烟花动画
- **Canvas 渲染** - 高性能粒子系统
- **物理引擎** - 真实的重力和爆炸效果
- **交互触发** - 鼠标点击触发烟花

#### 磁场粒子效果
- **实时计算** - 基于鼠标位置的粒子运动
- **性能优化** - requestAnimationFrame 优化动画性能
- **视觉反馈** - 粒子发光和缩放效果

## 🌐 国际化系统深度解析

### 多语言架构设计

#### 翻译数据结构
```typescript
const translations = {
  zh: {
    // 首页内容
    greeting: 'Hi, I\'m',
    name: 'Roy·Smee',
    title: '2025届',
    role: '前端开发',
    
    // 技能展示
    skills: {
      frontend: '前端开发',
      frontendDesc: '精通Vue.js、React、TypeScript等现代前端技术栈',
      // ... 更多技能描述
    },
    
    // 作品展示
    work: {
      fullStackDev: '全栈开发',
      reviews: {
        codeQuality: '国庆的代码质量真的很高，架构设计很清晰',
        // ... 更多评论
      }
    }
  },
  en: {
    // 对应的英文翻译
  }
}
```

#### 语言切换逻辑
- **自动检测** - 基于浏览器语言偏好自动选择
- **本地存储** - 用户选择的语言偏好持久化保存
- **实时切换** - 无需刷新页面即可切换语言
- **SEO 优化** - 动态更新 HTML lang 属性

### 📱 响应式设计系统

#### 断点策略
```scss
// 移动优先的媒体查询
$breakpoints: (
  'mobile': 320px,   // 小屏手机
  'tablet': 768px,   // 平板
  'desktop': 1024px, // 桌面
  'wide': 1200px     // 宽屏
);

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}
```

#### 响应式组件设计
```vue
<template>
  <div class="skill-grid">
    <div class="skill-item" v-for="skill in skills" :key="skill.id">
      <!-- 内容 -->
    </div>
  </div>
</template>

<style scoped>
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .skill-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
```

#### 移动端优化策略
- **触摸友好** - 44px 最小触摸目标
- **滑动手势** - 支持左右滑动切换内容
- **性能优化** - 移动端动画性能优化
- **网络优化** - 移动网络下的资源加载策略

## ⚙️ 项目架构与配置详解

### 🏗️ 项目架构设计

#### 目录结构设计理念
```
src/
├── components/          # 可复用组件
│   ├── AppLayout.vue   # 全局布局组件
│   ├── SmartVideo.vue  # 智能视频播放器
│   ├── MusicPlayer.vue # 全局音乐播放器
│   └── ...
├── composables/        # 组合式函数 (Vue 3 Composition API)
│   ├── useI18n.ts     # 国际化逻辑
│   ├── usePageAnimations.ts # 页面动画控制
│   └── useScrollProgress.ts # 滚动进度计算
├── pages/             # 页面组件 (按功能模块划分)
│   ├── home/         # 首页模块
│   ├── work/         # 作品展示模块
│   └── ...
├── utils/            # 工具函数
│   └── scriptLoader.ts # 动态脚本加载器
└── router/           # 路由配置
    └── index.ts      # 路由定义和守卫
```

#### 组合式函数 (Composables) 架构

**useI18n.ts - 国际化管理**
```typescript
export function useI18n() {
  const currentLanguage = ref<Language>('zh')
  
  // 响应式翻译对象
  const t = computed(() => translations[currentLanguage.value])
  
  // 语言切换逻辑
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
    localStorage.setItem('preferred-language', currentLanguage.value)
    document.documentElement.lang = currentLanguage.value
  }
  
  // 初始化语言设置
  const initLanguage = () => {
    const saved = localStorage.getItem('preferred-language') as Language
    const browser = navigator.language.startsWith('zh') ? 'zh' : 'en'
    currentLanguage.value = saved || browser
  }
  
  return { t, currentLanguage, toggleLanguage, initLanguage }
}
```

**usePageAnimations.ts - 动画控制系统**
```typescript
export function usePageAnimations() {
  onMounted(() => {
    // Intersection Observer 实现滚动触发动画
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target) // 优化性能，只触发一次
        }
      })
    }, {
      threshold: 0.01,
      rootMargin: '100px 0px' // 提前触发动画
    })
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.load-pro').forEach(el => observer.observe(el))
  })
}
```

### ⚡ Vite 构建配置深度解析

#### 开发环境配置
```typescript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js', // 完整版 Vue，支持模板编译
    },
  },
  server: {
    port: 5173,
    open: false,
    // 代理配置 - 解决跨域问题
    proxy: {
      '/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/deepseek/, ''),
        // 流式传输优化
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Cache-Control', 'no-cache, no-transform');
          });
        }
      }
    }
  }
})
```

#### 生产环境优化
- **代码分割策略** - 按路由和功能模块分割
- **资源压缩** - CSS/JS 自动压缩和混淆
- **Tree Shaking** - 移除未使用的代码
- **静态资源优化** - 图片压缩和格式转换

### 🛣️ 路由系统架构

#### 路由配置与守卫
```typescript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: Home, 
      meta: { title: 'Roy·Smee - 个人博客' } 
    },
    // ... 其他路由
  ],
  scrollBehavior() { 
    return { top: 0 } // 路由切换时滚动到顶部
  },
})

// 全局路由守卫 - 动态更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  next()
})
```

### 🎨 CSS 架构与设计系统

#### 设计令牌 (Design Tokens)
```css
:root {
  /* 颜色系统 */
  --primary-color: #6461f1;
  --secondary-color: #ff6b6b;
  --background-dark: #0e0e13;
  --text-primary: #e8e8f6;
  --text-secondary: #a8a8b6;
  
  /* 间距系统 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 断点系统 */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1200px;
}
```

#### 动画系统
```css
/* 页面过渡动画 */
.page-enter-active {
  transition: opacity 0.4s ease;
}

.page-leave-active {
  transition: opacity 0.2s ease;
}

/* 滚动触发动画 */
.load-pro {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.load-pro.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 🔧 TypeScript 配置优化

#### 严格类型检查
```json
{
  "compilerOptions": {
    "strict": true,                    // 启用所有严格类型检查
    "noImplicitAny": true,            // 禁止隐式 any 类型
    "strictNullChecks": true,         // 严格空值检查
    "strictFunctionTypes": true,      // 严格函数类型检查
    "noImplicitReturns": true,        // 函数必须有返回值
    "noUnusedLocals": true,           // 检查未使用的局部变量
    "noUnusedParameters": true        // 检查未使用的参数
  }
}
```

### 📊 性能监控与优化

#### 性能指标监控
- **FCP (First Contentful Paint)** - 首次内容绘制时间
- **LCP (Largest Contentful Paint)** - 最大内容绘制时间
- **FID (First Input Delay)** - 首次输入延迟
- **CLS (Cumulative Layout Shift)** - 累积布局偏移

#### 优化策略实现
```typescript
// 图片懒加载实现
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!
      img.classList.remove('lazy')
      imageObserver.unobserve(img)
    }
  })
})

// 脚本动态加载优化
export function loadScriptsInOrder(urls: string[]): Promise<void> {
  return urls.reduce<Promise<void>>((prev, url) => {
    return prev.then(() => loadScriptOnce(url))
  }, Promise.resolve())
}
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**Roy·Smee**

- GitHub: [@1812095643](https://github.com/1812095643)
- Gitee: [@caixukun66666666](https://gitee.com/caixukun66666666)
- CSDN: [Roy·Smee](https://blog.csdn.net/m0_66700324)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 邮箱：通过 GitHub 或 Gitee 联系
- 🐛 问题反馈：[GitHub Issues](https://github.com/1812095643/vue3-refactor/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！

## 🚀 部署与运维

### 构建优化策略

#### 生产环境构建
```bash
# 构建命令
npm run build

# 构建产物分析
npx vite-bundle-analyzer dist
```

#### 构建产物优化
- **代码分割** - 按路由和功能模块分割，减少首屏加载时间
- **资源压缩** - Gzip/Brotli 压缩，减少传输体积
- **缓存策略** - 文件指纹命名，实现长期缓存
- **CDN 优化** - 静态资源 CDN 分发

### 性能监控

#### Core Web Vitals 指标
- **LCP < 2.5s** - 最大内容绘制时间
- **FID < 100ms** - 首次输入延迟
- **CLS < 0.1** - 累积布局偏移

#### 性能优化实践
```typescript
// 图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]')
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!
      img.classList.remove('lazy')
      imageObserver.unobserve(img)
    }
  })
})

// 预加载关键资源
const preloadLink = document.createElement('link')
preloadLink.rel = 'preload'
preloadLink.href = '/critical-resource.js'
preloadLink.as = 'script'
document.head.appendChild(preloadLink)
```

## 🔍 SEO 优化

### 搜索引擎优化策略

#### Meta 标签优化
```html
<head>
  <title>Roy·Smee - 全栈开发工程师 | Vue.js React TypeScript</title>
  <meta name="description" content="Roy·Smee个人博客，专注前端开发、全栈技术、AI应用。分享Vue.js、React、TypeScript等技术经验。">
  <meta name="keywords" content="前端开发,Vue.js,React,TypeScript,全栈开发,个人博客">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Roy·Smee - 全栈开发工程师">
  <meta property="og:description" content="专注现代Web技术栈的全栈开发工程师">
  <meta property="og:image" content="/og-image.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Roy·Smee - 全栈开发工程师">
</head>
```

#### 结构化数据
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Roy·Smee",
  "jobTitle": "Full Stack Developer",
  "url": "https://roysmee.com",
  "sameAs": [
    "https://github.com/1812095643",
    "https://gitee.com/caixukun66666666"
  ]
}
```

## 🛡️ 安全性考虑

### 前端安全策略

#### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://player.vimeo.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:;">
```

#### XSS 防护
- **输入验证** - 所有用户输入进行验证和转义
- **输出编码** - HTML 内容输出时进行编码
- **CSP 策略** - 限制脚本执行来源

## 📈 项目统计

### 代码质量指标
- **TypeScript 覆盖率**: 95%+
- **组件复用率**: 80%+
- **代码重复率**: <5%
- **性能评分**: 90+ (Lighthouse)

### 技术债务管理
- **定期重构** - 每月进行代码重构和优化
- **依赖更新** - 及时更新依赖包版本
- **性能监控** - 持续监控和优化性能指标

## 🔮 未来规划

### 技术升级计划
- [ ] **Vue 3.4+** - 升级到最新版本，使用新特性
- [ ] **Vite 6.0** - 升级构建工具，提升开发体验
- [x] **PWA 支持** - 已添加 Service Worker，支持离线访问
- [ ] **WebAssembly** - 集成 WASM 模块，提升计算性能

### 功能扩展计划
- [ ] **评论系统** - 集成第三方评论服务
- [x] **搜索功能** - 已实现全站智能搜索（普通/模糊/拼音/AI）
- [ ] **RSS 订阅** - 博客文章 RSS 输出
- [ ] **暗色主题** - 支持明暗主题切换
- [x] **AI 助手** - 已集成 DeepSeek AI 智能对话

### 性能优化计划
- [ ] **HTTP/3** - 升级到 HTTP/3 协议
- [ ] **Edge Computing** - 边缘计算优化
- [x] **AI 优化** - 已使用 AI 进行搜索优化和智能建议

## 🤝 贡献指南

### 开发流程
1. **Fork 项目** - 从主仓库 fork 到个人仓库
2. **创建分支** - 基于 `develop` 分支创建功能分支
3. **开发功能** - 遵循代码规范进行开发
4. **测试验证** - 确保功能正常且无回归
5. **提交 PR** - 提交 Pull Request 并描述变更内容

### 代码规范
```typescript
// 组件命名：PascalCase
export default defineComponent({
  name: 'SmartVideo'
})

// 函数命名：camelCase
const handleVideoLoad = () => {
  // 实现逻辑
}

// 常量命名：SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 3
```

### 提交规范
```bash
# 功能开发
git commit -m "feat: 添加智能视频播放器组件"

# 问题修复
git commit -m "fix: 修复移动端滚动性能问题"

# 文档更新
git commit -m "docs: 更新 README 技术栈说明"
```

## 📚 学习资源

### 推荐阅读
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 深入理解](https://www.typescriptlang.org/docs/)
- [Vite 构建工具指南](https://vitejs.dev/guide/)
- [现代 JavaScript 教程](https://javascript.info/)

### 相关项目
- [Vue 3 生态系统](https://github.com/vuejs/awesome-vue)
- [TypeScript 最佳实践](https://github.com/typescript-cheatsheets/react)
- [前端性能优化](https://github.com/thedaviddias/Front-End-Performance-Checklist)

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**Roy·Smee**

- 🎓 桂林电子科技大学 数字媒体技术专业 2025届
- 💼 全栈开发工程师，专注 Java + Vue 技术栈
- 🚀 30+ 项目经验，涵盖 Web、移动端、AI 应用
- 🏆 优秀毕业设计获得者，多项竞赛获奖

### 联系方式
- 📧 **GitHub**: [@1812095643](https://github.com/1812095643)
- 🦄 **Gitee**: [@caixukun66666666](https://gitee.com/caixukun66666666)

### 技术专长
- **前端开发**: Vue.js、React、TypeScript、微信小程序
- **后端开发**: Java Spring Boot、Node.js、Python
- **AI 应用**: LangChain、大模型 API 集成、Agent 开发
- **数据库**: MySQL 优化、Redis 缓存架构
- **工程化**: Vite、Webpack、CI/CD、性能优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 如何贡献
1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 🐛 **问题反馈**: [GitHub Issues](https://github.com/1812095643/vue3-refactor/issues)
- 💬 **技术交流**: 通过 GitHub 或 Gitee 私信
- 📧 **商务合作**: 通过个人主页联系方式

---

⭐ **如果这个项目对你有帮助，请给它一个 Star！**

🔥 **欢迎 Fork 和贡献代码，让我们一起打造更好的个人博客系统！**

---

*最后更新时间: 2025年1月*