import { createApp } from 'vue'
import Page from './Page.vue'
import router from './router'
import { registerServiceWorker } from './utils/registerSW'

// The global CSS remains from public/css/style.min.css via link in HTML

const app = createApp(Page)
app.use(router)
app.mount('#app')

// 注册 Service Worker（生产环境）
if (import.meta.env.PROD) {
    registerServiceWorker()
}

// 字体加载优化
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('400 1em "Noto Sans SC"')
    ]).then(() => {
        document.documentElement.classList.add('font-loaded')
    }).catch((error) => {
        console.warn('Font loading failed:', error)
        document.documentElement.classList.add('font-loaded')
    })
}
