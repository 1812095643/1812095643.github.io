<template>
  <div class="advanced-search" :class="{ 'is-focused': isFocused }">
    <div class="search-container">
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
          :placeholder="t.search.placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          class="search-input"
        />
        <div class="search-actions">
          <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="search-shortcut">⌘K</div>
        </div>
      </div>
      
      <!-- 搜索结果下拉 -->
      <transition name="search-results">
        <div v-if="showResults && searchResults.length > 0" class="search-results">
          <div class="results-header">
            <span>{{ t.search.foundResults.replace('{count}', searchResults.length) }}</span>
          </div>
