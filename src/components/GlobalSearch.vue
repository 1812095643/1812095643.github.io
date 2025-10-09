<template>
  <Transition name="search-backdrop">
    <div v-if="isOpen" class="search-backdrop" @click="closeSearch">
      <div class="search-container" @click.stop>
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M16 16l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="search-input"
              :placeholder="isEnglish ? 'Search everything...' : '搜索全站内容...'"
              @input="handleSearch"
              @keydown.esc="closeSearch"
              @keydown.down.prevent="navigateResults(1)"
              @keydown.up.prevent="navigateResults(-1)"
              @keydown.enter="selectResult"
            />

            <button class="close-btn" @click="closeSearch" :title="isEnglish ? 'Close' : '关闭'">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <!-- 搜索提示 -->
          <div v-if="!searchQuery" class="search-hints">
            <span class="hint-item">
              <kbd>↑</kbd><kbd>↓</kbd> {{ isEnglish ? 'Navigate' : '导航' }}
            </span>
            <span class="hint-item">
              <kbd>Enter</kbd> {{ isEnglish ? 'Select' : '选择' }}
            </span>
            <span class="hint-item">
              <kbd>Esc</kbd> {{ isEnglish ? 'Close' : '关闭' }}
            </span>
          </div>

          <!-- 搜索历史 -->
          <div v-if="!searchQuery && searchHistory.length > 0" class="search-history">
            <div class="history-header">
              <span>{{ isEnglish ? 'Recent Searches' : '最近搜索' }}</span>
              <button class="clear-all-history-btn" @click="clearAllHistory" :title="isEnglish ? 'Clear all' : '清空全部'">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ isEnglish ? 'Clear All' : '清空全部' }}
              </button>
            </div>
            <div class="history-items">
              <button
                v-for="(item, index) in searchHistory"
                :key="index"
                class="history-item"
                @click="searchQuery = item"
              >
                <svg class="history-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="history-text">{{ item }}</span>
                <button 
                  class="remove-history-btn" 
                  @click.stop="removeHistory(index)"
                  :title="isEnglish ? 'Remove' : '删除'"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </button>
            </div>
          </div>
        </div>

        <!-- 搜索结果 -->
        <CustomScrollbar v-if="searchQuery" class="search-results">
          <div v-if="isSearching" class="search-loading">
            <div class="loading-spinner"></div>
            <span>{{ isEnglish ? 'Searching...' : '搜索中...' }}</span>
          </div>

          <div v-else-if="filteredResults.length === 0" class="no-results">
            <svg class="no-results-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M16 16l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>{{ isEnglish ? 'No results found' : '未找到站内相关结果' }}</p>
            <p class="no-results-hint">{{ isEnglish ? 'Try searching external resources' : '试试搜索站外资源' }}</p>
            
            <!-- AI 搜索建议 -->
            <div v-if="aiSuggestion" class="ai-suggestion-box">
              <div class="ai-suggestion-header">
                <svg class="ai-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <span>AI 建议</span>
              </div>
              <p class="ai-suggestion-text">{{ aiSuggestion }}</p>
            </div>
            
            <!-- 外部搜索引擎 - 重新设计 -->
            <div class="external-search">
              <div class="external-search-header">
                <svg class="external-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
                <span class="external-title">{{ isEnglish ? 'Try searching with these engines' : '试试使用这些搜索引擎' }}</span>
              </div>
              
              <div class="search-engines-compact">
                <a :href="getSearchUrl('google')" target="_blank" rel="noopener noreferrer" class="engine-btn google" title="Google">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </a>
                <a :href="getSearchUrl('baidu')" target="_blank" rel="noopener noreferrer" class="engine-btn baidu" title="百度">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#2932E1"/>
                  </svg>
                  <span>百度</span>
                </a>
                <a :href="getSearchUrl('bing')" target="_blank" rel="noopener noreferrer" class="engine-btn bing" title="Bing">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 3v18l4-2 8 4V5l-8 4-4-6z" fill="#008373"/>
                  </svg>
                  <span>Bing</span>
                </a>
                <a :href="getSearchUrl('360')" target="_blank" rel="noopener noreferrer" class="engine-btn so360" title="360搜索">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#2ECC71"/>
                  </svg>
                  <span>360</span>
                </a>
                <a :href="getSearchUrl('sogou')" target="_blank" rel="noopener noreferrer" class="engine-btn sogou" title="搜狗">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#FF6B35"/>
                  </svg>
                  <span>搜狗</span>
                </a>
                <a :href="getSearchUrl('duckduckgo')" target="_blank" rel="noopener noreferrer" class="engine-btn duckduckgo" title="DuckDuckGo">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#DE5833"/>
                  </svg>
                  <span>DDG</span>
                </a>
              </div>
            </div>
          </div>

          <div v-else class="results-list">
            <div class="results-header">
              <span class="results-count">{{ filteredResults.length }} {{ isEnglish ? 'results' : '个结果' }}</span>
              <span class="search-time">{{ searchTime }}ms</span>
            </div>
            
            <div
              v-for="(result, index) in filteredResults"
              :key="result.id"
              :class="['result-item', { active: selectedIndex === index }]"
              @click="goToResult(result)"
              @mouseenter="selectedIndex = index"
            >
              <div class="result-icon">{{ result.icon }}</div>
              <div class="result-content">
                <div class="result-title" v-html="highlightText(result.title)"></div>
                <div class="result-description" v-html="highlightText(result.description)"></div>
                <div class="result-meta">
                  <span class="result-type">{{ result.type }}</span>
                  <span v-if="result.date" class="result-date">{{ result.date }}</span>
                </div>
              </div>
              <div class="result-arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </CustomScrollbar>


      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import CustomScrollbar from './CustomScrollbar.vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import pinyin from 'pinyin'
