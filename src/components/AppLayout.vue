<template>
  <div>
    <FireworksCanvas />
    <AppHeader :active="active" :logoSrc="logoSrc" />
    <MusicPlayer class="global-music-player" />
    <slot />
    <AppFooter />
    <AppWidget />
    <BackToTop />

    <div
      v-if="showMobileToast"
      class="mobile-toast"
      role="status"
      aria-live="polite"
    >
      <span>检测到你在手机或窄屏访问，电脑端体验更佳</span>
      <button class="toast-close" aria-label="关闭" @click="dismissMobileToast">
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import AppWidget from "./AppWidget.vue";
import FireworksCanvas from "./FireworksCanvas.vue";
import MusicPlayer from "./MusicPlayer.vue";
import BackToTop from "./BackToTop.vue";
import { loadScriptsInOrder } from "../utils/scriptLoader";

const props = defineProps<{
  active: "home" | "work" | "tool" | "blog" | "book" | "about";
  logoSrc?: string;
}>();
const active = props.active;
const logoSrc = props.logoSrc;
const route = useRoute();
const router = useRouter(); // 移到setup()顶层

let cleanupFns: Array<() => void> = [];

// —— 移动端/窄屏提示 ——
const showMobileToast = ref(false);
let mobileToastTimer: number | null = null;

function isMobileUserAgent(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Mobile|BlackBerry|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
}

function isNarrowScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 820;
}

function maybeShowMobileToast() {
  const KEY = "ui.mobileToastShown.v1";
  try {
    if (sessionStorage.getItem(KEY) === "1") return;
  } catch {}
  if (isMobileUserAgent() || isNarrowScreen()) {
    showMobileToast.value = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (mobileToastTimer) window.clearTimeout(mobileToastTimer);
    mobileToastTimer = window.setTimeout(() => {
      showMobileToast.value = false;
    }, 6000);
  }
}

function dismissMobileToast() {
  showMobileToast.value = false;
}

const onResizeCheck = () => maybeShowMobileToast();

// 重置页面状态函数
function resetPageState() {
  // 清除之前的事件监听器（除了基础的）
  const scrollListeners = cleanupFns.filter((fn) =>
    fn.toString().includes("scroll")
  );
  scrollListeners.forEach((fn) => fn());

  // 重置magical效果
  setTimeout(() => {
    const magicalElements = document.querySelectorAll<HTMLElement>(".magical");
    magicalElements.forEach((el) => {
      const existingShow = el.querySelector(".show");
      if (existingShow) {
        existingShow.remove();
      }
    });
  }, 100);
}

// 监听路由变化，重置页面状态
watch(
  () => route.path,
  () => {
    nextTick(() => {
      resetPageState();
    });
  },
  { immediate: false }
);

