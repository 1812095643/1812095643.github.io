import { holidayService } from './holidayService'

// 农历和节假日工具
export interface CalendarDay {
    date: number
    isToday: boolean
    isWeekend: boolean
    isHoliday: boolean
    holidayName?: string
    lunarDay?: string
    isCurrentMonth: boolean
}

// 本地缓存的节假日数据（作为降级方案）
const fallbackHolidays: Record<string, string> = {
    '2025-01-01': '元旦',
    '2025-01-28': '除夕',
    '2025-01-29': '春节',
    '2025-01-30': '春节',
    '2025-01-31': '春节',
    '2025-02-01': '春节',
    '2025-02-02': '春节',
    '2025-04-04': '清明节',
    '2025-04-05': '清明节',
    '2025-04-06': '清明节',
    '2025-05-01': '劳动节',
    '2025-05-02': '劳动节',
    '2025-05-03': '劳动节',
    '2025-05-31': '端午节',
    '2025-06-01': '端午节',
    '2025-06-02': '端午节',
    '2025-10-01': '国庆节',
    '2025-10-02': '国庆节',
    '2025-10-03': '国庆节',
    '2025-10-04': '国庆节',
    '2025-10-05': '国庆节',
    '2025-10-06': '国庆节',
    '2025-10-07': '国庆节',
    '2025-10-08': '中秋节',
}

const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']

// 获取某月的日历数据（同步版本，使用缓存或降级数据）
export function getMonthCalendar(year: number, month: number): CalendarDay[] {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startWeekday = firstDay.getDay()

    const today = new Date()
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
    const todayDate = today.getDate()

    const calendar: CalendarDay[] = []

    // 填充上个月的日期
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startWeekday - 1; i >= 0; i--) {
        const date = prevMonthLastDay - i
        calendar.push({
            date,
            isToday: false,
            isWeekend: false,
            isHoliday: false,
            isCurrentMonth: false
        })
    }

    // 填充当月日期
    for (let date = 1; date <= daysInMonth; date++) {
        const currentDate = new Date(year, month, date)
        const weekday = currentDate.getDay()
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`

        // 使用降级数据
        const holidayName = fallbackHolidays[dateStr]

        calendar.push({
            date,
            isToday: isCurrentMonth && date === todayDate,
            isWeekend: weekday === 0 || weekday === 6,
            isHoliday: !!holidayName,
            holidayName,
            lunarDay: getLunarDay(date),
            isCurrentMonth: true
        })
    }

    // 填充下个月的日期
    const remainingDays = 42 - calendar.length // 6行 x 7列
    for (let date = 1; date <= remainingDays; date++) {
        calendar.push({
            date,
            isToday: false,
            isWeekend: false,
            isHoliday: false,
            isCurrentMonth: false
        })
    }

    return calendar
}

// 异步获取并更新日历数据（使用API）
export async function getMonthCalendarAsync(year: number, month: number): Promise<CalendarDay[]> {
    const calendar = getMonthCalendar(year, month)

    // 异步获取节假日和农历信息
    const promises = calendar.map(async (day) => {
        if (day.isCurrentMonth) {
            const date = new Date(year, month, day.date)

            // 获取节假日信息
            const holidayInfo = await holidayService.getHolidayInfo(date)
            if (holidayInfo) {
                day.isHoliday = holidayInfo.isHoliday
                day.holidayName = holidayInfo.name
            }

            // 获取农历信息
            const lunarInfo = await holidayService.getLunarInfo(date)
            if (lunarInfo) {
                day.lunarDay = lunarInfo.lunarDayName
            }
        }
        return day
    })

    return Promise.all(promises)
}

// 简化的农历日期获取（降级方案）
function getLunarDay(date: number): string {
    const lunarDate = (date + 10) % 30
    return lunarDays[lunarDate] || '初一'
}

// 获取月份名称
export function getMonthName(month: number, lang: 'zh' | 'en' = 'zh'): string {
    if (lang === 'en') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December']
        return months[month]
    }
    return `${month + 1}月`
}

// 获取星期名称
export function getWeekdayName(weekday: number, lang: 'zh' | 'en' = 'zh'): string {
    if (lang === 'en') {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return weekdays[weekday]
    }
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    return weekdays[weekday]
}
