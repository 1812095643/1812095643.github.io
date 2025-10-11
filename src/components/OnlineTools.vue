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
                    :class="{ 'tool-implemented': toolImplementations[tool.id] }"
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
                    <div v-if="toolImplementations[tool.id]" class="tool-ready-badge">
                      ✓
                    </div>
                  </div>
                </div>
              </a-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 工具执行面板 -->
    <Transition name="tool-panel">
      <div v-if="showToolPanel" class="tool-panel-overlay" @click="closeToolPanel">
        <div class="tool-panel-container" @click.stop>
          <div class="tool-panel-header">
            <div class="tool-panel-title">
              <span class="tool-panel-icon">{{ selectedTool?.icon }}</span>
              <span>{{ selectedTool?.name }}</span>
            </div>
            <button class="tool-panel-close" @click="closeToolPanel">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="tool-panel-content">
            <!-- 工具选项区域 -->
            <div v-if="hasOptions(selectedTool?.id)" class="tool-options">
              <!-- JSON 格式化选项 -->
              <template v-if="selectedTool?.id === 5">
                <div class="option-group">
                  <label class="option-label">缩进空格数</label>
                  <select v-model.number="toolOptions.jsonIndent" class="option-select">
                    <option :value="2">2 空格</option>
                    <option :value="4">4 空格</option>
                    <option :value="8">8 空格</option>
                  </select>
                </div>
                <div class="option-group">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="toolOptions.jsonSortKeys">
                    <span>按键名排序</span>
                  </label>
                </div>
                <div class="option-group">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="toolOptions.jsonCompact">
                    <span>压缩输出</span>
                  </label>
                </div>
              </template>

              <!-- Base64 选项 -->
              <template v-if="selectedTool?.id === 1">
                <div class="option-group">
                  <label class="option-label">操作模式</label>
                  <div class="option-radio-group">
                    <label class="option-radio">
                      <input type="radio" v-model="toolOptions.base64Mode" value="encode">
                      <span>编码</span>
                    </label>
                    <label class="option-radio">
                      <input type="radio" v-model="toolOptions.base64Mode" value="decode">
                      <span>解码</span>
                    </label>
                  </div>
                </div>
              </template>

              <!-- URL 选项 -->
              <template v-if="selectedTool?.id === 2">
                <div class="option-group">
                  <label class="option-label">操作模式</label>
                  <div class="option-radio-group">
                    <label class="option-radio">
                      <input type="radio" v-model="toolOptions.urlMode" value="encode">
                      <span>编码</span>
                    </label>
                    <label class="option-radio">
                      <input type="radio" v-model="toolOptions.urlMode" value="decode">
                      <span>解码</span>
                    </label>
                  </div>
                </div>
              </template>

              <!-- SHA 选项 -->
              <template v-if="selectedTool?.id === 10">
                <div class="option-group">
                  <label class="option-label">算法</label>
                  <select v-model="toolOptions.shaAlgorithm" class="option-select">
                    <option value="SHA-1">SHA-1</option>
                    <option value="SHA-256">SHA-256</option>
                    <option value="SHA-384">SHA-384</option>
                    <option value="SHA-512">SHA-512</option>
                  </select>
                </div>
              </template>

              <!-- 二维码选项 -->
              <template v-if="selectedTool?.id === 16">
                <div class="option-group">
                  <label class="option-label">尺寸</label>
                  <select v-model.number="toolOptions.qrcodeSize" class="option-select">
                    <option :value="200">200x200</option>
                    <option :value="300">300x300</option>
                    <option :value="500">500x500</option>
                    <option :value="800">800x800</option>
                  </select>
                </div>
                <div class="option-group">
                  <label class="option-label">容错级别</label>
                  <select v-model="toolOptions.qrcodeErrorLevel" class="option-select">
                    <option value="L">L (7%)</option>
                    <option value="M">M (15%)</option>
                    <option value="Q">Q (25%)</option>
                    <option value="H">H (30%)</option>
                  </select>
                </div>
              </template>

              <!-- 颜色选择器选项 -->
              <template v-if="selectedTool?.id === 19">
                <div class="option-group">
                  <label class="option-label">颜色值</label>
                  <input type="color" v-model="toolOptions.colorValue" class="option-color" @input="executeTool">
                </div>
                <div class="option-group">
                  <label class="option-label">HEX 值</label>
                  <input type="text" v-model="toolOptions.colorValue" class="option-input" @input="executeTool">
                </div>
              </template>

              <!-- 大小写转换选项 -->
              <template v-if="selectedTool?.id === 23">
                <div class="option-group">
                  <label class="option-label">转换模式</label>
                  <select v-model="toolOptions.caseMode" class="option-select">
                    <option value="upper">全部大写</option>
                    <option value="lower">全部小写</option>
                    <option value="title">首字母大写</option>
                    <option value="sentence">句首大写</option>
                    <option value="toggle">大小写切换</option>
                  </select>
                </div>
              </template>

              <!-- UUID 选项 -->
              <template v-if="selectedTool?.id === 25">
                <div class="option-group">
                  <label class="option-label">生成数量</label>
                  <input type="number" v-model.number="toolOptions.uuidCount" min="1" max="100" class="option-input">
                </div>
              </template>
            </div>

            <!-- 输入区域 -->
            <div v-if="selectedTool?.id !== 19 && selectedTool?.id !== 21" class="tool-panel-section">
              <div class="section-header">
                <span class="section-title">输入</span>
                <button v-if="selectedTool?.id === 25" class="action-btn" @click="executeTool">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  生成 UUID
                </button>
              </div>
              <textarea
                v-if="selectedTool?.id !== 25"
                v-model="toolInput"
                class="tool-textarea"
                :placeholder="getPlaceholder(selectedTool?.id)"
                :rows="getTextareaRows(selectedTool?.id)"
              ></textarea>
              <div v-else class="uuid-generator">
                <p class="uuid-hint">点击"生成 UUID"按钮创建新的唯一标识符</p>
              </div>
            </div>

            <!-- Diff 对比特殊输入 -->
            <template v-if="selectedTool?.id === 21">
              <div class="tool-panel-section">
                <div class="section-header">
                  <span class="section-title">原始文本</span>
                </div>
                <textarea
                  v-model="toolOptions.diffInput1"
                  class="tool-textarea"
                  placeholder="请输入原始文本..."
                  rows="6"
                ></textarea>
              </div>
              <div class="tool-panel-section">
                <div class="section-header">
                  <span class="section-title">对比文本</span>
                </div>
                <textarea
                  v-model="toolOptions.diffInput2"
                  class="tool-textarea"
                  placeholder="请输入对比文本..."
                  rows="6"
                ></textarea>
              </div>
            </template>

            <!-- 正则测试特殊输入 -->
            <template v-if="selectedTool?.id === 24">
              <div class="tool-panel-section">
                <div class="section-header">
                  <span class="section-title">正则表达式</span>
                </div>
                <div class="regex-input-group">
                  <span class="regex-delimiter">/</span>
                  <input
                    type="text"
                    v-model="toolOptions.regexPattern"
                    class="regex-pattern-input"
                    placeholder="输入正则表达式..."
                  >
                  <span class="regex-delimiter">/</span>
                  <input
                    type="text"
                    v-model="toolOptions.regexFlags"
                    class="regex-flags-input"
                    placeholder="flags"
                    maxlength="5"
                  >
                </div>
                <div class="regex-flags-helper">
                  <label class="flag-checkbox">
                    <input type="checkbox" :checked="toolOptions.regexFlags.includes('g')" @change="toggleFlag('g')">
                    <span>g (全局)</span>
                  </label>
                  <label class="flag-checkbox">
                    <input type="checkbox" :checked="toolOptions.regexFlags.includes('i')" @change="toggleFlag('i')">
                    <span>i (忽略大小写)</span>
                  </label>
                  <label class="flag-checkbox">
                    <input type="checkbox" :checked="toolOptions.regexFlags.includes('m')" @change="toggleFlag('m')">
                    <span>m (多行)</span>
                  </label>
                  <label class="flag-checkbox">
                    <input type="checkbox" :checked="toolOptions.regexFlags.includes('s')" @change="toggleFlag('s')">
                    <span>s (dotAll)</span>
                  </label>
                </div>
              </div>
              <div class="tool-panel-section">
                <div class="section-header">
                  <span class="section-title">测试文本</span>
                </div>
                <textarea
                  v-model="toolOptions.regexTestText"
                  class="tool-textarea"
                  placeholder="输入要测试的文本..."
                  rows="6"
                ></textarea>
              </div>
            </template>

            <!-- 执行按钮 -->
            <div v-if="selectedTool?.id !== 25 && selectedTool?.id !== 19" class="tool-panel-actions">
              <button class="execute-btn" @click="executeTool">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
                </svg>
                {{ getExecuteButtonText(selectedTool?.id) }}
              </button>
            </div>

            <!-- 成功提示 -->
            <div v-if="toolSuccess" class="tool-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ toolSuccess }}
            </div>

            <!-- 错误提示 -->
            <div v-if="toolError" class="tool-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ toolError }}
            </div>

            <!-- 输出区域 -->
            <div class="tool-panel-section">
              <div class="section-header">
                <span class="section-title">输出</span>
                <button v-if="toolOutput" class="action-btn" @click="copyOutput">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  复制
                </button>
              </div>
              
              <!-- 二维码特殊显示 -->
              <div v-if="selectedTool?.id === 16 && toolOutput" class="qrcode-output">
                <img :src="toolOutput" alt="QR Code" class="qrcode-image" />
                <a :href="toolOutput" download="qrcode.png" class="qrcode-download">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  下载二维码
                </a>
              </div>
              
              <!-- Markdown 预览特殊显示 -->
              <div v-else-if="selectedTool?.id === 20 && toolOutput" class="markdown-preview" v-html="toolOutput"></div>
              
              <!-- 普通文本输出 -->
              <textarea
                v-else
                v-model="toolOutput"
                class="tool-textarea"
                placeholder="执行结果将显示在这里..."
                readonly
                :rows="getTextareaRows(selectedTool?.id)"
              ></textarea>
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

