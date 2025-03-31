# Cloudflare Pages 部署配置

## 当前问题

目前，您的Cloudflare Pages可能未能正确加载`financing.tsx`和`download.tsx`页面，原因是项目结构混乱导致的构建和部署路径问题。

## 推荐的Cloudflare Pages配置

### 方案1：使用根目录的Next.js项目

如果您希望使用根目录下的Next.js项目（非`demo-version`目录），请按以下步骤配置Cloudflare Pages：

1. 登录Cloudflare Dashboard
2. 进入您的Pages项目
3. 点击"设置" > "构建和部署"
4. 修改以下配置:
   - **构建命令**: `npm install && npm run build`
   - **构建输出目录**: `out`
   - **根目录**: `/` (默认)
   - **Node.js版本**: `16`或更高

### 方案2：使用demo-version目录的Next.js项目

如果您希望使用`demo-version`目录下的Next.js项目，请按以下步骤配置Cloudflare Pages：

1. 登录Cloudflare Dashboard
2. 进入您的Pages项目
3. 点击"设置" > "构建和部署"
4. 修改以下配置:
   - **构建命令**: `cd demo-version && npm install && npm run build`
   - **构建输出目录**: `demo-version/out`
   - **根目录**: `/` (默认)
   - **Node.js版本**: `16`或更高

## 环境变量

确保您在Cloudflare Pages上设置了必要的环境变量：

- `NODE_VERSION`: `16`或更高
- `NPM_VERSION`: `8`或更高

## 验证部署

配置更新后，您需要触发新的部署：

1. 进入Cloudflare Pages的"部署"选项卡
2. 点击"重新部署"按钮
3. 部署完成后，访问您的网站并检查以下页面是否能正确加载：
   - `https://您的域名/financing/`
   - `https://您的域名/download/`

## 长期解决方案

为了避免未来出现类似问题，建议您整合项目结构，避免在同一仓库中维护两个相同功能的Next.js项目。推荐以下做法：

1. 决定使用哪个项目结构（根目录或`demo-version`目录）
2. 删除另一个冗余的项目结构
3. 维护单一的项目代码库，简化部署和维护工作