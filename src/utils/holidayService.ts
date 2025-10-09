// 节假日和农历API服务
export interface HolidayInfo {
    date: string
    name: string
    isHoliday: boolean
    isWorkday: boolean
}

export interface LunarInfo {
    lunarYear: number
    lunarMonth: number
    lunarDay: number
    lunarMonthName: string
    lunarDayName: string
    festival?: string
}

class HolidayService {
    private cache: Map<string, HolidayInfo> = new Map()
    private lunarCache: Map<string, LunarInfo> = new Map()

    // 获取节假日信息（使用免费API）
    async getHolidayInfo(date: Date): Promise<HolidayInfo | null> {
        const dateStr = this.formatDate(date)

        // 检查缓存
        if (this.cache.has(dateStr)) {
            return this.cache.get(dateStr)!
        }

        try {
            // 使用免费的节假日API（示例：timor.tech）
            const year = date.getFullYear()
            const response = await fetch(`https://timor.tech/api/holiday/year/${year}`)

            if (response.ok) {
                const data = await response.json()

                // 缓存整年数据
                if (data.holiday) {
                    Object.entries(data.holiday).forEach(([key, value]: [string, any]) => {
                        this.cache.set(key, {
                            date: key,
                            name: value.name || '',
                            isHoliday: value.holiday === true,
                            isWorkday: value.wage === 3 // 3倍工资表示法定节假日
                        })
                    })
                }

                return this.cache.get(dateStr) || null
            }
        } catch (error) {
            console.warn('Failed to fetch holiday info:', error)
        }

        return null
    }

    // 获取农历信息（使用本地算法或API）
    async getLunarInfo(date: Date): Promise<LunarInfo | null> {
        const dateStr = this.formatDate(date)

        // 检查缓存
        if (this.lunarCache.has(dateStr)) {
            return this.lunarCache.get(dateStr)!
        }

        try {
            // 可以使用免费的农历API
            const response = await fetch(`https://timor.tech/api/holiday/info/${dateStr}`)

            if (response.ok) {
                const data = await response.json()

                if (data.type?.lunar) {
                    const lunar = data.type.lunar
                    const lunarInfo: LunarInfo = {
                        lunarYear: lunar.year || 0,
                        lunarMonth: lunar.month || 0,
                        lunarDay: lunar.day || 0,
                        lunarMonthName: lunar.monthStr || '',
                        lunarDayName: lunar.dayStr || '',
                        festival: data.type?.festival || undefined
                    }

                    this.lunarCache.set(dateStr, lunarInfo)
                    return lunarInfo
                }
            }
        } catch (error) {
            console.warn('Failed to fetch lunar info:', error)
        }

        // 降级：使用简化算法
        return this.getSimplifiedLunarInfo(date)
    }

    // 简化的农历算法（降级方案）
    private getSimplifiedLunarInfo(date: Date): LunarInfo {
        const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
            '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
            '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']

        const day = date.getDate()
        const lunarDate = (day + 10) % 30

        return {
            lunarYear: date.getFullYear(),
            lunarMonth: date.getMonth() + 1,
            lunarDay: lunarDate + 1,
            lunarMonthName: `${date.getMonth() + 1}月`,
            lunarDayName: lunarDays[lunarDate] || '初一'
        }
    }

    // 格式化日期为 YYYY-MM-DD
    private formatDate(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // 清除缓存
    clearCache() {
        this.cache.clear()
        this.lunarCache.clear()
    }
}

export const holidayService = new HolidayService()
