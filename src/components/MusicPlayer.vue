<template>
  <div
    class="music-player"
    :class="{ expanded: isExpanded, animating: isAnimating }"
    ref="musicPlayerRef"
  >
    <!-- 旋转胶片 -->
    <div class="vinyl-container" @click="toggleExpand">
      <div class="vinyl-disc" :class="{ spinning: isPlaying }">
        <div class="vinyl-center">
          <button
            class="play-pause-btn"
            @click.stop="togglePlay"
            :title="isPlaying ? t.musicPlayer.pause : t.musicPlayer.play"
          >
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        </div>
        <!-- 胶片纹理 -->
        <div class="vinyl-grooves">
          <div class="groove" v-for="n in 2" :key="n"></div>
        </div>
        <!-- 专辑封面 -->
        <div class="album-cover">
          <img
            :src="currentSong.cover || '/assets/index/logo.png'"
            :alt="currentSong.title"
          />
        </div>
      </div>
    </div>

    <!-- 展开的播放器面板 -->
    <Transition
      name="player-expand"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
    >
      <div v-if="isExpanded" class="player-panel">
        <!-- 当前播放信息和控制按钮 -->
        <div class="now-playing">
          <!-- 上一首按钮 -->
          <button
            class="track-control prev-btn"
            @click="prevSong"
            :title="t.musicPlayer.previous || '上一首'"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <!-- 歌曲信息 -->
          <div class="song-info">
            <div class="song-title">{{ currentSong.title }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>

          <!-- 下一首按钮 -->
          <button
            class="track-control next-btn"
            @click="nextSong"
            :title="t.musicPlayer.next || '下一首'"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <!-- 进度条 -->
        <div class="progress-container">
          <div class="time current-time">{{ formatTime(currentTime) }}</div>
          <div class="progress-bar" @click="seekTo">
            <div class="progress-track"></div>
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
            <div
              class="progress-thumb"
              :style="{ left: progressPercentage + '%' }"
            ></div>
          </div>
          <div class="time total-time">{{ formatTime(duration) }}</div>
        </div>

        <!-- 播放列表 -->
        <div class="playlist">
          <div class="playlist-header">{{ t.musicPlayer.playlist }}</div>
          <div class="playlist-items">
            <div
              v-for="(song, index) in playlist"
              :key="index"
              class="playlist-item"
              :class="{ active: currentSongIndex === index }"
              @click="playSong(index)"
            >
              <div class="song-info">
                <span class="song-text"
                  >{{ song.title }} - {{ song.artist }}</span
                >
              </div>
              <div class="song-duration">{{ song.duration }}</div>
            </div>
          </div>
        </div>

        <!-- 音量控制 -->
        <div class="volume-container">
          <svg class="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
          <div class="volume-bar" @click="setVolume">
            <div class="volume-track"></div>
            <div
              class="volume-fill"
              :style="{ width: volume * 1000 + '%' }"
            ></div>
            <div
              class="volume-thumb"
              :style="{ left: volume * 1000 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 隐藏的音频元素 -->
    <audio
      ref="audioElement"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      @ended="nextSong"
      preload="metadata"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useI18n } from "../composables/useI18n";

// 使用国际化
const { t } = useI18n();

// 响应式状态
const isPlaying = ref(false);
const isExpanded = ref(false);
const isAnimating = ref(false); // 控制胶片动画状态
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.02); // 默认音量2%
const currentSongIndex = ref(0);

// 音频元素引用
const audioElement = ref<HTMLAudioElement | null>(null);
const musicPlayerRef = ref<HTMLElement | null>(null);

// 本地存储相关
const MUSIC_STORAGE_KEY = "musicPlayer.state";
let lastProgressSaveAt = 0;
let restoredFromStorage = false;
const restoreOnce = { time: null as number | null };

// 播放列表
const playlist = ref([
  {
    title: "富士山下",
    artist: "陈奕迅",
    src: "/audio/富士山下陈奕迅.mp3",
    duration: "4:23",
    cover: "/images/covers/富士山下陈奕迅.png",
  },
  {
    title: "晴天",
    artist: "周杰伦",
    src: "/audio/晴天周杰伦.mp3",
    duration: "4:29",
    cover: "/images/covers/晴天周杰伦.jpg",
  },
  {
    title: "枫",
    artist: "周杰伦",
    src: "/audio/枫周杰伦.mp3",
    duration: "4:32",
    cover: "/images/covers/枫周杰伦.jpg",
  },
]);

// 计算属性
const currentSong = computed(() => playlist.value[currentSongIndex.value]);
const progressPercentage = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0;
});

