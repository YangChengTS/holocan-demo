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
- **部署**: Cloudflare Pages

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

## 部署说明

### Cloudflare Pages 配置

1. **GitHub 集成**
   - 将项目推送到GitHub仓库
   - 在Cloudflare Dashboard中创建Pages项目并关联GitHub仓库

2. **构建配置**
   - 构建命令: `npm run build`
   - 输出目录: `out`
   - Node.js版本: 18.17.0（使用最新LTS版本可能导致兼容性问题）

3. **环境变量设置**
   - 无需特殊环境变量

4. **Next.js 导出配置**
   - 确保`next.config.js`中包含以下配置:
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',  // 静态导出选项
     reactStrictMode: true,
     images: {
       unoptimized: true, // Cloudflare Pages目前不支持Next.js的图像优化
     },
   };
   
   module.exports = nextConfig;
   ```

### DNS 配置

1. **添加DNS记录**
   - 进入Cloudflare的DNS管理页面
   - 添加两条CNAME记录:
     * 名称: `@` (根域名), 指向: `[your-pages-project].pages.dev`
     * 名称: `www`, 指向: `[your-pages-project].pages.dev`

2. **自定义域配置**
   - 在Pages项目中的"自定义域"部分
   - 添加根域名和www子域名
   - 注意: 确保没有域名冲突，如果提示域名已被使用，需要先清理已有关联

3. **SSL/TLS设置**
   - 确认SSL/TLS加密模式设为"完全"
   - Cloudflare会自动配置和管理SSL证书

### 常见问题及解决方案

1. **522 Connection Timed Out错误**
   - **原因**: 通常是由于Cloudflare无法连接到源站点或DNS配置错误
   - **解决方案**:
     * 确认Pages项目部署成功
     * 验证DNS记录正确指向Pages URL
     * 检查自定义域名设置是否完成
     * 清除Cloudflare缓存

2. **部署失败**
   - **原因**: 构建命令错误或Node.js版本不兼容
   - **解决方案**:
     * 使用Node.js 18.x LTS版本
     * 确保package.json中的构建脚本正确
     * 检查项目依赖是否兼容

3. **图像加载问题**
   - **原因**: Next.js图像优化与Cloudflare Pages静态导出冲突
   - **解决方案**:
     * 在next.config.js中设置`images: { unoptimized: true }`
     * 使用标准<img>标签替代Next.js的Image组件

4. **DNS传播延迟**
   - **原因**: DNS更改需要时间传播
   - **解决方案**:
     * 等待24小时让DNS更改完全生效
     * 使用`nslookup`或在线DNS查询工具验证记录更新

## 资源链接

- [Next.js文档](https://nextjs.org/docs)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [TailwindCSS文档](https://tailwindcss.com/docs)

## 许可证

本项目仅用于演示目的，版权所有 © 2024 HoloCAN 