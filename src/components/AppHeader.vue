<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="logo-section">
        <RouterLink to="/" class="logo-link">
          <div class="logo-wrapper">
            <span class="logo-text"> Roy·Smee 个人博客</span>
            <div class="logo-glow"></div>
          </div>
        </RouterLink>
      </div>

      <!-- 主导航菜单 -->
      <nav class="main-nav" role="navigation">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.name" class="nav-item">
            <button
              :class="['nav-button', { active: isActive(item.name) }]"
              @click="go(item.name, $event)"
              :aria-current="isActive(item.name) ? 'page' : undefined"
            >
              <span class="nav-text">{{
                isEnglish ? item.labelEn : item.labelZh
              }}</span>
              <div class="nav-indicator"></div>
            </button>
          </li>
        </ul>
      </nav>

      <!-- 移动端中间“小宠物”按钮（两黑点一横线），用于触发 AI Pet 聊天 -->
      <button
        class="mini-pet-btn"
        @click="triggerAiPet($event)"
        aria-label="Open AI Pet Chat"
      >
        <span class="brows">
          <span class="brow brow-left"></span>
          <span class="brow brow-right"></span>
        </span>
        <span class="eyes">
          <span class="eye"></span>
          <span class="eye"></span>
        </span>
      </button>

      <!-- 功能按钮区域 -->
      <div class="actions-section">
        <!-- 语言切换 -->
        <button
          class="action-btn language-toggle"
          @click="toggleLanguage($event)"
          :title="isEnglish ? '切换到中文' : 'Switch to English'"
        >
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                fill="currentColor"
              />
            </svg>
            <span class="btn-label">{{ isEnglish ? "CN" : "EN" }}</span>
          </div>
          <div class="btn-ripple"></div>
        </button>

        <!-- 全屏切换 -->
        <button
          class="action-btn fullscreen-toggle"
          @click="toggleFullscreen($event)"
          :title="
            isFullscreen
              ? isEnglish
                ? 'Exit Fullscreen'
                : '退出全屏'
              : isEnglish
              ? 'Enter Fullscreen'
              : '进入全屏'
          "
        >
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
              <path
                v-if="!isFullscreen"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                fill="currentColor"
              />
              <path
                v-else
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="btn-ripple"></div>
        </button>

        <!-- 移动端菜单按钮 -->
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu($event)"
          :class="{ active: isMobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <div class="hamburger">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </div>
          <div class="btn-ripple"></div>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMobileMenu"
      >
        <div class="mobile-menu-container">
          <!-- 背景装饰 -->
          <div class="menu-bg-decoration">
            <div class="bg-circle bg-circle-1"></div>
            <div class="bg-circle bg-circle-2"></div>
            <div class="bg-circle bg-circle-3"></div>
            <div class="bg-gradient"></div>
          </div>

          <nav class="mobile-menu" @click.stop role="navigation">
            <!-- 菜单头部 -->
            <div class="mobile-menu-header">
              <div class="header-content">
                <div class="mobile-logo">
                  <div class="logo-icon">
                    <div class="logo-dot"></div>
                  </div>
                  <span class="mobile-logo-text">YGQ的个人博客</span>
                </div>
                <button
                  class="close-btn"
                  @click="closeMobileMenu($event)"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 精简的时间和天气信息 -->
            <div
              class="mobile-info-section"
              :style="{ '--theme-gradient': currentTheme.gradient }"
            >
              <div class="info-row">
                <div class="time-info">
                  <div class="greeting-time">
                    <span class="greeting">{{ timeInfo.greeting }}</span>
                    <span class="time">{{ timeInfo.time }}</span>
                  </div>
                  <div class="date">{{ timeInfo.date }}</div>
                </div>
                <div class="weather-info" v-if="weatherData">
                  <div class="weather-main">
                    <span class="weather-emoji">{{ weatherEmoji }}</span>
                    <div class="weather-text">
                      <span class="temp">{{ weatherData.temp }}°</span>
                      <span class="desc">{{ weatherData.description }}</span>
                    </div>
                  </div>
                  <div class="location">
                    {{ locationData?.city || weatherData.city }}
                  </div>
                </div>
                <div class="weather-loading" v-else>
                  <div class="loading-dot"></div>
                  <span>获取中...</span>
                </div>
              </div>
            </div>

            <!-- 导航菜单 -->
            <div class="mobile-nav-section">
              <ul class="mobile-nav-list">
                <li
                  v-for="(item, index) in menuItems"
                  :key="item.name"
                  class="mobile-nav-item"
                  :style="{ '--delay': `${index * 0.08}s` }"
                >
                  <button
                    :class="[
                      'mobile-nav-button',
                      { active: isActive(item.name) },
                    ]"
                    @click="goMobile(item.name, $event)"
                  >
                    <div class="nav-btn-content">
                      <div class="nav-icon">{{ getNavIcon(item.name) }}</div>
                      <span class="mobile-nav-text">{{
                        isEnglish ? item.labelEn : item.labelZh
                      }}</span>
                      <div class="nav-arrow">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="nav-btn-bg"></div>
                  </button>
                </li>
              </ul>
            </div>

            <!-- 底部操作区域 -->
            <div class="mobile-actions">
              <div class="action-grid">
                <button
                  class="mobile-action-btn"
                  @click="toggleLanguage($event)"
                >
                  <div class="action-btn-content">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="action-label">{{
                      isEnglish ? "中文" : "English"
                    }}</span>
                  </div>
                  <div class="btn-ripple"></div>
                </button>
                <button
                  class="mobile-action-btn"
                  @click="toggleFullscreen($event)"
                >
                  <div class="action-btn-content">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="none">
                      <path
                        v-if="!isFullscreen"
                        d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                        fill="currentColor"
                      />
                      <path
                        v-else
                        d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="action-label">{{
                      isFullscreen ? "退出全屏" : "全屏"
                    }}</span>
                  </div>
                  <div class="btn-ripple"></div>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import {
  weatherService,
  type WeatherData,
  type LocationData,
} from "../utils/weatherService";
import { timeUtils, type TimeInfo } from "../utils/timeUtils";
import { useRippleEffect } from "../utils/rippleEffect";
import { useI18n } from "../composables/useI18n";

