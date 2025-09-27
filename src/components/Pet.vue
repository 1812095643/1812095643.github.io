<template>
  <div
    class="pet-container"
    ref="petContainer"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @mousedown="onPress"
    @mouseup="onRelease"
    @dblclick.stop="onDblclick"
  >
    <div
      :class="[
        'pet-body',
        `expression-${expression}`,
        useSymbolEyes ? 'symbol-eyes' : '',
      ]"
      ref="petBody"
      @click="toggleChat"
    >
      <div class="eye left-eye" ref="leftEye">
        <div class="pupil"></div>
        <span class="eye-symbol">{{ eyeSymbol("left") }}</span>
        <svg
          class="eye-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <g id="heart">
              <path
                d="M50 70 L25 45 C15 35 25 20 40 25 C46 27 50 32 50 32 C50 32 54 27 60 25 C75 20 85 35 75 45 Z"
                fill="#a5b4fc"
              />
            </g>
            <g id="star">
              <polygon
                points="50,15 58,38 82,38 62,52 70,75 50,60 30,75 38,52 18,38 42,38"
                fill="#a5b4fc"
              />
            </g>
          </defs>
          <use v-if="expression === 'love'" href="#heart" class="shape glow" />
          <use v-if="expression === 'star'" href="#star" class="shape glow" />
        </svg>
        <div class="eye-shape happy"></div>
      </div>
      <div class="eye right-eye" ref="rightEye">
        <div class="pupil"></div>
        <span class="eye-symbol">{{ eyeSymbol("right") }}</span>
        <svg
          class="eye-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <use v-if="expression === 'love'" href="#heart" class="shape glow" />
          <use v-if="expression === 'star'" href="#star" class="shape glow" />
        </svg>
        <div class="eye-shape happy"></div>
      </div>
      <div class="mouth"></div>
    </div>

    <!-- 引导气泡（定时出现，点击切换到聊天） -->
    <div
      class="teaser-bubble"
      v-if="showTeaser"
      @click.stop="openBubbleWithIntro"
    >
      {{ teaserText }}
    </div>

    <!-- 贴靠宠物正下方的聊天气泡（Teleport 到 body，含打字机/流式效果） -->
    <teleport to="body">
      <div
        class="speech-bubble bottom"
        v-if="chatActive"
        @click.stop
        ref="chatBubble"
        :style="bubbleStyle"
      >
        <div
          class="bubble-header"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @click.stop
        >
          <span>AI Pet</span>
          <button
            class="bubble-close"
            @click="toggleChat"
            @mousedown.stop
            @touchstart.stop
          >
            ×
          </button>
        </div>
        <div class="bubble-messages" ref="chatMessages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['msg', msg.sender === 'user' ? 'me' : 'pet']"
            @contextmenu="showMessageMenu($event, msg, index)"
          >
            <div class="msg-content">
              <div
                v-if="msg.sender === 'pet'"
                class="markdown-content"
                v-html="renderMarkdown(msg.text)"
              ></div>
              <div v-else>{{ msg.text }}</div>
            </div>
            <button
              v-if="msg.text && msg.sender === 'pet'"
              class="copy-btn"
              @click="copyMessage(msg.text)"
              title="复制消息"
            >
              📋
            </button>
          </div>
          <div v-if="isStreaming" class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="bubble-input">
          <div class="input-container">
            <textarea
              ref="inputTextarea"
              v-model="userInput"
              @keydown="handleKeyDown"
              @input="adjustTextareaHeight"
              placeholder="和我说点什么..."
              rows="1"
              :disabled="isStreaming"
            ></textarea>
            <div class="input-actions">
              <button
                class="clear-btn"
                @click="clearChat"
                title="清空聊天记录"
                :disabled="messages.length === 0"
              >
                🗑️
              </button>
              <button
                class="send-btn"
                @click="sendMessage"
                :disabled="!userInput.trim() || isStreaming"
                :class="{ sending: isStreaming }"
              >
                {{ isStreaming ? "⏳" : "📤" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from "vue";
import { useChat } from "../composables/useChat";
import { marked } from "marked";

const petContainer = ref<HTMLElement | null>(null);
const petBody = ref<HTMLElement | null>(null);
const leftEye = ref<HTMLElement | null>(null);
const rightEye = ref<HTMLElement | null>(null);
const leftPupil = ref<HTMLElement | null>(null);
const rightPupil = ref<HTMLElement | null>(null);

// --- Expression State ---
const expression = ref("idle"); // idle, happy, squint, wink, surprised, curious, thinking, love, star, shy, angry, sleepy, excited, confused, dizzy, cool, mischievous
let expressionTimeout: any = null;
let isHovering = false;

const setExpression = (
  newExpression: string,
  duration: number | null = null
) => {
  clearTimeout(expressionTimeout);
  expression.value = newExpression;
  if (duration) {
    expressionTimeout = setTimeout(() => {
      if (expression.value === newExpression) expression.value = "idle";
    }, duration);
  }
};

// 是否使用符号眼睛（替换圆形眼球为符号）
const useSymbolEyes = computed(() => {
  const e = expression.value;
  return [
    "happy",
    "squint",
    "wink",
    "surprised",
    "curious",
    "love",
    "star",
    "shy",
    "angry",
    "sleepy",
    "excited",
    "confused",
    "dizzy",
    "cool",
    "mischievous",
  ].includes(e);
});

// 根据表情和左右眼返回符号
function eyeSymbol(side: "left" | "right"): string {
  const e = expression.value;
  switch (e) {
    case "squint":
      return ">f";
    case "wink":
      return side === "left" ? ">f" : "-";
    case "surprised":
      return "o";
    case "curious":
      return side === "left" ? "<" : ">";
    case "love":
      return "❤";
    case "star":
      return "✦";
    case "shy":
      return "^";
    case "angry":
      return side === "left" ? ">" : "<";
    case "sleepy":
      return "︶";
    case "happy":
      return "^";
    case "excited":
      return "★";
    case "confused":
      return "?";
    case "dizzy":
      return "@";
    case "cool":
      return "-";
    case "mischievous":
      return side === "left" ? ">" : "<";
    default:
      return "";
  }
}

// --- Chat State ---
const chatActive = ref(false);
const showTeaser = ref(false);
const teaserText = ref("点我聊天吧！");
const {
  userInput,
  messages,
  isStreaming,
  sendMessage: performSendMessage,
} = useChat();
const chatMessages = ref<HTMLElement | null>(null);
const chatBubble = ref<HTMLElement | null>(null);
const inputTextarea = ref<HTMLElement | null>(null);

// 思考状态联动
watch(isStreaming, (val) => {
  if (val) setExpression("thinking");
  else setExpression("happy", 1500);
});

// 在消息内容发生变化（包括流式逐字追加）时自动滚动到底部
watch(
  messages,
  () => {
    nextTick(scrollToBottom);
  },
  { deep: true }
);

// 鼠标交互
const onHover = () => {
  isHovering = true;
  // 悬停时持续展示更明显的表情
  setExpression(Math.random() > 0.5 ? "love" : "star");
};
const onLeave = () => {
  isHovering = false;
  setExpression("idle");
};
const onPress = () => {
  const expressions = ["squint", "wink", "excited", "mischievous", "cool"];
  const randomExpression =
    expressions[Math.floor(Math.random() * expressions.length)];
  setExpression(randomExpression, 3000);
};
const onRelease = () => setExpression("idle");
const onDblclick = () => {
  const expressions = ["surprised", "dizzy", "confused", "excited"];
  const randomExpression =
    expressions[Math.floor(Math.random() * expressions.length)];
  setExpression(randomExpression, 3000);
};

// 打开聊天（带本地打字机引导）
const openBubbleWithIntro = () => {
  chatActive.value = true;
  showTeaser.value = false;
  nextTick(async () => {
    await anchorBubbleToPet();
    playLocalIntro();
  });
};

const toggleChat = () => {
  // 避免拖拽时误触关闭
  if (isDragging.value) return;

  chatActive.value = !chatActive.value;
  if (chatActive.value) {
    showTeaser.value = false;
    // 定位到宠物下方并显示欢迎语
    nextTick(async () => {
      await anchorBubbleToPet();
      playLocalIntro();
    });
  }
};

// --- 全局事件处理：供导航栏等处触发 ---
const onGlobalOpenChat = () => {
  if (!chatActive.value) {
    chatActive.value = true;
    showTeaser.value = false;
    nextTick(async () => {
      await anchorBubbleToPet();
      playLocalIntro();
    });
  } else if (!bubblePosition.value.isFixed) {
    // 如果已打开但未固定定位，尝试锚定
    nextTick(() => anchorBubbleToPet());
  }
};

const onGlobalToggleChat = () => {
  toggleChat();
};

// 本地打字机欢迎语，不调用API
const playLocalIntro = async () => {
  const hello =
    "你好呀~ (◕‿◕)✨ 我是你的AI智能助手！我可以和你聊天、回答问题、帮你解决疑惑，还能告诉你关于作者的简历信息哦！快来和我互动吧，我会很开心的~ (｀・ω・´)";
  // 如果已经有消息了，就不重复
  if (messages.value.length > 0) return;
  messages.value.push({ sender: "pet", text: "" });
  for (let i = 0; i < hello.length; i++) {
    messages.value[0].text += hello[i];
    await new Promise((r) => setTimeout(r, 30));
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  await performSendMessage();
  nextTick(scrollToBottom);
};

const scrollToBottom = () => {
  if (!chatMessages.value) return;
  chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
};

// Markdown渲染方法
const renderMarkdown = (text: string): string => {
  if (!text) return "";

  // 配置marked选项
  marked.setOptions({
    breaks: true, // 支持换行符转换为<br>
    gfm: true, // 启用GitHub风格的Markdown
  });

  try {
    return marked(text) as string;
  } catch (error) {
    console.error("Markdown parsing error:", error);
    return text; // 如果解析失败，返回原文本
  }
};

// 复制消息到剪贴板
const copyMessage = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // 可以添加一个简单的提示
    console.log("消息已复制到剪贴板");
  } catch (error) {
    console.error("复制失败:", error);
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("消息已复制到剪贴板");
    } catch (fallbackError) {
      console.error("复制失败:", fallbackError);
    }
    document.body.removeChild(textArea);
  }
};

