<template>
  <div class="blog">
    <div class="scroll-indicator">
      <div class="scroll-thumb" :style="{ height: scrollProgress + '%' }"></div>
    </div>
    <div class="blog-list">
      <div class="blog-list-knowledge">
        <div class="magical link-card-item">
          <a href="https://blog.csdn.net/" target="_blank">
            <div
              class="card-img"
              style="background-image: url('/assets/blog/code.svg')"
            ></div>
            <div class="info">
              <div class="info-title">{{ t.blog.knowledgeSpace }}</div>
              <div class="info-desc">{{ t.blog.knowledgeSpaceDesc }}</div>
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
        <div class="magical link-card-item">
          <a href="https://blog.csdn.net/" target="_blank">
            <div
              class="card-img"
              style="background-image: url('/assets/blog/web.svg')"
            ></div>
            <div class="info">
              <div class="info-title">{{ t.blog.techTutorials }}</div>
              <div class="info-desc">{{ t.blog.techTutorialsDesc }}</div>
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
        <div class="magical link-card-item">
          <a href="https://blog.csdn.net/" target="_blank">
            <div
              class="card-img"
              style="background-image: url('/assets/blog/frontend.svg')"
            ></div>
            <div class="info">
              <div class="info-title">{{ t.blog.frontendDev }}</div>
              <div class="info-desc">{{ t.blog.frontendDevDesc }}</div>
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
        <div class="magical link-card-item">
          <a href="https://blog.csdn.net/" target="_blank">
            <div
              class="card-img"
              style="background-image: url('/assets/blog/ai.svg')"
            ></div>
            <div class="info">
              <div class="info-title">{{ t.blog.aiTech }}</div>
              <div class="info-desc">{{ t.blog.aiTechDesc }}</div>
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
        <div class="magical link-card-item">
          <a href="https://github.com/" target="_blank">
            <div
              class="card-img"
              style="background-image: url('/assets/blog/project.svg')"
            ></div>
            <div class="info">
              <div class="info-title">{{ t.blog.projectExp }}</div>
              <div class="info-desc">{{ t.blog.projectExpDesc }}</div>
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
      <div class="blog-list-item">
        <div class="magical blog-recommend">
          <a
            href="https://blog.csdn.net/weixin_44799217/article/details/129513226"
            target="_blank"
          >
            <div class="left-content">
              <img src="/assets/blog/visualcolor.png" />
            </div>
            <div class="right-content">
              <div class="text">
                <div class="title-area">
                  <div class="title">
                    <div class="name-emoji">🔥</div>
                    <div class="name">
                      {{ t.blog.articles.springboot.title }}
                    </div>
                    <div class="name link">↗</div>
                  </div>
                  <div class="tag-text"># {{ t.blog.csdn }}</div>
                </div>
                <div class="desc" id="clampText">
                  {{ t.blog.articles.springboot.desc }}
                </div>
              </div>
              <div class="info">
                <div class="info-time">2024-12-20</div>
              </div>
            </div>
          </a>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/126557618"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">
                    {{ t.blog.articles.microservice.title }}
                  </div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.microservice.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-11-15</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_44977377/article/details/126283666"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.vue3.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.vue3.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-10-28</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/122688049"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.redis.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.redis.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-09-12</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_44977377/article/details/125968761"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.mysql.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.mysql.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-08-25</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/125447892"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.docker.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.docker.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-07-18</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_44977377/article/details/134857239"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">
                    {{ t.blog.articles.ai_integration.title }}
                  </div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.ai_integration.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-06-30</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/135227841"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.langchain.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.langchain.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-05-22</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_44977377/article/details/128956743"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.security.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.security.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-04-15</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/127834562"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">
                    {{ t.blog.articles.performance.title }}
                  </div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.performance.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-03-08</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_44977377/article/details/126789432"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.blog.articles.devops.title }}</div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.devops.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-02-18</div>
            </div>
          </a>
          <div class="content-divider"></div>
        </div>
        <div class="item load-pro">
          <a
            href="https://blog.csdn.net/weixin_45395059/article/details/125998734"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">
                    {{ t.blog.articles.architecture.title }}
                  </div>
                  <div class="name link">↗</div>
                </div>
                <div class="tag-text"># {{ t.blog.csdn }}</div>
              </div>
              <div class="desc">{{ t.blog.articles.architecture.desc }}</div>
            </div>
            <div class="info">
              <div class="info-time">2024-01-25</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useScrollProgress } from "../../composables/useScrollProgress";
