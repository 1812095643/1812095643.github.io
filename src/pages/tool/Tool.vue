<template>
  <div class="tool">
    <div class="scroll-indicator">
      <div class="scroll-thumb" :style="{ height: scrollProgress + '%' }"></div>
    </div>
    
    <!-- 在线工具体验板块 -->
    <OnlineTools />
    
    <!-- 分隔线 -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-text">{{ t.tool.externalTools }}</div>
      <div class="divider-line"></div>
    </div>
    
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
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useScrollProgress } from "../../composables/useScrollProgress";
import { useI18n } from "../../composables/useI18n";

// 使用页面动画、滚动进度和国际化
usePageAnimations();
const { scrollProgress } = useScrollProgress();
const { t } = useI18n();

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

/* 响应式动画控制 */
@media (prefers-reduced-motion: reduce) {
  .tool-list-item,
  .item a .card {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }

  .tool-list-item {
    opacity: 1 !important;
  }
}
</style>