// 清空聊天记录
const clearChat = () => {
  if (confirm("确定要清空所有聊天记录吗？")) {
    messages.value = [];
    localStorage.removeItem("aiPet.chat.v1");
  }
};

// 处理键盘事件
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

// 自动调整textarea高度
const adjustTextareaHeight = () => {
  const textarea = inputTextarea.value as HTMLTextAreaElement;
  if (textarea) {
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 120); // 最大高度120px
    textarea.style.height = newHeight + "px";
  }
};

// 显示消息菜单（右键菜单）
const showMessageMenu = (event: MouseEvent, msg: any, index: number) => {
  event.preventDefault();
  // 这里可以实现一个简单的右键菜单，暂时只是复制功能
  if (msg.sender === "pet" && msg.text) {
    copyMessage(msg.text);
  }
};

// 拖拽功能
const isDragging = ref(false);
const bubblePosition = ref({ x: 0, y: 0, isFixed: false });
const bubbleStyle = computed(() => {
  if (bubblePosition.value.isFixed) {
    return {
      position: "fixed",
      left: `${bubblePosition.value.x}px`,
      top: `${bubblePosition.value.y}px`,
      transform: "none",
      zIndex: 999,
    };
  }
  return {};
});

let dragStartPos = { x: 0, y: 0 };
let dragOffset = { x: 0, y: 0 };

