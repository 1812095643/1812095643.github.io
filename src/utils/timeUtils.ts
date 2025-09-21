// 时间工具函数
export interface TimeInfo {
    date: string
    time: string
    weekday: string
    period: string
    greeting: string
    timeZone: string
}

class TimeUtils {
    // 获取当前时间信息
    getCurrentTimeInfo(timezone?: string): TimeInfo {
        const now = new Date()
        const hour = now.getHours()

        // 根据时区调整时间
        let localTime = now
        if (timezone) {
            try {
                localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
            } catch (error) {
                console.warn('Invalid timezone, using local time:', error)
            }
        }

        // 格式化日期
        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: timezone
        }

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timezone
        }

        const weekdayOptions: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            timeZone: timezone
        }

        const date = localTime.toLocaleDateString('zh-CN', dateOptions)
        const time = localTime.toLocaleTimeString('zh-CN', timeOptions)
        const weekday = localTime.toLocaleDateString('zh-CN', weekdayOptions)

        // 获取时间段和问候语
        const { period, greeting } = this.getTimeGreeting(hour)

        return {
            date,
            time,
            weekday,
            period,
            greeting,
            timeZone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }

    // 根据时间获取问候语
    private getTimeGreeting(hour: number): { period: string; greeting: string } {
        if (hour >= 5 && hour < 9) {
            return { period: '早晨', greeting: '早上好' }
        } else if (hour >= 9 && hour < 12) {
            return { period: '上午', greeting: '上午好' }
        } else if (hour >= 12 && hour < 14) {
            return { period: '中午', greeting: '中午好' }
        } else if (hour >= 14 && hour < 18) {
            return { period: '下午', greeting: '下午好' }
        } else if (hour >= 18 && hour < 22) {
            return { period: '傍晚', greeting: '晚上好' }
        } else {
            return { period: '夜晚', greeting: '夜深了' }
        }
    }

    // 获取相对时间描述
    getRelativeTime(date: Date): string {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (seconds < 60) {
            return '刚刚'
        } else if (minutes < 60) {
            return `${minutes}分钟前`
        } else if (hours < 24) {
            return `${hours}小时前`
        } else if (days < 7) {
            return `${days}天前`
        } else {
            return date.toLocaleDateString('zh-CN')
        }
    }

    // 格式化持续时间
    formatDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)

        if (hours > 0) {
            return `${hours}小时${minutes % 60}分钟`
        } else if (minutes > 0) {
            return `${minutes}分钟${seconds % 60}秒`
        } else {
            return `${seconds}秒`
        }
    }

    // 检查是否为工作时间
    isWorkingHours(hour: number = new Date().getHours()): boolean {
        return hour >= 9 && hour < 18
    }

    // 获取时间段的背景色
    getTimeBasedTheme(hour: number = new Date().getHours()): {
        primary: string
        secondary: string
        accent: string
        gradient: string
    } {
        if (hour >= 6 && hour < 12) {
            // 早晨 - 清新蓝绿
            return {
                primary: '#06b6d4',
                secondary: '#0891b2',
                accent: '#67e8f9',
                gradient: 'linear-gradient(135deg, #06b6d4, #0891b2, #67e8f9)'
            }
        } else if (hour >= 12 && hour < 18) {
            // 下午 - 温暖橙黄
            return {
                primary: '#f59e0b',
                secondary: '#d97706',
                accent: '#fbbf24',
                gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24)'
            }
        } else if (hour >= 18 && hour < 22) {
            // 傍晚 - 浪漫紫粉
            return {
                primary: '#8b5cf6',
                secondary: '#7c3aed',
                accent: '#a78bfa',
                gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #a78bfa)'
            }
        } else {
            // 夜晚 - 深邃蓝紫
            return {
                primary: '#6366f1',
                secondary: '#4f46e5',
                accent: '#818cf8',
                gradient: 'linear-gradient(135deg, #6366f1, #4f46e5, #818cf8)'
            }
        }
    }
}

export const timeUtils = new TimeUtils()