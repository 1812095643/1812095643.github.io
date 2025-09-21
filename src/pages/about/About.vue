<template>
  <div class="about">
    <div class="about-top">
      <div class="about-name text-effect">柴晋龙</div>
      <div class="about-info">
        <div class="about-info-left load-pro">
          <div class="about-info-title">介绍</div>
          <div class="introduce-desc">
            目前是一名资深 B 端产品设计师，初级开发者，立志做一名设计工程师。多年以来，不断深耕设计系统、无障碍设计与设计工程化，拥有云计算、低代码、电商、智能客服、零信任等多行业洞察与实践落地经验。<br><br>
            我热衷于技术的无限可能性，开启了简单的编程学习之旅，开发了 10 余款提效、趣味、总结性<a href="https://asorn.cn/tool.html"> 工具 ↗</a>。<br>
            我专注于探索产品设计的价值观，持续写作与分享，累计输出超 15 万字的 <a href="https://www.yuque.com/asorn" target="_blank">技术文章 ↗</a>。<br><br>
            除此之外，我曾荣获 3 款外观发明专利，你可以在 <a href="http://epub.cnipa.gov.cn/" target="_blank">国家知识产权局 ↗</a> 官网中输入我的名字查询。<br><br>
            如果你有兴趣，还可以来 <a href="https://www.yuque.com/asorn" target="_blank">语雀 ↗</a> 看看我种草的影视剧作品，偶尔写的中二文章，日常收集的奇思妙想。<br><br>
            如果你也玩小红书，看看我发布的 <a href="https://www.xiaohongshu.com/user/profile/58febdab50c4b4527ef0dc09" target="_blank">生活笔记和商品 ↗</a>，说不定，我们还能找到一些共鸣。
          </div>
        </div>
        <div class="about-info-right load-pro">
          <div class="contact">
            <div class="about-info-title">联系</div>
            <div class="contact-desc">
              <div class="list">
                <div class="list-label">邮箱：</div>
                <div class="list-value" id="email" tabindex="0" role="button" title="点击复制邮箱" @click="copyEmail">
                  <a id="emailCopied">hi@asorn.cn</a>
                </div>
                <span class="list-value copied" :style="{ opacity: showCopied ? 1 : 0 }">已复制&nbsp;✓</span>
              </div>
              <div class="list">
                <div class="list-label">微信：</div>
                <div class="list-value">
                  <a class="tooltip">imasorn
                    <div class="tooltip-box">
                      <img src="/assets/about/wechat.png">
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="resume">
            <div class="about-info-title resume-title">简历</div>
            <div class="resume-desc">
              <div class="resume-desc-helptext">获取简历 (PDF・1MB)</div>
              <div class="magical primary-btn btn-s"><a href="https://asorn-resume.oss-cn-beijing.aliyuncs.com/cjl-resume.pdf" target="_blank">下载</a></div>
            </div>
          </div>
          <div class="resume">
            <div class="about-info-title resume-title">作品</div>
            <div class="resume-desc">
              <div class="resume-desc-helptext resume-desc-portfolio">联系我获取作品集 (PDF・8MB)</div>
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
              <div class="card-title">8</div>
              <div class="card-text">工作年限</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">60⁺</div>
              <div class="card-text">完整项目</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">130⁺</div>
              <div class="card-text">技术文章</div>
            </a>
          </div>
          <div class="magical power-card-number">
            <a>
              <div class="card-title">3</div>
              <div class="card-text">外观专利</div>
            </a>
          </div>
        </div>
        <div class="list-01">
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/abstract.svg')"></div>
              <div class="card-text">结构化设计思维，注重逻辑与数据驱动</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/menu.svg')"></div>
              <div class="card-text">体系化设计资产落地经验，深耕设计系统</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/code.svg')"></div>
              <div class="card-text">多角色共情，利用工程化思维解决问题</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/pen.svg')"></div>
              <div class="card-text">丰富的多端多行业产品设计经验，像素强迫症</div>
            </a>
          </div>
          <div class="magical power-card">
            <a>
              <div class="card-img" style="background-image: url('/assets/about/pin.svg')"></div>
              <div class="card-text">体验研发团队管理经验，助力产研上下游</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="about-bottom load-pro">
      <div class="experience">
        <div class="item load-pro">
          <div class="time">❖ 2023.10 ~ 至今</div>
          <div class="name">
            <div class="company"><a href="https://www.meiye.art/" target="_blank">美叶 ↗</a></div>
            <div class="job">合作设计师 & 产品经理</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">相关产品孵化中</div>
              <div class="desc">
                <ul>
                  <li>敬请期待......</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">提升与价值</div>
              <div class="desc">
                <ul>
                  <li>不断学习 AI 相关技术与工具，联合创立一款行业解决方案式 AI 产品；</li>
                  <li>追求自我价值实现，与多个领域团队合作共创数个开源项目，丰富团队协作经验、积累开源项目经验、进一步提升开发水平。</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">同时承接各类项目</div>
              <div class="desc">
                <ul>
                  <li>App、Web、H5、小程序、后台设计，设计资产打造，Axure 交互设计，企业 VI 设计等，欢迎咨询</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="item load-pro">
          <div class="time">❖ 2019.08 ~ 2023.08</div>
          <div class="name">
            <div class="company"><a href="https://www.qingcloud.com/" target="_blank">青云科技有限公司 ↗</a></div>
            <div class="job">高级产品设计师</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">青云 QingCloud 设计资产</div>
              <div class="desc">
                <ul>
                  <li>利用工程化思维沉淀完善且可落地的基础、业务、模式组件库及周边生态，覆盖<span> 93% </span>产品线，规范设计产出、降低约<span> 50% </span>验收成本、提升体验一致性与跨部门协作效率；</li>
                  <li>解决图标、插画、可视化组件等基础设施的从无到有问题，深入了解其生命流程并建立前沿、高效的交付流程 (交付周期缩短 <span> 3/4</span>)，真正解放设计师、研发双手，赋能产品、市场、商务、服务等多角色人员；</li>
                  <li>基于 SOP 建立文件协作资产 (应用于 <span> 150+ </span> 产品线)，包含文件归纳信息架构、封面系统、项目模板与资源等标准环节配套工具，大幅提升协作效率，强化团队专业度。</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">企业云 Web Installer 可视化部署工具</div>
              <div class="desc">
                <ul>
                  <li>负责云计算平台私有化部署工具的 <span> 0-1 </span> 产品转化，与产品经理共同规划产品需求，提出可行性设计方案并落地；</li>
                  <li>沉淀可被同类产品复用的分步式部署流程、标准化布局框架及交互模式，探索落地大量设计价值体现的设计方法等。</li>
                </ul>
              </div>
            </div>
            <div class="item load-pro">
              <div class="title">全象云服平台、低代码工具、IDaaS 产品</div>
              <div class="desc">
                <ul>
                  <li>独立负责云服平台客户、厂商、合作伙伴、运营、开放平台端全流程设计，其核心业务工单部分被 <span> 80% </span> 产品线接入，并服务于众多 (无法公开) 服务人员与客户，获得正向反馈；</li>
                  <li>负责衍生品低代码工具的前期需求调研，组件库搭建，并提供如表单引擎、流程引擎、工作流等底层功能的设计方案，为后续功能扩展打下基础；</li>
                  <li>主导设计开源统一身份认证产品 IDaaS，针对公司内部数字化 IT 角色的核心诉求找到设计发力点并提供完整解决方案。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="item load-pro">
          <div class="time">❖ 2016.05 ~ 2019.06</div>
          <div class="name">
            <div class="company"><a href="http://www.wenshuai.cn/" target="_blank">文率科技有限公司 ↗</a></div>
            <div class="job">UI 设计师</div>
          </div>
          <div class="project-experience">
            <div class="item load-pro">
              <div class="title">FaShop 开源商城系统</div>
              <div class="desc">
                <ul>
                  <li>公司商城系统 B/C 端产品的视觉、交互及设计系统打造工作，累计服务 <span> 50+ </span> 客户，设计 <span> 60+ </span> 多行业多平台案例。</li>
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
import { ref } from 'vue'
import { usePageAnimations } from '../../composables/usePageAnimations'

// 使用页面动画
usePageAnimations()

const showCopied = ref(false)
let timer: number | undefined

const copyEmail = async () => {
  const email = 'hi@asorn.cn'
  try {
    await navigator.clipboard.writeText(email)
    showCopiedMessage()
  } catch {
    // 降级方案
    const input = document.createElement('input')
    input.value = email
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    showCopiedMessage()
  }
}

const showCopiedMessage = () => {
  showCopied.value = true
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => {
    showCopied.value = false
  }, 1000)
}
</script>