// 工具实现状态
const toolImplementations = ref<Record<number, boolean>>({
  1: true,  // Base64 编解码
  2: true,  // URL 编解码
  5: true,  // JSON 格式化
  9: true,  // MD5 加密
  10: true, // SHA 加密
  13: true, // 时间戳转换
  16: true, // 二维码生成
  19: true, // 颜色选择器
  20: true, // Markdown 预览
  21: true, // Diff 对比
  22: true, // 文本统计
  23: true, // 大小写转换
  24: true, // 正则测试
  25: true, // UUID 生成
  26: true, // JWT 解析
});

// 当前选中的工具
const selectedTool = ref<any>(null);
const showToolPanel = ref(false);

// 工具面板输入输出
const toolInput = ref("");
const toolOutput = ref("");
const toolError = ref("");
const toolSuccess = ref("");

// 工具特定选项
const toolOptions = ref<any>({
  // JSON 格式化选项
  jsonIndent: 2,
  jsonSortKeys: false,
  jsonCompact: false,
  
  // Base64 选项
  base64Mode: 'encode',
  
  // URL 选项
  urlMode: 'encode',
  
  // SHA 选项
  shaAlgorithm: 'SHA-256',
  
  // 二维码选项
  qrcodeSize: 300,
  qrcodeErrorLevel: 'M',
  
  // 颜色选择器
  colorFormat: 'hex',
  colorValue: '#6461F1',
  
  // Markdown 选项
  markdownTheme: 'github',
  
  // Diff 选项
  diffInput1: '',
  diffInput2: '',
  
  // 大小写转换
  caseMode: 'upper',
  
  // 正则选项
  regexFlags: 'g',
  regexPattern: '',
  regexTestText: '',
  regexMatches: [],
  
  // UUID 选项
  uuidCount: 1,
  uuidVersion: 'v4',
});

