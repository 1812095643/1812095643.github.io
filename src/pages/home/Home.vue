<template>
  <div class="index">
    <div class="hello">
      <div class="hello-left">
        <div class="title">
          <div class="title-hi">{{ t.greeting }}</div>
          <a class="title-name text-effect">{{ t.name }}</a>
        </div>
        <div class="hello-introduce">
          {{ t.title }}<span> {{ t.role }} </span>{{ t.status }}，{{ t.introduction }}<br>
          {{ t.detailedIntro }}<span> {{ t.highlight1 }}</span>{{ t.middleText }}
          <span>{{ t.highlight2 }}</span>{{ t.endText }}
        </div>
        <div class="hello-actions">
          <div class="magical primary-btn"><a
              href="#"
              target="_blank">{{ t.downloadResume }}</a></div>
          <div class="magical btn normal-btn">
            <a href='#' target="_blank">{{ t.portfolio }}</a>
            <div class="glowing-border"></div>
          </div>
        </div>
      </div>
      <div class="hello-right">
        <div class="magnetic-field-container">
          <div class="field-zone left-field">
            <div class="magnetic-core">
              <div class="core-ring ring-1"></div>
              <div class="core-ring ring-2"></div>
              <div class="core-ring ring-3"></div>
              <div class="central-orb">
                <div class="orb-glow"></div>
                <div class="orb-pulse"></div>
              </div>
            </div>
            <div class="particle-system">
              <div class="particle p1"></div>
              <div class="particle p2"></div>
              <div class="particle p3"></div>
              <div class="particle p4"></div>
              <div class="particle p5"></div>
              <div class="particle p6"></div>
            </div>
            <div class="field-lines">
              <div class="field-line line-1"></div>
              <div class="field-line line-2"></div>
              <div class="field-line line-3"></div>
            </div>
          </div>
          <div class="field-zone right-field">
            <div class="magnetic-core">
              <div class="core-ring ring-1"></div>
              <div class="core-ring ring-2"></div>
              <div class="core-ring ring-3"></div>
              <div class="central-orb">
                <div class="orb-glow"></div>
                <div class="orb-pulse"></div>
              </div>
            </div>
            <div class="particle-system">
              <div class="particle p1"></div>
              <div class="particle p2"></div>
              <div class="particle p3"></div>
              <div class="particle p4"></div>
              <div class="particle p5"></div>
              <div class="particle p6"></div>
            </div>
            <div class="field-lines">
              <div class="field-line line-1"></div>
              <div class="field-line line-2"></div>
              <div class="field-line line-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="power-list-container load-pro">
        <div class="power-list">
          <div class="power-card load-item" :title="t.skills.frontendDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/web.svg')"></div>
              <div class="title">{{ t.skills.frontend }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.mobileDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/app.svg')"></div>
              <div class="title">{{ t.skills.mobile }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.backendDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/tob.svg')"></div>
              <div class="title">{{ t.skills.backend }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.uxDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/interactive.svg')"></div>
              <div class="title">{{ t.skills.ux }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.architectureDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/assets.svg')"></div>
              <div class="title">{{ t.skills.architecture }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.aiDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/ai.svg')"></div>
              <div class="title">{{ t.skills.ai }}</div>
            </div>
            <span class="power-separator"></span>
          </div>
          <div class="power-card load-item" :title="t.skills.engineeringDesc">
            <div class="power-container">
              <div class="card-img" style="background-image: url('/assets/index/code.svg')"></div>
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
          <a href="https://github.com/roysmee" target="_blank">
            <img src="/assets/index/github.png" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.github }}</div>
              <div class="info-desc">{{ t.social.githubDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://gitee.com/roysmee" target="_blank">
            <img src="/assets/index/Gitee.png" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.gitee }}</div>
              <div class="info-desc">{{ t.social.giteeDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://blog.csdn.net/roysmee" target="_blank">
            <img src="/assets/index/CSDN.png" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.csdn }}</div>
              <div class="info-desc">{{ t.social.csdnDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://2.taobao.com/list/list.htm?spm=2007.1000261.0.0.7ddf3e5dqzQOCD&user_id=roysmee" target="_blank">
            <img src="/assets/index/Xianyu.png" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.xianyu }}</div>
              <div class="info-desc">{{ t.social.xianyuDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://www.douyin.com/user/roysmee" target="_blank">
            <img src="/assets/index/douyin.ico" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.douyin }}</div>
              <div class="info-desc">{{ t.social.douyinDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="magical link-card">
          <a href="https://space.bilibili.com/roysmee" target="_blank">
            <img src="/assets/index/Bilibili.ico" alt="">
            <div class="info">
              <div class="info-title">{{ t.social.bilibili }}</div>
              <div class="info-desc">{{ t.social.bilibiliDesc }}</div>
            </div>
            <div class="icon icon-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                fill="none">
                <path d="M10.55 7.58332H1.16663V6.41665H10.55L7.75415 3.62082L8.5791 2.79587L12.1645 6.3813C12.5062 6.72299 12.5062 7.27701 12.1645 7.61873L8.5791 11.2042L7.75415 10.3792L10.55 7.58332Z"
                  fill="#B3B3C1"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { usePageAnimations } from '../../composables/usePageAnimations'
import { useI18n } from '../../composables/useI18n'

// 使用页面动画
usePageAnimations()

// 使用国际化
const { t, currentLanguage, toggleLanguage, initLanguage } = useI18n()

// 初始化语言设置
onMounted(() => {
  initLanguage()
})

// sticky indicator logic
let powerList: HTMLElement | null = null
let stickyItem: HTMLElement | null = null

function checkScroll() {
  if (!powerList || !stickyItem) return
  const isAtRight = powerList.scrollLeft + powerList.clientWidth >= powerList.scrollWidth
  stickyItem.style.opacity = isAtRight ? '0' : '1'
}

function checkVisibility() {
  if (!powerList || !stickyItem) return
  stickyItem.style.opacity = powerList.scrollWidth > powerList.clientWidth ? '1' : '0'
}

function onResize() {
  checkVisibility()
  checkScroll()
}

onMounted(() => {
  powerList = document.querySelector('.power-list')
  stickyItem = document.querySelector('#sticky-item')
  if (powerList) {
    powerList.addEventListener('scroll', checkScroll)
  }
  window.addEventListener('resize', onResize)
  checkVisibility()
  checkScroll()
})

onBeforeUnmount(() => {
  if (powerList) powerList.removeEventListener('scroll', checkScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>

/* 磁性粒子场设计 */
.magnetic-field-container {
  display: flex;
  align-items: center;
  gap: 4px; /* 极小间距，几乎贴在一起 */
  padding: 30px;
  perspective: 1000px;
}

.field-zone {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.field-zone:hover {
  transform: scale(1.08) rotateY(15deg);
}

.magnetic-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  transition: transform 0.08s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.core-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ringRotate 8s linear infinite;
}

.ring-1 {
  width: 60px;
  height: 60px;
  border-color: rgba(99, 102, 241, 0.3);
  animation-duration: 8s;
  animation-direction: normal;
}

.ring-2 {
  width: 45px;
  height: 45px;
  border-color: rgba(139, 92, 246, 0.4);
  animation-duration: 6s;
  animation-direction: reverse;
}

.ring-3 {
  width: 30px;
  height: 30px;
  border-color: rgba(236, 72, 153, 0.5);
  animation-duration: 4s;
  animation-direction: normal;
}

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.central-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    #6366f1 20%,
    #8b5cf6 60%,
    #1e1b4b 100%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(99, 102, 241, 0.6),
    0 0 40px rgba(99, 102, 241, 0.3),
    inset 0 0 8px rgba(255, 255, 255, 0.2);
  transition: transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.08s ease;
  will-change: transform, box-shadow;
}

.orb-glow {
  position: absolute;
  inset: -5px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.4) 0%,
    rgba(99, 102, 241, 0.2) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: orbGlow 3s ease-in-out infinite;
}

@keyframes orbGlow {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.3);
    opacity: 1;
  }
}

.orb-pulse {
  position: absolute;
  inset: -10px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  animation: orbPulse 2s ease-out infinite;
}

@keyframes orbPulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.particle-system {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(
    circle,
    #ffffff 0%,
    #6366f1 50%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
  transition: transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.08s ease;
  will-change: transform, box-shadow;
}

/* 左磁场粒子 */
.left-field .p1 {
  top: 20%;
  left: 30%;
  animation: particleFloatL1 4.1s ease-in-out infinite;
}

.left-field .p2 {
  top: 70%;
  left: 20%;
  animation: particleFloatL2 3.7s ease-in-out infinite;
}

.left-field .p3 {
  top: 30%;
  right: 25%;
  animation: particleFloatL3 4.3s ease-in-out infinite;
}

.left-field .p4 {
  bottom: 25%;
  right: 30%;
  animation: particleFloatL4 3.9s ease-in-out infinite;
}

.left-field .p5 {
  top: 50%;
  left: 10%;
  animation: particleFloatL5 3.4s ease-in-out infinite;
}

.left-field .p6 {
  top: 60%;
  right: 15%;
  animation: particleFloatL6 4.6s ease-in-out infinite;
}

/* 右磁场粒子 */
.right-field .p1 {
  top: 25%;
  left: 35%;
  animation: particleFloatR1 3.8s ease-in-out infinite;
}

.right-field .p2 {
  top: 65%;
  left: 25%;
  animation: particleFloatR2 4.2s ease-in-out infinite;
}

.right-field .p3 {
  top: 35%;
  right: 20%;
  animation: particleFloatR3 3.6s ease-in-out infinite;
}

.right-field .p4 {
  bottom: 30%;
  right: 35%;
  animation: particleFloatR4 4.4s ease-in-out infinite;
}

.right-field .p5 {
  top: 45%;
  left: 15%;
  animation: particleFloatR5 3.3s ease-in-out infinite;
}

.right-field .p6 {
  top: 55%;
  right: 10%;
  animation: particleFloatR6 4.1s ease-in-out infinite;
}

/* 左磁场粒子动画 */
@keyframes particleFloatL1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  25% { transform: translate(12px, -18px) scale(1.3); opacity: 1; }
  50% { transform: translate(-8px, -22px) scale(0.9); opacity: 0.8; }
  75% { transform: translate(-16px, -12px) scale(1.1); opacity: 0.9; }
}

@keyframes particleFloatL2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  30% { transform: translate(-14px, 10px) scale(1.4); opacity: 1; }
  70% { transform: translate(10px, 18px) scale(0.8); opacity: 0.8; }
}

@keyframes particleFloatL3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  35% { transform: translate(18px, 14px) scale(1.2); opacity: 0.9; }
  65% { transform: translate(-6px, 28px) scale(1.3); opacity: 1; }
}

@keyframes particleFloatL4 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  45% { transform: translate(-20px, -6px) scale(0.9); opacity: 0.8; }
  85% { transform: translate(14px, -24px) scale(1.4); opacity: 1; }
}

@keyframes particleFloatL5 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50% { transform: translate(22px, 16px) scale(1.5); opacity: 1; }
}

