# HoloCAN - 中加虚拟贸易展示平台 (演示版)

HoloCAN是一个基于AI技术的虚拟展会贸易平台，致力于解决中加两国中小企业在跨境贸易中的挑战。本项目为演示版本，展示平台的核心功能和用户界面。

## 特点功能

- **AI智能匹配**：基于企业需求和产品特性，智能推荐最具潜力的合作伙伴
- **虚拟3D展会**：沉浸式3D虚拟展厅，突破地域限制，全天候展示产品和服务
- **双语商务对接**：提供中英双语实时翻译和商务沟通支持，消除语言障碍
- **市场洞察分析**：提供行业趋势和市场数据分析，辅助企业制定跨境战略
- **全流程贸易支持**：从商务对接到物流、支付、法律等全流程支持服务

## 技术栈

- **前端框架**: Next.js + React
- **样式**: TailwindCSS
- **3D渲染**: Three.js / React Three Fiber
- **动画**: Framer Motion
- **国际化**: Next.js i18n

## 开始使用

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看演示版本。

### 构建生产版本

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 项目结构

```
demo-version/
├── public/                 # 静态资源
├── src/
│   ├── components/         # UI组件
│   │   ├── layout/         # 布局组件
│   │   ├── ui/             # 通用UI组件
│   │   ├── exhibition/     # 展会相关组件
│   │   └── matching/       # 匹配功能组件
│   ├── pages/              # 页面
│   ├── styles/             # 样式文件
│   ├── utils/              # 工具函数
│   ├── hooks/              # 自定义Hooks
│   └── types/              # TypeScript类型
├── tailwind.config.js      # TailwindCSS配置
└── next.config.js          # Next.js配置
```

## 演示功能

本演示版本包括以下功能的模拟实现：

1. **主页展示**: 平台介绍、核心功能和价值主张
2. **虚拟展厅演示**: 3D虚拟展厅的基础展示功能
3. **AI匹配功能**: 企业匹配功能的用户界面和交互流程
4. **用户注册/登录**: 基础用户认证流程

## 许可证

本项目仅用于演示目的，版权所有 © 2024 HoloCAN 