const startDrag = (event: MouseEvent | TouchEvent) => {
  if (!chatBubble.value) return;

  isDragging.value = true;

  // 获取触摸或鼠标位置
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  dragStartPos = { x: clientX, y: clientY };

  // 如果当前不是fixed定位，先获取当前位置并切换到fixed
  if (!bubblePosition.value.isFixed) {
    const rect = chatBubble.value.getBoundingClientRect();
    bubblePosition.value = {
      x: rect.left,
      y: rect.top,
      isFixed: true,
    };
  }

  dragOffset = {
    x: clientX - bubblePosition.value.x,
    y: clientY - bubblePosition.value.y,
  };

  event.preventDefault();
  event.stopPropagation();

  // 禁止文本选择和页面滚动
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.overflow = "hidden";

  // 添加事件监听，使用更高优先级
  document.addEventListener("mousemove", handleDrag, {
    passive: false,
    capture: true,
  });
  document.addEventListener("mouseup", endDrag, {
    passive: false,
    capture: true,
  });
  document.addEventListener("touchmove", handleDrag, {
    passive: false,
    capture: true,
  });
  document.addEventListener("touchend", endDrag, {
    passive: false,
    capture: true,
  });
};

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !chatBubble.value) return;

  event.preventDefault();
  event.stopPropagation();

  // 获取触摸或鼠标位置
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  // 计算新位置
  const newX = clientX - dragOffset.x;
  const newY = clientY - dragOffset.y;

  // 边界限制，增加一些边距
  const margin = 10;
  const maxX = window.innerWidth - chatBubble.value.offsetWidth - margin;
  const maxY = window.innerHeight - chatBubble.value.offsetHeight - margin;

  const constrainedX = Math.max(margin, Math.min(newX, maxX));
  const constrainedY = Math.max(margin, Math.min(newY, maxY));

  // 更新位置
  bubblePosition.value = {
    x: constrainedX,
    y: constrainedY,
    isFixed: true,
  };
};

const endDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  event.preventDefault();
  event.stopPropagation();

  // 恢复文本选择和页面滚动
  document.body.style.userSelect = "";
  document.body.style.webkitUserSelect = "";
  document.body.style.overflow = "";

  // 移除事件监听，注意要使用相同的参数
  document.removeEventListener("mousemove", handleDrag, {
    capture: true,
  } as any);
  document.removeEventListener("mouseup", endDrag, { capture: true } as any);
  document.removeEventListener("touchmove", handleDrag, {
    capture: true,
  } as any);
  document.removeEventListener("touchend", endDrag, { capture: true } as any);

  // 延迟重置拖拽状态，避免点击事件误触
  setTimeout(() => {
    isDragging.value = false;
  }, 150);
};

const resetBubblePosition = () => {
  bubblePosition.value = { x: 0, y: 0, isFixed: false };
};

// 计算并将弹窗锚定到宠物下方（fixed 坐标，避免父级 stacking context 影响）
const anchorBubbleToPet = async (retries = 3) => {
  if (!petContainer.value) return;

  // 等待一帧确保 DOM 和 CSS 都已渲染
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const petRect = petContainer.value.getBoundingClientRect();

  // 检查 petRect 是否有效（初次加载时可能为 0）
  if (petRect.width === 0 || petRect.height === 0) {
    if (retries > 0) {
      // 等待更长时间后重试
      setTimeout(() => anchorBubbleToPet(retries - 1), 100);
      return;
    } else {
      // 最后的兜底：使用默认位置
      console.warn("Pet container rect is invalid, using fallback position");
      bubblePosition.value = { x: 50, y: 200, isFixed: true };
      return;
    }
  }

  const margin = 10;
  const bubbleWidth = chatBubble.value?.offsetWidth ?? 320;
  const bubbleHeight = chatBubble.value?.offsetHeight ?? 260;

  const centerX = petRect.left + petRect.width / 2;
  let left = centerX - bubbleWidth / 2;
  let top = petRect.bottom + 10; // 贴在宠物正下方稍微留白

  // 视口边界限制
  const maxLeft = window.innerWidth - bubbleWidth - margin;
  const maxTop = window.innerHeight - bubbleHeight - margin;
  left = Math.max(margin, Math.min(left, maxLeft));
  top = Math.max(margin, Math.min(top, maxTop));

  bubblePosition.value = {
    x: Math.round(left),
    y: Math.round(top),
    isFixed: true,
  };
};

// 眼睛跟随（每只眼睛独立）+ 轻微倾斜
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
};

// 平滑插值
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

let lp = { x: 0, y: 0 }; // left pupil current offset
let rp = { x: 0, y: 0 }; // right pupil current offset

function computeTarget(eyeEl: HTMLElement | null, amplitude = 14) {
  if (!eyeEl) return { tx: 0, ty: 0 };
  const rect = eyeEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const angle = Math.atan2(mouseY - cy, mouseX - cx);
  const dist = Math.min(amplitude, Math.hypot(mouseX - cx, mouseY - cy) / 12);
  return { tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist };
}

