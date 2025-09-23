<template>
  <div class="pet-container" ref="petContainer" @click="toggleChat">
    <div :class="['pet-body', `expression-${expression}`]">
      <div class="eye left-eye" ref="leftEye">
        <div class="pupil"></div>
        <div class="eye-shape happy"></div>
      </div>
      <div class="eye right-eye" ref="rightEye">
        <div class="pupil"></div>
        <div class="eye-shape happy"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="chat-bubble-teaser" v-if="showTeaser">
      {{ teaserText }}
    </div>
    <div class="chat-window" v-if="chatActive">
      <div class="chat-header">
        <span>AI Pet</span>
        <button @click.stop="toggleChat">X</button>
      </div>
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', `${msg.sender}-message`]"
        >
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Say something..."
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import anime from "animejs";
import { useChat } from "../composables/useChat";

const petContainer = ref<HTMLElement | null>(null);
const leftEye = ref<HTMLElement | null>(null);
const rightEye = ref<HTMLElement | null>(null);

// --- Expression State ---
const expression = ref("idle"); // idle, happy, squint, thinking
let expressionTimeout: any = null;

const setExpression = (
  newExpression: string,
  duration: number | null = null
) => {
  clearTimeout(expressionTimeout);
  expression.value = newExpression;
  if (duration) {
    expressionTimeout = setTimeout(() => {
      if (expression.value === newExpression) {
        expression.value = "idle";
      }
    }, duration);
  }
};
// --- End Expression State ---

// --- Chat State ---
const chatActive = ref(false);
const showTeaser = ref(false);
const teaserText = ref("Click me!");
const { userInput, messages, sendMessage: performSendMessage } = useChat();
const chatMessages = ref<HTMLElement | null>(null);

// Watch for AI thinking status
watch(
  messages,
  (newMessages) => {
    const lastMessage = newMessages[newMessages.length - 1];
    if (!lastMessage) return;

    // Detect when a new, empty message from the pet is added, which indicates thinking.
    if (
      lastMessage.sender === "pet" &&
      lastMessage.text === "" &&
      expression.value !== "thinking"
    ) {
      setExpression("thinking");
    }
    // Detect when the pet's message is no longer empty, which means it has finished thinking.
    else if (
      expression.value === "thinking" &&
      lastMessage.sender === "pet" &&
      lastMessage.text !== ""
    ) {
      setExpression("happy", 2000);
    }
  },
  { deep: true }
);

let teaserInterval: any;

const toggleChat = () => {
  chatActive.value = !chatActive.value;
  if (chatActive.value) {
    showTeaser.value = false;
    clearInterval(teaserInterval);
  } else {
    startTeaserCycle();
  }
};

const sendMessage = async () => {
  await performSendMessage();
  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
};

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
};

const updateEyes = () => {
  if (!petContainer.value || !leftEye.value || !rightEye.value) return;

  const petRect = petContainer.value.getBoundingClientRect();
  const petCenterX = petRect.left + petRect.width / 2;
  const petCenterY = petRect.top + petRect.height / 2;

  const angle = Math.atan2(mouseY - petCenterY, mouseX - petCenterX);
  const distance = Math.min(
    6, // Reduced pupil movement range
    Math.hypot(mouseX - petCenterX, mouseY - petCenterY) / 25 // Smoother/slower tracking
  );

  const pupilX = Math.cos(angle) * distance;
  const pupilY = Math.sin(angle) * distance;

  anime({
    targets: [
      leftEye.value.querySelector(".pupil"),
      rightEye.value.querySelector(".pupil"),
    ],
    translateX: pupilX,
    translateY: pupilY,
    duration: 100,
    easing: "easeOutSine",
  });

  requestAnimationFrame(updateEyes);
};

const startTeaserCycle = () => {
  const teasers = ["Hey!", "Click me!", "What's up?", "I'm bored..."];
  teaserInterval = setInterval(() => {
    showTeaser.value = true;
    teaserText.value = teasers[Math.floor(Math.random() * teasers.length)];
    setTimeout(() => {
      showTeaser.value = false;
    }, 2500);
  }, 8000); // Increased delay
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  requestAnimationFrame(updateEyes);

  if (!chatActive.value) {
    startTeaserCycle();
  }

  // Blinking interval
  setInterval(() => {
    if (expression.value === "idle" && !chatActive.value) {
      setExpression("squint", 200);
    }
  }, 4000);

  // Random happy expression interval
  setInterval(() => {
    if (expression.value === "idle" && !chatActive.value) {
      setExpression("happy", 1500);
    }
  }, 10000);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  clearTimeout(expressionTimeout);
  clearInterval(teaserInterval);
});
</script>

<style scoped>
.pet-container {
  position: relative;
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pet-body {
  position: relative;
  width: 150px;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px; /* Space between eyes */
}

.eye {
  width: 55px;
  height: 55px;
  background-color: #1e1b4b; /* Dark indigo from site palette */
  border-radius: 50%;
  position: relative;
  border: 2px solid rgba(139, 92, 246, 0.4); /* Purple glow */
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.5),
    inset 0 0 8px rgba(99, 102, 241, 0.3);
  transition: all 0.25s ease-in-out;
}

.pupil {
  width: 12px;
  height: 12px;
  background-color: #a5b4fc; /* Light indigo */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px #a5b4fc, 0 0 15px #6366f1;
  transition: opacity 0.2s ease-in-out;
}

.mouth {
  width: 20px;
  height: 3px;
  background-color: #a5b4fc;
  box-shadow: 0 0 5px #a5b4fc;
  border-radius: 2px;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
}

/* --- Expressions --- */
.eye-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

/* Happy Expression: ^w^ */
.expression-happy .pupil {
  opacity: 0;
}
.expression-happy .eye-shape.happy {
  opacity: 1;
}
.eye-shape.happy::before,
.eye-shape.happy::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 22px;
  background-color: #a5b4fc;
  box-shadow: 0 0 10px #a5b4fc;
  top: 45%;
  left: 50%;
  border-radius: 2px;
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
  background-color: transparent;
  box-shadow: none;
  width: 25px;
  height: 12px;
  border-bottom: 4px solid #a5b4fc;
  border-radius: 0 0 12px 12px;
}

/* Squint/Blink Expression: -_- */
.expression-squint .pupil {
  opacity: 0;
}
.expression-squint .eye {
  transform: scaleY(0.15);
  background-color: #a5b4fc;
  box-shadow: 0 0 15px #a5b4fc;
}

/* Thinking Expression */
.expression-thinking .pupil {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.chat-bubble-teaser {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #333;
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  font-size: 14px;
  animation: bounce 0.5s ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, -5px) scale(1.05);
  }
}

.chat-window {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

.chat-header {
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.chat-header button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.chat-messages {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 3px;
}

.pet-message {
  background-color: #e9e9eb;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 3px;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 20px;
  margin-right: 10px;
}

.chat-input button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
