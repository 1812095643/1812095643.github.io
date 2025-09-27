<template>
  <div class="smart-video">
    <div class="line-switcher">
      <button
        v-for="line in availableLines"
        :key="line.key"
        class="line-btn"
        :class="{ active: activeLine === line.key }"
        @click="switchLine(line.key)"
      >
        {{ line.label }}
      </button>
    </div>

    <component :is="currentComponent" v-bind="currentProps" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

// 按需加载，避免首屏体积
const VimeoPlayer = () => import("./VimeoPlayer.vue");
const BilibiliEmbed = () => import("./BilibiliEmbed.vue");

interface Props {
  title?: string;
  // 国外线路：Vimeo videoId
  vimeoId?: string;
  // 国内线路：Bilibili BV 号
  bilibiliBvid?: string;
  // B 站默认画质（80=1080P）
  bilibiliQuality?: number;
  // 首选线路：cn | global | auto
  preferred?: "cn" | "global" | "auto";
}

const props = withDefaults(defineProps<Props>(), {
  title: "视频播放",
  bilibiliQuality: 80,
  preferred: "auto",
});

type LineKey = "cn" | "global";

const activeLine = ref<LineKey>("global");

const availableLines = computed(() => {
  const lines: { key: LineKey; label: string; enabled: boolean }[] = [
    { key: "cn", label: "国内线路", enabled: !!props.bilibiliBvid },
    { key: "global", label: "国际线路", enabled: !!props.vimeoId },
  ];
  return lines.filter((l) => l.enabled);
});

// 简单探测：请求 player.vimeo.com 一个轻量资源头部，200-1000ms 为可用，超时则认为不可用
async function probeVimeo(timeoutMs = 1200): Promise<boolean> {
  if (!props.vimeoId) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(
      `https://player.vimeo.com/video/${props.vimeoId}`,
      { method: "HEAD", mode: "no-cors", signal: controller.signal }
    );
    // no-cors 下无法读状态码，能返回即视为可达
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function guessIsChinaMainland(): boolean {
  // 简易判断：时区 + 语言
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language.toLowerCase();
    return (
      tz.includes("Shanghai") ||
      tz.includes("Chongqing") ||
      tz.includes("Beijing") ||
      lang.startsWith("zh")
    );
  } catch {
    return false;
  }
}

onMounted(async () => {
  // 线路优先级
  if (props.preferred === "cn" && props.bilibiliBvid) {
    activeLine.value = "cn";
    return;
  }
  if (props.preferred === "global" && props.vimeoId) {
    activeLine.value = "global";
    return;
  }

  // auto：先按地理猜测，再探测可达性
  const isCN = guessIsChinaMainland();
  if (isCN && props.bilibiliBvid) {
    activeLine.value = "cn";
  } else if (props.vimeoId) {
    activeLine.value = "global";
  }

  // 若选择了 global，再做一次探测，不可达则回落到 cn
  if (activeLine.value === "global" && props.bilibiliBvid) {
    const ok = await probeVimeo(1200);
    if (!ok) activeLine.value = "cn";
  }
});

const currentComponent = computed(() => {
  return activeLine.value === "cn" ? BilibiliEmbed : VimeoPlayer;
});

const currentProps = computed(() => {
  return activeLine.value === "cn"
    ? {
        bvid: props.bilibiliBvid,
        title: props.title,
        quality: props.bilibiliQuality,
      }
    : { videoId: props.vimeoId, title: props.title };
});

function switchLine(key: LineKey) {
  if (key === "cn" && !props.bilibiliBvid) return;
  if (key === "global" && !props.vimeoId) return;
  activeLine.value = key;
}
</script>

<style scoped>
.smart-video {
  width: 100%;
  max-width: 968px;
  margin: 0 auto;
}

.line-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.line-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #e8e8f0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.line-btn.active {
  background: #6c7cff;
  border-color: #6c7cff;
  color: white;
}
</style>


