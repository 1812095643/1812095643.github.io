import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/home/Home.vue'
import Work from '../pages/work/Work.vue'
import Tool from '../pages/tool/Tool.vue'
import Blog from '../pages/blog/Blog.vue'
import Book from '../pages/book/Book.vue'
import About from '../pages/about/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Roy·Smee - 个人博客' } },
  { path: '/work', name: 'work', component: Work, meta: { title: 'Roy·Smee - 作品展示' } },
  { path: '/tool', name: 'tool', component: Tool, meta: { title: 'Roy·Smee - 工具推荐' } },
  { path: '/blog', name: 'blog', component: Blog, meta: { title: 'Roy·Smee - 博客文章' } },
  { path: '/book', name: 'book', component: Book, meta: { title: 'Roy·Smee - 读书笔记' } },
  { path: '/about', name: 'about', component: About, meta: { title: 'Roy·Smee - 关于我' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

// 路由守卫：动态更新页面标题
router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'Roy·Smee - 个人博客'
  }
  next()
})

export default router