// 方法
const togglePlay = () => {
  if (!audioElement.value) return;

  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
  saveMusicState();
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const playSong = (index: number) => {
  currentSongIndex.value = index;
  loadCurrentSong();
  if (isPlaying.value) {
    audioElement.value?.play();
  }
  // 切歌后从头播放
  currentTime.value = 0;
  if (audioElement.value) audioElement.value.currentTime = 0;
  saveMusicState();
};

const loadCurrentSong = () => {
  if (!audioElement.value) return;

  audioElement.value.src = currentSong.value.src;
  audioElement.value.volume = volume.value;
};

const nextSong = () => {
  currentSongIndex.value = (currentSongIndex.value + 1) % playlist.value.length;
  loadCurrentSong();
  if (isPlaying.value) {
    audioElement.value?.play();
  }
  currentTime.value = 0;
  if (audioElement.value) audioElement.value.currentTime = 0;
  saveMusicState();
};

const prevSong = () => {
  currentSongIndex.value =
    currentSongIndex.value === 0
      ? playlist.value.length - 1
      : currentSongIndex.value - 1;
  loadCurrentSong();
  if (isPlaying.value) {
    audioElement.value?.play();
  }
  currentTime.value = 0;
  if (audioElement.value) audioElement.value.currentTime = 0;
  saveMusicState();
};

const updateProgress = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
  }
  // 节流保存播放进度
  const now = performance.now();
  if (now - lastProgressSaveAt > 1000) {
    saveMusicState();
    lastProgressSaveAt = now;
  }
};

const updateDuration = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration;
    // 若存在一次性恢复时间点，在元数据加载后设置
    if (restoreOnce.time != null) {
      try {
        audioElement.value.currentTime = restoreOnce.time;
        currentTime.value = restoreOnce.time;
      } catch {}
      restoreOnce.time = null;
    }
  }
};

const seekTo = (event: MouseEvent) => {
  if (!audioElement.value) return;

  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = percentage * duration.value;

  audioElement.value.currentTime = newTime;
  currentTime.value = newTime;
  saveMusicState();
};

const setVolume = (event: MouseEvent) => {
  const volumeBar = event.currentTarget as HTMLElement;
  const rect = volumeBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  // 将点击位置映射到0-0.1（0%-10%）的范围
  const newVolume = Math.max(0, Math.min(0.1, (clickX / rect.width) * 0.1));

  volume.value = newVolume;
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
  }
  saveMusicState();
};

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// 动画钩子函数
const onBeforeEnter = () => {
  isAnimating.value = true;
};

const onAfterEnter = () => {
  isAnimating.value = false;
};

const onBeforeLeave = () => {
  isAnimating.value = true;
};

const onAfterLeave = () => {
  isAnimating.value = false;
};

// 点击外部关闭弹窗
const handleClickOutside = (event: MouseEvent) => {
  if (
    isExpanded.value &&
    musicPlayerRef.value &&
    !musicPlayerRef.value.contains(event.target as Node)
  ) {
    isExpanded.value = false;
  }
};

