# HoloCAN - 中加虚拟贸易展示平台

![HoloCAN Logo](public/holocanlogo.svg)

HoloCAN是连接中国和加拿大中小企业的AI驱动虚拟贸易展示平台，旨在通过先进的人工智能和3D技术打破跨境贸易中的地域、语言和文化壁垒。

## 项目状态

本项目目前已完成核心功能开发，包括：

- ✅ 跨境贸易主页及导航系统
- ✅ 中英双语切换功能
- ✅ AI智能匹配模块 
- ✅ 虚拟展览系统
- ✅ 合同法务支持页面
- ✅ 物流跟踪系统
- ✅ 跨境融资服务页面
- ✅ 移动端响应式适配

## 核心优势

- **AI智能匹配**: 基于企业需求自动匹配最佳合作伙伴
- **3D虚拟展厅**: 突破地域限制的沉浸式产品展示体验
- **双语支持**: 内置中英双语界面和实时翻译
- **数据分析**: 提供市场趋势和商业洞察
- **全流程支持**: 从寻找合作伙伴到完成交易的全过程辅助

## 技术实现

HoloCAN平台基于以下技术栈开发：

- **前端**: Next.js + React + TailwindCSS
- **3D渲染**: Three.js / React Three Fiber
- **动画效果**: Framer Motion
- **部署环境**: Cloudflare Pages

## 目录结构

```
/
├── public/                # 静态资源文件
│   ├── holocanlogo.svg    # 品牌标识 (浅色版本)
│   ├── holocanlogo-dark.svg # 品牌标识 (深色版本)
│   ├── canada-162259.svg  # 加拿大国旗图标
│   ├── china-162389.svg   # 中国国旗图标
│   └── canda_photo*.png   # 加拿大商业场景图片集
│
├── src/                   # 源代码目录
│   ├── components/        # React组件
│   │   ├── layout/        # 布局组件
│   │   ├── exhibition/    # 展览相关组件
│   │   └── matching/      # 匹配系统组件
│   │
│   ├── context/           # React上下文
│   ├── pages/             # Next.js页面
│   ├── styles/            # CSS样式文件
│   └── types/             # TypeScript类型定义
│
├── .gitignore             # Git忽略文件
├── next.config.js         # Next.js配置
├── package.json           # 项目依赖
├── postcss.config.js      # PostCSS配置
├── tailwind.config.js     # Tailwind CSS配置
└── tsconfig.json          # TypeScript配置
```

## 快速开始

克隆并运行项目：

```bash
# 克隆仓库
git clone https://github.com/YangChengTS/holocan-demo.git

# 进入项目目录
cd holocan-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看项目。

## 部署状态

当前演示版本已部署至：

- **测试环境**: [holocan-demo.pages.dev](https://holocan-demo.pages.dev)
- **生产环境**: [www.holocan.top](https://www.holocan.top)

## 后续计划

1. **功能扩展**: 增加更多AI驱动的智能匹配功能
2. **3D展厅优化**: 提升虚拟展厅的交互性和视觉效果
3. **移动端适配优化**: 进一步优化移动设备上的用户体验
4. **数据分析**: 集成更丰富的市场数据和商业见解
5. **性能优化**: 优化应用性能，提高加载速度

## 联系方式

如有任何问题或建议，请联系项目团队：

- **Email**: [contact@holocan.top](mailto:contact@holocan.top)
- **网站**: [www.holocan.top](https://www.holocan.top)
- **GitHub**: [YangChengTS/holocan-demo](https://github.com/YangChengTS/holocan-demo)

## 版权声明

© 2024 HoloCAN. 保留所有权利。 