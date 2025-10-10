<template>
  <!-- 工具弹窗 -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <!-- 弹窗头部 -->
          <div class="modal-header">
            <h2 class="modal-title">
              {{ t.tool.onlineToolsTitle || "在线工具箱" }}
            </h2>
            <button class="modal-close-btn" @click="closeModal">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <!-- 主内容区域 -->
          <div class="modal-content">
            <!-- 左侧分类栏 -->
            <div class="category-sidebar-wrapper">
              <a-scrollbar style="height: 100%; overflow: auto">
                <div class="category-sidebar">
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    class="category-item"
                    :class="{ active: selectedCategory === category.id }"
                    @click="selectCategory(category.id)"
                  >
                    <span class="category-icon">{{ category.icon }}</span>
                    <span class="category-name">{{ category.name }}</span>
                    <span class="category-count">{{ category.count }}</span>
                  </div>
                </div>
              </a-scrollbar>
            </div>

            <!-- 右侧工具卡片网格 -->
            <div class="tools-grid-wrapper">
              <a-scrollbar style="height: 100%; overflow: auto">
                <div class="tools-grid">
                  <div
                    v-for="tool in filteredTools"
                    :key="tool.id"
                    class="tool-card"
                    @click="handleToolClick(tool)"
                  >
                    <div class="tool-icon">{{ tool.icon }}</div>
                    <div class="tool-info">
                      <h3 class="tool-name">{{ tool.name }}</h3>
                      <p class="tool-desc">{{ tool.desc }}</p>
                    </div>
                    <div class="tool-badge" :class="`badge-${tool.category}`">
                      {{ tool.badge }}
                    </div>
                  </div>
                </div>
              </a-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "../composables/useI18n";

const { t } = useI18n();
const isModalOpen = ref(false);
const selectedCategory = ref("all");

// 分类列表
const categories = ref([
  { id: "all", name: "全部工具", icon: "📦", count: 0 },
  { id: "encode", name: "编码转换", icon: "🔐", count: 0 },
  { id: "format", name: "格式化", icon: "📋", count: 0 },
  { id: "crypto", name: "加密解密", icon: "🔒", count: 0 },
  { id: "time", name: "时间日期", icon: "⏰", count: 0 },
  { id: "image", name: "图片处理", icon: "🖼️", count: 0 },
  { id: "text", name: "文本处理", icon: "📝", count: 0 },
  { id: "dev", name: "开发工具", icon: "🔧", count: 0 },
  { id: "design", name: "设计工具", icon: "🎨", count: 0 },
]);