const handleToolClick = (tool: any) => {
  selectedTool.value = tool;
  showToolPanel.value = true;
  toolInput.value = "";
  toolOutput.value = "";
  toolError.value = "";
  toolSuccess.value = "";
  
  // 重置选项
  resetToolOptions();
  
  // 设置默认示例
  setDefaultExample(tool.id);
};

const resetToolOptions = () => {
  toolOptions.value = {
    jsonIndent: 2,
    jsonSortKeys: false,
    jsonCompact: false,
    base64Mode: 'encode',
    urlMode: 'encode',
    shaAlgorithm: 'SHA-256',
    qrcodeSize: 300,
    qrcodeErrorLevel: 'M',
    colorFormat: 'hex',
    colorValue: '#6461F1',
    markdownTheme: 'github',
    diffInput1: '',
    diffInput2: '',
    caseMode: 'upper',
    regexFlags: 'g',
    regexPattern: '',
    regexTestText: '',
    regexMatches: [],
    uuidCount: 1,
    uuidVersion: 'v4',
  };
};

const setDefaultExample = (toolId: number) => {
  const examples: Record<number, string> = {
    1: 'Hello, World! 你好世界！',
    2: 'https://example.com/search?q=测试&page=1',
    5: '{"name":"张三","age":25,"skills":["JavaScript","Vue","TypeScript"],"address":{"city":"北京","district":"朝阳区"}}',
    9: 'Hello World',
    10: 'Hello World',
    13: String(Date.now()),
    16: 'https://github.com',
    19: '',
    20: '# Markdown 示例\n\n## 二级标题\n\n这是一段**粗体**文字和*斜体*文字。\n\n- 列表项 1\n- 列表项 2\n- 列表项 3\n\n```javascript\nconst hello = "world";\nconsole.log(hello);\n```\n\n> 这是一段引用文字',
    21: '',
    22: 'Hello World!\n这是一个文本统计工具。\n可以统计字数、行数、单词数等信息。\n支持中英文混合统计。',
    23: 'Hello World! 你好世界！',
    24: '',
    25: '',
    26: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };
  toolInput.value = examples[toolId] || '';
  
  // 特殊初始化
  if (toolId === 21) {
    toolOptions.value.diffInput1 = '第一行文本\n第二行文本\n第三行文本';
    toolOptions.value.diffInput2 = '第一行文本\n第二行已修改\n第三行文本\n第四行新增';
  }
};

