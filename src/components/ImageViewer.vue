<template>
  <teleport to="body" v-if="visible">
    <div
      class="image-viewer-modal"
      @click="handleBackdropClick"
      @wheel="handleWheel"
    >
      <div class="modal-backdrop"></div>
      <div class="modal-container" @click.stop>
        <!-- 模态框头部 -->
        <div class="modal-header">
          <div class="modal-header-left">
            <div
              class="modal-category-badge"
              :style="{
                backgroundColor: categoryColor,
              }"
            >
              <span>{{ title }}</span>
            </div>
            <div class="modal-title">
              {{ title }}
            </div>
          </div>
          <div class="modal-header-right">
            <!-- 缩放控制 -->
            <div class="zoom-controls">
              <button class="zoom-btn" @click="zoomOut" title="缩小 (-)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <span class="zoom-level"
                >{{ Math.round(imageScale * 100) }}%</span
              >
              <button class="zoom-btn" @click="zoomIn" title="放大 (+)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <!-- 旋转控制 -->
            <div class="rotation-controls">
              <button class="rotation-btn" @click="rotateLeft" title="左旋 (←)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4V2L8 6L12 10V8C15.3137 8 18 10.6863 18 14C18 17.3137 15.3137 20 12 20C8.68629 20 6 17.3137 6 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                class="rotation-btn"
                @click="rotateRight"
                title="右旋 (→)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4V2L16 6L12 10V8C8.68629 8 6 10.6863 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <!-- 关闭按钮 -->
            <button class="modal-close" @click="close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 模态框主体 -->
        <div class="modal-body">
          <!-- 图片查看区域 -->
          <div class="image-viewer">
            <div class="image-container" ref="imageContainer">
              <img
                v-if="!imageLoaded"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23141419'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23a8a8b6' font-family='system-ui' font-size='16'%3E加载中...%3C/text%3E%3C/svg%3E"
                alt="加载中..."
                class="loading-placeholder"
              />
              <img
                :src="imageSrc"
                :alt="title"
                @load="onImageLoad"
                class="certificate-image-modal"
                :style="{
                  transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                  opacity: imageLoaded ? 1 : 0,
                }"
                draggable="false"
                @mousedown="handleMouseDown"
                @mousemove="handleMouseMove"
                @mouseup="handleMouseUp"
                @mouseleave="handleMouseUp"
              />
            </div>
            <!-- 图片操作提示 -->
            <div class="image-controls-hint" v-if="imageLoaded">
              <div class="hint-item">
                <kbd>ESC</kbd>
                <span>关闭</span>
              </div>
              <div class="hint-item">
                <kbd>滚轮</kbd>
                <span>缩放</span>
              </div>
              <div class="hint-item">
                <kbd>← / →</kbd>
                <span>旋转</span>
              </div>
              <div class="hint-item">
                <kbd>0</kbd>
                <span>重置</span>
              </div>
            </div>
          </div>

          <!-- 图片信息区域 -->
          <div class="certificate-info-panel" v-if="showInfo">
            <div class="info-header">
              <div class="info-date" v-if="date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 3V5M16 3V5M7 10H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ date }}
              </div>
              <div
                class="info-category"
                v-if="category"
                :style="{
                  color: categoryColor,
                }"
              >
                {{ category.toUpperCase() }}
              </div>
            </div>

            <div class="info-description" v-if="description">
              {{ description }}
            </div>

            <!-- 操作按钮组 -->
            <div class="action-buttons">
              <button class="action-btn secondary" @click="resetView">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                重置视图
              </button>
              <button
                class="action-btn primary"
                @click="downloadImage"
                v-if="allowDownload"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15L17 10M12 15V3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                下载图片
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 关闭外层 .image-viewer-modal 容器 -->
    </div>
  </teleport>
</template>

<script setup lang="ts" name="ImageViewer">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

interface Props {
  visible: boolean;
  imageSrc: string;
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  categoryColor?: string;
  showInfo?: boolean;
  allowDownload?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "图片预览",
  showInfo: true,
  allowDownload: true,
  categoryColor: "#6461f1",
});

const emit = defineEmits<{
  close: [];
}>();

const imageLoaded = ref(false);
const imageScale = ref(1);
const imageRotation = ref(0);
const imageContainer = ref<HTMLElement>();

