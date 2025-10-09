<template>
  <div class="pull-to-refresh-container">
    <!-- 下拉刷新指示器 -->
    <div 
      class="pull-indicator"
      :class="{ 
        'pulling': isPulling && !isRefreshing,
        'refreshing': isRefreshing,
        'ready': pullDistance >= threshold
      }"
      :style="{ 
        transform: `translateY(${Math.min(pullDistance, threshold * 1.5)}px)`,
        opacity: isPulling || isRefreshing ? 1 : 0
      }"
    >
      <div class="indicator-content">
        <div v-if="!isRefreshing" class="pull-icon">
          <svg 
            :class="{ 'rotate': pullDistance >= threshold }"
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        <div v-else class="spinner">
          <div class="spinner-circle"></div>
        </div>
        <span class="pull-text">
          {{ pullText }}
        </span>
      </div>
    </div>
    
    <!-- 内容插槽 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePullToRefresh } from '../composables/usePullToRefresh'

interface Props {
  threshold?: number
  disabled?: boolean
  onRefresh?: () => Promise<void> | void
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 80,
  disabled: false
})

const { isPulling, isRefreshing, pullDistance } = usePullToRefresh({
  threshold: props.threshold,
  onRefresh: props.onRefresh,
  disabled: props.disabled
})

const pullText = computed(() => {
  if (isRefreshing.value) return '刷新中...'
  if (pullDistance.value >= props.threshold) return '释放刷新'
  return '下拉刷新'
})
</script>

<style scoped>
.pull-to-refresh-container {
  position: relative;
  min-height: 100vh;
}

.pull-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.indicator-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #6461f1;
}

.pull-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.pull-icon.rotate {
  transform: rotate(180deg);
}

.pull-text {
  font-size: 14px;
  font-weight: 500;
  color: #a8a8b6;
}

.spinner {
  width: 24px;
  height: 24px;
  position: relative;
}

.spinner-circle {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(100, 97, 241, 0.2);
  border-top-color: #6461f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .pull-indicator {
    height: 50px;
  }
  
  .pull-text {
    font-size: 12px;
  }
}
</style>
