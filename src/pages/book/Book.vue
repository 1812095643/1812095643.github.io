<template>
  <div class="book">
    <div class="book-header">
      <div class="book-title-container">
        <div class="book-title text-effect">{{ t.book.title }}</div>
        <div class="particles-container"></div>
      </div>
      <div class="book-subtitle" id="typed-subtitle"></div>
    </div>
    <div class="book-list">
      <div class="book-list-category">
        <div class="magical item">
          <a href="https://book.douban.com/subject/35396470/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/JavaScript权威指南 (原书第7版).jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'JavaScript权威指南' : 'JavaScript: The Definitive Guide' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/3590768/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/JavaScript语言精粹.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'JavaScript语言精粹' : 'JavaScript: The Good Parts' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/2308234/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/CSS权威指南.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'CSS权威指南' : 'CSS: The Definitive Guide' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/6025285/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/HTML5与CSS3权威指南.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'HTML5与CSS3权威指南' : 'HTML5 & CSS3: The Complete Guide' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/3329540/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/JavaScript设计模式.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'JavaScript设计模式' : 'JavaScript Design Patterns' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/30329430/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/Docker技术入门与实战 第3版.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'Docker技术入门与实战 第3版' : 'Docker: Getting Started and Practice 3rd Edition' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/30210697/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/React 进阶之路.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'React 进阶之路' : 'React: The Road to Advanced' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/25867920/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/Node.js 实战.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'Node.js实战' : 'Node.js in Action' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/25856314/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/Web性能权威指南.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'Web性能权威指南' : 'High Performance Browser Networking' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/10746113/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/HTTP权威指南.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'HTTP权威指南' : 'HTTP: The Definitive Guide' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/20390374/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/响应式Web设计.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? '响应式Web设计' : 'Responsive Web Design' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/35300876/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/TypeScript入门与实战.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'TypeScript入门与实战' : 'TypeScript Getting Started & Practice' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="category-divider"></div>
      <div class="book-list-category">
        <div class="magical item">
          <a href="https://book.douban.com/subject/36049173/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/前端架构师：基础建设与架构设计思想.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? '前端架构师：基础建设与架构设计思想' : 'Frontend Architecture Design' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/10546125/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/JavaScript高级程序设计.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'JavaScript高级程序设计' : 'Professional JavaScript' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/26745943/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/CSS揭秘.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'CSS揭秘' : 'CSS Secrets' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
        <div class="magical item">
          <a href="https://book.douban.com/subject/27025912/" target="_blank">
            <div class="book-item" data-cover-url="/assets/book/Spring Cloud微服务实战.jpg">
              <div class="b-wrapper b-page b-back"></div>
              <div class="b-wrapper b-page b-four"></div>
              <div class="b-wrapper b-page b-three"></div>
              <div class="b-wrapper b-page b-two"></div>
              <div class="b-wrapper b-page b-one"><span class="b-one-title">{{ currentLanguage === 'zh' ? 'Spring Cloud微服务实战' : 'Spring Cloud Microservices in Action' }}</span></div>
              <div class="b-wrapper b-front"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, onBeforeUnmount } from 'vue'
import { usePageAnimations } from '../../composables/usePageAnimations'
import { useI18n } from '../../composables/useI18n'

// 使用页面动画和国际化
usePageAnimations()
const { t, currentLanguage, initLanguage } = useI18n()

// 粒子系统
class Particle {
  constructor(x: number, y: number, container: HTMLElement) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.life = 1
    this.decay = Math.random() * 0.01 + 0.005
    this.size = Math.random() * 3 + 1
    this.color = this.getRandomColor()
    