// 拖拽相关状态
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const imagePosition = ref({ x: 0, y: 0 });

// 图片缩放功能
const zoomIn = () => {
  if (imageScale.value < 3) {
    imageScale.value = Math.min(3, imageScale.value + 0.2);
  }
};

const zoomOut = () => {
  if (imageScale.value > 0.5) {
    imageScale.value = Math.max(0.5, imageScale.value - 0.2);
  }
};

const resetView = () => {
  imageScale.value = 1;
  imageRotation.value = 0;
  imagePosition.value = { x: 0, y: 0 };
};

// 图片旋转功能
const rotateLeft = () => {
  imageRotation.value -= 90;
};

const rotateRight = () => {
  imageRotation.value += 90;
};

// 滚轮缩放功能
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();

  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  const newScale = imageScale.value + delta;

  if (newScale >= 0.5 && newScale <= 3) {
    imageScale.value = newScale;
  }
};

// 拖拽功能
const handleMouseDown = (event: MouseEvent) => {
  if (imageScale.value > 1) {
    isDragging.value = true;
    dragStart.value = {
      x: event.clientX - imagePosition.value.x,
      y: event.clientY - imagePosition.value.y,
    };
  }
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value && imageScale.value > 1) {
    imagePosition.value = {
      x: event.clientX - dragStart.value.x,
      y: event.clientY - dragStart.value.y,
    };
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

// 键盘快捷键支持
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.visible) return;

  switch (event.key) {
    case "Escape":
      close();
      break;
    case "+":
    case "=":
      zoomIn();
      break;
    case "-":
      zoomOut();
      break;
    case "0":
      resetView();
      break;
    case "ArrowLeft":
      rotateLeft();
      break;
    case "ArrowRight":
      rotateRight();
      break;
  }
};

// 背景点击关闭
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close();
  }
};

// 图片加载完成
const onImageLoad = () => {
  imageLoaded.value = true;
};

// 关闭模态框
const close = () => {
  emit("close");
};