import { searchService, type SearchItem } from '../utils/searchService'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const { currentLanguage } = useI18n()
const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)
const isSearching = ref(false)
const searchTime = ref(0)
const isEnglish = computed(() => currentLanguage.value === 'en')
const searchHistory = ref<string[]>([])
const maxHistoryItems = 5
const aiSuggestion = ref('')

// 搜索数据源
const searchData = ref<SearchItem[]>([])

// Fuse.js 配置
const fuseOptions = {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true
}

const fuse = computed(() => new Fuse(searchData.value, fuseOptions))

// 智能搜索结果 - 同时使用所有搜索模式
const filteredResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.trim().toLowerCase()
  const resultsMap = new Map<string, { item: SearchItem; score: number }>()
  
  // 1. 普通搜索 - 精确匹配得分最高
  searchData.value.forEach(item => {
    if (item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)) {
      const score = calculateRelevance(item, query) + 10 // 精确匹配加分
      resultsMap.set(item.id, { item, score })
    }
  })
  
  // 2. 拼音搜索 - 支持中文拼音输入
  searchData.value.forEach(item => {
    const titlePinyin = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).flat().join('')
    const descPinyin = pinyin(item.description, { style: pinyin.STYLE_NORMAL }).flat().join('')
    
    if (titlePinyin.includes(query) || descPinyin.includes(query)) {
      const existing = resultsMap.get(item.id)
      const score = calculateRelevance(item, query) + 5 // 拼音匹配加分
      if (!existing || existing.score < score) {
        resultsMap.set(item.id, { item, score })
      }
    }
  })
  
  // 3. 模糊搜索 - 容错匹配
  const fuseResults = fuse.value.search(query)
  fuseResults.forEach(result => {
    const existing = resultsMap.get(result.item.id)
    const score = (1 - (result.score || 0)) * 10 // Fuse.js 分数转换
    if (!existing || existing.score < score) {
      resultsMap.set(result.item.id, { item: result.item, score })
    }
  })
  
  // 4. 标签匹配 - AI 语义理解
  const keywords = query.split(/\s+/)
  searchData.value.forEach(item => {
    if (item.tags?.some(tag => keywords.some(kw => tag.toLowerCase().includes(kw)))) {
      const existing = resultsMap.get(item.id)
      const score = calculateRelevance(item, query) + 3 // 标签匹配加分
      if (!existing || existing.score < score) {
        resultsMap.set(item.id, { item, score })
      }
    }
  })
  
  // 按相关性得分排序
  return Array.from(resultsMap.values())
    .sort((a, b) => b.score - a.score)
    .map(r => r.item)
})

