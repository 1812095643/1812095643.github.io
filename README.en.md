# Roy·Smee Personal Blog

<div align="center">

[简体中文](README.md) | [English](README.en.md) | [日本語](README.ja.md)

</div>

> A modern personal blog website built with Vue 3 + TypeScript + Vite, showcasing full-stack development skills and project portfolio

[![Vue](https://img.shields.io/badge/Vue-3.5.10-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Anime.js](https://img.shields.io/badge/Anime.js-3.2.2-FF6B6B?style=flat-square)](https://animejs.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Core Features

- 🚀 **Modern Tech Stack** - Built with Vue 3 Composition API + TypeScript + Vite
- 📱 **Responsive Design** - Mobile-first, perfectly adapted to all device sizes
- 🎨 **Advanced Animation System** - Smooth animations powered by Anime.js + CSS3 + Intersection Observer
- 🔍 **Intelligent Search System** - Supports normal/fuzzy/pinyin/AI search modes with real-time highlighting
- 🌐 **Internationalization** - Complete Chinese-English bilingual support with dynamic language switching
- ⚡ **Performance Optimization** - Code splitting, lazy loading, resource preloading, caching strategies
- 🎬 **Smart Video Player** - Automatic route selection, supports Vimeo and Bilibili platforms
- 🛠️ **Developer Tools** - Curated frontend, AI, MCP development tools
- 📝 **Content Management** - Markdown rendering, dynamic content loading
- 🎵 **Music Player** - Global music playback control
- 🎆 **Interactive Effects** - Fireworks animation, magnetic field effects, particle systems
- 🤖 **AI Assistant** - Integrated DeepSeek AI for intelligent conversations and search suggestions

## 🏗️ Project Structure

```
vue3-refactor/
├── public/                 # Static assets
│   ├── assets/            # Image resources
│   ├── audio/             # Audio files
│   ├── css/               # Global styles
│   ├── images/            # Image files
│   ├── js/                # Static scripts
│   └── 简历.pdf           # Resume file
├── src/
│   ├── components/        # Shared components
│   ├── composables/       # Composition functions
│   ├── pages/             # Page components
│   │   ├── home/          # Home page
│   │   ├── work/          # Portfolio
│   │   ├── tool/          # Tools
│   │   ├── blog/          # Blog
│   │   ├── book/          # Books
│   │   └── about/         # About
│   ├── router/            # Router configuration
│   ├── utils/             # Utility functions
│   ├── main.ts            # Application entry
│   └── Page.vue           # Root component
├── index.html             # HTML template
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🚀 Quick Start

### Requirements

- Node.js 18.0+
- npm or pnpm

### Installation

```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

### Environment Configuration

Copy `.env.example` to `.env` and configure necessary environment variables:

```bash
cp .env.example .env
```

Edit `.env` file to configure DeepSeek AI API Key (optional, for AI assistant feature):

```env
# DeepSeek AI API Key
# Get it from: https://platform.deepseek.com/api_keys
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

### Development Mode

```bash
npm run dev
```

Visit http://localhost:5173 after startup

### Page Navigation

- **Home**: http://localhost:5173/ - Personal introduction and skills showcase
- **Portfolio**: http://localhost:5173/work - Project portfolio
- **Tools**: http://localhost:5173/tool - Developer tools recommendations
- **Blog**: http://localhost:5173/blog - Technical articles
- **Books**: http://localhost:5173/book - Reading notes
- **About**: http://localhost:5173/about - Personal details

### Production Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Build

```bash
npm run preview
```

## 🛠️ Tech Stack Details

### 🏗️ Core Architecture

#### Frontend Framework
- **Vue 3.5.10** - Latest Composition API for better logic reuse and type inference
  - Uses `<script setup>` syntax sugar for simplified component writing
  - Proxy-based reactive system for better performance
  - Supports Fragment, Teleport, Suspense features
- **TypeScript 5.0+** - Full project type safety
  - Strict mode configuration for code quality
  - Custom type definitions for enhanced development experience
  - Perfect integration with Vue 3 for component Props type inference
- **Vue Router 4.5.1** - Modern routing management
  - HTML5 History mode, SEO friendly
  - Route guards for dynamic page title updates
  - Supports route lazy loading and code splitting
- **Arco Design Vue 2.57.0** - Enterprise-level UI component library
  - High-quality component library from ByteDance
  - Rich components and theme customization

#### Build Tools
- **Vite 5.4.8** - Lightning-fast development experience
  - ESM-based dev server with fast cold start
  - HMR (Hot Module Replacement) support
  - Production build with Rollup for optimized bundle size
  - Built-in TypeScript support without extra configuration
  - Dev proxy configuration for CORS handling

### 🎨 Animation & Interaction

#### Animation Engine
- **Anime.js 3.2.2** - Lightweight animation library
  - Supports CSS properties, SVG, DOM attribute animations
  - Timeline control for complex animation sequences
  - Rich easing functions for natural animation effects
- **CSS3 Transitions & Animations** - Native animation support
  - Hardware acceleration for excellent performance
  - Works together with JavaScript animations
- **Intersection Observer API** - Scroll-triggered animations
  - High-performance scroll monitoring
  - Triggers animations when elements enter viewport
  - Core technology for lazy loading and animation triggers

#### Search Engine
- **Fuse.js 7.1.0** - Powerful fuzzy search library
  - Multi-field search with weight configuration
  - Relevance scoring and match highlighting
- **Pinyin 4.0.0** - Chinese pinyin conversion
  - Supports Chinese pinyin search
  - Enhances search experience for Chinese users

#### Interactive Effects System
```typescript
// Magnetic particle effect implementation
const onMouseMovePupil = (e: MouseEvent) => {
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Magnetic core movement calculation
  const coreDistance = Math.min(distance * 0.12, maxCoreDistance);
  const coreX = Math.cos(angle) * coreDistance;
  const coreY = Math.sin(angle) * coreDistance;
};
```

### 🌐 Internationalization Architecture

#### Multi-language Support
- **Custom i18n System** - Lightweight internationalization solution
  - Built with Vue 3 Composition API
  - Dynamic language switching without page refresh
  - Type-safe translation key-value pairs
  - Automatic browser language detection

```typescript
// i18n Composable implementation
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

### 📱 Responsive Design

#### Mobile-First Strategy
- **Flexible Grid System** - Elastic grid layout
  - Combined use of CSS Grid and Flexbox
  - Breakpoint design: 320px (mobile) / 768px (tablet) / 1024px (desktop)
- **Touch-Friendly Interactions** - Touch-optimized interactions
  - 44px minimum touch target
  - Swipe gesture support
  - Mobile-optimized animation performance

### 🎬 Smart Video System

#### Multi-platform Video Playback
- **Intelligent Route Selection** - Automatically selects optimal playback source based on user location
  ```typescript
  // Geolocation detection logic
  function guessIsChinaMainland(): boolean {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language.toLowerCase();
    return tz.includes('Shanghai') || lang.startsWith('zh');
  }
  ```
- **Vimeo Integration** - Quality experience for international users
- **Bilibili Integration** - Seamless access for domestic users
- **Automatic Fallback** - Switches to backup route on network issues

### 🤖 AI Assistant

#### DeepSeek AI Integration
- **Intelligent Conversation** - Smart dialogue based on DeepSeek Chat model
- **Streaming Response** - SSE streaming output with typewriter effect
- **Context Management** - Intelligent conversation history management, supports multi-turn dialogue
- **Resume Q&A** - Automatically loads resume information to answer questions about the author
- **Search Suggestions** - AI provides intelligent search suggestions when no results found
- **Local Storage** - Conversation history persisted locally, survives page refresh

#### Image Processing
- **BlurHash 2.0.5** - Image blur placeholders
  - Provides elegant image loading experience
  - Reduces Cumulative Layout Shift (CLS)
- **Sharp 0.34.4** - High-performance image processing (build time)
  - Image compression and format conversion
  - Generates responsive images

### ⚡ Performance Optimization Strategies

#### Code Splitting & Lazy Loading
```typescript
// Route-level code splitting
const routes = [
  {
    path: '/work',
    component: () => import('../pages/work/Work.vue')
  }
]

// Component-level lazy loading
const SmartVideo = defineAsyncComponent(
  () => import('../../components/SmartVideo.vue')
)
```

#### Resource Optimization
- **Image Lazy Loading** - Implemented with Intersection Observer
- **Dynamic Script Loading** - Load third-party libraries on demand
- **Caching Strategy** - Browser caching and CDN optimization

### 🔧 Development Toolchain

#### Code Quality Assurance
- **ESLint + Prettier** - Code standards and formatting
- **TypeScript Strict Mode** - Type safety checks
- **Git Hooks** - Pre-commit code checks

#### Build Optimization
```typescript
// Vite configuration optimization
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

## 🎨 Feature Modules Deep Dive

### 🏠 Home - Personal Brand Showcase

#### Core Features
- **Dynamic Personal Introduction** - i18n-based multilingual personal profile
- **Skills Showcase Carousel** - Horizontal scrolling skill cards with touch swipe support
- **Social Media Matrix** - Integration with GitHub, Gitee, CSDN, Douyin, Bilibili platforms
- **Tech Stack Visualization** - Dynamic icon display of mastered technologies

### 💼 Portfolio - Project Showcase

#### Smart Comment Scrolling System
- **Seamless Loop Scrolling** - Infinite scroll effect with CSS animations
- **Dynamic Comment Generation** - Smart comment display based on project features
- **Hover Pause** - User-friendly interaction experience

#### Project Card System
- **Category Tags** - Technical categories like Web, AI, App
- **Dynamic Loading** - Project information loaded from configuration files
- **External Links** - Direct jump to GitHub/Gitee project pages

### 🛠️ Tools - Developer Toolset

#### Progressive Loading Animation
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

#### Tool Categories
- **API Testing Tools** - Hoppscotch, HTTPie, etc.
- **AI Development Frameworks** - LangChain, AutoGen, MCP Servers, etc.
- **Performance Analysis Tools** - Lighthouse, Bundle Phobia, etc.
- **Formatting Tools** - JSON Formatter, RegExr, etc.

### 📝 Blog System - Technical Articles

#### Markdown Rendering Engine
- **Marked.js Integration** - High-performance Markdown parsing
- **Syntax Highlighting** - Code block syntax highlighting support
- **Custom Renderer** - Supports custom Markdown extensions

### 📚 Books - Knowledge Management

#### Book Cover Lazy Loading
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

### 👤 About Page - Personal Details

#### Interactive Resume
- **One-Click Copy Contact** - Quick copy of email and phone number
- **PDF Resume Download** - Direct download of complete resume file
- **Project Timeline** - Visual project experience showcase
- **Skills Radar Chart** - Skill level visualization

### 🎵 Global Music Player

#### Features
- **Global State Management** - Cross-page music playback control
- **Playlist Management** - Support for multiple song switching
- **Volume Control** - Real-time volume adjustment
- **Playback Progress** - Draggable progress bar

### 🎆 Effects System

#### Fireworks Animation
- **Canvas Rendering** - High-performance particle system
- **Physics Engine** - Realistic gravity and explosion effects
- **Interactive Trigger** - Mouse click triggers fireworks

#### Magnetic Particle Effect
- **Real-time Calculation** - Particle movement based on mouse position
- **Performance Optimization** - requestAnimationFrame optimized animation performance
- **Visual Feedback** - Particle glow and scale effects

## 🌐 Internationalization System Deep Dive

### Multi-language Architecture Design

#### Translation Data Structure
```typescript
const translations = {
  zh: {
    // Home content
    greeting: 'Hi, I\'m',
    name: 'Roy·Smee',
    title: '2025届',
    role: '前端开发',
    
    // Skills showcase
    skills: {
      frontend: '前端开发',
      frontendDesc: '精通Vue.js、React、TypeScript等现代前端技术栈',
      // ... more skill descriptions
    }
  },
  en: {
    // Corresponding English translations
  }
}
```

#### Language Switching Logic
- **Auto Detection** - Automatically selects based on browser language preference
- **Local Storage** - User's language preference persisted
- **Real-time Switching** - Switch language without page refresh
- **SEO Optimization** - Dynamically updates HTML lang attribute

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Roy·Smee**

- 🎓 Guilin University of Electronic Technology, Digital Media Technology, Class of 2025
- 💼 Full-stack Development Engineer, specializing in Java + Vue tech stack
- 🚀 30+ project experience, covering Web, mobile, AI applications
- 🏆 Excellent graduation design award winner, multiple competition awards

### Contact

- 📧 **GitHub**: [@1812095643](https://github.com/1812095643)
- 🦄 **Gitee**: [@caixukun66666666](https://gitee.com/caixukun66666666)

### Technical Expertise
- **Frontend Development**: Vue.js, React, TypeScript, WeChat Mini Programs
- **Backend Development**: Java Spring Boot, Node.js, Python
- **AI Applications**: LangChain, Large Model API integration, Agent development
- **Database**: MySQL optimization, Redis caching architecture
- **Engineering**: Vite, Webpack, CI/CD, performance optimization

## 🤝 Contributing

Issues and Pull Requests are welcome!

### How to Contribute
1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or suggestions, please contact via:

- 🐛 **Issue Feedback**: [GitHub Issues](https://github.com/1812095643/vue3-refactor/issues)
- 💬 **Technical Exchange**: Via GitHub or Gitee private message
- 📧 **Business Cooperation**: Contact via personal homepage

---

⭐ **If this project helps you, please give it a Star!**

🔥 **Welcome to Fork and contribute code, let's build a better personal blog system together!**

---

*Last updated: January 2025*