const updateEyes = () => {
  // 符号模式下不做瞳孔跟随，只保留整体轻微倾斜
  if (!useSymbolEyes.value) {
    const { tx: ltx, ty: lty } = computeTarget(leftEye.value);
    const { tx: rtx, ty: rty } = computeTarget(rightEye.value);
    lp.x = lerp(lp.x, ltx, 0.18);
    lp.y = lerp(lp.y, lty, 0.18);
    rp.x = lerp(rp.x, rtx, 0.18);
    rp.y = lerp(rp.y, rty, 0.18);
  } else {
    lp = { x: 0, y: 0 };
    rp = { x: 0, y: 0 };
  }

  // 应用到 transform，避免覆盖原始居中位移
  if (!leftPupil.value)
    leftPupil.value = leftEye.value?.querySelector(
      ".pupil"
    ) as HTMLElement | null;
  if (!rightPupil.value)
    rightPupil.value = rightEye.value?.querySelector(
      ".pupil"
    ) as HTMLElement | null;
  if (leftPupil.value)
    leftPupil.value.style.transform = `translate(-50%, -50%) translate(${lp.x}px, ${lp.y}px)`;
  if (rightPupil.value)
    rightPupil.value.style.transform = `translate(-50%, -50%) translate(${rp.x}px, ${rp.y}px)`;

  // 身体轻微倾斜/浮动
  if (petBody.value) {
    const tiltX = (lp.y + rp.y) * 0.6;
    const tiltY = (lp.x + rp.x) * -0.6;
    petBody.value.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
  requestAnimationFrame(updateEyes);
};

// 引导气泡
let teaserTimer: any;
const startTeaserCycle = () => {
  const teasers = [
    "点我试试~",
    "我会眨眼哦 (≧▽≦)/",
    "问我点什么吧！",
    "看看我会什么～",
  ];
  clearInterval(teaserTimer);
  teaserTimer = setInterval(() => {
    if (chatActive.value) return;
    showTeaser.value = true;
    teaserText.value = teasers[Math.floor(Math.random() * teasers.length)];
    setTimeout(() => (showTeaser.value = false), 2600);
  }, 12000);
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  requestAnimationFrame(updateEyes);
  startTeaserCycle();
  // 窗口尺寸变化时，若气泡打开且未拖拽，重新锚定
  window.addEventListener("resize", handleResize);

  // 全局事件：来自导航栏等处的聊天触发
  window.addEventListener("ai-pet:open", onGlobalOpenChat as EventListener);
  window.addEventListener("ai-pet:toggle", onGlobalToggleChat as EventListener);

  // 确保页面完全加载后，Pet 容器的布局已稳定
  // 这对初次访问页面时的定位计算很重要
  if (document.readyState === "loading") {
    window.addEventListener("load", () => {
      // 页面完全加载后，如果聊天已打开，重新计算位置
      if (chatActive.value && bubblePosition.value.isFixed) {
        setTimeout(() => anchorBubbleToPet(), 100);
      }
    });
  }

  // 偶发表情（更灵动）
  setInterval(() => {
    if (expression.value !== "idle" || chatActive.value || isHovering) return;
    const expressions = [
      "love",
      "star",
      "shy",
      "wink",
      "excited",
      "confused",
      "mischievous",
      "cool",
      "happy",
    ];
    const roll = Math.random();
    if (roll > 0.7) {
      const randomExpression =
        expressions[Math.floor(Math.random() * expressions.length)];
      setExpression(randomExpression, 3000);
    }
  }, 8000);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  clearTimeout(expressionTimeout);
  clearInterval(teaserTimer);
  window.removeEventListener("resize", handleResize);

  // 清理全局事件监听
  window.removeEventListener("ai-pet:open", onGlobalOpenChat as EventListener);
  window.removeEventListener(
    "ai-pet:toggle",
    onGlobalToggleChat as EventListener
  );

  // 清理拖拽事件监听
  document.removeEventListener("mousemove", handleDrag, {
    capture: true,
  } as any);
  document.removeEventListener("mouseup", endDrag, { capture: true } as any);
  document.removeEventListener("touchmove", handleDrag, {
    capture: true,
  } as any);
  document.removeEventListener("touchend", endDrag, { capture: true } as any);
});