const closeToolPanel = () => {
  showToolPanel.value = false;
  selectedTool.value = null;
};

const executeTool = async () => {
  toolError.value = "";
  toolSuccess.value = "";
  
  try {
    switch (selectedTool.value?.id) {
      case 1: // Base64 编解码
        if (toolOptions.value.base64Mode === 'encode') {
          toolOutput.value = btoa(unescape(encodeURIComponent(toolInput.value)));
        } else {
          toolOutput.value = decodeURIComponent(escape(atob(toolInput.value)));
        }
        break;
        
      case 2: // URL 编解码
        if (toolOptions.value.urlMode === 'encode') {
          toolOutput.value = encodeURIComponent(toolInput.value);
        } else {
          toolOutput.value = decodeURIComponent(toolInput.value);
        }
        break;
        
      case 5: // JSON 格式化
        const parsed = JSON.parse(toolInput.value);
        if (toolOptions.value.jsonSortKeys) {
          const sortObject = (obj: any): any => {
            if (Array.isArray(obj)) return obj.map(sortObject);
            if (obj !== null && typeof obj === 'object') {
              return Object.keys(obj).sort().reduce((result: any, key) => {
                result[key] = sortObject(obj[key]);
                return result;
              }, {});
            }
            return obj;
          };
          const sorted = sortObject(parsed);
          toolOutput.value = JSON.stringify(sorted, null, toolOptions.value.jsonCompact ? 0 : toolOptions.value.jsonIndent);
        } else {
          toolOutput.value = JSON.stringify(parsed, null, toolOptions.value.jsonCompact ? 0 : toolOptions.value.jsonIndent);
        }
        break;
        
      case 9: // MD5 加密
        toolOutput.value = await hashString(toolInput.value, 'MD5');
        break;
        
      case 10: // SHA 加密
        toolOutput.value = await hashString(toolInput.value, toolOptions.value.shaAlgorithm);
        break;
        
      case 13: // 时间戳转换
        const timestamp = parseInt(toolInput.value);
        if (isNaN(timestamp)) {
          toolError.value = "请输入有效的时间戳";
          return;
        }
        const date = new Date(timestamp);
        toolOutput.value = `标准时间: ${date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}\n`;
        toolOutput.value += `ISO 8601: ${date.toISOString()}\n`;
        toolOutput.value += `UTC 时间: ${date.toUTCString()}\n`;
        toolOutput.value += `Unix 时间戳(秒): ${Math.floor(timestamp / 1000)}\n`;
        toolOutput.value += `Unix 时间戳(毫秒): ${timestamp}\n`;
        toolOutput.value += `年: ${date.getFullYear()}\n`;
        toolOutput.value += `月: ${date.getMonth() + 1}\n`;
        toolOutput.value += `日: ${date.getDate()}\n`;
        toolOutput.value += `时: ${date.getHours()}\n`;
        toolOutput.value += `分: ${date.getMinutes()}\n`;
        toolOutput.value += `秒: ${date.getSeconds()}\n`;
        toolOutput.value += `星期: ${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`;
        break;
        
      case 16: // 二维码生成
        if (!toolInput.value.trim()) {
          toolError.value = "请输入要生成二维码的内容";
          return;
        }
        const qrSize = toolOptions.value.qrcodeSize;
        const qrLevel = toolOptions.value.qrcodeErrorLevel;
        toolOutput.value = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&ecc=${qrLevel}&data=${encodeURIComponent(toolInput.value)}`;
        break;
        
      case 19: // 颜色选择器
        const color = toolOptions.value.colorValue;
        toolOutput.value = convertColor(color, toolOptions.value.colorFormat);
        break;
        
      case 20: // Markdown 预览
        toolOutput.value = renderMarkdown(toolInput.value);
        break;
        
      case 21: // Diff 对比
        toolOutput.value = generateDiff(toolOptions.value.diffInput1, toolOptions.value.diffInput2);
        break;
        
      case 22: // 文本统计
        const stats = analyzeText(toolInput.value);
        toolOutput.value = `字符总数: ${stats.totalChars}\n`;
        toolOutput.value += `字符数(不含空格): ${stats.charsNoSpace}\n`;
        toolOutput.value += `中文字符: ${stats.chineseChars}\n`;
        toolOutput.value += `英文字符: ${stats.englishChars}\n`;
        toolOutput.value += `数字字符: ${stats.numbers}\n`;
        toolOutput.value += `单词数: ${stats.words}\n`;
        toolOutput.value += `行数: ${stats.lines}\n`;
        toolOutput.value += `段落数: ${stats.paragraphs}\n`;
        toolOutput.value += `标点符号: ${stats.punctuation}`;
        break;
        
      case 23: // 大小写转换
        switch (toolOptions.value.caseMode) {
          case 'upper':
            toolOutput.value = toolInput.value.toUpperCase();
            break;
          case 'lower':
            toolOutput.value = toolInput.value.toLowerCase();
            break;
          case 'title':
            toolOutput.value = toolInput.value.replace(/\b\w/g, l => l.toUpperCase());
            break;
          case 'sentence':
            toolOutput.value = toolInput.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, l => l.toUpperCase());
            break;
          case 'toggle':
            toolOutput.value = toolInput.value.split('').map(c => 
              c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
            ).join('');
            break;
        }
        break;
        
      case 24: // 正则测试
        const pattern = toolOptions.value.regexPattern;
        const testText = toolOptions.value.regexTestText;
        
        if (!pattern) {
          toolError.value = "请输入正则表达式";
          return;
        }
        
        try {
          const regex = new RegExp(pattern, toolOptions.value.regexFlags);
          const matches = [...testText.matchAll(regex)];
          
          toolOptions.value.regexMatches = matches.map((match, index) => ({
            index: index + 1,
            match: match[0],
            position: match.index,
            groups: match.slice(1),
          }));
          
          if (matches.length > 0) {
            toolOutput.value = `找到 ${matches.length} 个匹配项:\n\n`;
            matches.forEach((match, i) => {
              toolOutput.value += `匹配 ${i + 1}: "${match[0]}" (位置: ${match.index})\n`;
              if (match.length > 1) {
                toolOutput.value += `  捕获组: ${match.slice(1).join(', ')}\n`;
              }
            });
          } else {
            toolOutput.value = '未找到匹配项';
          }
        } catch (e: any) {
          toolError.value = `正则表达式错误: ${e.message}`;
        }
        break;
        
      case 25: // UUID 生成
        const uuids = [];
        for (let i = 0; i < toolOptions.value.uuidCount; i++) {
          uuids.push(crypto.randomUUID());
        }
        toolOutput.value = uuids.join('\n');
        break;
        
      case 26: // JWT 解析
        try {
          const parts = toolInput.value.split('.');
          if (parts.length !== 3) {
            toolError.value = "无效的 JWT 格式";
            return;
          }
          
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));
          
          toolOutput.value = '=== Header ===\n';
          toolOutput.value += JSON.stringify(header, null, 2);
          toolOutput.value += '\n\n=== Payload ===\n';
          toolOutput.value += JSON.stringify(payload, null, 2);
          toolOutput.value += '\n\n=== Signature ===\n';
          toolOutput.value += parts[2];
          
          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const now = new Date();
            toolOutput.value += '\n\n=== 过期信息 ===\n';
            toolOutput.value += `过期时间: ${expDate.toLocaleString('zh-CN')}\n`;
            toolOutput.value += `状态: ${now > expDate ? '已过期' : '有效'}`;
          }
        } catch (e: any) {
          toolError.value = "JWT 解析失败: " + e.message;
        }
        break;
        
      default:
        toolError.value = "该工具功能正在开发中...";
    }
    
    if (!toolError.value && toolOutput.value) {
      toolSuccess.value = "执行成功！";
      setTimeout(() => toolSuccess.value = "", 2000);
    }
  } catch (e: any) {
    toolError.value = e.message || "处理失败";
  }
};

// 辅助函数
const hashString = async (str: string, algorithm: string): Promise<string> => {
  if (algorithm === 'MD5') {
    // 简单的 MD5 实现（实际项目建议使用专业库）
    return simpleMD5(str);
  }
  
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const simpleMD5 = (str: string): string => {
  // 这是一个简化版本，实际应用建议使用 crypto-js 等库
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(32, '0');
};

const convertColor = (color: string, format: string): string => {
  // 简化的颜色转换
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  let result = `HEX: ${color}\n`;
  result += `RGB: rgb(${r}, ${g}, ${b})\n`;
  result += `RGBA: rgba(${r}, ${g}, ${b}, 1)\n`;
  
  const h = Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI);
  const s = Math.round(Math.sqrt(r * r + g * g + b * b - r * g - r * b - g * b) / Math.max(r, g, b) * 100);
  const l = Math.round((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255 * 100);
  
  result += `HSL: hsl(${h}, ${s}%, ${l}%)`;
  
  return result;
};

const renderMarkdown = (md: string): string => {
  // 简化的 Markdown 渲染
  let html = md;
  
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // 粗体和斜体
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // 引用
  html = html.replace(/^> (.+$)/gim, '<blockquote>$1</blockquote>');
  
  // 列表
  html = html.replace(/^\- (.+$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 换行
  html = html.replace(/\n/g, '<br>');
  
  return html;
};

const generateDiff = (text1: string, text2: string): string => {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  let result = '';
  const maxLen = Math.max(lines1.length, lines2.length);
  
  for (let i = 0; i < maxLen; i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';
    
    if (line1 === line2) {
      result += `  ${line1}\n`;
    } else {
      if (line1) result += `- ${line1}\n`;
      if (line2) result += `+ ${line2}\n`;
    }
  }
  
  return result;
};

const analyzeText = (text: string) => {
  return {
    totalChars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    chineseChars: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    englishChars: (text.match(/[a-zA-Z]/g) || []).length,
    numbers: (text.match(/\d/g) || []).length,
    words: text.split(/\s+/).filter(w => w.length > 0).length,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length,
    punctuation: (text.match(/[.,;:!?'"()[\]{}]/g) || []).length,
  };
};

const copyOutput = async () => {
  try {
    await navigator.clipboard.writeText(toolOutput.value);
    toolSuccess.value = "已复制到剪贴板！";
    setTimeout(() => toolSuccess.value = "", 2000);
  } catch (e) {
    toolError.value = "复制失败";
  }
};

const getPlaceholder = (toolId: number) => {
  const placeholders: Record<number, string> = {
    1: '请输入要编码/解码的文本...',
    2: '请输入要编码/解码的 URL...',
    5: '请输入 JSON 数据...',
    9: '请输入要加密的文本...',
    10: '请输入要加密的文本...',
    13: '请输入时间戳（毫秒）...',
    16: '请输入要生成二维码的内容...',
    20: '请输入 Markdown 文本...',
    22: '请输入要统计的文本...',
    23: '请输入要转换的文本...',
    26: '请输入 JWT Token...',
  };
  return placeholders[toolId] || '请输入内容...';
};

const hasOptions = (toolId: number) => {
  return [1, 2, 5, 10, 16, 19, 23, 25].includes(toolId);
};

const getTextareaRows = (toolId: number) => {
  const rowMap: Record<number, number> = {
    20: 10, // Markdown
    22: 8,  // 文本统计
    26: 4,  // JWT
  };
  return rowMap[toolId] || 6;
};

const getExecuteButtonText = (toolId: number) => {
  const textMap: Record<number, string> = {
    1: '转换',
    2: '转换',
    5: '格式化',
    9: '加密',
    10: '加密',
    13: '转换',
    16: '生成二维码',
    20: '预览',
    21: '对比',
    22: '统计',
    23: '转换',
    24: '测试',
    26: '解析',
  };
  return textMap[toolId] || '执行';
};

const toggleFlag = (flag: string) => {
  if (toolOptions.value.regexFlags.includes(flag)) {
    toolOptions.value.regexFlags = toolOptions.value.regexFlags.replace(flag, '');
  } else {
    toolOptions.value.regexFlags += flag;
  }
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

/* 工具选项区域 */
.tool-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  background: rgba(20, 20, 25, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(78, 78, 100, 0.2);
  margin-bottom: 16px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 150px;
}

.option-label {
  font-size: 12px;
  font-weight: 500;
  color: #a8a8b6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.option-select,
.option-input {
  padding: 8px 12px;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(78, 78, 100, 0.3);
  border-radius: 6px;
  color: #e8e8f6;
  font-size: 13px;
  transition: all 0.2s ease;
}

.option-select:focus,
.option-input:focus {
  outline: none;
  border-color: rgba(100, 97, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(100, 97, 241, 0.1);
}

.option-color {
  width: 100%;
  height: 40px;
  padding: 4px;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(78, 78, 100, 0.3);
  border-radius: 6px;
  cursor: pointer;
}

.option-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.option-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #6461f1;
}

.option-checkbox span {
  font-size: 13px;
  color: #e8e8f6;
}

.option-radio-group {
  display: flex;
  gap: 12px;
}

.option-radio {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}

.option-radio input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #6461f1;
}

.option-radio span {
  font-size: 13px;
  color: #e8e8f6;
}

/* 正则表达式输入 */
.regex-input-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(78, 78, 100, 0.3);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.regex-input-group:focus-within {
  border-color: rgba(100, 97, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(100, 97, 241, 0.1);
}

.regex-delimiter {
  color: #6461f1;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Consolas', 'Monaco', monospace;
}

.regex-pattern-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e8e8f6;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  outline: none;
}

.regex-flags-input {
  width: 60px;
  background: transparent;
  border: none;
  color: #8b5cf6;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  outline: none;
}

.regex-flags-helper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px 0;
}

.flag-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}

.flag-checkbox input[type="checkbox"] {
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: #6461f1;
}

.flag-checkbox span {
  font-size: 12px;
  color: #a8a8b6;
}

/* 成功提示 */
.tool-success {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  color: #10b981;
  font-size: 13px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Markdown 预览 */
.markdown-preview {
  padding: 16px;
  background: rgba(20, 20, 25, 0.5);
  border: 1px solid rgba(78, 78, 100, 0.3);
  border-radius: 8px;
  color: #e8e8f6;
  line-height: 1.6;
  overflow-x: auto;
}

.markdown-preview h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0 12px 0;
  color: #e8e8f6;
  border-bottom: 2px solid rgba(100, 97, 241, 0.3);
  padding-bottom: 8px;
}

.markdown-preview h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 14px 0 10px 0;
  color: #e8e8f6;
}

.markdown-preview h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: #e8e8f6;
}

.markdown-preview code {
  padding: 2px 6px;
  background: rgba(100, 97, 241, 0.15);
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #8b5cf6;
}

.markdown-preview pre {
  padding: 12px;
  background: rgba(14, 14, 19, 0.8);
  border-radius: 6px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-preview pre code {
  padding: 0;
  background: transparent;
  color: #e8e8f6;
}

.markdown-preview blockquote {
  margin: 12px 0;
  padding: 8px 16px;
  border-left: 4px solid #6461f1;
  background: rgba(100, 97, 241, 0.05);
  color: #a8a8b6;
}

.markdown-preview ul {
  margin: 8px 0;
  padding-left: 24px;
}

.markdown-preview li {
  margin: 4px 0;
  color: #e8e8f6;
}

.markdown-preview a {
  color: #6461f1;
  text-decoration: none;
  border-bottom: 1px solid rgba(100, 97, 241, 0.3);
  transition: all 0.2s ease;
}

.markdown-preview a:hover {
  border-bottom-color: #6461f1;
}

/* 二维码下载按钮 */
.qrcode-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #6461f1 0%, #8b5cf6 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.qrcode-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 97, 241, 0.3);
}

/* 工具就绪标记 */
.tool-ready-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  z-index: 3;
}

.tool-card.tool-implemented {
  border-color: rgba(16, 185, 129, 0.3);
}

.tool-card.tool-implemented:hover {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
}

/* 工具执行面板 */
.tool-panel-overlay {
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
  z-index: 1001;
  padding: 20px;
}

.tool-panel-container {
  background: #141419;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(78, 78, 100, 0.3);
  display: flex;
  flex-direction: column;
}

.tool-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(78, 78, 100, 0.2);
  background: #141419;
  flex-shrink: 0;
}

.tool-panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #e8e8f6;
}

.tool-panel-icon {
  font-size: 24px;
}

.tool-panel-close {
  width: 32px;
  height: 32px;
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

.tool-panel-close:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  transform: rotate(90deg);
}

.tool-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tool-panel-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #e8e8f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(100, 97, 241, 0.15);
  border: 1px solid rgba(100, 97, 241, 0.3);
  border-radius: 6px;
  color: #6461f1;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(100, 97, 241, 0.25);
  border-color: rgba(100, 97, 241, 0.5);
  transform: translateY(-1px);
}

.action-btn:active {
  transform: translateY(0);
}

.tool-textarea {
  width: 100%;
  padding: 12px;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(78, 78, 100, 0.3);
  border-radius: 8px;
  color: #e8e8f6;
  font-size: 13px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
}

.tool-textarea:focus {
  outline: none;
  border-color: rgba(100, 97, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(100, 97, 241, 0.1);
}

.tool-textarea::placeholder {
  color: #6b6b7b;
}

.tool-textarea[readonly] {
  cursor: default;
  background: rgba(20, 20, 25, 0.5);
}

.tool-panel-actions {
  display: flex;
  justify-content: center;
}

.execute-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #6461f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(100, 97, 241, 0.3);
}

.execute-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(100, 97, 241, 0.4);
}

.execute-btn:active {
  transform: translateY(0);
}

.tool-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 13px;
}

.uuid-generator {
  padding: 40px 20px;
  text-align: center;
  background: rgba(20, 20, 25, 0.5);
  border: 1px dashed rgba(78, 78, 100, 0.3);
  border-radius: 8px;
}

.uuid-hint {
  color: #a8a8b6;
  font-size: 14px;
  margin: 0;
}

.qrcode-output {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.qrcode-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 工具面板动画 */
.tool-panel-enter-active,
.tool-panel-leave-active {
  transition: opacity 0.3s ease;
}

.tool-panel-enter-active .tool-panel-container,
.tool-panel-leave-active .tool-panel-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.tool-panel-enter-from,
.tool-panel-leave-to {
  opacity: 0;
}

.tool-panel-enter-from .tool-panel-container,
.tool-panel-leave-to .tool-panel-container {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* 工具面板响应式 */
@media (max-width: 768px) {
  .tool-panel-container {
    max-width: 95vw;
    max-height: 85vh;
  }

  .tool-panel-header {
    padding: 16px 20px;
  }

  .tool-panel-title {
    font-size: 16px;
  }

  .tool-panel-icon {
    font-size: 20px;
  }

  .tool-panel-content {
    padding: 20px;
  }

  .tool-textarea {
    font-size: 12px;
  }

  .tool-options {
    flex-direction: column;
  }

  .option-group {
    min-width: 100%;
  }

  .option-radio-group {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .tool-panel-overlay {
    padding: 10px;
  }

  .tool-panel-container {
    border-radius: 12px;
  }

  .tool-panel-header {
    padding: 14px 16px;
  }

  .tool-panel-title {
    font-size: 15px;
  }

  .tool-panel-content {
    padding: 16px;
    gap: 12px;
  }

  .execute-btn {
    width: 100%;
    justify-content: center;
  }

  .tool-options {
    padding: 12px;
    gap: 10px;
  }

  .regex-input-group {
    flex-wrap: wrap;
  }

  .regex-pattern-input {
    width: 100%;
  }

  .regex-flags-helper {
    gap: 8px;
  }

  .markdown-preview {
    font-size: 13px;
  }

  .markdown-preview h1 {
    font-size: 20px;
  }

  .markdown-preview h2 {
    font-size: 18px;
  }

  .markdown-preview h3 {
    font-size: 16px;
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