const props = defineProps<{
  active: "home" | "work" | "tool" | "blog" | "book" | "about";
  logoSrc?: string;
}>();

const route = useRoute();
const router = useRouter();
const { createColorfulRipple, createMultiLayerRipple } = useRippleEffect();

// 使用国际化
const {
  t,
  currentLanguage,
  toggleLanguage: toggleLang,
  initLanguage,
} = useI18n();

// 响应式状态
const isScrolled = ref(false);
const isEnglish = computed(() => currentLanguage.value === "en");
const isFullscreen = ref(false);
const isMobileMenuOpen = ref(false);
const weatherData = ref<WeatherData | null>(null);
const locationData = ref<LocationData | null>(null);
const timeInfo = ref<TimeInfo>({
  date: "",
  time: "",
  weekday: "",
  period: "",
  greeting: "",
  timeZone: "",
});

// 菜单项配置
const menuItems = [
  { name: "home" as const, labelZh: "首页", labelEn: "Home" },
  { name: "work" as const, labelZh: "项目", labelEn: "Work" },
  { name: "tool" as const, labelZh: "工具", labelEn: "Tools" },
  { name: "blog" as const, labelZh: "知识", labelEn: "Blog" },
  { name: "book" as const, labelZh: "书籍", labelEn: "Books" },
  { name: "about" as const, labelZh: "关于", labelEn: "About" },
];

// 计算属性
const logoSrc = computed(
  () => props.logoSrc || "/assets/public/logo_graph.svg"
);

const weatherEmoji = computed(() => {
  if (!weatherData.value) return "🌤️";
  return weatherService.getWeatherEmoji(weatherData.value.description);
});

const currentTheme = computed(() => {
  const hour = new Date().getHours();
  return timeUtils.getTimeBasedTheme(hour);
});

