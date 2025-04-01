# Cloudflare Pages 部署配置更新

## 更新背景

由于项目结构已重组（移除了`demo-version`目录并将内容合并到根目录），我们需要更新Cloudflare Pages的部署配置。这将解决之前"融资"和"下载"页面无法正常访问的问题。

## 新的Cloudflare Pages配置

请按照以下步骤更新您的Cloudflare Pages配置：

1. 登录Cloudflare Dashboard
2. 进入您的Pages项目
3. 点击"设置" > "构建和部署"
4. 修改以下配置:
   - **构建命令**: `npm install && npm run build`
   - **构建输出目录**: `out`
   - **根目录**: `/` (默认)
   - **Node.js版本**: `16`或更高

## 环境变量

确保您在Cloudflare Pages上设置了必要的环境变量：

- `NODE_VERSION`: `16`或更高
- `NPM_VERSION`: `8`或更高

## 部署流程

配置更新后，触发新的部署：

1. 进入Cloudflare Pages的"部署"选项卡
2. 点击"重新部署"按钮或等待自动部署（如果您已设置自动部署）
3. 部署完成后，验证所有页面是否能正常访问，特别是：
   - `https://您的域名/financing/`
   - `https://您的域名/download/`

## 重要说明

此配置更新是基于项目结构的重大变更。在更新Cloudflare配置之前，请确保已将代码库更新为新的统一结构（无`demo-version`目录）。

如果您仍然遇到访问问题，可以检查：

1. 页面构建是否成功（查看构建日志）
2. 域名DNS设置是否正确
3. 是否需要清除浏览器缓存或Cloudflare缓存