// 计算相关性得分
function calculateRelevance(item: SearchItem, query: string): number {
  let score = 0
  const lowerQuery = query.toLowerCase()
  
  if (item.title.toLowerCase().includes(lowerQuery)) score += 10
  if (item.description.toLowerCase().includes(lowerQuery)) score += 5
  if (item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 3
  
  return score
}

// 高亮搜索关键词
function highlightText(text: string): string {
  if (!searchQuery.value.trim()) return text
  
  const query = searchQuery.value.trim()
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}



// 搜索防抖定时器
let searchDebounceTimer: number | null = null

// 处理搜索
function handleSearch() {
  // 清除之前的定时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  
  isSearching.value = true
  aiSuggestion.value = ''
  const startTime = performance.now()
  
  // 防抖处理
  searchDebounceTimer = window.setTimeout(async () => {
    searchTime.value = Math.round(performance.now() - startTime)
    isSearching.value = false
    selectedIndex.value = 0
    
    // 如果没有结果，调用 AI 获取建议
    if (filteredResults.value.length === 0 && searchQuery.value.trim()) {
      await getAISuggestion()
    }
  }, 150)
}

// 调用 DeepSeek AI 获取搜索建议
async function getAISuggestion() {
  try {
    // 使用与 AI Pet 相同的 API Key 配置
    const RUNTIME_ENV: any = (typeof window !== 'undefined' && (window as any).ENV) ? (window as any).ENV : {}
    const apiKey = RUNTIME_ENV.DEEPSEEK_API_KEY || import.meta.env.VITE_DEEPSEEK_API_KEY
    
    if (!apiKey) {
      console.warn('DeepSeek API Key 未配置')
      useFallbackSuggestion()
      return
    }
    
    // 尝试多个端点
    const endpoints = [
      '/deepseek/v1/chat/completions',
      'https://api.deepseek.com/v1/chat/completions'
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: '你是一个搜索助手，用户在个人博客网站搜索内容但没有找到结果。请根据用户的搜索关键词，用一句话（不超过30字）给出简短的搜索建议或相关提示。'
              },
              {
                role: 'user',
                content: `用户搜索了："${searchQuery.value}"，但没有找到站内结果。请给出搜索建议。`
              }
            ],
            max_tokens: 100,
            temperature: 0.7
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          aiSuggestion.value = data.choices[0]?.message?.content || ''
          return
        }
      } catch (err) {
        console.warn(`端点 ${endpoint} 失败:`, err)
        continue
      }
    }
    
    // 所有端点都失败，使用本地建议
    useFallbackSuggestion()
  } catch (error) {
    console.warn('AI 建议获取失败:', error)
    useFallbackSuggestion()
  }
}

// 使用本地备用建议
function useFallbackSuggestion() {
  const suggestions = [
    '试试使用更具体的关键词',
    '可以尝试搜索相关的技术栈或工具',
    '建议查看项目作品或博客文章',
    '试试使用拼音或英文关键词'
  ]
  aiSuggestion.value = suggestions[Math.floor(Math.random() * suggestions.length)]
}

// 搜索查询优化 - 过滤广告关键词和优化搜索词
function optimizeSearchQuery(query: string): string {
  let optimized = query.trim()
  
  // 移除常见的广告关键词
  const adKeywords = ['广告', '推广', 'AD', 'ad', '赞助', 'sponsor']
  adKeywords.forEach(keyword => {
    optimized = optimized.replace(new RegExp(keyword, 'gi'), '')
  })
  
  // 移除多余空格
  optimized = optimized.replace(/\s+/g, ' ').trim()
  
  // 添加站点限定（可选）
  // optimized = `site:yourdomain.com ${optimized}`
  
  return optimized
}

