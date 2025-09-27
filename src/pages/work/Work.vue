<template>
  <div class="work">
    <div class="review-container">
      <div class="row-list" id="rowScroll">
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-03.png" />
          <span class="review-text">{{ t.work.reviews.codeQuality }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-01.png" />
          <span class="review-text">{{ t.work.reviews.fullStackAbility }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-02.png" />
          <span class="review-text">{{ t.work.reviews.aiTechnology }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-04.png" />
          <span class="review-text">{{ t.work.reviews.teamwork }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-05.png" />
          <span class="review-text">{{ t.work.reviews.performance }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-06.png" />
          <span class="review-text">{{ t.work.reviews.documentation }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-07.png" />
          <span class="review-text">{{ t.work.reviews.techStack }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-08.png" />
          <span class="review-text">{{ t.work.reviews.database }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-09.png" />
          <span class="review-text">{{
            t.work.reviews.projectManagement
          }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-10.png" />
          <span class="review-text">{{ t.work.reviews.techSelection }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-11.png" />
          <span class="review-text">{{ t.work.reviews.learning }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-12.png" />
          <span class="review-text">{{ t.work.reviews.codeStandards }}</span>
        </div>
        <div class="review-item">
          <img src="/assets/work/asorn-avatar-07.png" />
          <span class="review-text">{{ t.work.reviews.productThinking }}</span>
        </div>
      </div>
    </div>
    <div class="card-list">
      <div class="card-list-category load-pro card-list-history">
        <div class="magical item">
          <a href="https://gitee.com/caixukun66666666" target="_blank">
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name-emoji">🔥</div>
                  <div class="name">{{ t.work.fullStackDev }}</div>
                </div>
              </div>
            </div>
            <div class="cover">
              <img src="/assets/work/qdesign.png" />
              <img class="img-bg" src="/assets/work/img-bg.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://gitee.com/caixukun66666666" target="_blank">
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name-emoji">🔥</div>
                  <div class="name">{{ t.work.aiApplications }}</div>
                </div>
              </div>
            </div>
            <div class="cover">
              <img src="/assets/work/tob.png" />
              <img class="img-bg" src="/assets/work/img-bg.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://gitee.com/caixukun66666666" target="_blank">
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.work.moreProjects }}</div>
                </div>
              </div>
            </div>
            <div class="cover">
              <img src="/assets/work/other.png" />
              <img class="img-bg" src="/assets/work/img-bg.png" />
            </div>
          </a>
        </div>
      </div>
      <div class="category-divider"></div>
      <div class="card-list-category load-pro">
        <div class="magical item">
          <a
            href="https://gitee.com/caixukun66666666/Auto-Gitee"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name-emoji">🔥</div>
                  <div class="name">{{ t.work.autoGitee }}</div>
                </div>
                <div class="tag tag-web">AI</div>
              </div>
              <div class="desc">{{ t.work.autoGiteeDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/cnmp.png" />
              <img class="img-bg" src="/assets/work/img-bg-target.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a
            href="https://gitee.com/caixukun66666666/zixishi-seat-reservation-system"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.work.seatReservation }}</div>
                </div>
                <div class="tag tag-web">Web</div>
              </div>
              <div class="desc">{{ t.work.seatReservationDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/migua.png" />
              <img class="img-bg" src="/assets/work/img-bg-target.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a
            href="https://gitee.com/caixukun66666666/Guigang-CulturalTourism"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name-emoji">🔥</div>
                  <div class="name">{{ t.work.guigangTourism }}</div>
                </div>
                <div class="tag tag-web">Web</div>
              </div>
              <div class="desc">{{ t.work.guigangTourismDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/fuli.png" />
              <img class="img-bg" src="/assets/work/img-bg-app.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a
            href="https://gitee.com/caixukun66666666/examsystem"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.work.examSystem }}</div>
                </div>
                <div class="tag tag-web">Web</div>
              </div>
              <div class="desc">{{ t.work.examSystemDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/anchen.png" />
              <img class="img-bg" src="/assets/work/img-bg-app.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a
            href="https://gitee.com/caixukun66666666/conv_network_face_recognition"
            target="_blank"
          >
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.work.faceRecognition }}</div>
                </div>
                <div class="tag tag-ai">AI</div>
              </div>
              <div class="desc">{{ t.work.faceRecognitionDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/yiboyihui.png" />
              <img class="img-bg" src="/assets/work/img-bg-target.png" />
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://gitee.com/caixukun66666666" target="_blank">
            <div class="text">
              <div class="title-area">
                <div class="title">
                  <div class="name">{{ t.work.ruralRecommendation }}</div>
                </div>
                <div class="tag tag-app">App</div>
              </div>
              <div class="desc">{{ t.work.ruralRecommendationDesc }}</div>
            </div>
            <div class="cover">
              <img src="/assets/work/zdoai.png" />
              <img class="img-bg" src="/assets/work/img-bg-target.png" />
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 视频播放器区域 -->
    <div class="video-section">
      <VideoPlayer :src="videoSrc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useI18n } from "../../composables/useI18n";
import { defineAsyncComponent } from "vue";
const VideoPlayer = defineAsyncComponent(
  () => import("../../components/VideoPlayer.vue")
);

// 使用页面动画
usePageAnimations();

// 使用国际化
const { t, currentLanguage, initLanguage } = useI18n();

const scrollContainer = ref<HTMLElement>();

// 视频源路径
const videoSrc = ref("/《贵港文旅+》网站设计与开发  作品演示录屏.mp4");

onMounted(() => {
  // 初始化语言设置
  initLanguage();

  // 启动滚动动画
  setTimeout(() => {
    const container = document.getElementById("rowScroll");
    if (container) {
      // 克隆所有评论项以实现无缝循环
      const items = container.children;
      const itemsArray = Array.from(items);

      // 复制一份用于无缝滚动
      itemsArray.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        container.appendChild(clone);
      });

      // 启动CSS动画
      container.classList.add("scrolling");
    }
  }, 100);
});
</script>

<style>
/* AI tag styling to match other tags - using global style to ensure it works */
.tag-ai {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 评论区滚动样式 */
.work .review-container {
  width: 100%;
  max-width: var(--mw, 968px);
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #0e0e13 20%,
    #0e0e13 80%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #0e0e13 20%,
    #0e0e13 80%,
    transparent
  );
  margin-bottom: 40px;
}

.work .review-container .row-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  white-space: nowrap;
}

.work .review-container .row-list.scrolling {
  animation: scroll-horizontal 60s linear infinite;
}

.work .review-container .row-list.scrolling:hover {
  animation-play-state: paused;
}

@keyframes scroll-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.work .review-container .row-list .review-item {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  margin-right: 16px;
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    rgba(78, 78, 100, 0.24) 0%,
    rgba(78, 78, 100, 0.12) 100%
  );
  padding: 8px 16px 8px 8px;
  border-radius: 9999px;
}

.work .review-container .row-list .review-item img {
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  margin-right: 8px;
  transition: filter 0.2s;
}

.work .review-container .row-list .review-item .review-text {
  font-size: 13px;
  line-height: 22px;
  color: #a8a8b6;
  transition: color 0.2s;
  white-space: nowrap;
}

/* 视频播放器区域样式 */
.work .video-section {
  width: 100%;
  max-width: var(--mw, 968px);
  margin: 60px auto 0;
  padding: 0 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .work .video-section {
    padding: 0 16px;
    margin-top: 40px;
  }
}
</style>