// 工具列表数据
const tools = ref([
  // 编码转换
  {
    id: 1,
    name: "Base64 编解码",
    desc: "文本与 Base64 互转",
    icon: "🔐",
    badge: "编码",
    category: "encode",
  },
  {
    id: 2,
    name: "URL 编解码",
    desc: "URL 参数编码解码",
    icon: "🔗",
    badge: "编码",
    category: "encode",
  },
  {
    id: 3,
    name: "Unicode 转换",
    desc: "Unicode 编码转换",
    icon: "🔤",
    badge: "编码",
    category: "encode",
  },
  {
    id: 4,
    name: "HTML 实体转换",
    desc: "HTML 特殊字符转换",
    icon: "🌐",
    badge: "编码",
    category: "encode",
  },

  // 格式化
  {
    id: 5,
    name: "JSON 格式化",
    desc: "格式化和验证 JSON 数据",
    icon: "📋",
    badge: "常用",
    category: "format",
  },
  {
    id: 6,
    name: "XML 格式化",
    desc: "XML 代码格式化",
    icon: "📄",
    badge: "格式",
    category: "format",
  },
  {
    id: 7,
    name: "CSS 美化",
    desc: "CSS 代码格式化",
    icon: "💅",
    badge: "格式",
    category: "format",
  },
  {
    id: 8,
    name: "SQL 格式化",
    desc: "SQL 语句格式化",
    icon: "🗄️",
    badge: "格式",
    category: "format",
  },

  // 加密解密
  {
    id: 9,
    name: "MD5 加密",
    desc: "生成 MD5 哈希值",
    icon: "🔒",
    badge: "加密",
    category: "crypto",
  },
  {
    id: 10,
    name: "SHA 加密",
    desc: "SHA-1/256/512 加密",
    icon: "🔐",
    badge: "加密",
    category: "crypto",
  },
  {
    id: 11,
    name: "AES 加解密",
    desc: "AES 对称加密",
    icon: "🛡️",
    badge: "加密",
    category: "crypto",
  },
  {
    id: 12,
    name: "RSA 加解密",
    desc: "RSA 非对称加密",
    icon: "🔑",
    badge: "加密",
    category: "crypto",
  },

  // 时间日期
  {
    id: 13,
    name: "时间戳转换",
    desc: "时间戳与日期互转",
    icon: "⏰",
    badge: "时间",
    category: "time",
  },
  {
    id: 14,
    name: "日期计算器",
    desc: "日期差值计算",
    icon: "📅",
    badge: "时间",
    category: "time",
  },
  {
    id: 15,
    name: "时区转换",
    desc: "不同时区时间转换",
    icon: "🌍",
    badge: "时间",
    category: "time",
  },

  // 图片处理
  {
    id: 16,
    name: "二维码生成",
    desc: "文本转二维码",
    icon: "📱",
    badge: "图片",
    category: "image",
  },
  {
    id: 17,
    name: "图片压缩",
    desc: "在线压缩图片",
    icon: "🖼️",
    badge: "图片",
    category: "image",
  },
  {
    id: 18,
    name: "图片转 Base64",
    desc: "图片与 Base64 互转",
    icon: "🎴",
    badge: "图片",
    category: "image",
  },
  {
    id: 19,
    name: "颜色选择器",
    desc: "RGB/HEX/HSL 互转",
    icon: "🎨",
    badge: "设计",
    category: "image",
  },

  // 文本处理
  {
    id: 20,
    name: "Markdown 预览",
    desc: "Markdown 实时预览",
    icon: "📝",
    badge: "文本",
    category: "text",
  },
  {
    id: 21,
    name: "Diff 对比",
    desc: "文本差异对比",
    icon: "📊",
    badge: "文本",
    category: "text",
  },
  {
    id: 22,
    name: "文本统计",
    desc: "字数、行数统计",
    icon: "📈",
    badge: "文本",
    category: "text",
  },
  {
    id: 23,
    name: "大小写转换",
    desc: "文本大小写转换",
    icon: "🔠",
    badge: "文本",
    category: "text",
  },

  // 开发工具
  {
    id: 24,
    name: "正则测试",
    desc: "正则表达式在线测试",
    icon: "🔍",
    badge: "开发",
    category: "dev",
  },
  {
    id: 25,
    name: "UUID 生成",
    desc: "生成唯一标识符",
    icon: "🆔",
    badge: "开发",
    category: "dev",
  },
  {
    id: 26,
    name: "JWT 解析",
    desc: "JWT Token 解析",
    icon: "🎫",
    badge: "开发",
    category: "dev",
  },
  {
    id: 27,
    name: "Cron 表达式",
    desc: "Cron 表达式生成",
    icon: "⏲️",
    badge: "开发",
    category: "dev",
  },

  // 设计工具
  {
    id: 28,
    name: "渐变生成器",
    desc: "CSS 渐变生成",
    icon: "🌈",
    badge: "设计",
    category: "design",
  },
  {
    id: 29,
    name: "阴影生成器",
    desc: "CSS 阴影生成",
    icon: "🌑",
    badge: "设计",
    category: "design",
  },
  {
    id: 30,
    name: "字体预览",
    desc: "在线字体预览",
    icon: "🔤",
    badge: "设计",
    category: "design",
  },
]);

// 计算每个分类的工具数量
const updateCategoryCounts = () => {
  categories.value.forEach((cat) => {
    if (cat.id === "all") {
      cat.count = tools.value.length;
    } else {
      cat.count = tools.value.filter((tool) => tool.category === cat.id).length;
    }
  });
};
updateCategoryCounts();

// 根据选中的分类过滤工具
const filteredTools = computed(() => {
  if (selectedCategory.value === "all") {
    return tools.value;
  }
  return tools.value.filter((tool) => tool.category === selectedCategory.value);
});

