<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video
        ref="videoRef"
        class="video-element"
        :src="videoSrc"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="onTimeUpdate"
        @ended="onEnded"
        @play="onPlay"
        @pause="onPause"
        @loadstart="onLoadStart"
        @canplay="onCanPlay"
        @waiting="onWaiting"
        @error="onError"
        preload="metadata"
        playsinline
      ></video>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>

      <!-- 播放按钮覆盖层 -->
      <div
        v-if="!isPlaying && !isLoading"
        class="play-overlay"
        @click="togglePlay"
      >
        <div class="play-button">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <!-- 自定义控制栏 -->
      <div class="controls" :class="{ 'controls-visible': showControls }">
        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar" @click="seekTo" ref="progressBarRef">
            <div
              class="progress-buffer"
              :style="{ width: bufferProgress + '%' }"
            ></div>
            <div
              class="progress-played"
              :style="{ width: playProgress + '%' }"
            ></div>
            <div
              class="progress-handle"
              :style="{ left: playProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="controls-row">
          <div class="controls-left">
            <!-- 播放/暂停 -->
            <button class="control-btn" @click="togglePlay">
              <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <!-- 快退 -->
            <button class="control-btn" @click="skipBackward">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                />
                <text
                  x="12"
                  y="15"
                  text-anchor="middle"
                  font-size="8"
                  fill="currentColor"
                >
                  10
                </text>
              </svg>
            </button>

            <!-- 快进 -->
            <button class="control-btn" @click="skipForward">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"
                />
                <text
                  x="12"
                  y="15"
                  text-anchor="middle"
                  font-size="8"
                  fill="currentColor"
                >
                  10
                </text>
              </svg>
            </button>

            <!-- 音量控制 -->
            <div class="volume-control">
              <button class="control-btn" @click="toggleMute">
                <svg
                  v-if="isMuted || volume === 0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                  />
                </svg>
                <svg
                  v-else-if="volume < 0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
                  />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                  />
                </svg>
              </button>
              <div
                class="volume-slider"
                @click="setVolume"
                ref="volumeSliderRef"
              >
                <div class="volume-bar">
                  <div
                    class="volume-fill"
                    :style="{ width: (isMuted ? 0 : volume * 100) + '%' }"
                  ></div>
                  <div
                    class="volume-handle"
                    :style="{ left: (isMuted ? 0 : volume * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 时间显示 -->
            <div class="time-display">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </div>
          </div>

          <div class="controls-right">
            <!-- 倍速控制 -->
            <div class="playback-rate">
              <button class="control-btn rate-btn" @click="toggleRateMenu">
                {{ playbackRate }}x
              </button>
              <div v-if="showRateMenu" class="rate-menu">
                <button
                  v-for="rate in playbackRates"
                  :key="rate"
                  class="rate-option"
                  :class="{ active: playbackRate === rate }"
                  @click="setPlaybackRate(rate)"
                >
                  {{ rate }}x
                </button>
              </div>
            </div>

            <!-- 全屏按钮 -->
            <button class="control-btn" @click="toggleFullscreen">
              <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 上次观看提示 -->
    <div v-if="showResumePrompt" class="resume-prompt">
      <div class="resume-content">
        <div class="resume-text">
          上次观看到：{{ formatTime(lastWatchTime) }}，是否继续观看？
        </div>
        <div class="resume-actions">
          <button class="resume-btn" @click="resumeFromLastTime">
            继续观看
          </button>
          <button class="resume-btn secondary" @click="startFromBeginning">
            从头开始
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useMusicControl } from "../composables/useMusicControl";

interface Props {
  src: string;
  autoplay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
});

// 使用音乐控制
const { onVideoPlay, onVideoPause } = useMusicControl();

// 视频元素引用
const videoRef = ref<HTMLVideoElement>();
const progressBarRef = ref<HTMLElement>();
const volumeSliderRef = ref<HTMLElement>();

// 播放状态
const isPlaying = ref(false);
const isLoading = ref(true);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const playbackRate = ref(1);
const isFullscreen = ref(false);

// UI状态
const showControls = ref(true);
const showRateMenu = ref(false);
const showResumePrompt = ref(false);

// 进度相关
const playProgress = ref(0);
const bufferProgress = ref(0);
const lastWatchTime = ref(0);

// 配置
const videoSrc = ref(props.src);
const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
const STORAGE_KEY = "video-progress-guigang-tourism";

// 控制栏自动隐藏
let controlsTimer: number | null = null;

// 格式化时间
const formatTime = (seconds: number): string => {
  if (!seconds || !isFinite(seconds)) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// 保存播放进度
const saveProgress = () => {
  if (videoRef.value && duration.value > 0) {
    const progress = {
      time: currentTime.value,
      duration: duration.value,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

// 加载保存的进度
const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      // 只有在视频时长匹配且不是很久之前的记录时才显示恢复提示
      if (
        progress.time > 30 &&
        Math.abs(progress.duration - duration.value) < 5
      ) {
        lastWatchTime.value = progress.time;
        showResumePrompt.value = true;
      }
    }
  } catch (error) {
    console.warn("Failed to load video progress:", error);
  }
};

// 视频事件处理
const onLoadedMetadata = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration;
    volume.value = videoRef.value.volume;
    loadProgress();
  }
};

const onTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime;
    playProgress.value = (currentTime.value / duration.value) * 100;

    // 每10秒保存一次进度
    if (Math.floor(currentTime.value) % 10 === 0) {
      saveProgress();
    }
  }
};

const onLoadStart = () => {
  isLoading.value = true;
};

const onCanPlay = () => {
  isLoading.value = false;
};

const onWaiting = () => {
  isLoading.value = true;
};

