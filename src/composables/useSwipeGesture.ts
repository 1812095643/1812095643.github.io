import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

interface SwipeOptions {
    threshold?: number
    enableRouteSwipe?: boolean
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
}

export function useSwipeGesture(options: SwipeOptions = {}) {
    const {
        threshold = 50,
        enableRouteSwipe = true,
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown
    } = options

    const router = useRouter()
    const touchStartX = ref(0)
    const touchStartY = ref(0)
    const touchEndX = ref(0)
    const touchEndY = ref(0)
    const isSwiping = ref(false)

    const routeOrder = ['home', 'work', 'tool', 'blog', 'book', 'about']

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.value = e.touches[0].clientX
        touchStartY.value = e.touches[0].clientY
        isSwiping.value = true
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (!isSwiping.value) return
        touchEndX.value = e.touches[0].clientX
        touchEndY.value = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
        if (!isSwiping.value) return

        const deltaX = touchEndX.value - touchStartX.value
        const deltaY = touchEndY.value - touchStartY.value
        const absDeltaX = Math.abs(deltaX)
        const absDeltaY = Math.abs(deltaY)

        // 判断是横向还是纵向滑动
        if (absDeltaX > absDeltaY && absDeltaX > threshold) {
            // 横向滑动
            if (deltaX > 0) {
                // 向右滑动
                if (onSwipeRight) {
                    onSwipeRight()
                } else if (enableRouteSwipe) {
                    navigateToPreviousRoute()
                }
            } else {
                // 向左滑动
                if (onSwipeLeft) {
                    onSwipeLeft()
                } else if (enableRouteSwipe) {
                    navigateToNextRoute()
                }
            }
        } else if (absDeltaY > absDeltaX && absDeltaY > threshold) {
            // 纵向滑动
            if (deltaY > 0) {
                // 向下滑动
                if (onSwipeDown) {
                    onSwipeDown()
                }
            } else {
                // 向上滑动
                if (onSwipeUp) {
                    onSwipeUp()
                }
            }
        }

        isSwiping.value = false
    }

    const navigateToNextRoute = () => {
        const currentRoute = router.currentRoute.value.name as string
        const currentIndex = routeOrder.indexOf(currentRoute)
        if (currentIndex < routeOrder.length - 1) {
            router.push({ name: routeOrder[currentIndex + 1] })
        }
    }

    const navigateToPreviousRoute = () => {
        const currentRoute = router.currentRoute.value.name as string
        const currentIndex = routeOrder.indexOf(currentRoute)
        if (currentIndex > 0) {
            router.push({ name: routeOrder[currentIndex - 1] })
        }
    }

    onMounted(() => {
        document.addEventListener('touchstart', handleTouchStart, { passive: true })
        document.addEventListener('touchmove', handleTouchMove, { passive: true })
        document.addEventListener('touchend', handleTouchEnd)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
    })

    return {
        isSwiping
    }
}