import { useI18n } from "../../composables/useI18n";

// 使用页面动画
usePageAnimations();

// 使用滚动进度
const { scrollProgress } = useScrollProgress();

// 使用国际化
const { t } = useI18n();
</script>

<style scoped>
/* Blog页面静态动画效果 */

/* 卡片浮动动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes floatReverse {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(8px);
  }
}

/* SVG图标旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 渐变色彩动画 */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 应用动画到不同元素 */
.link-card-item:nth-child(1) {
  animation: float 6s ease-in-out infinite;
  animation-delay: 0s;
}

.link-card-item:nth-child(2) {
  animation: floatReverse 7s ease-in-out infinite;
  animation-delay: 1s;
}

.link-card-item:nth-child(3) {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}

.link-card-item:nth-child(4) {
  animation: floatReverse 6.5s ease-in-out infinite;
  animation-delay: 3s;
}

.link-card-item:nth-child(5) {
  animation: float 7.5s ease-in-out infinite;
  animation-delay: 4s;
}

/* SVG图标动画和内发光效果 */
.card-img {
  transition: all 0.3s ease;
  position: relative;
}

.card-img::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: inherit;
  background-size: 28px 28px;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(12px) brightness(3) saturate(1.5);
  opacity: 0.9;
  z-index: -1;
}

.link-card-item:hover .card-img {
  animation: rotate 2s linear infinite;
}

.link-card-item:hover .card-img::before {
  filter: blur(16px) brightness(4) saturate(2);
  opacity: 1;
}

/* 推荐文章卡片动画 */
.blog-recommend {
  animation: pulse 4s ease-in-out infinite;
}

.blog-recommend:hover {
  animation: none;
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* 文章列表项微妙动画 */
.item.load-pro:nth-child(even) {
  animation: float 10s ease-in-out infinite;
  animation-delay: 0.5s;
}

.item.load-pro:nth-child(odd) {
  animation: floatReverse 12s ease-in-out infinite;
  animation-delay: 1.5s;
}

/* 标签文字闪烁效果 */
.tag-text {
  animation: pulse 3s ease-in-out infinite;
  animation-delay: 2s;
}

/* 进度条动画增强 */
.scroll-thumb {
  background: linear-gradient(45deg, #3b82f6, #10b981, #8b5cf6, #f59e0b);
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
}

/* 响应式动画控制 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* 悬停时暂停动画 */
.blog-list:hover .link-card-item,
.blog-list:hover .item.load-pro {
  animation-play-state: paused;
}

/* 样式调整：去除磨砂灰白背景，改为透明，风格与 Tool 卡片一致（动画不变） */
.blog .blog-list .blog-list-knowledge .link-card-item {
  background: transparent !important;
  box-shadow: none !important;
}

/* Featured 文章卡片透明化 */
.blog .blog-list .blog-list-item .blog-recommend {
  background: transparent !important;
}

.blog .blog-list .blog-list-item .blog-recommend::before,
.blog .blog-list .blog-list-item .blog-recommend::after {
  display: none !important;
}

.blog .blog-list .blog-list-item .blog-recommend a .left-content {
  background: transparent !important;
  box-shadow: none !important;
}

.blog .blog-list .blog-list-item .blog-recommend a .left-content::before {
  display: none !important;
}

/* 覆盖本页内 magical 的磨砂底与光效，仅在 Blog 中透明化 */
.magical {
  background: transparent !important;
}

.magical::before,
.magical::after {
  display: none !important;
}
</style>