    this.element = document.createElement('div')
    this.element.className = 'particle'
    this.element.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${this.size}px;
      height: ${this.size}px;
      background: ${this.color};
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 6px ${this.color};
      z-index: 10;
    `
    container.appendChild(this.element)
  }
  
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  size: number
  color: string
  element: HTMLElement
  
  getRandomColor(): string {
    const colors = ['#00f5ff', '#6366f1', '#8b5cf6', '#ec4899', '#ff6b35', '#10b981']
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  update(): boolean {
    this.x += this.vx
    this.y += this.vy
    this.life -= this.decay
    
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
    this.element.style.opacity = this.life.toString()
    this.element.style.transform = `scale(${this.life})`
    
    if (this.life <= 0) {
      this.element.remove()
      return false
    }
    return true
  }
}

let particles: Particle[] = []
let animationId: number
let typeWriterInterval: number | null = null

function createParticle(container: HTMLElement, titleElement: HTMLElement) {
  const rect = titleElement.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  
  // 从文字边缘随机位置生成粒子
  const x = Math.random() * rect.width
  const y = Math.random() * rect.height
  
  const particle = new Particle(x, y, container)
  particles.push(particle)
}

function animateParticles() {
  particles = particles.filter(particle => particle.update())
  animationId = requestAnimationFrame(animateParticles)
}

// 启动打字机效果
function startTypeWriter(element: HTMLElement) {
  const getTexts = () => [
    `>_ ${t.value.book.subtitle1} ^1000`,
    `>_ ${t.value.book.subtitle2} ^1000`,
    `>_ ${t.value.book.subtitle3} ^1000`
  ]
  
  typeWriter(element, getTexts(), 60, 30, 800)
  
  // 监听语言变化，重新启动打字机
  watch(currentLanguage, () => {
    if (typeWriterInterval) {
      clearTimeout(typeWriterInterval)
    }
    element.innerHTML = '>_ <span class="cursor">|</span>'
    setTimeout(() => {
      typeWriter(element, getTexts(), 60, 30, 100)
    }, 300)
  })
}

// lazy set background image for .b-front
onMounted(() => {
  // 初始化语言设置
  initLanguage()
  
  const items = document.querySelectorAll('.book-item')
  items.forEach((el) => {
    const n = el.getAttribute('data-cover-url')
    const front = el.querySelector<HTMLElement>('.b-front')
    if (n && front) {
      const img = new Image()
      img.src = n
      img.onload = () => {
        front.style.backgroundImage = `url('${n}')`
      }
    }
  })
  
  // 启动粒子系统
  const container = document.querySelector('.particles-container') as HTMLElement
  const titleElement = document.querySelector('.book-title') as HTMLElement
  
  if (container && titleElement) {
    // 开始粒子动画
    animateParticles()
    
    // 定期生成粒子
    setInterval(() => {
      if (particles.length < 30) { // 减少粒子数量
        createParticle(container, titleElement)
      }
    }, 200)
    
    // 更频繁地生成粒子
    setInterval(() => {
      if (particles.length < 30) {
        createParticle(container, titleElement)
      }
    }, 400)
  }
  
  // 启动打字机效果
  const subtitleElement = document.querySelector('#typed-subtitle') as HTMLElement
  if (subtitleElement) {
    startTypeWriter(subtitleElement)
  }
})

// 打字机效果
function typeWriter(element: HTMLElement, texts: string[], typeSpeed = 80, backSpeed = 40, startDelay = 500) {
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let isPaused = false
  const prefix = ">_ "
  
  function type() {
    const currentText = texts[textIndex]
    const mainText = currentText.substring(3) // 去掉">_ "前缀
    
    if (!isDeleting && charIndex < mainText.length) {
      // 正在打字
      const displayText = mainText.substring(0, charIndex + 1)
      element.innerHTML = prefix + displayText + '<span class="cursor">|</span>'
      charIndex++
      typeWriterInterval = setTimeout(type, typeSpeed)
    } else if (isDeleting && charIndex > 0) {
      // 正在删除，但保留">_ "
      const displayText = mainText.substring(0, charIndex - 1)
      element.innerHTML = prefix + displayText + '<span class="cursor">|</span>'
      charIndex--
      typeWriterInterval = setTimeout(type, backSpeed)
    } else if (!isDeleting && charIndex === mainText.length) {
      // 打字完成，暂停后开始删除
      element.innerHTML = prefix + mainText + '<span class="cursor">|</span>'
      isPaused = true
      typeWriterInterval = setTimeout(() => {
        isPaused = false
        isDeleting = true
        type()
      }, 2000)
    } else if (isDeleting && charIndex === 0) {
      // 删除完成（只保留">_ "），切换到下一个文本
      element.innerHTML = prefix + '<span class="cursor">|</span>'
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeWriterInterval = setTimeout(type, 500)
    }
  }
  
  typeWriterInterval = setTimeout(type, startDelay)
}

// 清理动画
onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (typeWriterInterval) {
    clearTimeout(typeWriterInterval)
  }
})
</script>

<style scoped>
.book-header {
  text-align: center;
  margin-bottom: 15px;
  padding: 10px 20px 5px;
}

.book-title-container {
  position: relative;
  display: inline-block;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.book-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
  font-family: 'Microsoft YaHei', '微软雅黑', 'PingFang SC', 'Hiragino Sans GB', 'SimSun', sans-serif;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #00f5ff 0%, #6366f1 25%, #8b5cf6 50%, #ec4899 75%, #ff6b35 100%);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: energyFlow 6s ease-in-out infinite;
  filter: drop-shadow(0 0 3px rgba(0, 245, 255, 0.4)) drop-shadow(0 0 6px rgba(99, 102, 241, 0.3));
}





@keyframes energyFlow {
  0%, 100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 3px rgba(0, 245, 255, 0.4)) drop-shadow(0 0 6px rgba(99, 102, 241, 0.3));
  }
  33% {
    background-position: 100% 0%;
    filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.5)) drop-shadow(0 0 8px rgba(139, 92, 246, 0.4));
  }
  66% {
    background-position: 100% 100%;
    filter: drop-shadow(0 0 3px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 6px rgba(255, 107, 53, 0.4));
  }
}



.book-subtitle {
  font-size: 1rem;
  color: #a8a8b6;
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
  position: relative;
  font-family: 'Roboto Mono', 'Courier New', monospace;
  letter-spacing: 0.05em;
  text-shadow: 0 0 5px rgba(0, 245, 255, 0.2);
  min-height: 1.5em;
}

.book-subtitle .cursor {
  color: #00f5ff;
  animation: typingCursor 1s infinite;
  text-shadow: 0 0 8px #00f5ff;
  margin-left: 2px;
}

@keyframes typingCursor {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 粒子样式 */
.particle {
  transition: all 0.1s ease-out;
}

@keyframes particleFade {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@media (max-width: 768px) {
  .book-header {
    margin-bottom: 10px;
    padding: 8px 15px 3px;
  }
  
  .book-title {
    font-size: 2rem;
  }
  
  .book-subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .book-header {
    margin-bottom: 8px;
    padding: 5px 15px 2px;
  }
  
  .book-title {
    font-size: 1.6rem;
  }
  
  .book-subtitle {
    font-size: 0.85rem;
    max-width: 90%;
  }
}
</style>