// 获取搜索引擎 URL（带优化和广告过滤）
function getSearchUrl(engine: string): string {
  const optimizedQuery = optimizeSearchQuery(searchQuery.value)
  const encodedQuery = encodeURIComponent(optimizedQuery)
  
  const engines: Record<string, string> = {
    google: `https://www.google.com/search?q=${encodedQuery}&filter=1`, // filter=1 启用安全搜索
    baidu: `https://www.baidu.com/s?wd=${encodedQuery}&rn=50`, // rn=50 显示更多结果
    bing: `https://www.bing.com/search?q=${encodedQuery}&filters=ex1:"ez1"`, // 过滤广告
    '360': `https://www.so.com/s?q=${encodedQuery}`,
    sogou: `https://www.sogou.com/web?query=${encodedQuery}`,
    duckduckgo: `https://duckduckgo.com/?q=${encodedQuery}&kp=1` // kp=1 启用隐私保护
  }
  
  return engines[engine] || engines.google
}

// 导航结果
function navigateResults(direction: number) {
  const newIndex = selectedIndex.value + direction
  if (newIndex >= 0 && newIndex < filteredResults.value.length) {
    selectedIndex.value = newIndex
  }
}

// 选择结果
function selectResult() {
  if (filteredResults.value[selectedIndex.value]) {
    goToResult(filteredResults.value[selectedIndex.value])
  }
}

// 跳转到结果
function goToResult(result: SearchItem) {
  // 保存搜索历史
  if (searchQuery.value.trim()) {
    addToHistory(searchQuery.value.trim())
  }
  
  // 跳转到页面
  router.push(result.route)
  closeSearch()
  
  // 等待页面加载后滚动到对应位置
  setTimeout(() => {
    scrollToTarget(result)
  }, 1000)
}