const onPlay = () => {
  isPlaying.value = true;
  showControlsTemporarily();
  // 视频开始播放时降低音乐音量
  onVideoPlay();
};

const onPause = () => {
  isPlaying.value = false;
  saveProgress();
  showControlsTemporarily();
  // 视频暂停时恢复音乐音量
  onVideoPause();
};

const onEnded = () => {
  isPlaying.value = false;
  // 清除进度记录
  localStorage.removeItem(STORAGE_KEY);
  // 视频结束时恢复音乐音量
  onVideoPause();
};

const onError = (event: Event) => {
  console.error("Video error:", event);
  isLoading.value = false;
};

// 播放控制
const togglePlay = () => {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }
};

const skipForward = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.min(
      videoRef.value.currentTime + 10,
      duration.value
    );
  }
};

const skipBackward = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.max(videoRef.value.currentTime - 10, 0);
  }
};

// 进度条控制
const seekTo = (event: MouseEvent) => {
  if (!progressBarRef.value || !videoRef.value) return;

  const rect = progressBarRef.value.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const newTime = percent * duration.value;

  videoRef.value.currentTime = Math.max(0, Math.min(newTime, duration.value));
};

// 音量控制
const toggleMute = () => {
  if (!videoRef.value) return;

  isMuted.value = !isMuted.value;
  videoRef.value.muted = isMuted.value;
};

const setVolume = (event: MouseEvent) => {
  if (!volumeSliderRef.value || !videoRef.value) return;

  const rect = volumeSliderRef.value.getBoundingClientRect();
  const percent = Math.max(
    0,
    Math.min(1, (event.clientX - rect.left) / rect.width)
  );

  volume.value = percent;
  videoRef.value.volume = percent;
  isMuted.value = percent === 0;
  videoRef.value.muted = isMuted.value;
};

// 倍速控制
const toggleRateMenu = () => {
  showRateMenu.value = !showRateMenu.value;
};

const setPlaybackRate = (rate: number) => {
  if (videoRef.value) {
    playbackRate.value = rate;
    videoRef.value.playbackRate = rate;
    showRateMenu.value = false;
  }
};

// 全屏控制
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoRef.value?.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};

// 控制栏显示/隐藏
const showControlsTemporarily = () => {
  showControls.value = true;

  if (controlsTimer) {
    clearTimeout(controlsTimer);
  }

  controlsTimer = window.setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false;
    }
  }, 3000);
};

// 恢复播放
const resumeFromLastTime = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = lastWatchTime.value;
    showResumePrompt.value = false;
  }
};

const startFromBeginning = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0;
    showResumePrompt.value = false;
  }
};

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

// 鼠标移动显示控制栏
const handleMouseMove = () => {
  showControlsTemporarily();
};

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  if (
    showRateMenu.value &&
    !(event.target as Element)?.closest(".playback-rate")
  ) {
    showRateMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("click", handleClickOutside);

  // 初始显示控制栏
  showControlsTemporarily();
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  document.removeEventListener("click", handleClickOutside);

  if (controlsTimer) {
    clearTimeout(controlsTimer);
  }

  // 保存最后的播放进度
  saveProgress();
});

// 监听播放状态变化
watch(isPlaying, (playing) => {
  if (playing) {
    showControlsTemporarily();
  } else {
    showControls.value = true;
  }
});
</script>

<style scoped>
.video-player-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

/* 加载状态 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 14px;
  opacity: 0.8;
}

/* 播放按钮覆盖层 */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 5;
  transition: opacity 0.3s ease;
}

.play-overlay:hover {
  background: rgba(0, 0, 0, 0.5);
}

.play-button {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: #fff;
  transform: scale(1.1);
}

.play-button svg {
  width: 32px;
  height: 32px;
  margin-left: 4px;
}

/* 控制栏 */
.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 16px 16px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 10;
}

.controls-visible {
  transform: translateY(0);
}

.video-wrapper:hover .controls {
  transform: translateY(0);
}

/* 进度条 */
.progress-container {
  margin-bottom: 12px;
}

.progress-bar {
  position: relative;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: height 0.2s ease;
}

.progress-bar:hover {
  height: 6px;
}

.progress-buffer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-played {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #ff6b6b;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.progress-handle {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: #ff6b6b;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

/* 控制按钮行 */
.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

/* 音量控制 */
.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 60px;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.volume-bar {
  position: relative;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.volume-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.volume-handle {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

/* 时间显示 */
.time-display {
  color: white;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

/* 倍速控制 */
.playback-rate {
  position: relative;
}

.rate-btn {
  min-width: 40px;
  font-size: 13px;
  font-weight: 500;
}

.rate-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 60px;
}

.rate-option {
  background: none;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
  text-align: center;
  transition: background-color 0.2s ease;
}

.rate-option:hover {
  background: rgba(255, 255, 255, 0.2);
}

.rate-option.active {
  background: #ff6b6b;
}

/* 恢复播放提示 */
.resume-prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 24px;
  border-radius: 12px;
  z-index: 20;
  max-width: 300px;
  text-align: center;
}

.resume-text {
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.resume-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.resume-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.resume-btn:hover {
  background: #ff5252;
}

.resume-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
}

.resume-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .controls {
    padding: 16px 12px 12px;
  }

  .controls-left,
  .controls-right {
    gap: 4px;
  }

  .control-btn {
    padding: 6px;
  }

  .control-btn svg {
    width: 18px;
    height: 18px;
  }

  .volume-slider {
    width: 40px;
  }

  .time-display {
    font-size: 12px;
  }

  .play-button {
    width: 60px;
    height: 60px;
  }

  .play-button svg {
    width: 24px;
    height: 24px;
  }
}
</style>
