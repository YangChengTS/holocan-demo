# HoloCAN 平台启动指南

本文档提供了启动和运行HoloCAN演示平台的详细步骤。

## 环境准备

确保您已安装以下软件：

- Node.js (v16.0.0或更高版本)
- npm (v7.0.0或更高版本)

可以通过以下命令检查您的版本：

```bash
node -v
npm -v
```

## 安装步骤

1. 克隆仓库到本地：

```bash
git clone https://github.com/YangChengTS/holocan-demo.git
cd holocan-demo
```

2. 安装项目依赖：

```bash
npm install
```

## 启动项目

### 开发模式

开发模式提供热重载功能，适合开发过程中使用：

```bash
npm run dev
```

启动后，在浏览器中访问：http://localhost:3000

### 生产模式

构建并启动生产版本：

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

生产版本将在http://localhost:3000运行。

## 常见问题解决

### 依赖安装失败

如果遇到依赖安装问题，尝试以下步骤：

```bash
# 清除npm缓存
npm cache clean --force

# 使用--legacy-peer-deps标志安装
npm install --legacy-peer-deps
```

### 端口冲突

如果3000端口已被占用，可以通过以下方式指定不同端口：

```bash
# 开发模式指定端口
npm run dev -- -p 3001

# 生产模式指定端口
PORT=3001 npm start
```

### 构建错误

如果构建过程中出现错误，请尝试：

```bash
# 删除.next目录
rm -rf .next

# 重新构建
npm run build
```

## 其他命令

```bash
# 运行测试
npm test

# 代码风格检查
npm run lint

# 代码风格自动修复
npm run lint:fix
```

如需更多帮助，请联系开发团队：contact@holocan.top
