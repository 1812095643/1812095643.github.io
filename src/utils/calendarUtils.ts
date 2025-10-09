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

// 本地缓存的节假日数据（2025-2030年）
const fallbackHolidays: Record<string, string> = {
    // 2025年
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

    // 2026年
    '2026-01-01': '元旦',
    '2026-01-02': '元旦',
    '2026-02-16': '除夕',
    '2026-02-17': '春节',
    '2026-02-18': '春节',
    '2026-02-19': '春节',
    '2026-02-20': '春节',
    '2026-02-21': '春节',
    '2026-04-05': '清明节',
    '2026-04-06': '清明节',
    '2026-04-07': '清明节',
    '2026-05-01': '劳动节',
    '2026-05-02': '劳动节',
    '2026-05-03': '劳动节',
    '2026-06-19': '端午节',
    '2026-06-20': '端午节',
    '2026-06-21': '端午节',
    '2026-09-25': '中秋节',
    '2026-10-01': '国庆节',
    '2026-10-02': '国庆节',
    '2026-10-03': '国庆节',
    '2026-10-04': '国庆节',
    '2026-10-05': '国庆节',
    '2026-10-06': '国庆节',
    '2026-10-07': '国庆节',

    // 2027年
    '2027-01-01': '元旦',
    '2027-01-02': '元旦',
    '2027-01-03': '元旦',
    '2027-02-05': '除夕',
    '2027-02-06': '春节',
    '2027-02-07': '春节',
    '2027-02-08': '春节',
    '2027-02-09': '春节',
    '2027-02-10': '春节',
    '2027-04-05': '清明节',
    '2027-04-06': '清明节',
    '2027-04-07': '清明节',
    '2027-05-01': '劳动节',
    '2027-05-02': '劳动节',
    '2027-05-03': '劳动节',
    '2027-06-09': '端午节',
    '2027-06-10': '端午节',
    '2027-06-11': '端午节',
    '2027-09-15': '中秋节',
    '2027-10-01': '国庆节',
    '2027-10-02': '国庆节',
    '2027-10-03': '国庆节',
    '2027-10-04': '国庆节',
    '2027-10-05': '国庆节',
    '2027-10-06': '国庆节',
    '2027-10-07': '国庆节',

    // 2028年
    '2028-01-01': '元旦',
    '2028-01-02': '元旦',
    '2028-01-03': '元旦',
    '2028-01-25': '除夕',
    '2028-01-26': '春节',
    '2028-01-27': '春节',
    '2028-01-28': '春节',
    '2028-01-29': '春节',
    '2028-01-30': '春节',
    '2028-04-04': '清明节',
    '2028-04-05': '清明节',
    '2028-04-06': '清明节',
    '2028-05-01': '劳动节',
    '2028-05-02': '劳动节',
    '2028-05-03': '劳动节',
    '2028-05-26': '端午节',
    '2028-05-27': '端午节',
    '2028-05-28': '端午节',
    '2028-10-01': '国庆节',
    '2028-10-02': '国庆节',
    '2028-10-03': '国庆节',
    '2028-10-04': '国庆节',
    '2028-10-05': '国庆节',
    '2028-10-06': '国庆节',
    '2028-10-07': '国庆节',
    '2028-10-08': '中秋节',

    // 2029年
    '2029-01-01': '元旦',
    '2029-01-02': '元旦',
    '2029-02-12': '除夕',
    '2029-02-13': '春节',
    '2029-02-14': '春节',
    '2029-02-15': '春节',
    '2029-02-16': '春节',
    '2029-02-17': '春节',
    '2029-04-04': '清明节',
    '2029-04-05': '清明节',
    '2029-04-06': '清明节',
    '2029-05-01': '劳动节',
    '2029-05-02': '劳动节',
    '2029-05-03': '劳动节',
    '2029-06-15': '端午节',
    '2029-06-16': '端午节',
    '2029-06-17': '端午节',
    '2029-09-27': '中秋节',
    '2029-10-01': '国庆节',
    '2029-10-02': '国庆节',
    '2029-10-03': '国庆节',
    '2029-10-04': '国庆节',
    '2029-10-05': '国庆节',
    '2029-10-06': '国庆节',
    '2029-10-07': '国庆节',

    // 2030年
    '2030-01-01': '元旦',
    '2030-02-02': '除夕',
    '2030-02-03': '春节',
    '2030-02-04': '春节',
    '2030-02-05': '春节',
    '2030-02-06': '春节',
    '2030-02-07': '春节',
    '2030-04-05': '清明节',
    '2030-04-06': '清明节',
    '2030-04-07': '清明节',
    '2030-05-01': '劳动节',
    '2030-05-02': '劳动节',
    '2030-05-03': '劳动节',
    '2030-06-05': '端午节',
    '2030-06-06': '端午节',
    '2030-06-07': '端午节',
    '2030-09-16': '中秋节',
    '2030-10-01': '国庆节',
    '2030-10-02': '国庆节',
    '2030-10-03': '国庆节',
    '2030-10-04': '国庆节',
    '2030-10-05': '国庆节',
    '2030-10-06': '国庆节',
    '2030-10-07': '国庆节',
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