// 选择分类
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};

const handleToolClick = (tool: any) => {
  console.log("工具点击:", tool.name);
  // 这里后续可以添加具体工具的实现逻辑
};

const openModal = () => {
  isModalOpen.value = true;
  document.body.classList.add("no-scroll");
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.classList.remove("no-scroll");
};

// 暴露方法给父组件
defineExpose({
  openModal,
});
</script>

<style scoped>
/* 移除所有点击高亮效果 */
* {
  -webkit-tap-highlight-color: transparent !important;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(14, 14, 19, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal-container {
  background: #141419;
  border-radius: 16px;
  width: 100%;
  max-width: 1100px;
  height: 85vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(78, 78, 100, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid rgba(78, 78, 100, 0.2);
  background: #141419;
  z-index: 10;
  flex-shrink: 0;
}

.modal-title {
  font-size: 22px; /* 从24px缩小到22px */
  font-weight: 700;
  color: #e8e8f6;
  margin: 0;
}

.modal-close-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(78, 78, 100, 0.2);
  border: none;
  border-radius: 8px;
  color: #a8a8b6;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: rgba(100, 97, 241, 0.2);
  color: #6461f1;
  transform: rotate(90deg);
}

/* 主内容区域 */
.modal-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧分类栏容器 */
.category-sidebar-wrapper {
  width: 200px;
  flex-shrink: 0;
  background: rgba(20, 20, 25, 0.5);
  border-right: 1px solid rgba(78, 78, 100, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.category-sidebar {
  padding: 16px 0;
  min-height: 100%;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 0;
}

.category-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #6461f1 0%, #8b5cf6 100%);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(100, 97, 241, 0.5);
}

.category-item:hover {
  background: rgba(100, 97, 241, 0.1);
  transform: translateX(4px);
}

.category-item.active {
  background: rgba(100, 97, 241, 0.15);
  color: #6461f1;
  transform: translateX(4px);
}

.category-item.active::before {
  transform: scaleY(1);
}

.category-icon {
  font-size: 18px;
  line-height: 1;
}

.category-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #e8e8f6;
}

.category-item.active .category-name {
  color: #6461f1;
}

.category-count {
  font-size: 12px;
  color: #a8a8b6;
  background: rgba(78, 78, 100, 0.3);
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 24px;
  text-align: center;
}

.category-item.active .category-count {
  background: rgba(100, 97, 241, 0.2);
  color: #6461f1;
}

/* 工具卡片网格容器 */
.tools-grid-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tools-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
  gap: 14px;
  padding: 20px;
  align-content: start;
  min-height: 100%;
  width: 100% !important;
  box-sizing: border-box;
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)) !important;
  }
}

/* 中等屏幕优化 */
@media (min-width: 900px) and (max-width: 1199px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)) !important;
  }
}

.tool-card {
  --border: 12px;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 10px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: visible;
  background-color: #141419;
  border-radius: var(--border);
  box-shadow: 0px 0px 8px 0px rgba(10, 10, 14, 0.4);
  border: 1px solid rgba(78, 78, 100, 0.3);
}

/* 去除聚光灯效果：不再使用 ::before */

/* 确保内容位于聚光灯之上 */
.tool-card .tool-icon,
.tool-card .tool-info {
  position: relative;
  z-index: 1;
}

/* 由于已移除 magical，全局的 .show 不会被插入，这里无需处理 */

/* 悬停时不做任何变换，只靠光晕和内容高亮 */
.tool-card:hover {
  /* 无变换 */
}

/* 按下时缩小，松开后回弹 - 不改变背景 */
.tool-card:active {
  transform: scale(0.97);
  transition: transform 0.1s ease;
  outline: none !important;
}

/* 已与全局 magical 隔离，无需移除 ::after 覆盖 */