@keyframes particleFloatL6 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
  28% { transform: translate(-12px, -20px) scale(0.8); opacity: 0.7; }
  72% { transform: translate(16px, 12px) scale(1.3); opacity: 1; }
}

/* 右磁场粒子动画 */
@keyframes particleFloatR1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  20% { transform: translate(8px, -12px) scale(1.1); opacity: 0.9; }
  60% { transform: translate(-14px, -18px) scale(1.2); opacity: 1; }
  80% { transform: translate(-6px, -8px) scale(0.9); opacity: 0.8; }
}

@keyframes particleFloatR2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  40% { transform: translate(-16px, 6px) scale(1.3); opacity: 1; }
  80% { transform: translate(12px, 22px) scale(0.8); opacity: 0.7; }
}

@keyframes particleFloatR3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  25% { transform: translate(14px, 16px) scale(1.4); opacity: 1; }
  75% { transform: translate(-10px, 24px) scale(1.1); opacity: 0.9; }
}

@keyframes particleFloatR4 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  35% { transform: translate(-22px, -10px) scale(0.9); opacity: 0.8; }
  70% { transform: translate(10px, -26px) scale(1.3); opacity: 1; }
}

@keyframes particleFloatR5 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  55% { transform: translate(18px, 20px) scale(1.4); opacity: 1; }
}

