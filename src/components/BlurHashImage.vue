<template>
  <div class="blurhash-image" :style="{ aspectRatio: aspectRatio }">
    <!-- BlurHash 占位符 -->
    <canvas
      v-if="!loaded && hash"
      ref="canvasRef"
      :width="width"
      :height="height"
      class="blurhash-canvas"
      :class="{ 'fade-out': loaded }"
    />
    
    <!-- 实际图片 -->
    <img
      v-show="loaded"
      :src="src"
      :alt="alt"
      :class="{ 'fade-in': loaded }"
      @load="onLoad"
      @error="onError"
      loading="lazy"
    />
    
    <!-- 加载失败占位 -->
    <div v-if="error" class="error-placeholder">
      <span>图片加载失败</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { decode } from 'blurhash'

interface Props {
  src: string
  hash?: string
  alt?: string
  width?: number
  height?: number
  aspectRatio?: string
}

const props = withDefaults(defineProps<Props>(), {
  hash: '',
  alt: '',
  width: 32,
  height: 32,
  aspectRatio: '16/9'
})

const canvasRef = ref<HTMLCanvasElement>()
const loaded = ref(false)
const error = ref(false)

const drawBlurHash = () => {
  if (!props.hash || !canvasRef.value) return
  
  try {
    const pixels = decode(props.hash, props.width, props.height)
    const ctx = canvasRef.value.getContext('2d')
    if (!ctx) return
    
    const imageData = ctx.createImageData(props.width, props.height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  } catch (err) {
    console.warn('BlurHash decode error:', err)
  }
}

const onLoad = () => {
  loaded.value = true
}

const onError = () => {
  error.value = true
  loaded.value = true
}

onMounted(() => {
  drawBlurHash()
})

watch(() => props.hash, () => {
  loaded.value = false
  error.value = false
  drawBlurHash()
})
</script>

<style scoped>
.blurhash-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #1a1a1f;
}

.blurhash-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

.blurhash-canvas.fade-out {
  opacity: 0;
}

.blurhash-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.blurhash-image img.fade-in {
  opacity: 1;
}

.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1f;
  color: #666;
  font-size: 14px;
}
</style>
