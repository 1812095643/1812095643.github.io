<template>
  <div class="vimeo-player-container">
    <div class="vimeo-wrapper">
      <iframe
        :src="vimeoUrl"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        :title="title"
        class="vimeo-iframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMusicControl } from "../composables/useMusicControl";

interface Props {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  muted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "视频播放",
  autoplay: false,
  muted: false,
});

// 使用音乐控制 - 当Vimeo视频播放时降低背景音乐
const { onVideoPlay, onVideoPause } = useMusicControl();

// 构建Vimeo嵌入URL
const vimeoUrl = computed(() => {
  const baseUrl = `https://player.vimeo.com/video/${props.videoId}`;
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
  });

  if (props.autoplay) {
    params.set("autoplay", "1");
  }

  if (props.muted) {
    params.set("muted", "1");
  }

  return `${baseUrl}?${params.toString()}`;
});
</script>

<style scoped>
.vimeo-player-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: #000;
}

.vimeo-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
}

.vimeo-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vimeo-player-container {
    border-radius: 8px;
  }
}
</style>