// 模拟真人操作滚动到目标位置
function scrollToTarget(result: SearchItem) {
  // 根据结果类型查找对应的元素
  let targetElement: HTMLElement | null = null
  
  // 工具页面 - 查找对应的工具卡片（更精确的匹配）
  if (result.type === '工具') {
    const toolCards = document.querySelectorAll('.tool-list-item .item, .magical.item')
    toolCards.forEach((card) => {
      const titleElement = card.querySelector('.name, .title, .card-left .title .name')
      const descElement = card.querySelector('.desc, .card-text')
      const titleText = titleElement?.textContent?.trim() || ''
      const descText = descElement?.textContent?.trim() || ''
      
      // 匹配标题或描述
      if ((titleText && result.title.includes(titleText)) || 
          (titleText && titleText.includes(result.title)) ||
          (descText && result.description.includes(descText.substring(0, 20)))) {
        targetElement = card as HTMLElement
      }
    })
  }
  
  // 博客页面 - 查找对应的博客卡片
  if (result.type === '博客' || result.type === '文章') {
    const blogCards = document.querySelectorAll('.link-card-item, .magical.link-card-item, .blog-item')
    blogCards.forEach((card) => {
      const titleElement = card.querySelector('.info-title, .title, h3')
      const descElement = card.querySelector('.info-desc, .desc, .description')
      const titleText = titleElement?.textContent?.trim() || ''
      const descText = descElement?.textContent?.trim() || ''
      
      if ((titleText && result.title.includes(titleText)) || 
          (titleText && titleText.includes(result.title)) ||
          (descText && result.description.includes(descText.substring(0, 15)))) {
        targetElement = card as HTMLElement
      }
    })
  }
  
  // 项目页面 - 查找对应的项目卡片
  if (result.type === '项目') {
    const projectCards = document.querySelectorAll('.card-list .item, .work-card, .project-item')
    projectCards.forEach((card) => {
      const titleElement = card.querySelector('.title .name, .name, h3')
      const descElement = card.querySelector('.desc, .description')
      const titleText = titleElement?.textContent?.trim() || ''
      const descText = descElement?.textContent?.trim() || ''
      
      if ((titleText && result.title.includes(titleText)) || 
          (titleText && titleText.includes(result.title)) ||
          (descText && result.description.includes(descText.substring(0, 15)))) {
        targetElement = card as HTMLElement
      }
    })
  }
  
  // 书籍页面 - 查找对应的书籍卡片
  if (result.type === '书籍') {
    const bookCards = document.querySelectorAll('.book-item, .book-card, .magical.item')
    bookCards.forEach((card) => {
      const titleElement = card.querySelector('.b-one-title, .title, .name')
      const titleText = titleElement?.textContent?.trim() || ''
      
      if ((titleText && result.title.includes(titleText)) || 
          (titleText && titleText.includes(result.title))) {
        targetElement = card as HTMLElement
      }
    })
  }
  
  // 首页内容 - 查找技能卡片、技术栈等
  if (result.type === '首页') {
    // 查找技能卡片
    const skillCards = document.querySelectorAll('.power-card, .tech-item')
    skillCards.forEach((card) => {
      const titleElement = card.querySelector('.title, .tech-name, .card-text')
      const descElement = card.querySelector('.tech-desc, .desc')
      const titleText = titleElement?.textContent?.trim() || ''
      const descText = descElement?.textContent?.trim() || ''
      
      if ((titleText && result.title.includes(titleText)) || 
          (titleText && titleText.includes(result.title)) ||
          (descText && result.description.includes(descText.substring(0, 15)))) {
        targetElement = card as HTMLElement
      }
    })
    
    // 查找社交链接卡片
    if (!targetElement) {
      const linkCards = document.querySelectorAll('.link-card')
      linkCards.forEach((card) => {
        const titleElement = card.querySelector('.info-title')
        const descElement = card.querySelector('.info-desc')
        const titleText = titleElement?.textContent?.trim() || ''
        const descText = descElement?.textContent?.trim() || ''
        
        if ((titleText && result.title.includes(titleText)) || 
            (descText && result.description.includes(descText.substring(0, 15)))) {
          targetElement = card as HTMLElement
        }
      })
    }
  }
  
  // 关于页面 - 查找对应的内容区域
  if (result.type === '关于') {
    // 查找证书卡片
    const certCards = document.querySelectorAll('.certificate-card')
    certCards.forEach((card) => {
      const titleElement = card.querySelector('.certificate-title')
      const descElement = card.querySelector('.certificate-description')
      const titleText = titleElement?.textContent?.trim() || ''
      const descText = descElement?.textContent?.trim() || ''
      
      if ((titleText && result.title.includes(titleText)) || 
          (descText && result.description.includes(descText.substring(0, 15)))) {
        targetElement = card as HTMLElement
      }
    })
    
    // 查找经历项目
    if (!targetElement) {
      const experienceItems = document.querySelectorAll('.experience .item')
      experienceItems.forEach((item) => {
        const companyElement = item.querySelector('.company')
        const jobElement = item.querySelector('.job')
        const titleElements = item.querySelectorAll('.title')
        const companyText = companyElement?.textContent?.trim() || ''
        const jobText = jobElement?.textContent?.trim() || ''
        
        if ((companyText && result.title.includes(companyText)) || 
            (jobText && result.title.includes(jobText))) {
          targetElement = item as HTMLElement
        }
        
        // 检查项目标题
        titleElements.forEach((titleEl) => {
          const titleText = titleEl.textContent?.trim() || ''
          if (titleText && result.title.includes(titleText)) {
            targetElement = item as HTMLElement
          }
        })
      })
    }
    
    // 查找联系方式、简历等
    if (!targetElement) {
      if (result.title.includes('联系') || result.title.includes('邮箱') || result.title.includes('电话')) {
        targetElement = document.querySelector('.contact') as HTMLElement
      } else if (result.title.includes('简历')) {
        targetElement = document.querySelector('.resume') as HTMLElement
      } else if (result.title.includes('技能')) {
        targetElement = document.querySelector('.power') as HTMLElement
      }
    }
  }
  
  // 如果找到目标元素，平滑滚动过去
  if (targetElement) {
    // 计算目标位置（留出顶部导航栏的空间）
    const headerHeight = 100
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
    
    // 使用平滑滚动动画
    smoothScrollTo(targetPosition, 1000)
    
    // 高亮目标元素
    highlightElement(targetElement)
  } else {
    // 如果没找到具体元素，至少滚动到页面顶部
    smoothScrollTo(0, 600)
  }
}

// 平滑滚动到指定位置（模拟真人操作）
function smoothScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()
  
  function animation(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数（easeInOutCubic）
    const easing = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    window.scrollTo(0, startY + distance * easing)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }
  
  requestAnimationFrame(animation)
}

// 高亮目标元素
function highlightElement(element: HTMLElement) {
  // 添加高亮类
  element.classList.add('search-highlight')
  
  // 3秒后移除高亮
  setTimeout(() => {
    element.classList.remove('search-highlight')
  }, 3000)
}