// 获取导航图标
function getNavIcon(name: string): string {
  const icons: Record<string, string> = {
    home: "🏠",
    work: "💼",
    tool: "🛠️",
    blog: "📚",
    book: "📖",
    about: "👋",
  };
  return icons[name] || "📄";
}

// 判断当前路由是否激活
function isActive(name: "home" | "work" | "tool" | "blog" | "book" | "about") {
  return route.name === name;
}

// 导航跳转（带绽放效果）
function go(
  name: "home" | "work" | "tool" | "blog" | "book" | "about",
  event?: MouseEvent
) {
  if (event) {
    createColorfulRipple(event.currentTarget as HTMLElement, event);
  }
  router.push({ name });
}

// 移动端导航跳转（带绽放效果）
function goMobile(
  name: "home" | "work" | "tool" | "blog" | "book" | "about",
  event?: MouseEvent
) {
  if (event) {
    createMultiLayerRipple(event.currentTarget as HTMLElement, event);
  }
  router.push({ name });
  closeMobileMenu();
}

// 切换语言（带绽放效果）
function toggleLanguage(event?: MouseEvent) {
  if (event) {
    createColorfulRipple(event.currentTarget as HTMLElement, event);
  }
  toggleLang();
}

// 切换全屏（带绽放效果）
function toggleFullscreen(event?: MouseEvent) {
  if (event) {
    createColorfulRipple(event.currentTarget as HTMLElement, event);
  }

  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .then(() => {
        isFullscreen.value = true;
      })
      .catch((err) => {
        console.warn("Failed to enter fullscreen:", err);
      });
  } else {
    document
      .exitFullscreen()
      .then(() => {
        isFullscreen.value = false;
      })
      .catch((err) => {
        console.warn("Failed to exit fullscreen:", err);
      });
  }
}

// 切换移动端菜单（带绽放效果）
function toggleMobileMenu(event?: MouseEvent) {
  if (event) {
    createMultiLayerRipple(event.currentTarget as HTMLElement, event);
  }

  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
    // 菜单打开时刷新天气信息（如果数据为空或过期）
    if (!weatherData.value) {
      fetchWeatherInfo();
    }
  } else {
    document.body.style.overflow = "";
  }
}

// 触发 AI Pet 聊天（分发全局事件）
function triggerAiPet(event?: MouseEvent) {
  if (event) {
    createColorfulRipple(event.currentTarget as HTMLElement, event);
  }
  // 优先打开而不是切换，避免被错误关闭
  window.dispatchEvent(new CustomEvent("ai-pet:open"));
}

// 关闭移动端菜单（带绽放效果）
function closeMobileMenu(event?: MouseEvent) {
  if (event) {
    createColorfulRipple(event.currentTarget as HTMLElement, event);
  }
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

// 滚动监听
function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

// 全屏状态监听
function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement;
}

// 窗口大小变化监听
function handleResize() {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
}

// 更新时间信息
function updateTimeInfo() {
  const timezone = locationData.value?.timezone;
  timeInfo.value = timeUtils.getCurrentTimeInfo(timezone);
}

// 获取天气信息
async function fetchWeatherInfo() {
  try {
    console.log("开始获取天气信息...");
    const { location, weather } = await weatherService.getCompleteWeatherInfo();

    console.log("获取到位置信息:", location);
    console.log("获取到天气信息:", weather);

    locationData.value = location;
    weatherData.value = weather;

    // 更新时间信息（使用获取到的时区）
    updateTimeInfo();

    console.log("天气信息更新完成");
  } catch (error) {
    console.error("获取天气信息失败:", error);
  }
}

// 生命周期
onMounted(() => {
  // 初始化语言设置
  initLanguage();

  // 添加事件监听器
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  window.addEventListener("resize", handleResize);

  // 初始化滚动状态
  handleScroll();

  // 初始化时间信息
  updateTimeInfo();
  const timeInterval = setInterval(updateTimeInfo, 1000);

  // 获取天气信息（延迟加载，避免阻塞页面渲染）
  setTimeout(() => {
    fetchWeatherInfo();
  }, 1000);

  // 清理定时器
  onBeforeUnmount(() => {
    clearInterval(timeInterval);
  });
});

