<template>
  <Transition name="back-to-top">
    <div v-show="isVisible" class="back-to-top-container" @click="scrollToTop">
      <div class="magical back-to-top-btn">
        <div class="btn-content">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6L12 18M12 6L7 11M12 6L17 11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isVisible.value = scrollTop > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 初始检查
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.back-to-top-container {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  cursor: pointer;
}

.back-to-top-btn {
  --circle-size: 280px; /* 更柔和的光照尺寸 */
  --border: 9999px;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background-color: #141419; /* 与全站暗色一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 10px 0px rgba(10, 10, 14, 0.5);
}

/* 仅保留 magical 的hover光照，不做位移动画与颜色变化 */
.back-to-top-btn:hover {
  box-shadow: 0px 2px 12px 0px rgba(10, 10, 14, 0.6);
}

.btn-content {
  color: #e8e8f6; /* 固定为浅色，不随hover变色 */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

/* Hover 时仅略微提升可读性，不改变颜色 */
.back-to-top-btn:hover .btn-content {
  opacity: 1;
}

/* 过渡动画 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-enter-to,
.back-to-top-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .back-to-top-container {
    bottom: 24px;
    right: 24px;
  }

  .back-to-top-btn {
    width: 44px;
    height: 44px;
  }

  .btn-content svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 480px) {
  .back-to-top-container {
    bottom: 20px;
    right: 20px;
  }

  .back-to-top-btn {
    width: 40px;
    height: 40px;
  }

  .btn-content svg {
    width: 12px;
    height: 12px;
  }
}
</style>
