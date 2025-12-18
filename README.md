# LaoWang Nav

**一个漂亮、易用、功能强大的自托管导航页**

[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/tony-wang1990/laowang-nav/blob/master/LICENSE)
[![Version](https://img.shields.io/badge/Version-v1.2-brightgreen)](https://github.com/tony-wang1990/laowang-nav/releases)
[![Vue 2.7](https://img.shields.io/badge/Vue-2.7-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://hub.docker.com/)
[![GitHub stars](https://img.shields.io/github/stars/tony-wang1990/laowang-nav)](https://github.com/tony-wang1990/laowang-nav/stargazers)

[**在线演示**](https://demo-nav.zeabur.app/) | [**快速开始**](#-快速开始) | [**功能特性**](#-特性) | [**部署指南**](#-部署方式)

---

## 📸 截图预览

<div align="center">

### 🌐 在线演示

[![Demo Site](https://img.shields.io/badge/🔗_点击体验_Demo-demo--nav.zeabur.app-00d4aa?style=for-the-badge&logo=zeabur)](https://demo-nav.zeabur.app/)

> [!IMPORTANT]
> ### ⚠️🚨 首次访问加载提示 🚨⚠️
> 
> 🔴 **【重要】** 由于项目包含丰富的功能和资源文件，***首次访问可能需要 30-60 秒***的加载时间，请耐心等待！
> 
> ✅ **后续访问会非常快速** - 浏览器会缓存静态资源，再次访问几乎秒开！
> 
> 💡 **建议**：首次访问时保持页面打开，等待完全加载后再体验功能。

---

### 🖥️ 桌面端主页 - 单栏布局

[![Desktop Homepage](docs/screenshots/demo-desktop.png)](https://demo-nav.zeabur.app/)

*👆 点击图片体验在线 Demo | 集成搜索引擎切换、实时天气显示、主题布局控制*

---

### 📊 多栏分类布局

![Category Layout](docs/screenshots/demo-categories.png)

*支持多栏并列展示，Home、AI-stuff、Cloud、Container 分类一目了然*

---

### ⚙️ 丰富的设置选项

![Settings Panel](docs/screenshots/demo-themes.png)

*下载配置、修改设置、更改语言、自定义CSS、云端同步等一应俱全*

---

### ✏️ 可视化编辑模式

![Edit Mode](docs/screenshots/demo-editor.png)

*一键进入编辑模式，支持修改页面信息、应用设置、页面布局，实时保存*

</div>

---

## ✨ 特性

- 🚀 **极速加载**: 经过优化的代码，秒级响应
- 🎨 **多主题支持**: 内置 20+ 精美主题，支持自定义 CSS
- ☁️ **多云一键部署**: 支持 Zeabur、Vercel、Railway 等平台
- 🔍 **集成搜索引擎**: 
  - 桌面端：站内快速筛选
  - **移动端**：支持 Baidu/Bing/Google 全网搜索切换
- 🌦️ **实时天气**: 首页集成实时天气与日期显示
- 📱 **响应式设计**: 完美适配手机、平板和桌面端

- 🔒 **隐私优先**: 所有数据掌握在自己手中

---

## 📋 更新日志





## 🚀 快速开始

### 方式一：一键部署到云平台

无需服务器，完全免费：

| 平台 | 部署链接 |
|------|----------|
| **Zeabur** (推荐) | [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/2Q624P) |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tony-wang1990/laowang-nav) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/tony-wang1990/laowang-nav) |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/tony-wang1990/laowang-nav) |

### 方式二：Docker 部署

> 💡 **多架构支持**：Docker 镜像同时支持 **AMD64** (Intel/AMD 服务器) 和 **ARM64** (树莓派/Oracle ARM 等)，自动适配您的服务器架构！

```bash
docker run -d \
  -p 8080:8080 \
  --name laowang-nav \
  --restart always \
  ghcr.io/tony-wang1990/laowang-nav:latest
```

访问 `http://localhost:8080`

### 方式三：本地开发

```bash
# 克隆仓库
git clone https://github.com/tony-wang1990/laowang-nav.git
cd laowang-nav

# 安装依赖
npm install

# 开发模式
npm run dev
```

访问 `http://localhost:8080`

---

## ⚙️ 配置说明

###  基础配置

配置文件位于 `user-data/conf.yml`：

```yaml
pageInfo:
  title: LaoWang Nav
  description: 个人导航站
  
appConfig:
  theme: colorful
  
sections:
  - name: 常用工具
    items:
      - title: GitHub
        description: 代码托管平台
        icon: https://github.com/favicon.ico
        url: https://github.com
```



---

## 🛠️ 技术栈

| 类型 | 技术 |
|------|------|
| 前端 | Vue.js 2.7, TypeScript |
| 构建 | Webpack, Vue CLI |
| 样式 | SCSS, CSS Variables |
| 部署 | Docker, Node.js |

---

## 📚 文档

- [快速开始](docs/quick-start.md)
- [配置指南](docs/configuring.md)
- [主题定制](docs/theming.md)
- [部署文档](docs/deployment.md)

---

## 🙏 致谢

> 💡 本项目基于 [Dashy](https://github.com/Lissy93/dashy) 二次开发，增加了中文本地化和功能增强。感谢原作者的开源贡献！

---

### ☁️ 云端备份配置

默认情况下，云端备份功能已禁用（不连接任何外部服务器）。
如需启用，请在 `user-data/conf.yml` 的 `appConfig` 部分添加您的自建服务地址：

```yaml
appConfig:
  # ... 其他配置
  backupEndpoint: 'https://your-sync-server.com'
```

---

## 📄 许可证

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/tony-wang1990/laowang-nav/blob/master/LICENSE)

**开源协议** · 学习研究 · 个人使用 · 风险自负

</div>

> 📜 本项目采用 **MIT 许可证**，**仅供学习和个人使用**。
> 
> ⚠️ **重要免责声明**：
> - 本软件按"原样"提供，不提供任何形式的明示或暗示保证
> - 作者不对使用本软件造成的任何损失或问题承担责任
> - 使用本软件即表示您同意自行承担所有风险
> - 商业使用请谨慎评估并承担相应责任
> 

---

<div align="center">

**[⬆ 回到顶部](#laowang-nav)**

Made with ❤️ by [LaoWang](https://github.com/tony-wang1990)

⭐ 如果觉得不错，请给个 Star！

</div>

