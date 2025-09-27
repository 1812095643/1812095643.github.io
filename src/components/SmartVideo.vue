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

    <div v-else class="fallback">
      <div class="fallback-content">
        <div class="fallback-icon">📺</div>
        <div class="fallback-text">视频源不可用</div>
        <div
          v-if="!vimeoReachable && props.vimeoId && !props.bilibiliBvid"
          class="fallback-hint"
        >
          国际线路网络不可达，建议添加国内备用线路
        </div>
      </div>
    </div>
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
// 记录 Vimeo 是否可达，用于动态隐藏国际线路按钮
const vimeoReachable = ref(true);

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
      enabled: !!props.vimeoId && vimeoReachable.value,
    },
  ];
  return lines.filter((l) => l.enabled);
});

// 改进的探测：尝试请求 Vimeo 的轻量级资源，快速判断网络可达性
async function probeVimeo(timeoutMs = 800): Promise<boolean> {
  if (!props.vimeoId) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // 使用更轻量的探测端点，避免加载完整播放器
    const resp = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${props.vimeoId}`,
      { method: "HEAD", mode: "no-cors", signal: controller.signal }
    );
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

  // 若当前为 global，探测不可达则自动回落到 cn 并隐藏国际按钮
  if (activeLine.value === "global" && props.bilibiliBvid) {
    const ok = await probeVimeo(800);
    if (!ok) {
      vimeoReachable.value = false;
      activeLine.value = "cn";
      console.log("Vimeo 网络不可达，已自动切换到国内线路");
    }
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

/* 兜底界面样式 */
.fallback {
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  overflow: hidden;
}

.fallback-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.fallback-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.fallback-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}

.fallback-hint {
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.4;
}
</style>


