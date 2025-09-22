import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
    const scrollProgress = ref(0)

    const updateScrollProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

        if (scrollHeight > 0) {
            scrollProgress.value = Math.min((scrollTop / scrollHeight) * 100, 100)
        } else {
            scrollProgress.value = 0
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', updateScrollProgress, { passive: true })
        // 初始化时计算一次
        updateScrollProgress()
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', updateScrollProgress)
    })

    return {
        scrollProgress
    }
}