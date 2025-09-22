<template>
  <div class="about">
    <div class="about-top">
      <div class="about-name text-effect">{{ t.about.name }}</div>
      <div class="about-info">
        <div class="about-info-left load-pro">
          <div class="about-info-title">{{ t.about.introduction }}</div>
          <div class="introduce-desc" v-html="t.about.introductionContent">
          </div>
        </div>
        <div class="about-info-right load-pro">
          <div class="contact">
            <div class="about-info-title">{{ t.about.contact }}</div>
            <div class="contact-desc">
              <div class="list">
                <div class="list-label">{{ t.about.email }}：</div>
                <div class="list-value" id="email" tabindex="0" role="button" :title="t.about.copyEmailTip" @click="copyEmail">
                  <a id="emailCopied">1812095643@qq.com</a>
                </div>
                <span class="list-value copied" :style="{ opacity: showEmailCopied ? 1 : 0 }">{{ t.about.copied }}&nbsp;✓</span>
              </div>
              <div class="list">
                <div class="list-label">{{ t.about.phone }}：</div>
                <div class="list-value" id="phone" tabindex="0" role="button" :title="t.about.copyPhoneTip" @click="copyPhone">
                  <a id="phoneCopied">15536623157</a>
                </div>
                <span class="list-value copied" :style="{ opacity: showPhoneCopied ? 1 : 0 }">{{ t.about.copied }}&nbsp;✓</span>
              </div>
              <div class="list">
                <div class="list-label">{{ t.about.wechat }}：</div>
                <div class="list-value">
                  <a class="tooltip">RoySmee_cxdzxy
                    <div class="tooltip-box">
                      <img src="/assets/about/wechat.png">
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="resume">
            <div class="about-info-title resume-title">{{ t.about.resume }}</div>
            <div class="resume-desc">
              <div class="resume-desc-helptext">{{ t.about.resumeDesc }}</div>
              <div class="magical primary-btn btn-s"><a href="/简历.pdf" target="_blank">{{ t.about.download }}</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-middle load-pro">
      <div class="power">
        <div class="list-00">
          <div class="magical power-card-number">
            <a>
              <div class="card-title">2025</div>
              <div class="card-text">{{ t.about.graduationYear }}</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">30⁺</div>
              <div class="card-text">{{ t.about.projects }}</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">4.2</div>
              <div class="card-text">GPA/5.0</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">4</div>
              <div class="card-text">{{ t.about.yearsStudy }}</div>
            </a>
          </div>
        </div>
        <div class="list-01">
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/abstract.svg')"></div>
              <div class="card-text">{{ t.about.skill1 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/menu.svg')"></div>
              <div class="card-text">{{ t.about.skill2 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/code.svg')"></div>
              <div class="card-text">{{ t.about.skill3 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/pen.svg')"></div>
              <div class="card-text">{{ t.about.skill4 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/pin.svg')"></div>
              <div class="card-text">{{ t.about.skill5 }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="about-bottom load-pro">
      <div class="experience">
        <!-- 教育经历 -->
        <div class="item load-pro">
          <div class="time">❖ 2021.09 ~ {{ t.about.present }}</div>
          <div class="name">
            <div class="company">{{ t.about.university }}</div>
            <div class="job">{{ t.about.major }} | {{ t.about.gpa }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.mainCourses }}</div>
              <div class="desc">
                <ul>
                  <li v-if="currentLanguage === 'zh'">Java开发、C++程序设计、Web开发、数据结构与算法、数据库存储、游戏引擎、软件工程等相关课程</li>
                  <li v-else>Java Development, C++ Programming, Web Development, Data Structures and Algorithms, Database Storage, Game Engine, Software Engineering and other related courses</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.technicalSkills }}</div>
              <div class="desc">
                <ul>
                  <li><strong>{{ t.about.skill1Title }}：</strong>{{ t.about.skill1Desc }}</li>
                  <li><strong>{{ t.about.skill2Title }}：</strong>{{ t.about.skill2Desc }}</li>
                  <li><strong>{{ t.about.skill3Title }}：</strong>{{ t.about.skill3Desc }}</li>
                  <li><strong>{{ t.about.skill4Title }}：</strong>{{ t.about.skill4Desc }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.achievements }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.achievement1 }}</li>
                  <li>{{ t.about.achievement2 }}</li>
                  <li>{{ t.about.achievement3 }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 实习经历 -->
        <div class="item load-pro">
          <div class="time">❖ 2024.07 ~ 2024.09</div>
          <div class="name">
            <div class="company"><a href="#" target="_blank">{{ t.about.internshipCompany }} ↗</a></div>
            <div class="job">{{ t.about.internshipRole }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.internshipContent }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.internshipContentDesc }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.internshipResponsibilities }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.internshipResp1 }}</li>
                  <li>{{ t.about.internshipResp2 }}</li>
                  <li>{{ t.about.internshipResp3 }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.internshipResults }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.internshipResult1 }}</li>
                  <li>{{ t.about.internshipResult2 }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目经历 -->
        <div class="item load-pro">
          <div class="time">❖ {{ t.about.project1Time }}</div>
          <div class="name">
            <div class="company">{{ t.about.project1Title }}</div>
            <div class="job">{{ t.about.project1Role }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.project1ContentTitle }}</div>
              <div class="desc">
                <ul>
                  <li><strong v-if="currentLanguage === 'zh'">技术栈：</strong><strong v-else>Tech Stack: </strong>{{ t.about.project1TechStack }}</li>
                  <li><strong v-if="currentLanguage === 'zh'">项目描述：</strong><strong v-else>Project Description: </strong>{{ t.about.project1Description }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project1TechChallenges }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project1Challenge1 }}</li>
                  <li>{{ t.about.project1Challenge2 }}</li>
                  <li>{{ t.about.project1Challenge3 }}</li>
                  <li>{{ t.about.project1Challenge4 }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project1Achievements }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project1Achievement1 }}</li>
                  <li>{{ t.about.project1Achievement2 }}</li>
                  <li>{{ t.about.project1Achievement3 }}</li>
                  <li>{{ t.about.project1Achievement4 }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="item load-pro">
          <div class="time">❖ {{ t.about.project2Time }}</div>
          <div class="name">
            <div class="company">{{ t.about.project2Title }}</div>
            <div class="job">{{ t.about.project2Role }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.project2ContentTitle }}</div>
              <div class="desc">
                <ul>
                  <li><strong v-if="currentLanguage === 'zh'">技术栈：</strong><strong v-else>Tech Stack: </strong>{{ t.about.project2TechStack }}</li>
                  <li><strong v-if="currentLanguage === 'zh'">项目描述：</strong><strong v-else>Project Description: </strong>{{ t.about.project2Description }}</li>
                  <li><strong v-if="currentLanguage === 'zh'">团队规模：</strong><strong v-else>Team Size: </strong>{{ t.about.project2TeamSize }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project2Results }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project2Result1 }}</li>
                  <li>{{ t.about.project2Result2 }}</li>
                  <li>{{ t.about.project2Result3 }}</li>
                  <li>{{ t.about.project2Result4 }}</li>
                  <li>{{ t.about.project2Result5 }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project2Achievement }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project2AchievementDesc }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="item load-pro">
          <div class="time">❖ {{ t.about.project3Time }}</div>
          <div class="name">
            <div class="company">{{ t.about.project3Title }}</div>
            <div class="job">{{ t.about.project3Role }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.project3ContentTitle }}</div>
              <div class="desc">
                <ul>
                  <li><strong v-if="currentLanguage === 'zh'">角色：</strong><strong v-else>Role: </strong><span v-if="currentLanguage === 'zh'">全栈开发工程师</span><span v-else>Full-stack Development Engineer</span></li>
                  <li><strong v-if="currentLanguage === 'zh'">技术栈：</strong><strong v-else>Tech Stack: </strong>{{ t.about.project3TechStack }}</li>
                  <li><strong v-if="currentLanguage === 'zh'">项目描述：</strong><strong v-else>Project Description: </strong>{{ t.about.project3Description }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project3Results }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project3Result1 }}</li>
                  <li>{{ t.about.project3Result2 }}</li>
                  <li>{{ t.about.project3Result3 }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.project3Achievement }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.project3AchievementDesc }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 社团经历 -->
        <div class="item load-pro">
          <div class="time">❖ {{ t.about.orgTime }}</div>
          <div class="name">
            <div class="company">{{ t.about.orgTitle }}</div>
            <div class="job">{{ t.about.orgRole }}</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">{{ t.about.orgContentTitle }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.orgContentDesc }}</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.orgContributions }}</div>
              <div class="desc">
                <ul>
                  <li>{{ t.about.orgContribution1 }}</li>
                  <li>{{ t.about.orgContribution2 }}</li>
                  <li>{{ t.about.orgContribution3 }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePageAnimations } from '../../composables/usePageAnimations'
