<template>
  <div class="custom-scrollbar" ref="scrollbarRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollbarRef = ref<HTMLElement | null>(null)
</script>

<style scoped>
.custom-scrollbar {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.4) rgba(255, 255, 255, 0.05);
}

/* Webkit浏览器滚动条样式 - Arco Design风格 */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 5px;
  margin: 4px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.35);
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.55);
  background-clip: padding-box;
  border: 2px solid transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: rgba(99, 102, 241, 0.75);
  background-clip: padding-box;
}

/* 滚动条角落 */
.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}

/* 水平和垂直滚动条交叉时的样式 */
.custom-scrollbar::-webkit-scrollbar-track:horizontal {
  margin: 0 4px;
}
</style>
