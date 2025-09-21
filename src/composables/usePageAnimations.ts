import { onMounted, nextTick } from 'vue'

export function usePageAnimations() {
    onMounted(() => {
        nextTick(() => {
            // 等待页面过渡完成后再初始化动画
            setTimeout(() => {
                const loadProElements = document.querySelectorAll<HTMLElement>('.load-pro')

                console.log(`Found ${loadProElements.length} .load-pro elements`)

                // 先移除所有 visible 类
                loadProElements.forEach(el => {
                    el.classList.remove('visible')
                })

                // 创建新的 Intersection Observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            console.log('Element entering view:', entry.target)
                            entry.target.classList.add('visible')
                            observer.unobserve(entry.target)
                        }
                    })
                }, {
                    threshold: 0.01,
                    rootMargin: '100px 0px'
                })

                // 观察所有 load-pro 元素
                loadProElements.forEach((el) => observer.observe(el))

                // 立即检查已经在视口中的元素
                setTimeout(() => {
                    loadProElements.forEach(el => {
                        const rect = el.getBoundingClientRect()
                        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                            console.log('Element immediately visible:', el)
                            el.classList.add('visible')
                            observer.unobserve(el)
                        }
                    })
                }, 100)
            }, 500) // 等待页面过渡完成
        })
    })
}