onMounted(async () => {
  // Load animation scripts
  try {
    await loadScriptsInOrder([
      "/js/anime.js",
      "/js/firework.js",
      "/js/main.min.js",
    ]);
  } catch (error) {
    console.warn("Failed to load animation scripts:", error);
  }

  // 初始化基础状态
  resetPageState();

  // Magical hover light effect
  const onMouseMove = (e: MouseEvent) => {
    document.querySelectorAll<HTMLElement>(".magical").forEach((el) => {
      if (!el.querySelector(".show")) {
        el.insertAdjacentHTML("beforeend", "<div class='show'></div>");
      }
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
      const show = el.querySelector<HTMLElement>(".show");
      if (show) {
        show.style.opacity =
          x >= 0 && x <= el.clientWidth && y >= 0 && y <= el.clientHeight
            ? "1"
            : "0";
      }
    });
  };
  window.addEventListener("mousemove", onMouseMove);
  cleanupFns.push(() => window.removeEventListener("mousemove", onMouseMove));

  // 基础的 Intersection Observer（作为备用）
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("visible")
        ) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02 }
  );

  // 延迟观察，让页面级的动画先执行
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>(".load-pro").forEach((el) => {
      if (!el.classList.contains("visible")) {
        io.observe(el);
      }
    });
  }, 1000);

  cleanupFns.push(() => io.disconnect());

  // Scroll indicator height (blog/tool pages)
  const scrollThumb = document.querySelector<HTMLElement>(".scroll-thumb");
  const onScroll = () => {
    if (!scrollThumb) return;
    const pct =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    scrollThumb.style.height = `${pct}%`;
  };
  window.addEventListener("scroll", onScroll);
  cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

  // Header blur
  const head = document.getElementById("headscrollbg") as HTMLElement | null;
  const onScrollBlur = () => {
    if (!head) return;
    if (window.scrollY > 0) {
      (head.style as any).backdropFilter = "blur(4px)";
      (head.style as any).webkitBackdropFilter = "blur(4px)";
    } else {
      (head.style as any).backdropFilter = "blur(0px)";
      (head.style as any).webkitBackdropFilter = "blur(0px)";
    }
  };
  window.addEventListener("scroll", onScrollBlur);
  cleanupFns.push(() => window.removeEventListener("scroll", onScrollBlur));

  // Smooth magnetic field interaction with throttling
  let animationFrameId: number | null = null;
  let lastMouseX = 0;
  let lastMouseY = 0;

  const onMouseMovePupil = (e: MouseEvent) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    if (animationFrameId) return;

    animationFrameId = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".field-zone").forEach((field) => {
        const rect = field.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标相对于磁场中心的角度和距离
        const deltaX = lastMouseX - centerX;
        const deltaY = lastMouseY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // 磁性核心的显著移动 - 增加幅度和响应速度
        const maxCoreDistance = Math.min(rect.width * 0.15, rect.height * 0.15);
        const coreDistance = Math.min(distance * 0.12, maxCoreDistance);

        const magneticCore = field.querySelector<HTMLElement>(".magnetic-core");
        if (magneticCore) {
          const coreX = Math.cos(angle) * coreDistance;
          const coreY = Math.sin(angle) * coreDistance;
          magneticCore.style.transition =
            "transform 0.08s cubic-bezier(0.23, 1, 0.32, 1)";
          magneticCore.style.transform = `translate(-50%, -50%) translate(${coreX}px, ${coreY}px)`;
        }

        // 粒子被鼠标强烈"吸引" - 增加幅度和响应速度
        const particles = field.querySelectorAll<HTMLElement>(".particle");
        particles.forEach((particle, index) => {
          // 使用磁场中心作为参考点，添加更大的偏移
          const particleAngle = angle + index * 0.5; // 增加偏移让粒子分散更自然
          const particleDistance = distance + index * 15; // 减少距离差异，让响应更一致

          // 大幅增加粒子移动强度和范围
          const attractionStrength =
            Math.max(0, 1 - particleDistance / 350) * (0.4 + index * 0.12);
          const maxParticleMove = 25; // 增加最大移动距离
          const particleMove = Math.min(
            attractionStrength * 35,
            maxParticleMove
          );

          const particleX = Math.cos(particleAngle) * particleMove;
          const particleY = Math.sin(particleAngle) * particleMove;

          particle.style.transition =
            "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.08s ease";
          particle.style.transform = `translate(${particleX}px, ${particleY}px) scale(${
            1 + attractionStrength * 0.6
          })`;

          // 增强发光效果
          const glowIntensity = Math.min(0.8 + attractionStrength * 0.5, 1);
          const glowSize = 8 + attractionStrength * 15;
          particle.style.boxShadow = `0 0 ${glowSize}px rgba(99, 102, 241, ${glowIntensity})`;
        });

        // 中央球体强烈响应 - 增加变化幅度和速度
        const centralOrb = field.querySelector<HTMLElement>(".central-orb");
        if (centralOrb) {
          const intensity = Math.max(0, 1 - distance / 220);
          const scale = 1 + intensity * 0.5; // 增加缩放幅度
          const glowIntensity = Math.min(0.6 + intensity * 0.6, 1); // 增加发光强度变化
          const glowSize = 20 + intensity * 25; // 增加发光大小变化

          centralOrb.style.transition =
            "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.08s ease";
          centralOrb.style.transform = `translate(-50%, -50%) scale(${scale})`;
          centralOrb.style.boxShadow = `
            0 0 ${glowSize}px rgba(99, 102, 241, ${glowIntensity}),
            0 0 ${glowSize * 2}px rgba(99, 102, 241, ${glowIntensity * 0.5}),
            inset 0 0 8px rgba(255, 255, 255, 0.2)
          `;
        }

        // 磁场线强烈响应鼠标 - 增加变化幅度和速度
        const fieldLines = field.querySelectorAll<HTMLElement>(".field-line");
        fieldLines.forEach((line) => {
          const lineIntensity = Math.max(0.2, 1 - distance / 250);
          line.style.transition = "opacity 0.1s ease, box-shadow 0.08s ease";
          line.style.opacity = Math.min(
            0.4 + lineIntensity * 0.5,
            0.9
          ).toString(); // 增加透明度变化
          line.style.boxShadow = `0 0 ${
            4 + lineIntensity * 12
          }px rgba(99, 102, 241, ${lineIntensity * 0.5})`; // 增加发光变化
        });
      });

      animationFrameId = null;
    });
  };
  document.addEventListener("mousemove", onMouseMovePupil);
  cleanupFns.push(() =>
    document.removeEventListener("mousemove", onMouseMovePupil)
  );

  // Mobile menu panel
  const mainMenu = document.getElementById("main-menu");
  const panelContent = document.getElementById("menu-panel-content");
  const panel = document.getElementById("menu-panel");
  const expandBtn = document.getElementById("menu-expand-child");
  const closeBtn = document.querySelector(
    ".menu-close-btn"
  ) as HTMLElement | null;

  const closePanel = () => {
    if (!panel || !panelContent) return;
    panel.classList.remove("active");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      panelContent.querySelectorAll("li").forEach((li) => {
        li.classList.remove("active-item");
        li.classList.add("magical", "btn");
      });
    }, 300);
  };

  const openPanel = () => {
    if (!panel || !panelContent || !mainMenu) return;
    panelContent.innerHTML = mainMenu.innerHTML;
    panel.classList.add("active");
    document.body.classList.add("no-scroll");
    panelContent.querySelectorAll("li").forEach((li) => {
      li.classList.remove("magical", "btn");
      li.classList.add("active-item");

      // Bind navigation for cloned menu items
      const routeName = (li as HTMLElement).dataset.route as any;
      li.addEventListener("click", () => {
        if (routeName) {
          router.push({ name: routeName });
        }
        closePanel();
      });
    });
  };

  expandBtn?.addEventListener("click", openPanel);
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closePanel();
  });
  panel?.addEventListener("click", (ev) => {
    if ((ev.target as HTMLElement).classList.contains("menu-close-btn")) return;
    // click outside close icon closes panel
    closePanel();
  });
  const onResize = () => {
    if (window.innerWidth > 968) closePanel();
  };
  window.addEventListener("resize", onResize);
  cleanupFns.push(() => {
    expandBtn?.removeEventListener("click", openPanel);
    closeBtn?.removeEventListener("click", closePanel as any);
    panel?.removeEventListener("click", closePanel as any);
    window.removeEventListener("resize", onResize);
  });

  // Book cover lazy background
  const bookObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const url = el.getAttribute("data-cover-url");
        const front = el.querySelector<HTMLElement>(".b-front");
        if (url && front) {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            front.style.backgroundImage = `url('${url}')`;
          };
        }
        obs.unobserve(el);
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll<HTMLElement>(".book-item")
    .forEach((el) => bookObserver.observe(el));
  cleanupFns.push(() => bookObserver.disconnect());

  // Tool list tilt activation
  const onScrollTool = () => {
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>(".tool-list-item").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.6 && rect.bottom >= 0) el.classList.add("active");
      else el.classList.remove("active");
    });
  };
  window.addEventListener("scroll", onScrollTool);
  cleanupFns.push(() => window.removeEventListener("scroll", onScrollTool));

  // 立即执行一次
  setTimeout(onScrollTool, 500);

  // Email copy with fallback (About page)
  const email = document.getElementById("emailCopied") as HTMLElement | null;
  const copied = document.querySelector(".copied") as HTMLElement | null;
  let emailTimer: number | undefined;
  const showCopied = () => {
    if (!copied) return;
    copied.style.opacity = "1";
    window.clearTimeout(emailTimer);
    emailTimer = window.setTimeout(() => {
      copied.style.opacity = "0";
    }, 1000);
  };
  const onEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(email?.textContent || "");
      showCopied();
    } catch {
      const input = document.createElement("input");
      input.value = email?.textContent || "";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showCopied();
    }
  };
  email?.addEventListener("click", onEmailClick);
  cleanupFns.push(() => email?.removeEventListener("click", onEmailClick));

  // 移动端/窄屏提示（仅会话提示一次）
  maybeShowMobileToast();
  window.addEventListener("resize", onResizeCheck);
  cleanupFns.push(() => window.removeEventListener("resize", onResizeCheck));
  cleanupFns.push(() => {
    if (mobileToastTimer) window.clearTimeout(mobileToastTimer);
    mobileToastTimer = null;
  });
});

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn());
  cleanupFns = [];
});
</script>

<style scoped>
.global-music-player {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 100;
}

.mobile-toast {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  z-index: 10000;
  max-width: 90vw;
  background: rgba(17, 17, 17, 0.9);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 14px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-close {
  appearance: none;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.8;
}

.toast-close:hover {
  opacity: 1;
}
</style>