onBeforeUnmount(() => {
  // 清理事件监听器
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  window.removeEventListener("resize", handleResize);

  // 恢复body滚动
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* 现代化导航栏设计 */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 23, 0.65);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: slideDown 0.6s ease-out;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
}

/* 移动端中间小宠物按钮 */
.mini-pet-btn {
  display: none; /* 仅移动端显示，在媒体查询中开启 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  translate: 0 -50%;
  width: 56px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px) saturate(160%);
  -webkit-backdrop-filter: blur(10px) saturate(160%);
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(99, 102, 241, 0.08) inset;
  cursor: pointer;
  padding: 0;
  transition: background 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.mini-pet-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.16),
    rgba(255, 255, 255, 0)
  );
  opacity: 0.65;
  pointer-events: none;
}

.mini-pet-btn::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 75%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.16);
  pointer-events: none;
}

.mini-pet-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(99, 102, 241, 0.14) inset;
}

/* 眉毛（两条斜线） */
.mini-pet-btn .brows {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.mini-pet-btn .brow {
  display: inline-block;
  width: 12px;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.35);
  --brow-rot: 0deg;
  transform: rotate(var(--brow-rot)) scaleY(1);
  animation: brow-express 4.8s infinite;
}

.mini-pet-btn .brow-left {
  --brow-rot: 22deg;
}

.mini-pet-btn .brow-right {
  --brow-rot: -22deg;
}

.mini-pet-btn .eyes {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.mini-pet-btn .eyes::before,
.mini-pet-btn .eyes::after {
  content: "";
  position: absolute;
  top: 8px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 158, 179, 0.7),
    rgba(255, 158, 179, 0) 70%
  );
  filter: blur(0.2px);
  opacity: 0.75;
}

.mini-pet-btn .eyes::before {
  left: -12px;
}

.mini-pet-btn .eyes::after {
  right: -12px;
}

.mini-pet-btn .eye {
  width: 9px;
  height: 9px;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.45);
  transform-origin: center center;
  animation: blink 4.8s infinite;
}

.mini-pet-btn .eye:nth-child(2) {
  animation-delay: 1.2s;
}

.mini-pet-btn .eye::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 2px;
  top: 1px;
  left: 1px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  opacity: 0.9;
}

/* 轻微漂浮，让整体更灵动（不影响定位用 transform） */
.mini-pet-btn .eyes {
  animation: pet-float 6s ease-in-out infinite;
}
.mini-pet-btn .brows {
  animation: pet-float 6s ease-in-out infinite reverse;
}

@keyframes blink {
  0%,
  4%,
  8%,
  100% {
    transform: scaleY(1);
  }
  6% {
    transform: scaleY(0.15);
  }
}

@keyframes brow-express {
  0%,
  4%,
  8%,
  100% {
    transform: rotate(var(--brow-rot)) scaleY(1);
    border-radius: 2px;
  }
  6% {
    transform: rotate(var(--brow-rot)) scaleY(0.5);
    border-radius: 1px;
  }
}

@keyframes pet-float {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-1.5px);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.app-header.scrolled {
  background: rgba(15, 15, 23, 0.85);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo区域 */
.logo-section {
  flex-shrink: 0;
}

.logo-link {
  display: block;
  text-decoration: none;
}

.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.logo-wrapper:hover {
  transform: translateY(-2px) scale(1.02);
}

.logo-text {
  font-family: "STXingkai", "华文行楷", "楷体", "KaiTi", serif;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  z-index: 2;
  position: relative;
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.logo-glow {
  display: none;
}

/* 主导航菜单 */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin: 0 16px 0 40px;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  white-space: nowrap;
}

.nav-button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2),
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-button:hover {
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px) scale(1.05);
}

.nav-button:hover::before {
  opacity: 1;
  transform: scale(1);
}

.nav-button:hover::after {
  width: 100px;
  height: 100px;
}

