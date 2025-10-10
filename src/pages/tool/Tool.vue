<template>
  <div class="tool">
    <div class="scroll-indicator">
      <div class="scroll-thumb" :style="{ height: scrollProgress + '%' }"></div>
    </div>
    
    <!-- 页面标题区域 -->
    <div class="page-header">
      <div class="header-title">
        <svg class="title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1 class="title-text">{{ t.tool.externalTools || '外部工具推荐' }}</h1>
      </div>
      <button class="online-link" @click="openModal">
        <span>{{ t.tool.goOnlineExperience || '去在线体验' }}</span>
        <svg class="link-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <!-- 工具弹窗 -->
    <OnlineTools ref="onlineToolsRef" />
    
    <div class="tool-list">
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/hoppscotch/hoppscotch" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.hoppscotch.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.hoppscotch.desc }}
                </div>
                <div class="time">
                  2024-12-01 · {{ t.tool.hoppscotch.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://jsonformatter.curiousconcept.com/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.jsonformatter.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.jsonformatter.desc }}
                </div>
                <div class="time">
                  2024-11-28 · {{ t.tool.jsonformatter.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://regexr.com/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.regexr.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.regexr.desc }}
                </div>
                <div class="time">
                  2024-11-25 · {{ t.tool.regexr.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://www.base64encode.org/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.base64encoder.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.base64encoder.desc }}
                </div>
                <div class="time">
                  2024-11-22 · {{ t.tool.base64encoder.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://caniuse.com/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.caniuse.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.caniuse.desc }}
                </div>
                <div class="time">
                  2024-11-20 · {{ t.tool.caniuse.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://bundlephobia.com/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.bundlephobia.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.bundlephobia.desc }}
                </div>
                <div class="time">
                  2024-11-18 · {{ t.tool.bundlephobia.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/GoogleChrome/lighthouse" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.lighthouse.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.lighthouse.desc }}
                </div>
                <div class="time">
                  2024-11-15 · {{ t.tool.lighthouse.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://transform.tools/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.transformtools.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.transformtools.desc }}
                </div>
                <div class="time">
                  2024-11-12 · {{ t.tool.transformtools.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a
            href="https://github.com/responsively-org/responsively-app"
            target="_blank"
          >
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.responsively.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.responsively.desc }}
                </div>
                <div class="time">
                  2024-11-10 · {{ t.tool.responsively.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://httpie.io/" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.httpie.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.httpie.desc }}
                </div>
                <div class="time">
                  2024-11-08 · {{ t.tool.httpie.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a
            href="https://github.com/modelcontextprotocol/servers"
            target="_blank"
          >
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.mcpservers.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.mcpservers.desc }}
                </div>
                <div class="time">
                  2024-12-15 · {{ t.tool.mcpservers.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/langchain-ai/langchain" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.langchain.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.langchain.desc }}
                </div>
                <div class="time">
                  2024-12-12 · {{ t.tool.langchain.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/microsoft/autogen" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.autogen.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.autogen.desc }}
                </div>
                <div class="time">
                  2024-12-10 · {{ t.tool.autogen.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a
            href="https://github.com/Significant-Gravitas/AutoGPT"
            target="_blank"
          >
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.autogpt.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.autogpt.desc }}
                </div>
                <div class="time">
                  2024-12-08 · {{ t.tool.autogpt.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/run-llama/llama_index" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.llamaindex.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.llamaindex.desc }}
                </div>
                <div class="time">
                  2024-12-05 · {{ t.tool.llamaindex.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a
            href="https://github.com/anthropics/anthropic-sdk-python"
            target="_blank"
          >
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.anthropicsdk.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.anthropicsdk.desc }}
                </div>
                <div class="time">
                  2024-12-03 · {{ t.tool.anthropicsdk.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="tool-list-item">
        <div class="magical item">
          <a href="https://github.com/openai/openai-python" target="_blank">
            <div class="card">
              <div class="card-left">
                <div class="title">
                  <div class="name">{{ t.tool.openaisdk.name }}</div>
                  <div class="link">↗</div>
                </div>
                <div class="desc">
                  {{ t.tool.openaisdk.desc }}
                </div>
                <div class="time">
                  2024-12-01 · {{ t.tool.openaisdk.category }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useScrollProgress } from "../../composables/useScrollProgress";
import { useI18n } from "../../composables/useI18n";
import OnlineTools from "../../components/OnlineTools.vue";

// 使用页面动画、滚动进度和国际化
usePageAnimations();
const { scrollProgress } = useScrollProgress();
const { t } = useI18n();

// OnlineTools 组件引用
const onlineToolsRef = ref<InstanceType<typeof OnlineTools> | null>(null);

// 打开在线工具弹窗
const openModal = () => {
  onlineToolsRef.value?.openModal();
};

let scrollHandler: (() => void) | null = null;

// Tool页面动画管理
const initToolAnimations = () => {
  const vh = window.innerHeight;

  // 检查并激活可见的工具项
  const checkVisibleItems = () => {
    document.querySelectorAll<HTMLElement>(".tool-list-item").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.8 && rect.bottom >= -100) {
        el.classList.add("active");
      }
    });
  };

  // 立即执行一次检查
  checkVisibleItems();

  // 创建滚动监听器
  scrollHandler = () => {
    checkVisibleItems();
  };

  // 添加滚动监听
  window.addEventListener("scroll", scrollHandler);

  // 防抖处理，确保动画流畅
  let ticking = false;
  const optimizedScrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkVisibleItems();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.removeEventListener("scroll", scrollHandler);
  window.addEventListener("scroll", optimizedScrollHandler);
  scrollHandler = optimizedScrollHandler;
};

onMounted(() => {
  nextTick(() => {
    // 延迟初始化，确保DOM完全渲染
    setTimeout(() => {
      initToolAnimations();
    }, 100);
  });
});

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
});
</script>

<style scoped>
/* Tool页面浮现动画样式 - 使用更高优先级覆盖全局样式 */
.tool .tool-list .tool-list-item {
  opacity: 0 !important;
  transform: translateY(30px) scale(0.95) !important;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.tool .tool-list .tool-list-item:nth-child(odd) {
  flex-direction: row-reverse !important;
}

.tool .tool-list .tool-list-item.active {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
}

/* 闪烁效果关键帧 */
@keyframes shimmer {
  0% {
    box-shadow: 0 0 0 rgba(100, 97, 241, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(100, 97, 241, 0.3);
  }
  100% {
    box-shadow: 0 0 0 rgba(100, 97, 241, 0);
  }
}

/* 浮现后的闪烁效果 */
.tool .tool-list .tool-list-item.active .item {
  animation: shimmer 2s ease-in-out 0.5s !important;
}

/* 增强悬停效果 - 覆盖全局样式 */
.tool .tool-list .tool-list-item:hover {
  transform: translateY(-5px) scale(1.02) !important;
  transition: all 0.3s ease !important;
}

.tool .tool-list .tool-list-item:hover .item {
  box-shadow: 0 10px 30px rgba(100, 97, 241, 0.2) !important;
}

/* 卡片动画 */
.item a .card {
  transition: all 0.3s ease;
}

.item:hover a .card {
  transform: translateY(-2px);
}

/* 分阶段动画延迟 */
.tool-list-item:nth-child(1) {
  transition-delay: 0.1s;
}
.tool-list-item:nth-child(2) {
  transition-delay: 0.2s;
}
.tool-list-item:nth-child(3) {
  transition-delay: 0.3s;
}
.tool-list-item:nth-child(4) {
  transition-delay: 0.4s;
}
.tool-list-item:nth-child(5) {
  transition-delay: 0.5s;
}
.tool-list-item:nth-child(6) {
  transition-delay: 0.6s;
}
.tool-list-item:nth-child(7) {
  transition-delay: 0.7s;
}
.tool-list-item:nth-child(8) {
  transition-delay: 0.8s;
}
.tool-list-item:nth-child(9) {
  transition-delay: 0.9s;
}
.tool-list-item:nth-child(10) {
  transition-delay: 1s;
}
.tool-list-item:nth-child(11) {
  transition-delay: 1.1s;
}
.tool-list-item:nth-child(12) {
  transition-delay: 1.2s;
}
.tool-list-item:nth-child(13) {
  transition-delay: 1.3s;
}
.tool-list-item:nth-child(14) {
  transition-delay: 1.4s;
}
.tool-list-item:nth-child(15) {
  transition-delay: 1.5s;
}
.tool-list-item:nth-child(16) {
  transition-delay: 1.6s;
}
.tool-list-item:nth-child(17) {
  transition-delay: 1.7s;
}
.tool-list-item:nth-child(18) {
  transition-delay: 1.8s;
}

/* 覆盖.tool容器的顶部padding */
.tool {
  padding-top: 80px !important; /* 从128px减少到80px，可调整这个值 */
}

/* 页面标题区域 - 宽屏不对称，窄屏居中 */
.tool .page-header {
  padding: 0 60px 30px 60px !important; /* 左右各60px，确保不覆盖进度条 */
  display: flex !important;
  align-items: flex-end !important;
  gap: 16px !important;
  max-width: 1400px !important;
  width: 100% !important;
  margin: 0 auto !important;
  justify-content: center !important;
  align-self: center !important;
  position: relative !important;
}

.tool .header-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.title-icon {
  width: 28px;
  height: 28px;
  color: #6461F1;
  flex-shrink: 0;
}

.title-text {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #E8E8F6 0%, #A8A8B6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: 0.5px;
}

/* 在线体验链接 */
.online-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  background: none;
  border: none;
  color: #6461F1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;
  flex-shrink: 0;
  white-space: nowrap;
}

.online-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6461F1 0%, #8B5CF6 100%);
  transition: width 0.3s ease;
}

.online-link:hover {
  color: #8B5CF6;
}

.online-link:hover::after {
  width: calc(100% - 26px);
}

.link-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.online-link:hover .link-arrow {
  transform: translateX(4px);
}

/* 响应式样式 - 宽屏不对称，窄屏居中 */
/* 大屏幕 (1024px+) - 不对称布局：只有标题居中，按钮跟随在右侧 */
@media (min-width: 1024px) {
  .tool {
    padding-top: 80px !important; /* 调整这个值来控制标题高度 */
  }
  
  .tool .page-header {
    padding: 0 60px 30px 60px !important;
    justify-content: center !important;
  }
  
  .tool .header-title {
    /* 标题居中，但按钮不参与居中计算 */
    position: relative;
    left: 0;
  }
  
  .tool .online-link {
    /* 按钮紧跟在标题右侧 */
    margin-left: 0;
  }
}

/* 中等屏幕 (768px - 1024px) - 不对称布局 */
@media (max-width: 1023px) and (min-width: 768px) {
  .tool {
    padding-top: 90px !important;
  }
  
  .tool .page-header {
    padding: 0 50px 25px 50px !important;
    gap: 12px !important;
    justify-content: center !important;
  }
}

/* 小平板 (600px - 768px) - 整体居中 */
@media (max-width: 767px) and (min-width: 600px) {
  .tool {
    padding-top: 100px !important;
  }
  
  .tool .page-header {
    padding: 0 40px 20px 40px !important;
    gap: 12px !important;
    justify-content: center !important;
  }

  .title-icon {
    width: 24px;
    height: 24px;
  }

  .title-text {
    font-size: 24px;
  }

  .online-link {
    font-size: 13px;
  }

  .link-arrow {
    width: 14px;
    height: 14px;
  }
}

/* 手机横屏 (480px - 600px) - 整体居中 */
@media (max-width: 599px) and (min-width: 480px) {
  .tool {
    padding-top: 110px !important;
  }
  
  .tool .page-header {
    padding: 0 30px 20px 30px !important;
    gap: 10px !important;
    justify-content: center !important;
  }

  .title-icon {
    width: 22px;
    height: 22px;
  }

  .title-text {
    font-size: 22px;
  }

  .online-link {
    font-size: 12px;
  }

  .link-arrow {
    width: 14px;
    height: 14px;
  }
}

/* 手机竖屏 (< 480px) - 整体居中 */
@media (max-width: 479px) {
  .tool {
    padding-top: 120px !important;
  }
  
  .tool .page-header {
    padding: 0 20px 16px 20px !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
    justify-content: center !important;
  }

  .title-icon {
    width: 20px;
    height: 20px;
  }

  .title-text {
    font-size: 20px;
  }

  .online-link {
    font-size: 11px;
  }

  .link-arrow {
    width: 12px;
    height: 12px;
  }
}

/* 响应式动画控制 */
@media (prefers-reduced-motion: reduce) {
  .tool-list-item,
  .item a .card,
  .online-link,
  .link-arrow {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }

  .tool-list-item {
    opacity: 1 !important;
  }
}
</style>
