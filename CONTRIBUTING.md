# HoloCAN 项目贡献指南

感谢您考虑为HoloCAN平台贡献代码！本文档提供了参与项目开发的指导方针。

## 目录

- [开发环境设置](#开发环境设置)
- [代码风格](#代码风格)
- [分支管理策略](#分支管理策略)
- [提交规范](#提交规范)
- [Pull Request流程](#pull-request流程)
- [问题反馈](#问题反馈)

## 开发环境设置

1. Fork项目仓库到您的GitHub账户

2. 克隆您fork的仓库到本地开发环境
```bash
git clone https://github.com/YOUR_USERNAME/holocan-demo.git
cd holocan-demo
```

3. 添加上游仓库
```bash
git remote add upstream https://github.com/YangChengTS/holocan-demo.git
```

4. 安装依赖
```bash
npm install
```

5. 创建新分支开始您的工作
```bash
git checkout -b feature/your-feature-name
```

## 代码风格

我们使用ESLint和Prettier来保持代码质量和一致性。

- 遵循TypeScript的类型定义，避免使用`any`类型
- 使用功能组件和React Hooks，避免类组件
- 使用TailwindCSS进行样式编写，保持一致的设计系统
- 保持代码简洁，有意义的命名，适当的注释

在提交前运行以下命令检查代码：
```bash
npm run lint
```

## 分支管理策略

- `main`: 主分支，保持稳定可部署状态
- `develop`: 开发分支，新功能合并到此分支
- `feature/*`: 功能分支，开发新功能时使用
- `bugfix/*`: 修复bug的分支
- `hotfix/*`: 紧急修复分支，直接从`main`分支创建

## 提交规范

我们采用Angular的提交消息格式:

```
<类型>(<范围>): <主题>

<正文>

<页脚>
```

类型包括:
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空格、格式等）
- `refactor`: 代码重构
- `perf`: 性能改进
- `test`: 添加或修改测试
- `chore`: 构建过程或辅助工具的变动

示例:
```
feat(matching): 添加企业智能匹配算法

实现基于企业特征的智能匹配功能，支持跨行业匹配。

Closes #123
```

## Pull Request流程

1. 确保您的分支已与最新的上游仓库同步
```bash
git fetch upstream
git rebase upstream/develop
```

2. 在GitHub上创建Pull Request
   - 目标分支选择`develop`
   - 提供清晰的PR描述
   - 链接相关Issue

3. 等待代码审查
   - 修复任何代码审查中提出的问题
   - 保持PR的更新与上游同步

4. 合并后，您可以删除您的功能分支

## 问题反馈

发现Bug或有功能请求？请使用GitHub Issue创建问题。

创建Issue时，请提供：
- 问题的详细描述
- 复现步骤（对于bug）
- 预期行为和实际行为
- 截图（如适用）
- 环境信息（浏览器、操作系统等）

## 许可证

通过贡献代码，您同意您的贡献将在与项目相同的许可下提供。

## 联系方式

如有任何问题，请联系：contact@holocan.top 