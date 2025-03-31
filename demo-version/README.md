# HoloCAN - 加中商贸服务平台

HoloCAN是一个专为中加贸易设计的商贸服务平台，提供虚拟展厅、AI配对、合同法务、跨境物流和融资服务等功能，帮助中国和加拿大企业建立商业联系并开展跨境贸易。

## 项目简介

本项目是HoloCAN平台的demo版本，旨在展示平台的核心功能和用户界面。通过现代前端技术，我们创建了一个响应式、多语言支持的用户界面，为潜在用户提供平台功能的预览。

## 项目仓库

- **GitHub仓库**: [https://github.com/YangChengTS/holocan-demo](https://github.com/YangChengTS/holocan-demo)
- **克隆地址**: `git clone https://github.com/YangChengTS/holocan-demo.git`

## 技术栈

- **前端框架**: Next.js 14 (React框架)
- **样式解决方案**: TailwindCSS
- **3D渲染**: Three.js / React Three Fiber
- **动画效果**: Framer Motion
- **国际化**: 自定义语言上下文

## 目录结构

```
demo-version/
├── public/               # 静态资源文件
│   ├── company-logos/    # 公司logo
│   ├── icons/            # 图标资源
│   ├── qr-codes/         # 下载二维码
│   └── ...               # 其他静态资源
├── src/
│   ├── components/       # 组件
│   │   ├── exhibition/   # 虚拟展厅相关组件
│   │   ├── layout/       # 布局组件
│   │   └── matching/     # AI配对相关组件
│   ├── context/          # 上下文
│   │   └── LanguageContext.tsx  # 语言上下文
│   ├── pages/            # 页面
│   │   ├── index.tsx     # 首页
│   │   ├── exhibition.tsx # 虚拟展厅
│   │   ├── matching.tsx  # AI配对
│   │   ├── contracts.tsx # 合同法务
│   │   ├── logistics.tsx # 跨境物流
│   │   ├── financing.tsx # 融资服务
│   │   └── download.tsx  # 客户端下载
│   ├── styles/           # 样式
│   │   ├── globals.css   # 全局样式
│   │   └── components.css # 组件样式
│   └── types/            # 类型定义
└── ...                   # 配置文件
```

## 功能特性

### 1. 多语言支持
- 支持中文和英文界面
- 可扩展的语言配置
- 支持动态语言切换

### 2. 响应式设计
- 适配桌面、平板和移动设备
- 针对不同设备优化的UI/UX设计
- 流畅的动画和过渡效果

### 3. 核心功能模块
- **虚拟展厅**: 3D交互展示空间
- **AI配对**: 智能企业匹配系统
- **合同法务**: 跨境贸易合同服务
- **跨境物流**: 物流解决方案
- **融资服务**: 跨境贸易融资方案
- **客户端下载**: 桌面和移动应用下载

## 开发指南

### 环境要求
- Node.js 18.0.0+ 
- npm 9.0.0+

### 安装依赖
```bash
cd demo-version
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm run start
```

## 许可证

本项目仅用于演示目的，未经授权不得用于商业用途。

## 联系我们

如有任何问题或建议，请通过以下方式联系我们:
- 电子邮件: contact@holocan.com
- 网站: https://holocan.com 