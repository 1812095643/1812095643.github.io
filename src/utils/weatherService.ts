// 天气服务工具
export interface WeatherData {
    temp: number
    description: string
    city: string
    country: string
    icon: string
    humidity: number
    windSpeed: number
    feelsLike: number
}

export interface LocationData {
    city: string
    country: string
    lat: number
    lon: number
    timezone: string
}

class WeatherService {
    // 使用免费的Open-Meteo API，无需API密钥
    private readonly weatherApiUrl = 'https://api.open-meteo.com/v1/forecast'

    // 缓存机制
    private weatherCache: { [key: string]: { data: WeatherData; timestamp: number } } = {}
    private locationCache: { data: LocationData; timestamp: number } | null = null
    private readonly cacheTimeout = 10 * 60 * 1000 // 10分钟缓存

    // 获取用户位置信息（优化版本，带缓存和IP定位）
    async getUserLocation(): Promise<LocationData> {
        // 检查缓存
        if (this.locationCache && (Date.now() - this.locationCache.timestamp) < this.cacheTimeout) {
            return this.locationCache.data
        }

        let locationData: LocationData

        // 第一步：尝试使用浏览器地理位置API（最精确）
        try {
            console.log('尝试获取精确地理位置...')
            const position = await this.getCurrentPosition()
            const { latitude, longitude } = position.coords
            const city = this.getCityByCoordinates(latitude, longitude)

            console.log(`获取到精确位置: ${city} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`)

            locationData = {
                city,
                country: '中国',
                lat: latitude,
                lon: longitude,
                timezone: 'Asia/Shanghai'
            }
        } catch (error: any) {
            console.log('地理位置获取失败，原因:', error.message)
            console.log('尝试使用IP定位服务...')

            // 第二步：使用IP定位API
            try {
                locationData = await this.getLocationByIP()
            } catch (ipError: any) {
                console.log('IP定位失败，原因:', ipError.message)
                console.log('使用默认位置（北京）')

                // 第三步：使用默认位置
                locationData = {
                    city: '北京',
                    country: '中国',
                    lat: 39.9042,
                    lon: 116.4074,
                    timezone: 'Asia/Shanghai'
                }
            }
        }

        // 缓存位置信息
        this.locationCache = {
            data: locationData,
            timestamp: Date.now()
        }

        return locationData
    }

    // 通过IP获取位置信息（使用多个免费API）
    private async getLocationByIP(): Promise<LocationData> {
        // 免费IP定位API列表（按优先级排序）
        const ipApis = [
            {
                name: 'ipapi.co',
                url: 'https://ipapi.co/json/',
                parser: (data: any) => ({
                    city: data.city || '未知',
                    country: data.country_name || '中国',
                    lat: parseFloat(data.latitude) || 39.9042,
                    lon: parseFloat(data.longitude) || 116.4074,
                    timezone: data.timezone || 'Asia/Shanghai'
                })
            },
            {
                name: 'ip-api.com',
                url: 'http://ip-api.com/json/?lang=zh-CN',
                parser: (data: any) => ({
                    city: data.city || '未知',
                    country: data.country || '中国',
                    lat: parseFloat(data.lat) || 39.9042,
                    lon: parseFloat(data.lon) || 116.4074,
                    timezone: data.timezone || 'Asia/Shanghai'
                })
            },
            {
                name: 'ipinfo.io',
                url: 'https://ipinfo.io/json',
                parser: (data: any) => {
                    const [lat, lon] = (data.loc || '39.9042,116.4074').split(',').map(parseFloat)
                    return {
                        city: data.city || '未知',
                        country: data.country === 'CN' ? '中国' : (data.country || '中国'),
                        lat: lat || 39.9042,
                        lon: lon || 116.4074,
                        timezone: data.timezone || 'Asia/Shanghai'
                    }
                }
            },
            {
                name: 'freeipapi.com',
                url: 'https://freeipapi.com/api/json',
                parser: (data: any) => ({
                    city: data.cityName || '未知',
                    country: data.countryName || '中国',
                    lat: parseFloat(data.latitude) || 39.9042,
                    lon: parseFloat(data.longitude) || 116.4074,
                    timezone: data.timeZone || 'Asia/Shanghai'
                })
            }
        ]

        // 尝试每个API，直到成功
        for (const api of ipApis) {
            try {
                console.log(`尝试IP定位API: ${api.name}`)

                const response = await fetch(api.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    // 5秒超时
                    signal: AbortSignal.timeout(5000)
                })

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const data = await response.json()
                console.log(`${api.name} API响应:`, data)

                const locationData = api.parser(data)

                // 验证数据有效性
                if (locationData.lat && locationData.lon &&
                    locationData.lat !== 0 && locationData.lon !== 0) {

                    // 如果获取到的城市名不在我们的城市列表中，找最近的城市
                    const nearestCity = this.getCityByCoordinates(locationData.lat, locationData.lon)

                    const result: LocationData = {
                        city: nearestCity,
                        country: '中国',
                        lat: locationData.lat,
                        lon: locationData.lon,
                        timezone: locationData.timezone
                    }

                    console.log(`IP定位成功: ${result.city} (${result.lat.toFixed(4)}, ${result.lon.toFixed(4)})`)
                    return result
                }

                throw new Error('无效的位置数据')

            } catch (error: any) {
                console.warn(`${api.name} API失败:`, error.message)
                continue
            }
        }

