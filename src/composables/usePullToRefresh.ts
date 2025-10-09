import { ref, onMounted, onBeforeUnmount } from 'vue'

interface PullToRefreshOptions {
    threshold?: number
    onRefresh?: () => Promise<void> | void
    disabled?: boolean
}

export function usePullToRefresh(options: PullToRefreshOptions = {}) {
    const {
        threshold = 80,
        onRefresh,
        disabled = false
    } = options

    const isPulling = ref(false)
    const isRefreshing = ref(false)
    const pullDistance = ref(0)
    const startY = ref(0)

    const handleTouchStart = (e: TouchEvent) => {
        if (disabled || window.scrollY > 0) return
        startY.value = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (disabled || window.scrollY > 0 || !startY.value) return

        const currentY = e.touches[0].clientY
        const distance = currentY - startY.value

        if (distance > 0) {
            isPulling.value = true
            // 使用阻尼效果，拉得越远阻力越大
            pullDistance.value = Math.min(distance * 0.5, threshold * 1.5)

            // 阻止默认滚动行为
            if (distance > 10) {
                e.preventDefault()
            }
        }
    }

    const handleTouchEnd = async () => {
        if (!isPulling.value) return

        if (pullDistance.value >= threshold && onRefresh && !isRefreshing.value) {
            isRefreshing.value = true
            try {
                await onRefresh()
            } catch (error) {
                console.error('Refresh error:', error)
            } finally {
                setTimeout(() => {
                    isRefreshing.value = false
                    isPulling.value = false
                    pullDistance.value = 0
                    startY.value = 0
                }, 500)
            }
        } else {
            isPulling.value = false
            pullDistance.value = 0
            startY.value = 0
        }
    }

    onMounted(() => {
        document.addEventListener('touchstart', handleTouchStart, { passive: true })
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
    })

    return {
        isPulling,
        isRefreshing,
        pullDistance
    }
}