/* 移动端触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .tool-card {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tool-card:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
    outline: none !important;
  }

  .category-item:hover {
    transform: none;
    background: rgba(100, 97, 241, 0.1);
  }

  .category-item:active {
    transform: scale(0.95);
    outline: none !important;
    -webkit-tap-highlight-color: transparent !important;
  }
}

.tool-icon {
  font-size: 32px;
  line-height: 1;
  transition: opacity 0.4s ease, filter 0.3s ease;
  opacity: 0.5;
  filter: brightness(1);
}

.tool-card:hover .tool-icon {
  opacity: 1;
}

/* 按下时图标发光效果 */
.tool-card:active .tool-icon {
  filter: brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
  transition: filter 0.1s ease;
}

.tool-info {
  flex: 1;
}

.tool-name {
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(
    180deg,
    #e8e8f6 0%,
    rgba(232, 232, 246, 0.72) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 5px 0;
  transition: opacity 0.4s ease;
  opacity: 0.7;
}

.tool-card:hover .tool-name {
  opacity: 1;
}

.tool-desc {
  font-size: 12px;
  color: #a8a8b6;
  margin: 0;
  line-height: 1.4;
  transition: opacity 0.4s ease;
  opacity: 0.6;
}

.tool-card:hover .tool-desc {
  opacity: 1;
}

.tool-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 500;
  padding: 3px 8px;
  background: rgba(100, 97, 241, 0.15);
  color: #6461f1;
  border-radius: 9999px;
  border: 1px solid rgba(100, 97, 241, 0.25);
  transition: all 0.4s ease;
  backdrop-filter: blur(4px);
  z-index: 2;
  opacity: 0.7;
}

.tool-card:hover .tool-badge {
  opacity: 1;
  background: rgba(100, 97, 241, 0.2);
  border-color: rgba(100, 97, 241, 0.35);
}

/* 分类标签文字颜色 */
.tool-badge.badge-encode {
  color: #0ea5e9;
  border-color: rgba(14, 165, 233, 0.35);
}
.tool-badge.badge-format {
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.35);
}
.tool-badge.badge-crypto {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.35);
}
.tool-badge.badge-time {
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.35);
}
.tool-badge.badge-image {
  color: #8b5cf6;
  border-color: rgba(139, 92, 246, 0.35);
}
.tool-badge.badge-text {
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.35);
}
.tool-badge.badge-dev {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.35);
}
.tool-badge.badge-design {
  color: #e879f9;
  border-color: rgba(232, 121, 249, 0.35);
}

/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
  opacity: 0;
}

/* 平板和移动端响应式 */
@media (max-width: 899px) {
  .modal-container {
    max-width: 95vw;
    height: 85vh;
  }

  .modal-content {
    flex-direction: column;
    height: 100%;
  }

  .category-sidebar-wrapper {
    width: 100% !important;
    height: 140px !important;
    flex-shrink: 0;
    border-right: none;
    border-bottom: 1px solid rgba(78, 78, 100, 0.2);
  }

  .category-sidebar-wrapper :deep(.arco-scrollbar) {
    height: 140px !important;
  }

  .category-sidebar {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    overflow-x: auto;
    min-height: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  .category-sidebar::-webkit-scrollbar {
    height: 4px;
  }

  .category-sidebar::-webkit-scrollbar-track {
    background: rgba(78, 78, 100, 0.1);
  }

  .category-sidebar::-webkit-scrollbar-thumb {
    background: rgba(100, 97, 241, 0.3);
    border-radius: 2px;
  }

  .category-item {
    flex-direction: column;
    padding: 10px 14px;
    gap: 6px;
    min-width: 75px;
    text-align: center;
    border-radius: 8px;
    transform: none !important;
  }

  .category-item:hover {
    transform: scale(1.05) !important;
  }

  .category-item::before {
    display: none;
  }

  .category-name {
    font-size: 12px;
    white-space: nowrap;
  }

  .category-icon {
    font-size: 20px;
  }

  .tools-grid-wrapper {
    flex: 1;
    overflow: hidden;
  }

  .tools-grid-wrapper :deep(.arco-scrollbar) {
    height: 100% !important;
  }

  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
    gap: 12px;
    padding: 16px;
  }
}

/* 平板横屏 */
@media (min-width: 768px) and (max-width: 899px) {
  .modal-container {
    height: 85vh;
  }

  .modal-header {
    padding: 18px 24px;
  }

  .modal-title {
    font-size: 20px;
  }

  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
  }

  .tool-card {
    padding: 15px;
  }
}