@keyframes particleFloatR6 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
  32% { transform: translate(-8px, -16px) scale(0.8); opacity: 0.7; }
  68% { transform: translate(20px, 8px) scale(1.2); opacity: 1; }
}

.field-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.4;
}

.field-line {
  position: absolute;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(99, 102, 241, 0.3) 20%,
    rgba(139, 92, 246, 0.4) 50%,
    rgba(236, 72, 153, 0.3) 80%,
    transparent 100%
  );
  border-radius: 2px;
  animation: fieldPulse 3s ease-in-out infinite;
  transition: opacity 0.1s ease, box-shadow 0.08s ease;
  will-change: opacity, box-shadow;
}

.line-1 {
  top: 20%;
  left: 10%;
  width: 80%;
  height: 1px;
  transform: rotate(15deg);
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  left: 5%;
  width: 90%;
  height: 1px;
  transform: rotate(-10deg);
  animation-delay: 1s;
}

.line-3 {
  top: 75%;
  left: 15%;
  width: 70%;
  height: 1px;
  transform: rotate(25deg);
  animation-delay: 2s;
}

@keyframes fieldPulse {
  0%, 100% { opacity: 0.2; transform: scale(1) rotate(var(--rotation, 0deg)); }
  50% { opacity: 0.6; transform: scale(1.05) rotate(var(--rotation, 0deg)); }
}

