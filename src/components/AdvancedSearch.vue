<template>
  <div class="advanced-search-wrapper">
    <div class="advanced-search" :class="{ 'is-focused': isFocused, 'has-results': showResults }">
      <div class="search-container">
        <!-- 搜索输入框 -->
        <div class="search-input-wrapper">
          <div class="search-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="currentPlaceholder"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @keydown="handleKeydown"
            class="search-input"
          />
          <div class="search-actions">
            <button v-if="isSearching" class="loading-btn">
              <div class="spinner"></div>
            </button>
            <button v-else-if="searchQuery" @click="clearSearch" class="clear-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="search-shortcut" @click="focusSearch">⌘K</div>
          </div>
        </div>

        <!-- 搜索模式切换 -->
        <div class="search-modes" v-if="isFocused || searchQuery">
          <button
            v-for="mode in searchModes"
            :key="mode.id"
            :class="['mode-btn', { active: currentMode === mode.id }]"
            @click="switchMode(mode.id)"
          >
            <span class="mode-icon">{{ mode.icon }}</span>
            <span class="mode-label">{{ mode.label }}</span>
          </button>
        </div>

        <!-- 搜索结果下拉 -->
        <transition name="search-results">
          <div v-if="showResults" class="search-results">
            <div class="results-header">
              <span class="results-count">
                {{ searchResults.length > 0 ? `找到 ${searchResults.length} 个结果` : '暂无结果' }}
              </span>
              <span class="search-time" v-if="searchTime">{{ searchTime }}ms</span>
            </div>

            <div class="results-list" v-if="searchResults.length > 0">
              <div
                v-for="(result, index) in searchResults"
                :key="result.id"
                :class="['result-item', { active: selectedIndex === index }]"
                @click="selectResult(result)"
                @mouseenter="selectedIndex = index"
              >
                <div class="result-icon">
                  <span v-if="result.type === 'article'">📝</span>
                  <span v-else-if="result.type === 'project'">🚀</span>
                  <span v-else-if="result.type === 'tool'">🔧</span>
                  <span v-else>📄</span>
                </div>
                <div class="result-content">
                  <div class="result-title" v-html="highlightText(result.title)"></div>
                  <div class="result-desc" v-html="highlightText(result.desc)"></div>
                  <div class="result-meta">
                    <span class="result-type">{{ result.typeLabel }}</span>
                    <span class="result-date" v-if="result.date">{{ result.date }}</span>
                  </div>
                </div>
                <div class="result-arrow">→</div>
              </div>
            </div>

            <div class="results-empty" v-else>
              <div class="empty-icon">🔍</div>
              <div class="empty-text">未找到相关内容</div>
              <div class="empty-hint">试试其他关键词或切换搜索模式</div>
            </div>

            <div class="results-footer">
              <div class="keyboard-hints">
                <span><kbd>↑</kbd><kbd>↓</kbd> 导航</span>
                <span><kbd>Enter</kbd> 选择</span>
                <span><kbd>Esc</kbd> 关闭</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import Fuse from 'fuse.js'
import pinyin from 'pinyin'

const { t } = useI18n()
const router = useRouter()

// 搜索状态
const searchInput = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const isFocused = ref(false)
const isSearching = ref(false)
const showResults = ref(false)
const selectedIndex = ref(0)
const searchTime = ref(0)

// 搜索模式
const currentMode = ref<'all' | 'fuzzy' | 'pinyin' | 'ai'>('all')
const searchModes = [
  { id: 'all', label: '全站', icon: '🌐' },
  { id: 'fuzzy', label: '模糊', icon: '🔍' },
  { id: 'pinyin', label: '拼音', icon: '🔤' },
  { id: 'ai', label: 'AI', icon: '🤖' }
]

// 动态占位符
const placeholders = [
  '搜索文章、项目、工具...',
  '试试输入 "Vue" 或 "Spring Boot"',
  '支持拼音搜索，如 "qdjk"',
  'AI 智能搜索，理解你的意图'
]
const currentPlaceholder = ref(placeholders[0])

// 搜索数据源
const searchData = ref<any[]>([])
const searchResults = ref<any[]>([])
