<template>
  <div class="vimeo-embed-container">
    <div class="vimeo-embed-wrapper">
      <iframe
        :src="embedUrl"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        :title="title"
        class="vimeo-embed-iframe"
      ></iframe>
      <!-- 覆盖层插槽：允许上层把控制按钮放进播放器内部 -->
      <div class="overlay-top-right">
        <slot name="overlay-top-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";

interface Props {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  autopause?: boolean;
  badge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "视频播放",
  autoplay: false,
  autopause: false,
  badge: false,
});

// 构建嵌入URL
const embedUrl = computed(() => {
  const params = new URLSearchParams({
    badge: props.badge ? "1" : "0",
    autopause: props.autopause ? "1" : "0",
    player_id: "0",
    app_id: "58479",
  });

  if (props.autoplay) {
    params.set("autoplay", "1");
  }

  return `https://player.vimeo.com/video/${props.videoId}?${params.toString()}`;
});

// 加载Vimeo Player API
onMounted(() => {
  // 动态加载Vimeo Player API脚本
  if (
    !document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    )
  ) {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
.vimeo-embed-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.vimeo-embed-wrapper {
  padding: 56.25% 0 0 0;
  position: relative;
}

.vimeo-embed-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.overlay-top-right {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 4px;
  z-index: 10;
  pointer-events: none;
}

.overlay-top-right :deep(button),
.overlay-top-right :deep(.line-btn) {
  pointer-events: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vimeo-embed-container {
    border-radius: 8px;
  }
}
</style>
