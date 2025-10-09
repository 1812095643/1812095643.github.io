<template>
  <Transition name="fade">
    <div v-if="showHint" class="swipe-hint">
      <div class="hint-content">
        <div class="swipe-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path 
              d="M10 20 L30 20 M25 15 L30 20 L25 25" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p>左右滑动切换页面</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showHint = ref(false)

onMounted(() => {
  // 检查是否已显示过提示
  const hasSeenHint = localStorage.getItem('swipe-hint-seen')
  
  if (!hasSeenHint && window.innerWidth <= 768) {
    setTimeout(() => {
      showHint.value = true
      
      // 3秒后自动隐藏
      setTimeout(() => {
        showHint.value = false
        localStorage.setItem('swipe-hint-seen', 'true')
      }, 3000)
    }, 1000)
  }
})
</script>

<style scoped>
.swipe-hint {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
}

.hint-content {
  background: rgba(17, 17, 17, 0.9);
  color: #fff;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.swipe-icon {
  color: #6461f1;
  animation: swipeAnimation 1.5s ease-in-out infinite;
}

.hint-content p {
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
}

@keyframes swipeAnimation {
  0%, 100% {
    transform: translateX(-5px);
    opacity: 0.6;
  }
  50% {
    transform: translateX(5px);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