.nav-button:active {
  transform: translateY(-1px) scale(1.02);
}

.nav-button.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
  transform: translateY(-1px);
}

.nav-button.active::before {
  opacity: 0;
}

.nav-text {
  position: relative;
  z-index: 2;
}

.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
}

.nav-button:hover .nav-indicator {
  width: 70%;
  height: 3px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
}

.nav-button.active .nav-indicator {
  width: 0;
}

/* 功能按钮区域 */
.actions-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.action-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.action-btn:hover::before {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.action-btn:active {
  transform: translateY(-1px) scale(1.05);
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  color: inherit; /* 确保继承父元素颜色 */
}

.btn-icon {
  width: 18px;
  height: 18px;
  color: inherit; /* 确保继承父元素颜色 */
}

.btn-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: inherit; /* 确保继承父元素颜色 */
}

.language-toggle {
  min-width: 50px;
  width: 50px;
}

.language-toggle .btn-content {
  flex-direction: column;
  gap: 2px;
}

.language-toggle .btn-icon {
  width: 14px;
  height: 14px;
}

.btn-ripple {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3),
    transparent 70%
  );
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.action-btn:active .btn-ripple {
  opacity: 1;
  transform: scale(1.2);
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* 移动端菜单按钮 - 与全屏按钮保持一致的大小 */
.mobile-menu-btn {
  display: none;
  position: relative;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.mobile-menu-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.mobile-menu-btn:hover::before {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.mobile-menu-btn:active {
  transform: translateY(-1px) scale(1.05);
}

.hamburger {
  position: relative;
  width: 20px;
  height: 16px;
  z-index: 2;
}

.line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.line-1 {
  top: 0;
}
.line-2 {
  top: 7px;
}
.line-3 {
  top: 14px;
}

.mobile-menu-btn.active .line-1 {
  top: 7px;
  transform: rotate(45deg);
}

.mobile-menu-btn.active .line-2 {
  opacity: 0;
  transform: translateX(20px);
}

.mobile-menu-btn.active .line-3 {
  top: 7px;
  transform: rotate(-45deg);
}

/* 移动端菜单 - 优化尺寸和位置 */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 80px 20px 20px 20px; /* 增加顶部间距，避免被导航栏遮挡 */
}

.mobile-menu-container {
  position: relative;
  width: 100%;
  max-width: 340px;
  /* 移除高度限制，让内容自然适配 */
  overflow: hidden;
}

/* 背景装饰 - 缩小尺寸 */
.menu-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px; /* 缩小圆角 */
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.12),
    rgba(139, 92, 246, 0.12)
  );
  animation: float 6s ease-in-out infinite;
}

.bg-circle-1 {
  width: 80px; /* 缩小 */
  height: 80px;
  top: -40px;
  right: -40px;
  animation-delay: 0s;
}

.bg-circle-2 {
  width: 60px; /* 缩小 */
  height: 60px;
  bottom: 25%;
  left: -30px;
  animation-delay: 2s;
}

.bg-circle-3 {
  width: 40px; /* 缩小 */
  height: 40px;
  top: 35%;
  right: -20px;
  animation-delay: 4s;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(236, 72, 153, 0.05) 100%
  );
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.mobile-menu {
  position: relative;
  width: 100%;
  background: rgba(15, 15, 23, 0.95);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 0 1px rgba(99, 102, 241, 0.1);
  overflow: hidden;
  /* 移除滚动条，确保内容适配 */
}

/* 菜单头部 - 缩小内边距 */
.mobile-menu-header {
  position: relative;
  padding: 20px 24px 16px; /* 缩小内边距 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  position: relative;
  width: 28px; /* 缩小 */
  height: 28px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 8px; /* 缩小圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 12px rgba(99, 102, 241, 0.3); /* 缩小阴影 */
}

.logo-dot {
  width: 6px; /* 缩小 */
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.mobile-logo-text {
  font-family: "STXingkai", "华文行楷", "楷体", "KaiTi", serif;
  font-size: 16px; /* 缩小字体 */
  font-weight: 400;
  color: #ffffff;
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-btn {
  position: relative;
  width: 36px; /* 缩小 */
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px; /* 缩小圆角 */
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.close-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.2),
    rgba(220, 38, 38, 0.2)
  );
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
  border-color: rgba(239, 68, 68, 0.3);
}

