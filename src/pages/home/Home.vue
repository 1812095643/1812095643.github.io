<template>
  <div class="index">
    <div class="hello">
      <div class="hello-left">
        <div class="title">
          <div class="title-hi">{{ t.greeting }}</div>
          <a class="title-name text-effect">{{ t.name }}</a>
        </div>
        <div class="hello-introduce">
          {{ t.title }}<span> {{ t.role }} </span>{{ t.status }}，{{
            t.introduction
          }}<br />
          {{ t.detailedIntro }}<span> {{ t.highlight1 }}</span
          >{{ t.middleText }} <span>{{ t.highlight2 }}</span
          >{{ t.endText }}
        </div>
        <div class="hello-actions">
          <div class="magical primary-btn">
            <a href="/简历.pdf" download>{{ t.downloadResume }}</a>
          </div>
          <div class="magical btn normal-btn">
            <a href="https://gitee.com/caixukun66666666" target="_blank">{{
              t.portfolio
            }}</a>
            <div class="glowing-border"></div>
          </div>
        </div>
      </div>
      <div class="hello-right">
        <Pet />
      </div>
    </div>
    <div class="main-content">
      <div class="power-list-container load-pro">
        <div class="power-list">
          <div class="power-card load-item" :title="t.skills.frontendDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/web.svg')"
              ></div>
              <div class="title">{{ t.skills.frontend }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.mobileDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/app.svg')"
              ></div>
              <div class="title">{{ t.skills.mobile }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.backendDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/tob.svg')"
              ></div>
              <div class="title">{{ t.skills.backend }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.uxDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/interactive.svg')"
              ></div>
              <div class="title">{{ t.skills.ux }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.architectureDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/assets.svg')"
              ></div>
              <div class="title">{{ t.skills.architecture }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.aiDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/ai.svg')"
              ></div>
              <div class="title">{{ t.skills.ai }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.engineeringDesc">
            <div class="power-container">
              <div
                class="card-img"
                style="background-image: url('/assets/index/code.svg')"
              ></div>
              <div class="title">{{ t.skills.engineering }}</div>
            </div>
          </div>
          <div class="power-card sticky-item" id="sticky-item">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div class="link-list load-pro">
        <div class="magical link-card">
          <a href="https://github.com/1812095643" target="_blank">
            <img src="/assets/index/github.png" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.github }}</div>
              <div class="info-desc">{{ t.social.githubDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://gitee.com/caixukun66666666" target="_blank">
            <img src="/assets/index/Gitee.png" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.gitee }}</div>
              <div class="info-desc">{{ t.social.giteeDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a
            href="https://blog.csdn.net/m0_66700324?spm=1010.2135.3001.10640"
            target="_blank"
          >
            <img src="/assets/index/CSDN.png" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.csdn }}</div>
              <div class="info-desc">{{ t.social.csdnDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://m.tb.cn/h.S31syW1?tk=mWkI4EoemjQ" target="_blank">
            <img src="/assets/index/Xianyu.png" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.xianyu }}</div>
              <div class="info-desc">{{ t.social.xianyuDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://www.douyin.com/search/1812095943cxk" target="_blank">
            <img src="/assets/index/douyin.ico" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.douyin }}</div>
              <div class="info-desc">{{ t.social.douyinDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://b23.tv/zp94xWR" target="_blank">
            <img src="/assets/index/Bilibili.ico" alt="" />
            <div class="info">
              <div class="info-title">{{ t.social.bilibili }}</div>
              <div class="info-desc">{{ t.social.bilibiliDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div class="tech-stack-section">
        <h3 class="tech-stack-title">{{ t.techStack.title }}</h3>
        <div class="tech-stack-grid">
          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.vue3 }}</div>
              <div class="tech-desc">{{ t.techStack.vue3Desc }}</div>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">📱</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.responsive }}</div>
              <div class="tech-desc">{{ t.techStack.responsiveDesc }}</div>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🔧</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.typescript }}</div>
              <div class="tech-desc">{{ t.techStack.typescriptDesc }}</div>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🏪</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.pinia }}</div>
              <div class="tech-desc">{{ t.techStack.piniaDesc }}</div>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.vite }}</div>
              <div class="tech-desc">{{ t.techStack.viteDesc }}</div>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🌐</div>
            <div class="tech-content">
              <div class="tech-name">{{ t.techStack.i18n }}</div>
              <div class="tech-desc">{{ t.techStack.i18nDesc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useI18n } from "../../composables/useI18n";
// @ts-ignore - shim default export for SFC
import Pet from "../../components/Pet.vue";

// 使用页面动画
usePageAnimations();

// 使用国际化
const { t, currentLanguage, toggleLanguage, initLanguage } = useI18n();

// 初始化语言设置
onMounted(() => {
  initLanguage();
});

// sticky indicator logic
let powerList: HTMLElement | null = null;
let stickyItem: HTMLElement | null = null;

function checkScroll() {
  if (!powerList || !stickyItem) return;
  const isAtRight =
    powerList.scrollLeft + powerList.clientWidth >= powerList.scrollWidth;
  stickyItem.style.opacity = isAtRight ? "0" : "1";
}

function checkVisibility() {
  if (!powerList || !stickyItem) return;
  stickyItem.style.opacity =
    powerList.scrollWidth > powerList.clientWidth ? "1" : "0";
}

function onResize() {
  checkVisibility();
  checkScroll();
}

onMounted(() => {
  powerList = document.querySelector(".power-list");
  stickyItem = document.querySelector("#sticky-item");
  if (powerList) {
    powerList.addEventListener("scroll", checkScroll);
  }
  window.addEventListener("resize", onResize);
  checkVisibility();
  checkScroll();
});

onBeforeUnmount(() => {
  if (powerList) powerList.removeEventListener("scroll", checkScroll);
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
/* Tech Stack Section Styles */
.tech-stack-section {
  margin-top: 40px;
  width: 100%;
  max-width: 968px;
}

.tech-stack-title {
  font-size: 18px;
  font-weight: 600;
  color: #e8e8f6;
  margin-bottom: 20px;
  text-align: center;
}

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  width: 100%;
}

.tech-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 20px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tech-content {
  flex: 1;
}

.tech-name {
  font-size: 14px;
  font-weight: 600;
  color: #e8e8f6;
  margin-bottom: 3px;
}

.tech-desc {
  font-size: 12px;
  color: #b3b3c1;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-stack-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .tech-item {
    padding: 10px;
  }

  .tech-stack-title {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .tech-name {
    font-size: 13px;
  }

  .tech-desc {
    font-size: 11px;
  }

  .tech-icon {
    font-size: 18px;
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .tech-stack-section {
    margin-top: 32px;
  }

  .tech-stack-grid {
    gap: 8px;
  }

  .tech-item {
    padding: 8px;
    gap: 8px;
  }

  .tech-icon {
    font-size: 16px;
    width: 22px;
    height: 22px;
  }

  .tech-stack-title {
    font-size: 15px;
    margin-bottom: 14px;
  }

  .tech-name {
    font-size: 12px;
  }

  .tech-desc {
    font-size: 10px;
  }
}
</style>