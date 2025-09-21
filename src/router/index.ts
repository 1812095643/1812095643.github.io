import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/home/Home.vue'
import Work from '../pages/work/Work.vue'
import Tool from '../pages/tool/Tool.vue'
import Blog from '../pages/blog/Blog.vue'
import Book from '../pages/book/Book.vue'
import About from '../pages/about/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/work', name: 'work', component: Work },
  { path: '/tool', name: 'tool', component: Tool },
  { path: '/blog', name: 'blog', component: Blog },
  { path: '/book', name: 'book', component: Book },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
