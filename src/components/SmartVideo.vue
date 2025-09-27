<template>
  <div class="smart-video">
    <!-- 明确渲染，避免首帧挂载到错误线路 -->
    <BilibiliEmbed v-if="activeLine === 'cn'" v-bind="currentPropsCn">
      <template #overlay-top-right>
        <div v-if="availableLines.length > 1" class="line-switcher">
          <button
            v-for="line in availableLines"
            :key="line.key"
            class="line-btn"
            :class="{ active: activeLine === line.key }"
            @click="switchLine(line.key)"
            :title="`切换到${line.label}`"
          >
            {{ line.shortLabel }}
          </button>
        </div>
      </template>
    </BilibiliEmbed>

    <VimeoEmbed v-else-if="activeLine === 'global'" v-bind="currentPropsGlobal">
      <template #overlay-top-right>
        <div v-if="availableLines.length > 1" class="line-switcher">
          <button
            v-for="line in availableLines"
            :key="line.key"
            class="line-btn"
            :class="{ active: activeLine === line.key }"
            @click="switchLine(line.key)"
            :title="`切换到${line.label}`"
          >
            {{ line.shortLabel }}
          </button>
        </div>
      </template>
    </VimeoEmbed>

    <div v-else class="fallback">视频源不可用</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, defineAsyncComponent } from "vue";

// 使用正确组件：Vimeo 走官方嵌入，B 站走官方嵌入
const VimeoEmbed = defineAsyncComponent(() => import("./VimeoEmbed.vue"));
const BilibiliEmbed = defineAsyncComponent(() => import("./BilibiliEmbed.vue"));

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
  bilibiliQuality: 116,
  preferred: "auto",
});

type LineKey = "cn" | "global";

// 初始为 null，避免未决策前渲染任意线路
const activeLine = ref<LineKey | null>(null);

const availableLines = computed(() => {
  const lines: {
    key: LineKey;
    label: string;
    shortLabel: string;
    enabled: boolean;
  }[] = [
    {
      key: "cn",
      label: "国内线路",
      shortLabel: "国内",
      enabled: !!props.bilibiliBvid,
    },
    {
      key: "global",
      label: "国际线路",
      shortLabel: "国际",
      enabled: !!props.vimeoId,
    },
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
  // 同步决策初始线路（不触发错误挂载）
  if (props.preferred === "cn" && props.bilibiliBvid) {
    activeLine.value = "cn";
  } else if (props.preferred === "global" && props.vimeoId) {
    activeLine.value = "global";
  } else if (props.bilibiliBvid && props.vimeoId) {
    activeLine.value = guessIsChinaMainland() ? "cn" : "global";
  } else if (props.bilibiliBvid) {
    activeLine.value = "cn";
  } else if (props.vimeoId) {
    activeLine.value = "global";
  } else {
    activeLine.value = null;
  }

  // 若当前为 global，探测不可达则自动回落到 cn
  if (activeLine.value === "global" && props.bilibiliBvid) {
    const ok = await probeVimeo(1200);
    if (!ok) activeLine.value = "cn";
  }
});

const currentPropsCn = computed(() => ({
  bvid: props.bilibiliBvid,
  title: props.title,
  quality: props.bilibiliQuality,
}));

const currentPropsGlobal = computed(() => ({
  videoId: props.vimeoId,
  title: props.title,
}));

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
  gap: 4px;
}

.line-btn {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  min-width: 32px;
  text-align: center;
}

.line-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.line-btn.active {
  background: #ff6b6b;
  border-color: #ff6b6b;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}
</style>


