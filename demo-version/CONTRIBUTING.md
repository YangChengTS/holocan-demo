# 贡献指南

感谢您对HoloCAN项目的关注！我们欢迎各种形式的贡献，无论是新功能、bug修复、文档改进还是性能优化。本指南将帮助您了解如何参与到项目开发中。

## 开发环境设置

1. **Fork项目仓库**
   首先，在GitHub上fork本仓库到您自己的账户。
   原始仓库：[https://github.com/YangChengTS/holocan-demo](https://github.com/YangChengTS/holocan-demo)

2. **克隆仓库**
   ```bash
   git clone https://github.com/[你的用户名]/holocan-demo.git
   cd holocan-demo
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **运行开发服务器**
   ```bash
   npm run dev
   ```
   
5. **在浏览器中查看**
   访问 `http://localhost:3000` 查看应用。

## 分支管理

- `main`: 主分支，包含最新的稳定代码
- `develop`: 开发分支，用于集成功能分支
- `feature/*`: 功能分支，用于开发新功能
- `bugfix/*`: 修复分支，用于修复bug

开发新功能或修复问题时，请基于`develop`分支创建新的分支:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

## 代码规范

我们使用ESLint和Prettier来保证代码质量和风格一致性。在提交代码前，请确保您的代码通过了lint检查:

```bash
npm run lint
```

### 命名规范

- **组件**: PascalCase (例如 `ExhibitionViewer.tsx`)
- **函数/变量**: camelCase (例如 `getUserData`)
- **常量**: UPPER_SNAKE_CASE (例如 `MAX_RETRY_COUNT`)
- **文件名**: 按功能或组件名命名，使用小写连字符 (例如 `user-profile.tsx`)

### 注释规范

- 为复杂的函数、组件或逻辑添加注释
- 使用JSDoc风格的注释为重要函数添加参数和返回值说明
- 避免无用或多余的注释

## 提交规范

请使用规范的提交信息格式:

```
<类型>(<范围>): <描述>

[可选的详细描述]

[可选的脚注]
```

类型包括:
- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 仅文档更改
- **style**: 不影响代码含义的更改（如格式化）
- **refactor**: 既不修复bug也不添加功能的代码更改
- **perf**: 性能改进
- **test**: 添加缺失的测试
- **chore**: 构建过程或辅助工具的变动

示例:
```
feat(matching): 添加企业匹配算法

实现了基于产品类别和企业需求的智能匹配算法。

Closes #123
```

## 提交PR流程

1. **确保代码已同步**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **推送您的更改**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **创建Pull Request**
   - 在GitHub上打开您的分支
   - 点击"Compare & pull request"
   - 填写PR模板中的相关信息
   - 指定适当的审阅者

4. **代码审核**
   - 审阅者会对您的代码进行审核
   - 根据反馈修改代码

5. **合并**
   - 一旦PR被批准，它将被合并到`develop`分支

## 问题报告

如果您发现了bug或有新的功能建议，请在GitHub上创建一个issue。请尽量提供详细的信息，包括:

- 问题的简短描述
- 重现步骤或场景
- 预期行为与实际行为
- 相关的截图或日志
- 您的环境信息（浏览器、操作系统等）

## 文档贡献

我们也欢迎对文档的改进。如果您发现文档有误或不完整，请创建一个PR进行修复。

## 联系方式

如有任何问题，可以通过以下方式联系我们:
- 在GitHub上创建issue
- 发送邮件到 contact@holocan.com

感谢您对HoloCAN项目的贡献！ 