// 仅在气泡处于 fixed 且未正在拖拽时重算位置
function handleResize() {
  if (chatActive.value && bubblePosition.value.isFixed && !isDragging.value) {
    anchorBubbleToPet();
  }
}
</script>

<style scoped>
.pet-container {
  position: relative;
  width: 220px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  perspective: 800px;
}

.pet-body {
  position: relative;
  width: 170px;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  animation: float 4s ease-in-out infinite;
  transform-style: preserve-3d;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.eye {
  width: 58px;
  height: 58px;
  background-color: #1e1b4b;
  border-radius: 50%;
  position: relative;
  border: 2px solid rgba(139, 92, 246, 0.4);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.45),
    inset 0 0 8px rgba(99, 102, 241, 0.3);
  transition: all 0.25s ease-in-out;
  overflow: hidden;
}

.pupil {
  width: 12px;
  height: 12px;
  background-color: #a5b4fc;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px #a5b4fc, 0 0 16px #6366f1;
}

/* 符号模式样式：隐藏圆形球体外观，仅显示符号 */
.symbol-eyes .eye {
  background: transparent;
  border-color: rgba(139, 92, 246, 0.25);
  box-shadow: none;
}
.symbol-eyes .pupil,
.symbol-eyes .eye-svg,
.symbol-eyes .eye-shape {
  display: none;
}
.eye-symbol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 34px;
  line-height: 1;
  color: #c7d2fe;
  text-shadow: 0 0 8px #a5b4fc, 0 0 18px #6366f1;
  pointer-events: none;
}

.eye-svg {
  position: absolute;
  inset: 0;
}
.shape.glow {
  filter: drop-shadow(0 0 8px #a5b4fc) drop-shadow(0 0 16px #6366f1);
}

.mouth {
  width: 20px;
  height: 3px;
  background-color: #a5b4fc;
  box-shadow: 0 0 6px #a5b4fc;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
}

.eye-shape {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.25s;
}

/* happy: ^ ^ + w */
.expression-happy .pupil {
  opacity: 0;
}
.expression-happy .eye-shape.happy {
  opacity: 1;
}
.expression-happy .left-eye .eye-shape.happy::before,
.expression-happy .left-eye .eye-shape.happy::after,
.expression-happy .right-eye .eye-shape.happy::before,
.expression-happy .right-eye .eye-shape.happy::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 22px;
  top: 42%;
  left: 50%;
  background: #a5b4fc;
  border-radius: 2px;
  box-shadow: 0 0 10px #a5b4fc;
}
.expression-happy .left-eye .eye-shape.happy::before {
  transform: translate(-50%, -50%) rotate(35deg);
}
.expression-happy .left-eye .eye-shape.happy::after {
  transform: translate(-50%, -50%) rotate(-35deg);
}
.expression-happy .right-eye .eye-shape.happy::before {
  transform: translate(-50%, -50%) rotate(-35deg);
}
.expression-happy .right-eye .eye-shape.happy::after {
  transform: translate(-50%, -50%) rotate(35deg);
}
.expression-happy .mouth {
  background: transparent;
  box-shadow: none;
  width: 28px;
  height: 12px;
  border-bottom: 4px solid #a5b4fc;
  border-radius: 0 0 12px 12px;
}

/* overlay shapes should hide pupils */
.expression-love .pupil,
.expression-star .pupil {
  opacity: 0;
}

/* love/star/wink/curious: 微笑曲线 */
.expression-love .mouth,
.expression-star .mouth,
.expression-wink .mouth,
.expression-curious .mouth {
  background: transparent;
  box-shadow: none;
  width: 26px;
  height: 12px;
  border-bottom: 4px solid #a5b4fc;
  border-radius: 0 0 12px 12px;
}

/* shy: 小幅度笑 + 腮红 */
.expression-shy .mouth {
  background: transparent;
  box-shadow: none;
  width: 20px;
  height: 10px;
  border-bottom: 3px solid #f472b6;
  border-radius: 0 0 12px 12px;
}

/* angry: 倒弧形 */
.expression-angry .mouth {
  background: transparent;
  box-shadow: none;
  width: 22px;
  height: 12px;
  border-top: 4px solid #ef4444;
  border-radius: 12px 12px 0 0;
}

