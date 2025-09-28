<template>
  <div class="about">
    <div class="about-top">
      <div class="about-name text-effect">{{ t.about.name }}</div>
      <div class="about-info">
        <div class="about-info-left load-pro">
          <div class="about-info-title">{{ t.about.introduction }}</div>
          <div
            class="introduce-desc"
            v-html="t.about.introductionContent"
          ></div>
        </div>
        <div class="about-info-right load-pro">
          <div class="contact">
            <div class="about-info-title">{{ t.about.contact }}</div>
            <div class="contact-desc">
              <div class="list">
                <div class="list-label">{{ t.about.email }}：</div>
                <div
                  class="list-value"
                  id="email"
                  tabindex="0"
                  role="button"
                  :title="t.about.copyEmailTip"
                  @click="copyEmail"
                >
                  <a id="emailCopied">1812095643@qq.com</a>
                </div>
                <span
                  class="list-value copied"
                  :style="{ opacity: showEmailCopied ? 1 : 0 }"
                  >{{ t.about.copied }}&nbsp;✓</span
                >
              </div>
              <div class="list">
                <div class="list-label">{{ t.about.phone }}：</div>
                <div
                  class="list-value"
                  id="phone"
                  tabindex="0"
                  role="button"
                  :title="t.about.copyPhoneTip"
                  @click="copyPhone"
                >
                  <a id="phoneCopied">15536623157</a>
                </div>
                <span
                  class="list-value copied"
                  :style="{ opacity: showPhoneCopied ? 1 : 0 }"
                  >{{ t.about.copied }}&nbsp;✓</span
                >
              </div>
              <div class="list">
                <div class="list-label">{{ t.about.wechat }}：</div>
                <div class="list-value">
                  <a class="tooltip"
                    >RoySmee_cxdzxy
                    <div class="tooltip-box">
                      <img src="/assets/about/wechat.png" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="resume">
            <div class="about-info-title resume-title">
              {{ t.about.resume }}
            </div>
            <div class="resume-desc">
              <div class="resume-desc-helptext">{{ t.about.resumeDesc }}</div>
              <div class="resume-buttons">
                <div class="magical primary-btn btn-s">
                  <a href="/简历.pdf" download>{{ t.about.download }}</a>
                </div>
                <div class="magical normal-btn btn-s">
                  <a @click="viewResume" role="button" tabindex="0">{{
                    t.about.view
                  }}</a>
                </div>
              </div>
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
              <div
                class="card-img"
                style="background-image: url('/assets/about/abstract.svg')"
              ></div>
              <div class="card-text">{{ t.about.skill1 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div
                class="card-img"
                style="background-image: url('/assets/about/menu.svg')"
              ></div>
              <div class="card-text">{{ t.about.skill2 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div
                class="card-img"
                style="background-image: url('/assets/about/code.svg')"
              ></div>
              <div class="card-text">{{ t.about.skill3 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div
                class="card-img"
                style="background-image: url('/assets/about/pen.svg')"
              ></div>
              <div class="card-text">{{ t.about.skill4 }}</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div
                class="card-img"
                style="background-image: url('/assets/about/pin.svg')"
              ></div>
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
                  <li v-if="currentLanguage === 'zh'">
                    Java开发、C++程序设计、Web开发、数据结构与算法、数据库存储、游戏引擎、软件工程等相关课程
                  </li>
                  <li v-else>
                    Java Development, C++ Programming, Web Development, Data
                    Structures and Algorithms, Database Storage, Game Engine,
                    Software Engineering and other related courses
                  </li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">{{ t.about.technicalSkills }}</div>
              <div class="desc">
                <ul>
                  <li>
                    <strong>{{ t.about.skill1Title }}：</strong
                    >{{ t.about.skill1Desc }}
                  </li>
                  <li>
                    <strong>{{ t.about.skill2Title }}：</strong
                    >{{ t.about.skill2Desc }}
                  </li>
                  <li>
                    <strong>{{ t.about.skill3Title }}：</strong
                    >{{ t.about.skill3Desc }}
                  </li>
                  <li>
                    <strong>{{ t.about.skill4Title }}：</strong
                    >{{ t.about.skill4Desc }}
                  </li>
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
            <div class="company">
              <a href="#" target="_blank">{{ t.about.internshipCompany }} ↗</a>
            </div>
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
                  <li>
                    <strong v-if="currentLanguage === 'zh'">技术栈：</strong
                    ><strong v-else>Tech Stack: </strong
                    >{{ t.about.project1TechStack }}
                  </li>
                  <li>
                    <strong v-if="currentLanguage === 'zh'">项目描述：</strong
                    ><strong v-else>Project Description: </strong
                    >{{ t.about.project1Description }}
                  </li>
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
                  <li>
                    <strong v-if="currentLanguage === 'zh'">技术栈：</strong
                    ><strong v-else>Tech Stack: </strong
                    >{{ t.about.project2TechStack }}
                  </li>
                  <li>
                    <strong v-if="currentLanguage === 'zh'">项目描述：</strong
                    ><strong v-else>Project Description: </strong
                    >{{ t.about.project2Description }}
                  </li>
                  <li>
                    <strong v-if="currentLanguage === 'zh'">团队规模：</strong
                    ><strong v-else>Team Size: </strong
                    >{{ t.about.project2TeamSize }}
                  </li>
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
                  <li>
                    <strong v-if="currentLanguage === 'zh'">角色：</strong
                    ><strong v-else>Role: </strong
                    ><span v-if="currentLanguage === 'zh'">全栈开发工程师</span
                    ><span v-else>Full-stack Development Engineer</span>
                  </li>
                  <li>
                    <strong v-if="currentLanguage === 'zh'">技术栈：</strong
                    ><strong v-else>Tech Stack: </strong
                    >{{ t.about.project3TechStack }}
                  </li>
                  <li>
                    <strong v-if="currentLanguage === 'zh'">项目描述：</strong
                    ><strong v-else>Project Description: </strong
                    >{{ t.about.project3Description }}
                  </li>
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

    <!-- 证书展示板块 -->
    <div class="about-certificates load-pro">
      <div class="certificates-header">
        <div class="certificates-title">{{ t.about.certificates }}</div>
        <div class="certificates-subtitle">{{ t.about.certificatesDesc }}</div>
      </div>
      <div class="certificates-grid">
        <div
          class="magical certificate-card"
          v-for="(certificate, index) in certificates"
          :key="index"
          @click="openCertificateModal(certificate)"
        >
          <div class="certificate-image">
            <img :src="certificate.image" :alt="certificate.title" />
            <div class="certificate-overlay">
              <div class="certificate-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 3L15 9L10 4L3 11L9 17L15 11L21 3Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="certificate-info">
            <div class="certificate-title">
              {{ t.about.certificatesList[certificate.key] }}
            </div>
            <div class="certificate-description">
              {{ t.about.certificatesList[certificate.key + "Desc"] }}
            </div>
            <div class="certificate-date">{{ certificate.date }}</div>
          </div>
        </div>
      </div>

      <!-- 使用新的ImageViewer组件 -->
      <ImageViewer
        :visible="showModal"
        :image-src="selectedCertificate.image"
        :title="t.about.certificatesList[selectedCertificate.key]"
        :description="getCertificateDescription(selectedCertificate.key)"
        :date="selectedCertificate.date"
        :category="selectedCertificate.category"
        :category-color="getCategoryColor(selectedCertificate.category)"
        @close="closeCertificateModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePageAnimations } from "../../composables/usePageAnimations";
import { useI18n } from "../../composables/useI18n";
import ImageViewer from "../../components/ImageViewer.vue";

// 使用页面动画
usePageAnimations();

// 使用国际化
const { t, currentLanguage, initLanguage } = useI18n();

const showEmailCopied = ref(false);
const showPhoneCopied = ref(false);
const showModal = ref(false);
const selectedCertificate = ref({
  key: "",
  date: "",
  image: "",
  category: "",
});
let emailTimer: number | undefined;
let phoneTimer: number | undefined;

// 证书数据
const certificates = ref([
  {
    key: "excellentStudentLeader",
    date: "2024.06",
    image: "/assets/about/Certificate/优秀学生干部证明.jpg",
    category: "honor",
  },
  {
    key: "excellentGraduationProject",
    date: "2024.05",
    image: "/assets/about/Certificate/优秀毕业设计证明.jpg",
    category: "academic",
  },
  {
    key: "provincialVideoCompetition",
    date: "2023.12",
    image: "/assets/about/Certificate/省级短视频大赛一等奖证明.jpg",
    category: "competition",
  },
  {
    key: "academicDegree",
    date: "2025.06",
    image: "/assets/about/Certificate/学历学位证明.jpg",
    category: "education",
  },
  {
    key: "internship",
    date: "2024.09",
    image: "/assets/about/Certificate/实习证明.JPG",
    category: "work",
  },
  {
    key: "technicalDirector",
    date: "2023.05",
    image: "/assets/about/Certificate/技术部部长证明.jpg",
    category: "leadership",
  },
  {
    key: "president",
    date: "2024.04",
    image: "/assets/about/Certificate/会长证明.jpg",
    category: "leadership",
  },
  {
    key: "paperPublication",
    date: "2024.03",
    image: "/assets/about/Certificate/论文发布证明.png",
    category: "academic",
  },
  {
    key: "softwareCopyright",
    date: "2024.01",
    image: "/assets/about/Certificate/软著.png",
    category: "achievement",
  },
]);

const copyEmail = async () => {
  const email = "1812095643@qq.com";
  try {
    await navigator.clipboard.writeText(email);
    showEmailCopiedMessage();
  } catch {
    // 降级方案
    const input = document.createElement("input");
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showEmailCopiedMessage();
  }
};

const copyPhone = async () => {
  const phone = "15536623157";
  try {
    await navigator.clipboard.writeText(phone);
    showPhoneCopiedMessage();
  } catch {
    // 降级方案
    const input = document.createElement("input");
    input.value = phone;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showPhoneCopiedMessage();
  }
};

const showEmailCopiedMessage = () => {
  showEmailCopied.value = true;
  if (emailTimer) clearTimeout(emailTimer);
  emailTimer = window.setTimeout(() => {
    showEmailCopied.value = false;
  }, 1000);
};

const showPhoneCopiedMessage = () => {
  showPhoneCopied.value = true;
  if (phoneTimer) clearTimeout(phoneTimer);
  phoneTimer = window.setTimeout(() => {
    showPhoneCopied.value = false;
  }, 1000);
};

const viewResume = () => {
  window.open("/简历.pdf", "_blank");
};

// 证书预览功能
const openCertificateModal = (certificate: any) => {
  selectedCertificate.value = certificate;
  showModal.value = true;
};

const closeCertificateModal = () => {
  showModal.value = false;
};

// 获取证书分类颜色
const getCategoryColor = (category: string) => {
  const colors = {
    honor: "#57AC84",
    academic: "#6461F1",
    competition: "#FF6B6B",
    education: "#4ECDC4",
    work: "#45B7D1",
    leadership: "#FFA726",
    achievement: "#AB47BC",
  };
  return colors[category as keyof typeof colors] || "#6461F1";
};

// 获取证书描述
const getCertificateDescription = (key: string) => {
  return (t.value.about.certificatesList as any)[key + "Desc"] || "";
};

// 初始化语言设置
onMounted(() => {
  initLanguage();
});
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
}

/* 简历按钮样式 */
.resume-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.resume-buttons .btn-s {
  flex: 1;
  min-width: 80px;
}

.resume-buttons .normal-btn a {
  cursor: pointer;
}

/* 确保复制提示有足够空间 */
.list-value.copied {
  margin-left: 10px;
}

/* 证书展示板块样式 */
.about-certificates {
  width: 100%;
  max-width: var(--mw);
  display: flex;
  flex-direction: column;
  margin: 80px 0 0 0;
  padding-top: 80px;
  border-top: 1px solid rgba(100, 97, 241, 0.1);
}

.certificates-header {
  text-align: center;
  margin-bottom: 48px;
}

.certificates-title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  background: linear-gradient(135deg, #e8e8f6 0%, #6461f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.certificates-subtitle {
  font-size: 14px;
  line-height: 24px;
  color: #a8a8b6;
  max-width: 600px;
  margin: 0 auto;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  grid-auto-rows: 280px; /* 固定卡片高度 */
}

.certificate-card {
  --circle-size: 400px;
  background-color: #141419;
  box-shadow: 0px 0px 8px 0px rgba(10, 10, 14, 0.4);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid transparent;
  height: 100%; /* 确保卡片占满网格行高 */
  display: flex;
  flex-direction: column;
}

.certificate-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0px 12px 32px 0px rgba(100, 97, 241, 0.15),
    0px 0px 0px 1px rgba(100, 97, 241, 0.3);
  border-color: rgba(100, 97, 241, 0.3);
}

.certificate-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1f 0%, #141419 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* 防止图片容器缩小 */
}

.certificate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  background: transparent;
  border-radius: 4px;
}

.certificate-card:hover .certificate-image img {
  transform: scale(1.08) rotate(0.5deg);
}

.certificate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(100, 97, 241, 0.1) 0%,
    rgba(100, 97, 241, 0.05) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certificate-card:hover .certificate-overlay {
  opacity: 1;
}

.certificate-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(100, 97, 241, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6461f1;
}

.certificate-info {
  padding: 20px;
  flex: 1; /* 让信息容器填充剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.certificate-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #e8e8f6;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.certificate-description {
  font-size: 13px;
  line-height: 20px;
  color: #a8a8b6;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.certificate-date {
  font-size: 12px;
  line-height: 18px;
  color: #6461f1;
  font-weight: 500;
  transition: all 0.3s ease;
}

.certificate-card:hover .certificate-title {
  color: #6461f1;
}

.certificate-card:hover .certificate-description {
  color: #e8e8f6;
}

.certificate-card:hover .certificate-date {
  color: #57ac84;
  transform: translateX(4px);
}
</style>
