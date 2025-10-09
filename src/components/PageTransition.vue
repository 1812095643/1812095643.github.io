<template>
  <Transition
    :name="transitionName"
    mode="out-in"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const transitionName = ref('slide-fade')

// 根据路由变化决定过渡方向
const routeOrder = ['home', 'work', 'tool', 'blog', 'book', 'about']

watch(
  () => route.name,
  (to, from) => {
    if (!to || !from) {
      transitionName.value = 'fade'
      return
    }
    
    const toIndex = routeOrder.indexOf(to as string)
    const fromIndex = routeOrder.indexOf(from as string)
    
    if (toIndex > fromIndex) {
      transitionName.value = 'slide-left'
    } else if (toIndex < fromIndex) {
      transitionName.value = 'slide-right'
    } else {
      transitionName.value = 'fade'
    }
  }
)

const onBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.opacity = '0'
}

const onEnter = (el: Element, done: () => void) => {
  setTimeout(() => {
    (el as HTMLElement).style.opacity = '1'
    done()
  }, 50)
}

const onAfterEnter = (el: Element) => {
  (el as HTMLElement).style.opacity = ''
}

const onBeforeLeave = (el: Element) => {
  (el as HTMLElement).style.opacity = '1'
}

const onLeave = (el: Element, done: () => void) => {
  (el as HTMLElement).style.opacity = '0'
  setTimeout(done, 200)
}
</script>

<style scoped>
/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 向左滑动 + 淡入淡出 */
.slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 向右滑动 + 淡入淡出 */
.slide-right-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 滑动淡入组合 */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