/* 悬停效果增强 */
.field-zone:hover .central-orb {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 
    0 0 30px rgba(99, 102, 241, 0.8),
    0 0 60px rgba(99, 102, 241, 0.4),
    inset 0 0 12px rgba(255, 255, 255, 0.3);
}

.field-zone:hover .particle {
  transform: scale(1.5);
  box-shadow: 0 0 15px rgba(99, 102, 241, 1);
}

.field-zone:hover .core-ring {
  border-color: rgba(99, 102, 241, 0.8);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.field-zone:hover .field-line {
  opacity: 0.8;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}

/* 激活状态 */
.field-zone:active {
  transform: scale(0.95) rotateY(10deg);
}

.field-zone:active .central-orb {
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    #ec4899 20%,
    #be185d 60%,
    #831843 100%
  );
  box-shadow: 
    0 0 25px rgba(236, 72, 153, 0.8),
    0 0 50px rgba(236, 72, 153, 0.4),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
}

/* 左右场差异化 */
.left-field .core-ring {
  animation-delay: 0s;
}

.right-field .core-ring {
  animation-delay: 0.5s;
}

.left-field .orb-glow {
  animation-delay: 0s;
}

.right-field .orb-glow {
  animation-delay: 0.3s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .magnetic-field-container {
    gap: 3px;
    padding: 24px;
  }
  
  .field-zone {
    width: 100px;
    height: 100px;
  }
  
  .magnetic-core {
    width: 50px;
    height: 50px;
  }
  
  .ring-1 { width: 50px; height: 50px; }
  .ring-2 { width: 38px; height: 38px; }
  .ring-3 { width: 25px; height: 25px; }
  
  .central-orb {
    width: 16px;
    height: 16px;
  }
  
  .particle {
    width: 3px;
    height: 3px;
  }
}

@media (max-width: 480px) {
  .magnetic-field-container {
    gap: 2px;
    padding: 20px;
  }
  
  .field-zone {
    width: 80px;
    height: 80px;
  }
  
  .magnetic-core {
    width: 40px;
    height: 40px;
  }
  
  .ring-1 { width: 40px; height: 40px; }
  .ring-2 { width: 30px; height: 30px; }
  .ring-3 { width: 20px; height: 20px; }
  
  .central-orb {
    width: 12px;
    height: 12px;
  }
  
  .particle {
    width: 2px;
    height: 2px;
  }
}
</style>