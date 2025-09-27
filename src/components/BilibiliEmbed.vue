<template>
  <div class="bili-embed-container">
    <div class="bili-embed-wrapper">
      <iframe
        :src="embedUrl"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        :title="title"
        class="bili-embed-iframe"
      ></iframe>
      <!-- 覆盖层插槽：允许上层把控制按钮放进播放器内部 -->
      <div class="overlay-top-right">
        <slot name="overlay-top-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  bvid: string; // 建议优先使用 BV 号
  title?: string;
  autoplay?: boolean;
  // 画质：80=1080P, 64=720P, 32=480P，具体以 B 站支持为准
  quality?: 80 | 64 | 32 | number;
}

const props = withDefaults(defineProps<Props>(), {
  title: "视频播放",
  autoplay: false,
  quality: 80,
});

// bilibili 官方嵌入：https://player.bilibili.com/player.html?bvid=BV...&autoplay=1
const embedUrl = computed(() => {
  const base = "https://player.bilibili.com/player.html";
  const params = new URLSearchParams({
    bvid: props.bvid,
    high_quality: "1",
    danmaku: "0",
  });
  if (props.autoplay) params.set("autoplay", "1");
  if (props.quality) params.set("quality", String(props.quality));
  return `${base}?${params.toString()}`;
});
</script>

<style scoped>
.bili-embed-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.bili-embed-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}

.bili-embed-iframe {
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
  pointer-events: none; /* 避免遮挡视频其他区域 */
}

.overlay-top-right :deep(button),
.overlay-top-right :deep(.line-btn) {
  pointer-events: auto; /* 允许按钮可点击 */
}
</style>