/* 手机横屏和小平板 */
@media (min-width: 600px) and (max-width: 767px) {
  .modal-container {
    height: 80vh;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-title {
    font-size: 18px;
  }

  .category-sidebar-wrapper {
    height: 130px !important;
  }

  .category-sidebar-wrapper :deep(.arco-scrollbar) {
    height: 130px !important;
  }

  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)) !important;
    gap: 10px;
  }

  .tool-card {
    padding: 14px;
  }

  .tool-icon {
    font-size: 28px;
  }

  .tool-name {
    font-size: 14px;
  }

  .tool-desc {
    font-size: 11px;
  }
}

/* 手机竖屏 */
@media (max-width: 599px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    height: 80vh;
    border-radius: 12px;
  }

  .modal-header {
    padding: 14px 16px;
  }

  .modal-title {
    font-size: 17px;
  }

  .modal-close-btn {
    width: 32px;
    height: 32px;
  }

  .category-sidebar-wrapper {
    height: 120px !important;
  }

  .category-sidebar-wrapper :deep(.arco-scrollbar) {
    height: 120px !important;
  }

  .category-item {
    min-width: 68px;
    padding: 8px 10px;
    gap: 4px;
  }

  .category-icon {
    font-size: 18px;
  }

  .category-name {
    font-size: 11px;
  }

  .category-count {
    font-size: 10px;
    padding: 1px 6px;
  }

  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
    gap: 10px;
    padding: 12px;
  }

  .tool-card {
    padding: 12px;
    gap: 8px;
  }

  .tool-icon {
    font-size: 26px;
  }

  .tool-name {
    font-size: 13px;
    margin: 0 0 4px 0;
  }

  .tool-desc {
    font-size: 10px;
    line-height: 1.3;
  }

  .tool-badge {
    top: 10px;
    right: 10px;
    font-size: 9px;
    padding: 2px 6px;
  }
}

/* 超小屏幕 */
@media (max-width: 380px) {
  .tools-grid {
    grid-template-columns: 1fr !important;
  }

  .tool-card {
    padding: 14px;
  }

  .tool-icon {
    font-size: 28px;
  }

  .tool-name {
    font-size: 14px;
  }

  .tool-desc {
    font-size: 11px;
  }
}

/* Arco Scrollbar 自定义样式 */
.category-sidebar-wrapper :deep(.arco-scrollbar-thumb-bar) {
  background: rgba(100, 97, 241, 0.4) !important;
  border-radius: 4px;
}

.category-sidebar-wrapper :deep(.arco-scrollbar-thumb-bar:hover) {
  background: rgba(100, 97, 241, 0.6) !important;
}

.tools-grid-wrapper :deep(.arco-scrollbar-thumb-bar) {
  background: rgba(100, 97, 241, 0.4) !important;
  border-radius: 4px;
}

.tools-grid-wrapper :deep(.arco-scrollbar-thumb-bar:hover) {
  background: rgba(100, 97, 241, 0.6) !important;
}

.category-sidebar-wrapper :deep(.arco-scrollbar-track) {
  background: rgba(20, 20, 25, 0.3) !important;
}

.tools-grid-wrapper :deep(.arco-scrollbar-track) {
  background: rgba(20, 20, 25, 0.3) !important;
}

/* 修复 Arco Scrollbar 内部容器宽度问题 */
.tools-grid-wrapper :deep(.arco-scrollbar) {
  width: 100% !important;
  height: 100% !important;
}

.tools-grid-wrapper :deep(.arco-scrollbar-container) {
  width: 100% !important;
  display: block !important;
}

.tools-grid-wrapper :deep(.arco-scrollbar-wrap) {
  width: 100% !important;
  display: block !important;
}

.category-sidebar-wrapper :deep(.arco-scrollbar) {
  width: 100% !important;
  height: 100% !important;
}

.category-sidebar-wrapper :deep(.arco-scrollbar-container) {
  width: 100% !important;
}

.category-sidebar-wrapper :deep(.arco-scrollbar-wrap) {
  width: 100% !important;
}
</style>