/* sleepy: 微弱下弧 */
.expression-sleepy .mouth {
  background: transparent;
  box-shadow: none;
  width: 18px;
  height: 8px;
  border-bottom: 3px solid #94a3b8;
  border-radius: 0 0 10px 10px;
  opacity: 0.9;
}

/* shy: 加腮红 */
.expression-shy .left-eye::after,
.expression-shy .right-eye::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 14px;
  height: 6px;
  background: rgba(236, 72, 153, 0.5);
  border-radius: 6px;
  filter: blur(1px);
}
.expression-shy .left-eye::after {
  left: 6px;
}
.expression-shy .right-eye::after {
  right: 6px;
}

/* angry: 眼角斜线 */
.expression-angry .left-eye::before,
.expression-angry .right-eye::before {
  content: "";
  position: absolute;
  top: 6px;
  width: 16px;
  height: 2px;
  background: #ef4444;
  box-shadow: 0 0 6px #ef4444;
}
.expression-angry .left-eye::before {
  left: 2px;
  transform: rotate(25deg);
}
.expression-angry .right-eye::before {
  right: 2px;
  transform: rotate(-25deg);
}

/* sleepy: 下垂与半闭 */
.expression-sleepy .pupil {
  transform: translate(-50%, -30%);
  opacity: 0.8;
}
.expression-sleepy .eye {
  box-shadow: inset 0 -10px 12px rgba(99, 102, 241, 0.25),
    0 0 10px rgba(99, 102, 241, 0.25);
}

/* excited: 兴奋表情 */
.expression-excited .pupil {
  width: 16px;
  height: 16px;
  animation: pupilBounce 0.6s ease-in-out infinite;
}
.expression-excited .mouth {
  background: transparent;
  box-shadow: none;
  width: 32px;
  height: 16px;
  border-bottom: 5px solid #10b981;
  border-radius: 0 0 16px 16px;
}

/* confused: 困惑表情 */
.expression-confused .mouth {
  background: transparent;
  box-shadow: none;
  width: 8px;
  height: 8px;
  border: 2px solid #f59e0b;
  border-radius: 50%;
}

/* dizzy: 眩晕表情 */
.expression-dizzy .pupil {
  animation: dizzy 2s linear infinite;
}
.expression-dizzy .mouth {
  background: transparent;
  box-shadow: none;
  width: 24px;
  height: 12px;
  border-top: 3px solid #8b5cf6;
  border-radius: 12px 12px 0 0;
}
@keyframes dizzy {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-50%, -50%) rotate(90deg) scale(1.2);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(-50%, -50%) rotate(270deg) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1);
  }
}

/* cool: 酷酷的表情 */
.expression-cool .mouth {
  background: transparent;
  box-shadow: none;
  width: 16px;
  height: 2px;
  background: #6366f1;
  border-radius: 1px;
}

/* mischievous: 顽皮表情 */
.expression-mischievous .mouth {
  background: transparent;
  box-shadow: none;
  width: 28px;
  height: 14px;
  border-bottom: 4px solid #f59e0b;
  border-radius: 0 0 14px 14px;
  transform: rotate(-3deg);
}

/* squint/blink: >f >f */
.expression-squint .pupil {
  opacity: 0;
}
.expression-squint .eye {
  background: transparent;
  border-color: rgba(139, 92, 246, 0.25);
  box-shadow: none;
}

/* wink: left eye blink */
.expression-wink .left-eye {
  background: transparent;
  border-color: rgba(139, 92, 246, 0.25);
  box-shadow: none;
}
.expression-wink .left-eye .pupil {
  opacity: 0;
}

/* surprised: O O + mouth */
.expression-surprised .pupil {
  width: 18px;
  height: 18px;
}
.expression-surprised .mouth {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #a5b4fc;
}

/* curious: 强化光晕，不再改变 pupil 位置，避免与跟随冲突 */
.expression-curious .pupil {
  box-shadow: 0 0 12px #a5b4fc, 0 0 22px #6366f1;
}