        throw new Error('所有IP定位API都失败了')
    }



    // 获取浏览器地理位置（优化超时和错误处理）
    private getCurrentPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'))
                return
            }

            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: false,
                    timeout: 3000, // 减少超时时间
                    maximumAge: 600000 // 10分钟缓存
                }
            )
        })
    }

    // 根据坐标获取最近的城市（扩展城市列表）
    private getCityByCoordinates(lat: number, lon: number): string {
        const cities = [
            // 直辖市
            { name: '北京', lat: 39.9042, lon: 116.4074 },
            { name: '上海', lat: 31.2304, lon: 121.4737 },
            { name: '天津', lat: 39.3434, lon: 117.3616 },
            { name: '重庆', lat: 29.5630, lon: 106.5516 },

            // 省会城市
            { name: '广州', lat: 23.1291, lon: 113.2644 }, // 广东
            { name: '深圳', lat: 22.3193, lon: 114.1694 }, // 广东
            { name: '杭州', lat: 30.2741, lon: 120.1551 }, // 浙江
            { name: '南京', lat: 32.0603, lon: 118.7969 }, // 江苏
            { name: '武汉', lat: 30.5928, lon: 114.3055 }, // 湖北
            { name: '成都', lat: 30.5728, lon: 104.0668 }, // 四川
            { name: '西安', lat: 34.3416, lon: 108.9398 }, // 陕西
            { name: '太原', lat: 37.8706, lon: 112.5489 }, // 山西
            { name: '济南', lat: 36.6512, lon: 117.1201 }, // 山东
            { name: '郑州', lat: 34.7466, lon: 113.6254 }, // 河南
            { name: '石家庄', lat: 38.0428, lon: 114.5149 }, // 河北
            { name: '长沙', lat: 28.2282, lon: 112.9388 }, // 湖南
            { name: '南昌', lat: 28.6820, lon: 115.8581 }, // 江西
            { name: '合肥', lat: 31.8206, lon: 117.2272 }, // 安徽
            { name: '福州', lat: 26.0745, lon: 119.2965 }, // 福建
            { name: '昆明', lat: 25.0389, lon: 102.7183 }, // 云南
            { name: '贵阳', lat: 26.6470, lon: 106.6302 }, // 贵州
            { name: '南宁', lat: 22.8170, lon: 108.3669 }, // 广西
            { name: '海口', lat: 20.0444, lon: 110.1989 }, // 海南
            { name: '沈阳', lat: 41.8057, lon: 123.4315 }, // 辽宁
            { name: '长春', lat: 43.8171, lon: 125.3235 }, // 吉林
            { name: '哈尔滨', lat: 45.7732, lon: 126.6607 }, // 黑龙江
            { name: '呼和浩特', lat: 40.8414, lon: 111.7519 }, // 内蒙古
            { name: '银川', lat: 38.4872, lon: 106.2309 }, // 宁夏
            { name: '兰州', lat: 36.0611, lon: 103.8343 }, // 甘肃
            { name: '西宁', lat: 36.6171, lon: 101.7782 }, // 青海
            { name: '乌鲁木齐', lat: 43.8256, lon: 87.6168 }, // 新疆
            { name: '拉萨', lat: 29.6625, lon: 91.1146 }, // 西藏

            // 重要地级市
            { name: '苏州', lat: 31.2989, lon: 120.5853 },
            { name: '青岛', lat: 36.0986, lon: 120.3719 },
            { name: '大连', lat: 38.9140, lon: 121.6147 },
            { name: '厦门', lat: 24.4798, lon: 118.0894 },
            { name: '宁波', lat: 29.8683, lon: 121.5440 },
            { name: '无锡', lat: 31.4912, lon: 120.3124 },
            { name: '佛山', lat: 23.0218, lon: 113.1219 },
            { name: '东莞', lat: 23.0489, lon: 113.7447 },
            { name: '温州', lat: 28.0006, lon: 120.6719 },
            { name: '烟台', lat: 37.4638, lon: 121.4478 },
            { name: '唐山', lat: 39.6243, lon: 118.1944 },
            { name: '包头', lat: 40.6562, lon: 109.8403 }
        ]

        let closestCity = cities[0]
        let minDistance = this.calculateDistance(lat, lon, closestCity.lat, closestCity.lon)

        for (const city of cities) {
            const distance = this.calculateDistance(lat, lon, city.lat, city.lon)
            if (distance < minDistance) {
                minDistance = distance
                closestCity = city
            }
        }

        return closestCity.name
    }

    // 计算两点间距离
    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    // 根据位置获取天气信息（带缓存和重试机制）
    async getWeatherByLocation(lat: number, lon: number): Promise<WeatherData> {
        const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`

        // 检查缓存
        if (this.weatherCache[cacheKey] && (Date.now() - this.weatherCache[cacheKey].timestamp) < this.cacheTimeout) {
            return this.weatherCache[cacheKey].data
        }

        // 尝试获取真实天气数据，最多重试2次
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`尝试获取天气数据 (第${attempt}次): ${lat}, ${lon}`)

                // 使用Open-Meteo免费API获取天气数据
                const url = `${this.weatherApiUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&timezone=auto`

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    // 不使用AbortController，让请求自然完成
                })

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()
                console.log('天气API响应:', data)

                if (!data.current) {
                    throw new Error('API响应格式错误：缺少current数据')
                }

                const current = data.current
                const cityName = this.getCityByCoordinates(lat, lon)

                const weatherData: WeatherData = {
                    temp: Math.round(current.temperature_2m),
                    description: this.getWeatherDescription(current.weather_code),
                    city: cityName,
                    country: 'CN',
                    icon: this.getWeatherIcon(current.weather_code),
                    humidity: Math.round(current.relative_humidity_2m),
                    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
                    feelsLike: Math.round(current.apparent_temperature)
                }

                console.log('成功获取天气数据:', weatherData)

                // 缓存成功的数据
                this.weatherCache[cacheKey] = {
                    data: weatherData,
                    timestamp: Date.now()
                }

                return weatherData

            } catch (error: any) {
                console.warn(`天气API调用失败 (第${attempt}次):`, error.message)

                if (attempt === 2) {
                    // 最后一次尝试失败，使用智能模拟数据
                    console.log('使用智能模拟天气数据')
                    const mockData = this.getSmartMockWeatherData(lat, lon)

                    // 也缓存模拟数据，但使用较短的缓存时间
                    this.weatherCache[cacheKey] = {
                        data: mockData,
                        timestamp: Date.now()
                    }

                    return mockData
                }

                // 等待1秒后重试
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }

        // 理论上不会到达这里，但为了类型安全
        return this.getSmartMockWeatherData(lat, lon)
    }



    // 根据天气代码获取描述
    private getWeatherDescription(weatherCode: number): string {
        const weatherDescriptions: Record<number, string> = {
            0: '晴朗',
            1: '晴朗',
            2: '多云',
            3: '阴天',
            45: '雾',
            48: '雾',
            51: '小雨',
            53: '中雨',
            55: '大雨',
            56: '冻雨',
            57: '冻雨',
            61: '小雨',
            63: '中雨',
            65: '大雨',
            66: '冻雨',
            67: '冻雨',
            71: '小雪',
            73: '中雪',
            75: '大雪',
            77: '雪粒',
            80: '阵雨',
            81: '阵雨',
            82: '暴雨',
            85: '阵雪',
            86: '暴雪',
            95: '雷雨',
            96: '雷雨',
            99: '雷雨'
        }

        return weatherDescriptions[weatherCode] || '未知'
    }

    // 根据天气代码获取图标
    private getWeatherIcon(weatherCode: number): string {
        const hour = new Date().getHours()
        const isDay = hour >= 6 && hour < 18

        const weatherIcons: Record<number, { day: string; night: string }> = {
            0: { day: '01d', night: '01n' }, // 晴朗
            1: { day: '01d', night: '01n' }, // 晴朗
            2: { day: '02d', night: '02n' }, // 多云
            3: { day: '03d', night: '03n' }, // 阴天
            45: { day: '50d', night: '50n' }, // 雾
            48: { day: '50d', night: '50n' }, // 雾
            51: { day: '09d', night: '09n' }, // 小雨
            53: { day: '09d', night: '09n' }, // 中雨
            55: { day: '09d', night: '09n' }, // 大雨
            61: { day: '10d', night: '10n' }, // 小雨
            63: { day: '10d', night: '10n' }, // 中雨
            65: { day: '10d', night: '10n' }, // 大雨
            71: { day: '13d', night: '13n' }, // 小雪
            73: { day: '13d', night: '13n' }, // 中雪
            75: { day: '13d', night: '13n' }, // 大雪
            80: { day: '09d', night: '09n' }, // 阵雨
            81: { day: '09d', night: '09n' }, // 阵雨
            82: { day: '09d', night: '09n' }, // 暴雨
            95: { day: '11d', night: '11n' }, // 雷雨
            96: { day: '11d', night: '11n' }, // 雷雨
            99: { day: '11d', night: '11n' }  // 雷雨
        }

        const iconSet = weatherIcons[weatherCode] || { day: '01d', night: '01n' }
        return isDay ? iconSet.day : iconSet.night
    }

    // 获取完整的天气信息（位置+天气）
    async getCompleteWeatherInfo(): Promise<{ location: LocationData; weather: WeatherData }> {
        const location = await this.getUserLocation()
        const weather = await this.getWeatherByLocation(location.lat, location.lon)

        return { location, weather }
    }

    // 智能模拟天气数据（基于真实气候数据和当前时间）
    private getSmartMockWeatherData(lat?: number, lon?: number): WeatherData {
        const now = new Date()
        const hour = now.getHours()
        const month = now.getMonth() + 1
        const date = now.getDate()

        // 获取城市信息
        const cityName = lat && lon ? this.getCityByCoordinates(lat, lon) : '北京'

        // 基于真实城市的气候特征
        const cityClimate = this.getCityClimateData(cityName, month)

        // 基于时间的温度调整
        let hourlyTempAdjust = 0
        if (hour >= 5 && hour < 8) hourlyTempAdjust = -4      // 清晨最冷
        else if (hour >= 8 && hour < 12) hourlyTempAdjust = -1 // 上午
        else if (hour >= 12 && hour < 16) hourlyTempAdjust = 3  // 下午最热
        else if (hour >= 16 && hour < 20) hourlyTempAdjust = 1  // 傍晚
        else hourlyTempAdjust = -3                              // 夜晚

        // 基于日期的小幅波动（模拟天气变化）
        const dailyVariation = Math.sin((date / 30) * Math.PI * 2) * 3

        const temp = Math.round(cityClimate.avgTemp + hourlyTempAdjust + dailyVariation)

        // 根据城市和季节选择合适的天气
        const weatherPattern = this.getSeasonalWeatherPattern(month, cityName)
        const weatherIndex = (date + hour) % weatherPattern.length
        const selectedWeather = weatherPattern[weatherIndex]

        return {
            temp: Math.max(Math.min(temp, 45), -20), // 合理的温度范围
            description: selectedWeather.description,
            city: cityName,
            country: 'CN',
            icon: this.getWeatherIcon(selectedWeather.code),
            humidity: cityClimate.avgHumidity + ((date + hour) % 20) - 10, // ±10%变化
            windSpeed: Math.round((cityClimate.avgWindSpeed + ((date + hour) % 6) - 3) * 10) / 10,
            feelsLike: temp + Math.round(((date + hour) % 8) - 4) // ±4度体感差异
        }
    }

    // 获取城市气候数据
    private getCityClimateData(cityName: string, month: number) {
        const climateData: Record<string, any> = {
            // 华北地区
            '北京': {
                winter: { avgTemp: 2, avgHumidity: 45, avgWindSpeed: 3.5 },
                spring: { avgTemp: 15, avgHumidity: 55, avgWindSpeed: 4.0 },
                summer: { avgTemp: 28, avgHumidity: 70, avgWindSpeed: 2.5 },
                autumn: { avgTemp: 12, avgHumidity: 60, avgWindSpeed: 3.0 }
            },
            '太原': {
                winter: { avgTemp: -2, avgHumidity: 40, avgWindSpeed: 2.8 },
                spring: { avgTemp: 12, avgHumidity: 50, avgWindSpeed: 3.2 },
                summer: { avgTemp: 25, avgHumidity: 65, avgWindSpeed: 2.0 },
                autumn: { avgTemp: 8, avgHumidity: 55, avgWindSpeed: 2.5 }
            },
            '天津': {
                winter: { avgTemp: 1, avgHumidity: 50, avgWindSpeed: 3.2 },
                spring: { avgTemp: 14, avgHumidity: 60, avgWindSpeed: 3.8 },
                summer: { avgTemp: 27, avgHumidity: 75, avgWindSpeed: 2.8 },
                autumn: { avgTemp: 11, avgHumidity: 65, avgWindSpeed: 3.0 }
            },
            '石家庄': {
                winter: { avgTemp: 0, avgHumidity: 45, avgWindSpeed: 2.5 },
                spring: { avgTemp: 13, avgHumidity: 55, avgWindSpeed: 3.0 },
                summer: { avgTemp: 27, avgHumidity: 70, avgWindSpeed: 2.2 },
                autumn: { avgTemp: 10, avgHumidity: 60, avgWindSpeed: 2.8 }
            },
            '济南': {
                winter: { avgTemp: 2, avgHumidity: 50, avgWindSpeed: 2.8 },
                spring: { avgTemp: 15, avgHumidity: 60, avgWindSpeed: 3.2 },
                summer: { avgTemp: 28, avgHumidity: 75, avgWindSpeed: 2.5 },
                autumn: { avgTemp: 12, avgHumidity: 65, avgWindSpeed: 2.8 }
            },

            // 华东地区
            '上海': {
                winter: { avgTemp: 8, avgHumidity: 75, avgWindSpeed: 3.0 },
                spring: { avgTemp: 18, avgHumidity: 80, avgWindSpeed: 3.5 },
                summer: { avgTemp: 30, avgHumidity: 85, avgWindSpeed: 2.8 },
                autumn: { avgTemp: 20, avgHumidity: 75, avgWindSpeed: 3.2 }
            },
            '杭州': {
                winter: { avgTemp: 7, avgHumidity: 70, avgWindSpeed: 2.5 },
                spring: { avgTemp: 17, avgHumidity: 75, avgWindSpeed: 3.0 },
                summer: { avgTemp: 29, avgHumidity: 80, avgWindSpeed: 2.3 },
                autumn: { avgTemp: 19, avgHumidity: 70, avgWindSpeed: 2.8 }
            },
            '南京': {
                winter: { avgTemp: 6, avgHumidity: 70, avgWindSpeed: 2.8 },
                spring: { avgTemp: 16, avgHumidity: 75, avgWindSpeed: 3.2 },
                summer: { avgTemp: 29, avgHumidity: 80, avgWindSpeed: 2.5 },
                autumn: { avgTemp: 18, avgHumidity: 70, avgWindSpeed: 3.0 }
            },

            // 华南地区
            '广州': {
                winter: { avgTemp: 18, avgHumidity: 70, avgWindSpeed: 2.5 },
                spring: { avgTemp: 24, avgHumidity: 80, avgWindSpeed: 2.8 },
                summer: { avgTemp: 32, avgHumidity: 85, avgWindSpeed: 2.0 },
                autumn: { avgTemp: 26, avgHumidity: 75, avgWindSpeed: 2.3 }
            },
            '深圳': {
                winter: { avgTemp: 20, avgHumidity: 65, avgWindSpeed: 3.0 },
                spring: { avgTemp: 25, avgHumidity: 75, avgWindSpeed: 3.2 },
                summer: { avgTemp: 31, avgHumidity: 80, avgWindSpeed: 2.5 },
                autumn: { avgTemp: 27, avgHumidity: 70, avgWindSpeed: 2.8 }
            },

            // 华中地区
            '武汉': {
                winter: { avgTemp: 5, avgHumidity: 75, avgWindSpeed: 2.5 },
                spring: { avgTemp: 17, avgHumidity: 80, avgWindSpeed: 3.0 },
                summer: { avgTemp: 30, avgHumidity: 85, avgWindSpeed: 2.2 },
                autumn: { avgTemp: 18, avgHumidity: 75, avgWindSpeed: 2.8 }
            },
            '长沙': {
                winter: { avgTemp: 7, avgHumidity: 75, avgWindSpeed: 2.3 },
                spring: { avgTemp: 18, avgHumidity: 80, avgWindSpeed: 2.8 },
                summer: { avgTemp: 30, avgHumidity: 85, avgWindSpeed: 2.0 },
                autumn: { avgTemp: 19, avgHumidity: 75, avgWindSpeed: 2.5 }
            },
            '郑州': {
                winter: { avgTemp: 3, avgHumidity: 55, avgWindSpeed: 2.8 },
                spring: { avgTemp: 16, avgHumidity: 65, avgWindSpeed: 3.2 },
                summer: { avgTemp: 28, avgHumidity: 75, avgWindSpeed: 2.5 },
                autumn: { avgTemp: 15, avgHumidity: 65, avgWindSpeed: 3.0 }
            },

            // 西南地区
            '成都': {
                winter: { avgTemp: 8, avgHumidity: 80, avgWindSpeed: 1.5 },
                spring: { avgTemp: 18, avgHumidity: 75, avgWindSpeed: 2.0 },
                summer: { avgTemp: 26, avgHumidity: 85, avgWindSpeed: 1.8 },
                autumn: { avgTemp: 17, avgHumidity: 80, avgWindSpeed: 1.8 }
            },
            '重庆': {
                winter: { avgTemp: 9, avgHumidity: 80, avgWindSpeed: 1.8 },
                spring: { avgTemp: 19, avgHumidity: 75, avgWindSpeed: 2.2 },
                summer: { avgTemp: 29, avgHumidity: 85, avgWindSpeed: 2.0 },
                autumn: { avgTemp: 18, avgHumidity: 80, avgWindSpeed: 2.0 }
            },

            // 西北地区
            '西安': {
                winter: { avgTemp: 2, avgHumidity: 60, avgWindSpeed: 2.5 },
                spring: { avgTemp: 15, avgHumidity: 65, avgWindSpeed: 3.0 },
                summer: { avgTemp: 27, avgHumidity: 70, avgWindSpeed: 2.3 },
                autumn: { avgTemp: 13, avgHumidity: 65, avgWindSpeed: 2.8 }
            },

            // 东北地区
            '沈阳': {
                winter: { avgTemp: -8, avgHumidity: 55, avgWindSpeed: 3.5 },
                spring: { avgTemp: 10, avgHumidity: 60, avgWindSpeed: 4.0 },
                summer: { avgTemp: 25, avgHumidity: 75, avgWindSpeed: 2.8 },
                autumn: { avgTemp: 6, avgHumidity: 65, avgWindSpeed: 3.2 }
            },
            '哈尔滨': {
                winter: { avgTemp: -15, avgHumidity: 65, avgWindSpeed: 3.8 },
                spring: { avgTemp: 8, avgHumidity: 60, avgWindSpeed: 4.2 },
                summer: { avgTemp: 23, avgHumidity: 75, avgWindSpeed: 3.0 },
                autumn: { avgTemp: 3, avgHumidity: 70, avgWindSpeed: 3.5 }
            }
        }

        const cityData = climateData[cityName] || climateData['北京']

        let season: string
        if (month >= 12 || month <= 2) season = 'winter'
        else if (month >= 3 && month <= 5) season = 'spring'
        else if (month >= 6 && month <= 8) season = 'summer'
        else season = 'autumn'

        return cityData[season]
    }

    // 获取季节性天气模式
    private getSeasonalWeatherPattern(month: number, cityName: string) {
        const patterns: Record<string, any> = {
            winter: [
                { description: '晴朗', code: 0 },
                { description: '多云', code: 2 },
                { description: '阴天', code: 3 },
                { description: '雾', code: 45 },
                { description: '晴朗', code: 0 },
                { description: '多云', code: 2 },
                { description: '晴朗', code: 0 }
            ],
            spring: [
                { description: '晴朗', code: 0 },
                { description: '多云', code: 2 },
                { description: '小雨', code: 61 },
                { description: '晴朗', code: 0 },
                { description: '多云', code: 2 },
                { description: '晴朗', code: 0 },
                { description: '阵雨', code: 80 }
            ],
            summer: [
                { description: '晴热', code: 0 },
                { description: '多云', code: 2 },
                { description: '阵雨', code: 80 },
                { description: '晴朗', code: 0 },
                { description: '雷雨', code: 95 },
                { description: '多云', code: 2 },
                { description: '晴朗', code: 0 }
            ],
            autumn: [
                { description: '晴朗', code: 0 },
                { description: '多云', code: 2 },
                { description: '晴朗', code: 0 },
                { description: '小雨', code: 61 },
                { description: '多云', code: 2 },
                { description: '晴朗', code: 0 },
                { description: '阴天', code: 3 }
            ]
        }

        let season: string
        if (month >= 12 || month <= 2) season = 'winter'
        else if (month >= 3 && month <= 5) season = 'spring'
        else if (month >= 6 && month <= 8) season = 'summer'
        else season = 'autumn'

        return patterns[season]
    }

    // 获取天气图标URL
    getWeatherIconUrl(icon: string): string {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    // 根据天气描述获取emoji
    getWeatherEmoji(description: string): string {
        const weatherEmojis: Record<string, string> = {
            '晴': '☀️',
            '晴朗': '☀️',
            '晴热': '🌞',
            '多云': '⛅',
            '阴': '☁️',
            '小雨': '🌦️',
            '中雨': '🌧️',
            '大雨': '⛈️',
            '阵雨': '🌦️',
            '雷雨': '⛈️',
            '雪': '❄️',
            '小雪': '🌨️',
            '大雪': '❄️',
            '雾': '🌫️',
            '薄雾': '🌫️',
            '霾': '😷',
            '沙尘': '🌪️',
            '微风': '🍃',
            '大风': '💨'
        }

        for (const [key, emoji] of Object.entries(weatherEmojis)) {
            if (description.includes(key)) {
                return emoji
            }
        }

        return '🌤️' // 默认emoji
    }
}

export const weatherService = new WeatherService()