// 添加到搜索历史
function addToHistory(query: string) {
  // 移除重复项
  const filtered = searchHistory.value.filter(item => item !== query)
  // 添加到开头
  searchHistory.value = [query, ...filtered].slice(0, maxHistoryItems)
  // 保存到 localStorage
  try {
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value))
  } catch (e) {
    console.warn('Failed to save search history:', e)
  }
}

// 加载搜索历史
function loadSearchHistory() {
  try {
    const saved = localStorage.getItem('search-history')
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch (e) {
    console.warn('Failed to load search history:', e)
  }
}

// 删除单个搜索历史
function removeHistory(index: number) {
  searchHistory.value.splice(index, 1)
  try {
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value))
  } catch (e) {
    console.warn('Failed to save search history:', e)
  }
}

// 清空所有搜索历史
function clearAllHistory() {
  searchHistory.value = []
  try {
    localStorage.removeItem('search-history')
  } catch (e) {
    console.warn('Failed to clear search history:', e)
  }
}

// 打开搜索
function openSearch() {
  isOpen.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

// 关闭搜索
function closeSearch() {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
}

// 键盘快捷键
function handleKeydown(e: KeyboardEvent) {
  // Ctrl/Cmd + K 打开搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
}

// 监听搜索查询变化
watch(searchQuery, () => {
  selectedIndex.value = 0
})

onMounted(async () => {
  // 初始化搜索服务
  await searchService.initialize()
  searchData.value = searchService.getSearchData()
  
  // 加载搜索历史
  loadSearchHistory()
  
  window.addEventListener('keydown', handleKeydown)
  // 监听全局搜索事件
  window.addEventListener('open-global-search', openSearch as EventListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('open-global-search', openSearch as EventListener)
})

// 暴露方法供外部调用
defineExpose({
  openSearch,
  closeSearch
})
</script>

<style scoped>
/* 搜索背景遮罩 */
.search-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 20px 20px;
  overflow-y: auto;
  animation: backdropFadeIn 0.3s ease;
}

@keyframes backdropFadeIn {
  from {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }
  to {
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
  }
}

.search-container {
  width: 100%;
  max-width: 680px;
  background: rgba(20, 20, 28, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(99, 102, 241, 0.1) inset,
              0 0 100px rgba(99, 102, 241, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  animation: searchSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.search-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(99, 102, 241, 0.5) 50%, 
    transparent
  );
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
}

@keyframes searchSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 搜索框 */
.search-box {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px 16px;
  transition: all 0.3s ease;
}

.search-input-wrapper:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.search-icon {
  width: 22px;
  height: 22px;
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

/* 搜索提示 */
.search-hints {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

kbd {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.7);
}

/* 搜索历史 */
.search-history {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.clear-all-history-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  color: rgba(239, 68, 68, 0.8);
  font-size: 11px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all-history-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
  transform: translateY(-1px);
}

.clear-all-history-btn svg {
  width: 12px;
  height: 12px;
}

.history-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 32px 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.5);
  color: #ffffff;
  transform: translateY(-2px);
}

.history-icon {
  width: 14px;
  height: 14px;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.history-item:hover .history-icon {
  color: #6366f1;
}

.history-text {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-history-btn {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  color: rgba(239, 68, 68, 0.6);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.history-item:hover .remove-history-btn {
  opacity: 1;
}

.remove-history-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
  transform: translateY(-50%) scale(1.1);
}

.remove-history-btn svg {
  width: 12px;
  height: 12px;
}

/* 搜索结果 */
.search-results {
  max-height: 500px;
  /* overflow由CustomScrollbar组件处理 */
}

.search-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: rgba(255, 255, 255, 0.6);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
}

.no-results p {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}

.no-results-hint {
  margin-top: 8px !important;
  font-size: 14px !important;
  color: rgba(255, 255, 255, 0.4) !important;
}

/* AI 建议框 */
.ai-suggestion-box {
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  max-width: 500px;
}

.ai-suggestion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.ai-icon {
  width: 16px;
  height: 16px;
  color: #6366f1;
}

.ai-suggestion-text {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 外部搜索引擎 - 紧凑设计 */
.external-search {
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
}

.external-search-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.external-icon {
  width: 16px;
  height: 16px;
  color: #6366f1;
  flex-shrink: 0;
}

.external-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.search-engines-compact {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.engine-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.engine-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.engine-btn:hover::before {
  opacity: 1;
}

.engine-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.engine-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.engine-btn span {
  position: relative;
  z-index: 1;
}

/* 各引擎特定样式 */
.engine-btn.google:hover {
  border-color: #4285F4;
  box-shadow: 0 4px 20px rgba(66, 133, 244, 0.3);
}

.engine-btn.baidu:hover {
  border-color: #2932E1;
  box-shadow: 0 4px 20px rgba(41, 50, 225, 0.3);
}

.engine-btn.bing:hover {
  border-color: #008373;
  box-shadow: 0 4px 20px rgba(0, 131, 115, 0.3);
}

.engine-btn.so360:hover {
  border-color: #2ECC71;
  box-shadow: 0 4px 20px rgba(46, 204, 113, 0.3);
}

.engine-btn.sogou:hover {
  border-color: #FF6B35;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
}

.engine-btn.duckduckgo:hover {
  border-color: #DE5833;
  box-shadow: 0 4px 20px rgba(222, 88, 51, 0.3);
}

.results-list {
  padding: 12px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.results-count {
  font-weight: 600;
}

.search-time {
  color: rgba(255, 255, 255, 0.3);
}

.result-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
}

.result-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.result-item:hover,
.result-item.active {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(6px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
}

.result-item:hover::before,
.result-item.active::before {
  transform: scaleY(1);
}

.result-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border-radius: 10px;
  font-size: 20px;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.result-icon::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  opacity: 0;
  z-index: -1;
  filter: blur(8px);
  transition: opacity 0.3s ease;
}

.result-item:hover .result-icon,
.result-item.active .result-icon {
  transform: scale(1.1) rotate(5deg);
}

.result-item:hover .result-icon::after,
.result-item.active .result-icon::after {
  opacity: 0.6;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.result-title :deep(mark) {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  padding: 2px 4px;
  border-radius: 3px;
}

.result-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-description :deep(mark) {
  background: rgba(99, 102, 241, 0.3);
  color: rgba(255, 255, 255, 0.9);
  padding: 1px 3px;
  border-radius: 2px;
}

.result-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
}

.result-type {
  padding: 2px 8px;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.result-date {
  color: rgba(255, 255, 255, 0.4);
}

.result-arrow {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.result-item:hover .result-arrow,
.result-item.active .result-arrow {
  color: rgba(255, 255, 255, 0.6);
  transform: translateX(4px);
}

/* 搜索高亮动画 */
:global(.search-highlight) {
  animation: searchHighlight 3s ease;
  position: relative;
  z-index: 10;
}

@keyframes searchHighlight {
  0%, 100% {
    box-shadow: none;
    transform: scale(1);
  }
  10%, 30%, 50% {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.4),
                0 0 20px rgba(99, 102, 241, 0.3);
    transform: scale(1.02);
  }
  20%, 40%, 60% {
    box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.2),
                0 0 30px rgba(99, 102, 241, 0.2);
    transform: scale(1);
  }
}

/* 过渡动画 */
.search-backdrop-enter-active,
.search-backdrop-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.search-backdrop-enter-from,
.search-backdrop-leave-to {
  opacity: 0;
}

.search-backdrop-enter-from .search-container,
.search-backdrop-leave-to .search-container {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .search-backdrop {
    padding: 60px 12px 12px;
  }

  .search-container {
    border-radius: 16px;
  }

  .search-box {
    padding: 16px;
  }

  .search-input-wrapper {
    padding: 12px;
  }

  .search-input {
    font-size: 15px;
  }

  .results-list {
    padding: 8px;
  }

  .result-item {
    padding: 12px;
  }

  .result-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .external-search {
    padding: 12px;
  }

  .search-engines-compact {
    gap: 6px;
  }

  .engine-btn {
    font-size: 11px;
    padding: 6px 10px;
  }

  .engine-btn svg {
    width: 16px;
    height: 16px;
  }
}
</style>