/* thinking: spinning pupils */
.expression-thinking .pupil {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 引导气泡 */
.teaser-bubble {
  position: absolute;
  top: -46px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(30, 27, 75, 0.9);
  color: #e5e7eb;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
  white-space: nowrap;
  font-size: 13px;
}

/* 聊天气泡（宠物正下方） */
.speech-bubble.bottom {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10px);
  width: 320px;
  max-height: 360px;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(99, 102, 241, 0.35);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
  cursor: default;
}
.speech-bubble.bottom::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: rgba(17, 24, 39, 0.95);
  border-left: 1px solid rgba(99, 102, 241, 0.35);
  border-top: 1px solid rgba(99, 102, 241, 0.35);
}

.bubble-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  color: #e5e7eb;
  background: rgba(31, 41, 55, 0.6);
  font-weight: 600;
  cursor: move;
  user-select: none;
}
.bubble-close {
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 18px;
  cursor: pointer;
}

.bubble-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.msg {
  max-width: 85%;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.msg-content {
  flex: 1;
  min-width: 0;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  padding: 2px 4px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.msg:hover .copy-btn {
  opacity: 1;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}
.msg.pet {
  background: rgba(55, 65, 81, 0.6);
  color: #e5e7eb;
  align-self: flex-start;
}
.msg.me {
  background: #2563eb;
  color: white;
  align-self: flex-end;
}

/* Markdown内容样式 */
.markdown-content {
  line-height: 1.6;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin: 8px 0 4px 0;
  font-weight: 600;
  color: #f3f4f6;
}

.markdown-content h1 {
  font-size: 16px;
}
.markdown-content h2 {
  font-size: 15px;
}
.markdown-content h3 {
  font-size: 14px;
}
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  font-size: 13px;
}

.markdown-content p {
  margin: 4px 0;
}

.markdown-content ul,
.markdown-content ol {
  margin: 4px 0;
  padding-left: 16px;
}

.markdown-content li {
  margin: 2px 0;
}

.markdown-content code {
  background: rgba(99, 102, 241, 0.2);
  color: #c7d2fe;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
  font-size: 12px;
}

.markdown-content pre {
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 6px;
  padding: 8px;
  margin: 6px 0;
  overflow-x: auto;
  font-family: "Courier New", monospace;
  font-size: 12px;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: #e5e7eb;
}

.markdown-content blockquote {
  border-left: 3px solid #6366f1;
  margin: 6px 0;
  padding-left: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

.markdown-content a {
  color: #a5b4fc;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #c7d2fe;
}

.markdown-content strong {
  font-weight: 700;
  color: #f3f4f6;
}

.markdown-content em {
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 6px 0;
  font-size: 12px;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid rgba(75, 85, 99, 0.5);
  padding: 4px 6px;
  text-align: left;
}

.markdown-content th {
  background: rgba(55, 65, 81, 0.8);
  font-weight: 600;
}

.markdown-content hr {
  border: none;
  border-top: 1px solid rgba(75, 85, 99, 0.5);
  margin: 8px 0;
}

.typing-dots {
  display: inline-flex;
  gap: 3px;
  padding: 4px;
}
.typing-dots span {
  width: 6px;
  height: 6px;
  background: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 0.9s infinite ease-in-out;
}
.typing-dots span:nth-child(2) {
  animation-delay: 0.15s;
}
.typing-dots span:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-4px);
  }
}

/* 为 excited 表情的瞳孔跳动动画 */
@keyframes pupilBounce {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }
}

.bubble-input {
  padding: 8px;
  border-top: 1px solid rgba(55, 65, 81, 0.8);
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.input-container textarea {
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(75, 85, 99, 0.8);
  background: rgba(31, 41, 55, 0.7);
  color: #e5e7eb;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  min-height: 36px;
  max-height: 120px;
  transition: border-color 0.2s ease;
}

.input-container textarea:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.input-container textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-container textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-actions {
  display: flex;
  gap: 4px;
  align-items: flex-end;
}

.clear-btn,
.send-btn {
  background: rgba(55, 65, 81, 0.8);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn {
  background: #6366f1;
  color: white;
}

.clear-btn:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}

.send-btn:hover:not(:disabled) {
  background: #5855eb;
  transform: translateY(-1px);
}

.send-btn:disabled,
.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.send-btn.sending {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