import { useI18n } from '../../composables/useI18n'

// 使用页面动画
usePageAnimations()

// 使用国际化
const { t, currentLanguage, initLanguage } = useI18n()

const showEmailCopied = ref(false)
const showPhoneCopied = ref(false)
let emailTimer: number | undefined
let phoneTimer: number | undefined

const copyEmail = async () => {
  const email = '1812095643@qq.com'
  try {
    await navigator.clipboard.writeText(email)
    showEmailCopiedMessage()
  } catch {
    // 降级方案
    const input = document.createElement('input')
    input.value = email
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    showEmailCopiedMessage()
  }
}

const copyPhone = async () => {
  const phone = '15536623157'
  try {
    await navigator.clipboard.writeText(phone)
    showPhoneCopiedMessage()
  } catch {
    // 降级方案
    const input = document.createElement('input')
    input.value = phone
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    showPhoneCopiedMessage()
  }
}

const showEmailCopiedMessage = () => {
  showEmailCopied.value = true
  if (emailTimer) clearTimeout(emailTimer)
  emailTimer = window.setTimeout(() => {
    showEmailCopied.value = false
  }, 1000)
}

const showPhoneCopiedMessage = () => {
  showPhoneCopied.value = true
  if (phoneTimer) clearTimeout(phoneTimer)
  phoneTimer = window.setTimeout(() => {
    showPhoneCopied.value = false
  }, 1000)
}

// 初始化语言设置
onMounted(() => {
  initLanguage()
})
</script>

<style scoped>
/* 调整联系方式栏位宽度 */
.about-info-right {
  min-width: 200px;
}

.contact-desc .list {
  margin-bottom: 12px;
  text-align: left; /* 左对齐 */
}

.contact-desc .list-label {
  min-width: 50px;
  display: inline-block;
  text-align: left; /* 左对齐 */
}

.contact-desc .list-value {
  display: inline-block;
  min-width: 140px;
  text-align: left; /* 左对齐 */
}

.contact-desc .list-value a {
  text-align: left; /* 左对齐 */
}

/* 确保复制提示有足够空间 */
.list-value.copied {
  margin-left: 10px;
}
</style>
