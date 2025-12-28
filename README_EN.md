# LaoWang Nav

[English](README_EN.md) | [简体中文](README.md)

**A beautiful, easy-to-use, and powerful self-hosted navigation dashboard.**

[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/tony-wang1990/laowang-nav/blob/master/LICENSE)
[![Version](https://img.shields.io/badge/Version-v1.2-brightgreen)](https://github.com/tony-wang1990/laowang-nav/releases)
[![Vue 2.7](https://img.shields.io/badge/Vue-2.7-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://hub.docker.com/)
[![GitHub stars](https://img.shields.io/github/stars/tony-wang1990/laowang-nav)](https://github.com/tony-wang1990/laowang-nav/stargazers)

[**Live Demo**](https://demo-nav.zeabur.app/) | [**Quick Start**](#-quick-start) | [**Features**](#-features) | [**Deployment**](#-cloud-deployment)

---

##  Screenshots

<div align="center">

###  Live Demo

[![Demo Site](https://img.shields.io/badge/_Click_Here_For_Demo-demo--nav.zeabur.app-00d4aa?style=for-the-badge&logo=zeabur)](https://demo-nav.zeabur.app/)

> [!IMPORTANT]
> ###  First Visit Loading Time 
> 
>  **[IMPORTANT]** Due to rich features and assets, the ***first visit may take 30-60 seconds*** to load. Please be patient!
> 
>  **Subsequent visits will be instant** - The browser caches static resources, making future loads extremely fast!
> 
>  **Tip**: Keep the tab open during the first load and wait for it to complete before exploring.

---

###  Desktop Home - Single Column

[![Desktop Homepage](docs/screenshots/demo-desktop.png)](https://demo-nav.zeabur.app/)

* Click image to try the demo | Integrated search engine switch, real-time weather, theme controls*

---

###  Multi-Column Category Layout

![Category Layout](docs/screenshots/demo-categories.png)

*Supports multi-column display, organized categories like Home, AI-stuff, Cloud, Container at a glance*

---

###  Rich Settings Options

![Settings Panel](docs/screenshots/demo-themes.png)

*Download config, modify settings, change language, custom CSS, all in one place*

---

###  Visual Editor Mode

![Edit Mode](docs/screenshots/demo-editor.png)

*One-click edit mode to modify page info, app settings, and page layout with real-time saving*

</div>

---

##  Features

-  **Fast Loading**: Optimized code for sub-second response times
-  **Multi-Theme Support**: 20+ built-in themes, plus Custom CSS support
-  **Safe Deployment Sync**: Supports Watchtower auto-updates with Docker Volumes to ensure data safety. Code updates and user config coexist perfectly.
-  **Integrated Search**: 
  - Desktop: Fast on-site filtering
  - **Mobile**: Supports switching between Baidu/Bing/Google search engines
-  **Smart Weather Widget**: 
  - **Auto IP Location**: Accurately identifies domestic (CN) vs international users
  - **Multi-Source Failover**: Integrates VVHan/Open-Meteo with auto-failover and auto-language switching (CN/EN)
  - **Localized Display**: Chinese for CN users, English for international users
-  **Responsive Design**: Perfectly adapted for mobile, tablet, and desktop
-  **Privacy First**: All data remains in your control

---

##  Changelog





##  Quick Start

### Method 1: One-Click Cloud Deployment

No server required, completely free:

| Platform | Deployment Link |
|------|----------|
| **Zeabur** (Recommended) | [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/2Q624P) |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tony-wang1990/laowang-nav) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/tony-wang1990/laowang-nav) |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/tony-wang1990/laowang-nav) |

### Method 2: Docker Compose (Recommended)

>  **Safe Sync Mode**: Using this method, your local configuration (conf.yml) and icons are preserved, while the site features and code utilize automatic updates.

Create docker-compose.yml:

`yaml
version: "3.8"
services:
  laowang-nav:
    image: ghcr.io/tony-wang1990/laowang-nav:latest
    container_name: laowang-nav
    volumes:
      - ./user-data:/app/user-data          # Mount config dir (Data Persistence)
      - ./public/item-icons:/app/public/item-icons # Mount icons dir
    ports:
      - 3000:8080
    restart: unless-stopped

  # Auto-update Service
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 300 laowang-nav # Check for updates every 5 mins
    restart: unless-stopped
`

Start instructions:
`ash
docker-compose up -d
`

>  **Multi-Arch Support**: The Docker image supports both **AMD64** (Intel/AMD) and **ARM64** (Raspberry Pi/Oracle ARM), automatically adapting to your server architecture!

Access at http://localhost:8080

### Method 3: Local Development

`ash
# Clone repo
git clone https://github.com/tony-wang1990/laowang-nav.git
cd laowang-nav

# Install dependencies
npm install

# Dev mode
npm run dev
`

Access at http://localhost:8080

---

##  Configuration

### Basic Config

Configuration is located at user-data/conf.yml:

`yaml
pageInfo:
  title: LaoWang Nav
  description: Personal Dashboard
  
appConfig:
  theme: colorful
  
sections:
  - name: Tools
    items:
      - title: GitHub
        description: Code Hosting
        icon: https://github.com/favicon.ico
        url: https://github.com
`

---

##  Tech Stack

| Type | Tech |
|------|------|
| Frontend | Vue.js 2.7, TypeScript |
| Build | Webpack, Vue CLI |
| Styling | SCSS, CSS Variables |
| Deploy | Docker, Node.js |

---

##  Documentation

- [Quick Start](docs/quick-start.md)
- [Configuration](docs/configuring.md)
- [Theming](docs/theming.md)
- [Deployment](docs/deployment.md)

---

##  Credits

>  This project is based on [Dashy](https://github.com/Lissy93/dashy), adding Chinese localization and feature enhancements. Thanks to the original author for their open-source contribution!

---

##  License

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/tony-wang1990/laowang-nav/blob/master/LICENSE)

**Open Source**  Learning & Research  Personal Use  Use at Your Own Risk

</div>

>  This project is licensed under the **MIT License**, for **learning and personal use only**.
> 
>  **Disclaimer**:
> - This software is provided "as is", without warranty of any kind.
> - The author is not liable for any damages or issues arising from its use.
> - Use of this software implies acceptance of all risks.
> - Please evaluate commercial use carefully.

---

<div align="center">

**[ Back to Top](#laowang-nav)**

Made with  by [LaoWang](https://github.com/tony-wang1990)

 Star if you like it!

</div>