// 下载图片功能
const downloadImage = async () => {
  try {
    const response = await fetch(props.imageSrc);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${props.title || "image"}.jpg`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("下载失败:", error);
  }
};

// 监听visible变化，重置状态
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      imageLoaded.value = false;
      resetView();
      document.body.style.overflow = "hidden";
      nextTick(() => {
        // 确保模态框完全渲染后再添加事件监听
        window.addEventListener("keydown", handleKeydown);
      });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeydown);
    }
  }
);

onMounted(() => {
  if (props.visible) {
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
/* 高级图片查看器模态框 */
.image-viewer-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalFadeIn 0.3s ease-out;
  padding: 20px; /* 保留安全边距，避免使用 margin 影响定位 */
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(14, 14, 19, 0.95);
  backdrop-filter: blur(8px);
}

.modal-container {
  position: relative;
  background: linear-gradient(145deg, #1a1a1f 0%, #141419 100%);
  border-radius: 16px;
  border: 1px solid rgba(100, 97, 241, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(100, 97, 241, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  max-width: 1200px;
  max-height: 800px;
  overflow: hidden;
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 模态框头部 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(100, 97, 241, 0.1);
  background: linear-gradient(
    135deg,
    rgba(100, 97, 241, 0.05) 0%,
    transparent 100%
  );
}

.modal-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-category-badge {
  background: linear-gradient(
    135deg,
    var(--category-color) 0%,
    var(--category-color-light) 100%
  );
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #e8e8f6;
  background: linear-gradient(135deg, #e8e8f6 0%, #6461f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 控制按钮组 */
.zoom-controls,
.rotation-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(20, 20, 25, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(100, 97, 241, 0.2);
}

.zoom-btn,
.rotation-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #a8a8b6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zoom-btn:hover,
.rotation-btn:hover {
  background: rgba(100, 97, 241, 0.1);
  color: #6461f1;
  transform: scale(1.05);
}

.zoom-level {
  font-size: 12px;
  color: #a8a8b6;
  min-width: 35px;
  text-align: center;
  font-weight: 500;
}

.modal-close {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 107, 107, 0.2);
  transform: scale(1.1);
}

/* 模态框主体 */
.modal-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 0;
  height: calc(100% - 80px);
}

/* 图片查看区域 */
.image-viewer {
  position: relative;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  position: relative;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(100, 97, 241, 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(87, 172, 132, 0.08) 0%,
      transparent 60%
    );
  overflow: hidden;
}

.loading-placeholder {
  width: 400px;
  height: 300px;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
}

.certificate-image-modal {
  max-width: calc(100% - 64px);
  max-height: calc(100% - 64px);
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: grab;
  object-fit: contain;
  user-select: none;
}

.certificate-image-modal:active {
  cursor: grabbing;
}

/* 操作提示 */
.image-controls-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  background: rgba(20, 20, 25, 0.9);
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(100, 97, 241, 0.2);
  backdrop-filter: blur(8px);
}

.hint-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #a8a8b6;
}

.hint-item kbd {
  background: rgba(100, 97, 241, 0.2);
  color: #6461f1;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

/* 图片信息面板 */
.certificate-info-panel {
  padding: 32px;
  background: linear-gradient(135deg, #141419 0%, #1a1a1f 100%);
  border-left: 1px solid rgba(100, 97, 241, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.info-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a8a8b6;
  font-size: 14px;
  font-weight: 500;
}

.info-date svg {
  color: #6461f1;
}

.info-category {
  background: rgba(100, 97, 241, 0.1);
  color: #6461f1;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-description {
  color: #a8a8b6;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-btn.primary {
  background: linear-gradient(135deg, #6461f1 0%, #4f46e5 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(100, 97, 241, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(100, 97, 241, 0.4);
}

.action-btn.secondary {
  background: rgba(100, 97, 241, 0.1);
  color: #6461f1;
  border: 1px solid rgba(100, 97, 241, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(100, 97, 241, 0.15);
  transform: translateY(-1px);
}

/* 动画 */
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .modal-container {
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
  }

  .modal-body {
    grid-template-columns: 1fr;
  }

  .certificate-info-panel {
    border-left: none;
    border-top: 1px solid rgba(100, 97, 241, 0.1);
    padding: 24px;
    height: 300px;
  }

  .modal-header {
    padding: 20px;
  }

  .image-container {
    padding: 20px;
    height: calc(100vh - 400px);
  }
}

@media (max-width: 768px) {
  .image-viewer-modal {
    margin: 10px;
  }

  .modal-container {
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    border-radius: 12px;
  }

  .modal-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  /* 移动端仅保留标题，隐藏徽标气泡 */
  .modal-category-badge {
    display: none;
  }

  /* 移动端隐藏操作提示 */
  .image-controls-hint {
    display: none;
  }

  .modal-header-left {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .modal-header-right {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .zoom-controls,
  .rotation-controls {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }

  .image-container {
    padding: 16px;
    height: calc(100vh - 450px);
  }

  .certificate-info-panel {
    padding: 20px;
    height: 280px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .image-controls-hint {
    flex-wrap: wrap;
    gap: 8px;
    bottom: 10px;
  }

  .hint-item {
    font-size: 10px;
  }
}

/* 极小屏适配（≤480px）：缩小内边距、工具组换行、信息面板更紧凑 */
@media (max-width: 480px) {
  .image-viewer-modal {
    padding: 10px;
  }

  .modal-container {
    border-radius: 10px;
  }

  .modal-header {
    padding: 12px;
    gap: 10px;
  }

  .modal-title {
    font-size: 18px;
    line-height: 24px;
  }

  .modal-header-right {
    flex-wrap: wrap;
    gap: 8px;
  }

  .zoom-controls,
  .rotation-controls {
    padding: 6px 8px;
    gap: 6px;
  }

  .zoom-btn,
  .rotation-btn {
    width: 28px;
    height: 28px;
  }

  .zoom-level {
    min-width: 30px;
    font-size: 11px;
  }

  .modal-body {
    grid-template-columns: 1fr;
    height: calc(100% - 64px);
  }

  .image-container {
    padding: 12px;
  }

  .certificate-image-modal {
    max-width: calc(100% - 24px);
    max-height: calc(100% - 24px);
  }

  .certificate-info-panel {
    padding: 16px;
  }

  .info-description {
    font-size: 13px;
    line-height: 1.5;
  }

  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