.close-btn:hover::before {
  opacity: 1;
  transform: scale(1);
}

.close-btn:active {
  transform: scale(0.95);
}

.close-btn svg {
  position: relative;
  z-index: 2;
  width: 18px; /* 缩小 */
  height: 18px;
}

/* 精简的信息区域 - 与全屏按钮相同的半透明磨砂质感 */
.mobile-info-section {
  position: relative;
  padding: 16px 20px;
  /* 与全屏按钮相同的半透明磨砂质感 */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* 移除不再需要的渐变动画 */

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* 时间信息 */
.time-info {
  flex: 1;
  min-width: 0;
}

.greeting-time {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.greeting {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
}

.time {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  font-family: "Courier New", "SF Mono", monospace;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 1.2;
}

/* 天气信息 */
.weather-info {
  flex-shrink: 0;
  text-align: right;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  justify-content: flex-end;
}

.weather-emoji {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.weather-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.temp {
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
  line-height: 1;
}

.desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: capitalize;
  font-weight: 500;
  line-height: 1;
}

.location {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* 天气加载状态 */
.weather-loading {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.loading-dot {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 导航菜单区域 - 缩小间距 */
.mobile-nav-section {
  padding: 16px 0; /* 缩小内边距 */
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0 20px; /* 缩小内边距 */
  display: flex;
  flex-direction: column;
  gap: 6px; /* 缩小间距 */
}

.mobile-nav-item {
  opacity: 0;
  transform: translateX(30px);
  animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: calc(1s + var(--delay));
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav-button {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 16px;
  overflow: hidden;
}

.nav-btn-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 16px; /* 缩小内边距 */
  gap: 12px; /* 缩小间距 */
}

.nav-icon {
  font-size: 20px; /* 缩小图标 */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.mobile-nav-text {
  flex: 1;
  text-align: left;
  font-size: 15px; /* 缩小字体 */
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.nav-arrow {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-arrow svg {
  width: 100%;
  height: 100%;
}

.nav-btn-bg {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px; /* 缩小圆角 */
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-nav-button:hover .nav-btn-bg {
  opacity: 1;
  transform: scale(1);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.mobile-nav-button:hover .mobile-nav-text {
  color: rgba(255, 255, 255, 0.95);
}

.mobile-nav-button:hover .nav-arrow {
  color: rgba(255, 255, 255, 0.7);
  transform: translateX(4px);
}

.mobile-nav-button:hover .nav-icon {
  transform: scale(1.1);
}

.mobile-nav-button:active {
  transform: scale(0.98);
}

.mobile-nav-button.active .nav-btn-bg {
  opacity: 1;
  transform: scale(1);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.mobile-nav-button.active .mobile-nav-text {
  color: #ffffff;
  font-weight: 700;
}

.mobile-nav-button.active .nav-arrow {
  color: rgba(255, 255, 255, 0.9);
}

.mobile-nav-button.active .nav-icon {
  transform: scale(1.15);
}

/* 底部操作区域 - 与外部导航栏按钮保持一致的半透明磨砂质感 */
.mobile-actions {
  padding: 18px 24px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mobile-action-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 12px;
  border: none;
  /* 与外部导航栏按钮相同的半透明磨砂质感 */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.5s ease-out forwards;
  /* 确保按钮可见 */
  min-height: 60px;
}

.mobile-action-btn:nth-child(1) {
  animation-delay: 1.6s;
}

.mobile-action-btn:nth-child(2) {
  animation-delay: 1.7s;
}

.mobile-action-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.mobile-action-btn:hover::before {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.mobile-action-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.action-btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.action-icon {
  width: 20px;
  height: 20px;
  color: inherit;
  transition: all 0.3s ease;
}

.mobile-action-btn:hover .action-icon {
  color: rgba(255, 255, 255, 0.95);
  transform: scale(1.1);
}

.action-label {
  font-size: 12px;
  font-weight: 600;
  color: inherit;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
}

.mobile-action-btn:hover .action-label {
  color: rgba(255, 255, 255, 0.95);
}

/* 添加涟漪效果 */
.mobile-action-btn .btn-ripple {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3),
    transparent 70%
  );
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-action-btn:active .btn-ripple {
  opacity: 1;
  transform: scale(1.2);
  animation: ripple 0.6s ease-out;
}

/* 过渡动画 */
.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-container,
.mobile-menu-leave-to .mobile-menu-container {
  transform: scale(0.85) translateY(50px);
  opacity: 0;
}

.mobile-menu-enter-from .bg-circle,
.mobile-menu-leave-to .bg-circle {
  transform: scale(0) rotate(180deg);
}

/* 菜单打开时的动画序列 */
.mobile-menu-enter-active .mobile-nav-item {
  animation-play-state: running;
}

.mobile-menu-enter-active .mobile-action-btn {
  animation-play-state: running;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 显示小宠物按钮并居中放置 */
  .mini-pet-btn {
    display: inline-flex;
    /* 让其处于 logo 与 actions 之间的中线，更易点按 */
    z-index: 2;
  }

  .header-container {
    padding: 0 20px;
    height: 56px;
  }

  .actions-section {
    gap: 8px;
  }

  .action-btn {
    min-width: 40px;
    width: 40px;
    height: 40px;
  }

  .language-toggle {
    min-width: 46px;
    width: 46px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 16px;
    height: 52px;
  }

  .logo-text {
    font-size: 18px;
  }

  .mobile-menu-overlay {
    padding: 70px 12px 12px 12px;
  }

  .mobile-menu-container {
    max-width: none;
  }

  .mobile-menu {
    border-radius: 18px;
  }

  .mobile-menu-header {
    padding: 16px 18px 12px;
  }

  .mobile-info-section {
    padding: 14px 18px;
  }

  .info-row {
    gap: 12px;
  }

  .greeting {
    font-size: 13px;
  }

  .time {
    font-size: 16px;
  }

  .date {
    font-size: 11px;
  }

  .weather-emoji {
    font-size: 20px;
  }

  .temp {
    font-size: 14px;
  }

  .desc {
    font-size: 10px;
  }

  .location {
    font-size: 10px;
  }

  .mobile-nav-list {
    padding: 0 16px;
  }

  .nav-btn-content {
    padding: 12px 14px;
    gap: 10px;
  }

  .mobile-actions {
    padding: 16px 18px 18px;
  }

  .action-grid {
    gap: 8px;
  }

  .mobile-action-btn {
    padding: 10px 8px;
  }

  .language-toggle {
    min-width: 40px;
    width: 40px;
  }
}

@media (max-width: 360px) {
  .mobile-menu-overlay {
    padding: 65px 8px 8px 8px;
  }

  .mobile-menu-header {
    padding: 14px 16px 10px;
  }

  .mobile-info-section {
    padding: 12px 16px;
  }

  .info-row {
    gap: 10px;
  }

  .greeting {
    font-size: 12px;
  }

  .time {
    font-size: 15px;
  }

  .date {
    font-size: 10px;
  }

  .weather-emoji {
    font-size: 18px;
  }

  .temp {
    font-size: 13px;
  }

  .desc {
    font-size: 9px;
  }

  .location {
    font-size: 9px;
  }

  .mobile-nav-list {
    padding: 0 14px;
    gap: 4px;
  }

  .nav-btn-content {
    padding: 10px 12px;
    gap: 8px;
  }

  .nav-icon {
    font-size: 18px;
  }

  .mobile-nav-text {
    font-size: 14px;
  }

  .mobile-actions {
    padding: 12px 16px 16px;
  }

  .action-grid {
    gap: 6px;
  }

  .mobile-action-btn {
    padding: 8px 6px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .app-header {
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  .nav-button,
  .action-btn {
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .nav-button.active {
    border-color: #6366f1;
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>