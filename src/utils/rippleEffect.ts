// 点击绽放光效工具
export interface RippleOptions {
    color?: string
    duration?: number
    size?: number
    opacity?: number
}

class RippleEffect {
    private static instance: RippleEffect

    static getInstance(): RippleEffect {
        if (!RippleEffect.instance) {
            RippleEffect.instance = new RippleEffect()
        }
        return RippleEffect.instance
    }

    // 创建绽放光效
    createRipple(
        element: HTMLElement,
        event: MouseEvent | TouchEvent,
        options: RippleOptions = {}
    ): void {
        const {
            color = 'rgba(255, 255, 255, 0.6)',
            duration = 600,
            size = 100,
            opacity = 0.6
        } = options

        // 获取点击位置
        const rect = element.getBoundingClientRect()
        let clientX: number, clientY: number

        if (event instanceof MouseEvent) {
            clientX = event.clientX
            clientY = event.clientY
        } else {
            clientX = event.touches[0].clientX
            clientY = event.touches[0].clientY
        }

        const x = clientX - rect.left
        const y = clientY - rect.top

        // 创建绽放元素
        const ripple = document.createElement('div')
        ripple.className = 'ripple-effect'

        // 计算最大扩散距离
        const maxDistance = Math.max(
            Math.sqrt(x * x + y * y),
            Math.sqrt((rect.width - x) * (rect.width - x) + y * y),
            Math.sqrt(x * x + (rect.height - y) * (rect.height - y)),
            Math.sqrt((rect.width - x) * (rect.width - x) + (rect.height - y) * (rect.height - y))
        )

        const finalSize = Math.max(size, maxDistance * 2)

        // 设置样式
        Object.assign(ripple.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: '1000',
            opacity: opacity.toString(),
            transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        })

        // 确保父元素有相对定位
        const computedStyle = window.getComputedStyle(element)
        if (computedStyle.position === 'static') {
            element.style.position = 'relative'
        }

        // 确保父元素有overflow hidden
        element.style.overflow = 'hidden'

        // 添加到元素中
        element.appendChild(ripple)

        // 触发动画
        requestAnimationFrame(() => {
            Object.assign(ripple.style, {
                width: `${finalSize}px`,
                height: `${finalSize}px`,
                opacity: '0'
            })
        })

        // 动画结束后移除元素
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple)
            }
        }, duration)
    }

    // 为元素添加绽放效果监听器
    addRippleListener(
        element: HTMLElement,
        options: RippleOptions = {}
    ): () => void {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            this.createRipple(element, event, options)
        }

        element.addEventListener('click', handleClick as EventListener)
        element.addEventListener('touchstart', handleClick as EventListener)

        // 返回清理函数
        return () => {
            element.removeEventListener('click', handleClick as EventListener)
            element.removeEventListener('touchstart', handleClick as EventListener)
        }
    }

    // 创建彩色绽放效果（根据时间变化）
    createColorfulRipple(element: HTMLElement, event: MouseEvent | TouchEvent): void {
        const hour = new Date().getHours()
        let color: string

        if (hour >= 6 && hour < 12) {
            // 早晨 - 清新蓝绿
            color = 'rgba(6, 182, 212, 0.6)'
        } else if (hour >= 12 && hour < 18) {
            // 下午 - 温暖橙黄
            color = 'rgba(245, 158, 11, 0.6)'
        } else if (hour >= 18 && hour < 22) {
            // 傍晚 - 浪漫紫粉
            color = 'rgba(139, 92, 246, 0.6)'
        } else {
            // 夜晚 - 深邃蓝紫
            color = 'rgba(99, 102, 241, 0.6)'
        }

        this.createRipple(element, event, {
            color,
            duration: 800,
            opacity: 0.7
        })
    }

    // 创建多层绽放效果
    createMultiLayerRipple(element: HTMLElement, event: MouseEvent | TouchEvent): void {
        const colors = [
            'rgba(99, 102, 241, 0.4)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(236, 72, 153, 0.2)'
        ]

        colors.forEach((color, index) => {
            setTimeout(() => {
                this.createRipple(element, event, {
                    color,
                    duration: 600 + index * 200,
                    size: 80 + index * 40,
                    opacity: 0.6 - index * 0.1
                })
            }, index * 100)
        })
    }
}

// 导出单例实例
export const rippleEffect = RippleEffect.getInstance()

// Vue 3 组合式函数
export function useRippleEffect() {
    return {
        createRipple: rippleEffect.createRipple.bind(rippleEffect),
        addRippleListener: rippleEffect.addRippleListener.bind(rippleEffect),
        createColorfulRipple: rippleEffect.createColorfulRipple.bind(rippleEffect),
        createMultiLayerRipple: rippleEffect.createMultiLayerRipple.bind(rippleEffect)
    }
}