function saveMusicState() {
  try {
    const state = {
      songIndex: currentSongIndex.value,
      time: currentTime.value,
      volume: volume.value,
      isPlaying: isPlaying.value,
    };
    localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function restoreMusicState() {
  try {
    const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw || "null") as {
      songIndex?: number;
      time?: number;
      volume?: number;
      isPlaying?: boolean;
    } | null;
    if (!state) return;

    // 恢复曲目索引
    if (typeof state.songIndex === "number") {
      const idx = Math.max(
        0,
        Math.min(playlist.value.length - 1, state.songIndex)
      );
      currentSongIndex.value = idx;
    }

    // 先加载音频，再在 metadata 到达后设置时间
    loadCurrentSong();

    // 恢复音量
    if (typeof state.volume === "number") {
      volume.value = state.volume;
      if (audioElement.value) audioElement.value.volume = state.volume;
    }

    // 等待元数据后设置时间
    if (typeof state.time === "number" && state.time > 0) {
      restoreOnce.time = state.time;
    }

    // 恢复播放状态（可能被浏览器拦截）
    if (state.isPlaying) {
      setTimeout(() => {
        if (audioElement.value) {
          audioElement.value
            .play()
            .then(() => (isPlaying.value = true))
            .catch(() => {
              // 自动播放被阻止，则保持暂停
              isPlaying.value = false;
            });
        }
      }, 0);
    }

    restoredFromStorage = true;
  } catch {
    restoredFromStorage = false;
  }
}

// 生命周期
onMounted(() => {
  // 优先恢复上次状态
  restoreMusicState();

  // 添加全局点击监听器
  document.addEventListener("click", handleClickOutside);

  // 若未从本地恢复，才考虑自动播放
  if (!restoredFromStorage) {
    setTimeout(() => {
      if (audioElement.value) {
        audioElement.value.play().catch(() => {
          // 如果浏览器阻止自动播放，静默处理
          console.log("Autoplay was prevented by browser");
        });
        isPlaying.value = true;
        saveMusicState();
      }
    }, 1000);
  }
});

onBeforeUnmount(() => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
  // 移除全局点击监听器
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.music-player {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 100;
  transition: all 0.3s ease;
}

.music-player.expanded {
  background: rgba(20, 20, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  width: 320px;
  padding-bottom: 16px;
}

/* 胶片容器 */
.vinyl-container {
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.music-player.expanded .vinyl-container {
  width: 100px;
  height: 100px;
  margin: 16px auto 0;
}

/* 胶片唱片 */
.vinyl-disc {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.vinyl-disc:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);
}

.vinyl-disc.spinning {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.music-player.expanded .vinyl-disc.spinning {
  animation: spin 5s linear infinite;
}

/* 胶片纹理 */
.vinyl-grooves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.groove {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.groove:nth-child(1) {
  width: 95%;
  height: 95%;
}
.groove:nth-child(2) {
  width: 85%;
  height: 85%;
}

/* 专辑封面 */
.album-cover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  overflow: hidden;
  background: #141419;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* 中心播放按钮 */
.vinyl-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: rgba(51, 51, 51, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.play-pause-btn {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: #6461f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.play-pause-btn:hover {
  background: rgba(100, 97, 241, 0.1);
  transform: scale(1.1);
}

.play-pause-btn svg {
  width: 14px;
  height: 14px;
}

.player-panel {
  padding: 0 16px 16px;
  overflow: hidden;
}

/* 面板内容渐进动画 */
.player-expand-enter-active .player-panel > * {
  animation: slideInUp 0.4s ease-out;
  animation-fill-mode: both;
}

.player-expand-enter-active .player-panel > *:nth-child(1) {
  animation-delay: 0.1s;
}

.player-expand-enter-active .player-panel > *:nth-child(2) {
  animation-delay: 0.15s;
}

.player-expand-enter-active .player-panel > *:nth-child(3) {
  animation-delay: 0.2s;
}

.player-expand-enter-active .player-panel > *:nth-child(4) {
  animation-delay: 0.25s;
}

/* 消失动画 - 向上淡出（出现动画的逆向） */
.player-expand-leave-active .player-panel > * {
  animation: slideOutUp 0.3s ease-in;
  animation-fill-mode: both;
}

.player-expand-leave-active .player-panel > *:nth-child(1) {
  animation-delay: 0.15s;
}

.player-expand-leave-active .player-panel > *:nth-child(2) {
  animation-delay: 0.1s;
}

.player-expand-leave-active .player-panel > *:nth-child(3) {
  animation-delay: 0.05s;
}

.player-expand-leave-active .player-panel > *:nth-child(4) {
  animation-delay: 0s;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.now-playing {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.track-control {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(100, 97, 241, 0.1);
  border-radius: 50%;
  color: #6461f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.track-control:hover {
  background: rgba(100, 97, 241, 0.2);
  transform: scale(1.05);
}

.track-control svg {
  width: 18px;
  height: 18px;
}

.song-info {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.song-info .song-title {
  font-size: 14px;
  font-weight: 500;
  color: #e8e8f6;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-info .song-artist {
  font-size: 12px;
  color: #b3b3c1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.time {
  font-size: 11px;
  color: #b3b3c1;
  min-width: 35px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  position: relative;
  cursor: pointer;
}

.progress-track {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #6461f1;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.progress-thumb {
  position: absolute;
  top: -4px;
  width: 12px;
  height: 12px;
  background: #6461f1;
  border-radius: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress-thumb {
  opacity: 1;
}

.playlist {
  margin-bottom: 16px;
}

.playlist-header {
  font-size: 12px;
  font-weight: 500;
  color: #e8e8f6;
  margin-bottom: 8px;
}

.playlist-items {
  max-height: 150px;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.playlist-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.playlist-item.active {
  background: rgba(100, 97, 241, 0.1);
}

.playlist-item .song-text {
  font-size: 12px;
  font-weight: 400;
  color: #e8e8f6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-duration {
  font-size: 11px;
  color: #b3b3c1;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-icon {
  width: 16px;
  height: 16px;
  color: #b3b3c1;
}

.volume-bar {
  flex: 1;
  height: 4px;
  position: relative;
  cursor: pointer;
}

.volume-track {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.volume-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #6461f1;
  border-radius: 2px;
}

.volume-thumb {
  position: absolute;
  top: -4px;
  width: 12px;
  height: 12px;
  background: #6461f1;
  border-radius: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.volume-bar:hover .volume-thumb {
  opacity: 1;
}

/* 优雅的展开收起动画 */
.player-expand-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top center;
}

.player-expand-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top center;
}

.player-expand-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.player-expand-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 400px;
  padding-top: 0;
  padding-bottom: 16px;
}

.player-expand-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 400px;
  padding-top: 0;
  padding-bottom: 16px;
}

.player-expand-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* 胶片容器的动画优化 */
.music-player .vinyl-container {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 展开状态下的胶片位置和大小 */
.music-player.expanded .vinyl-container {
  width: 100px;
  height: 100px;
  margin: 16px auto 0;
}

/* 关键：在弹窗消失动画开始时，胶片立即开始回到原位 */
.music-player.animating:not(.expanded) .vinyl-container {
  width: 80px !important;
  height: 80px !important;
  margin: 0 !important;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-player {
    top: 70px;
    right: 20px;
  }

  .music-player.expanded {
    width: 280px;
  }
}

/* 滚动条样式 */
.playlist-items::-webkit-scrollbar {
  width: 4px;
}

.playlist-items::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.playlist-items::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.playlist-items::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>