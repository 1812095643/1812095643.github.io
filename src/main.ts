import { createApp } from 'vue'
import Page from './Page.vue'
import router from './router'

// The global CSS remains from public/css/style.min.css via link in HTML

const app = createApp(Page)
app.use(router)
app.mount('#app')
