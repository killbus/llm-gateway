# 贡献指南

感谢你对 LLM Gateway 项目的关注!我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议,请:

1. 在 [Issues](https://github.com/sxueck/llm-gateway/issues) 页面搜索是否已有相关问题
2. 如果没有,创建一个新的 Issue
3. 清晰地描述问题或建议,包括:
   - 问题的详细描述
   - 复现步骤(如果是 bug)
   - 期望的行为
   - 实际的行为
   - 环境信息(操作系统、Node.js 版本等)

### 提交代码

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循现有的代码风格
- 确保代码通过 TypeScript 类型检查
- 添加必要的注释,特别是对于复杂逻辑
- 保持代码简洁和可读性

### 提交信息规范

提交信息应该清晰地描述更改内容,建议使用以下格式:

```
<type>: <subject>

<body>
```

类型(type)可以是:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建或辅助工具的变动

示例:
```
feat: 添加提供商批量导入功能

- 支持从 CSV 文件导入提供商
- 添加导入验证逻辑
- 更新相关文档
```

### 开发流程

1. 克隆仓库并安装依赖:
```bash
git clone https://github.com/sxueck/llm-gateway.git
cd llm-gateway
pnpm install
cd web && pnpm install && cd ..
```

2. 创建 `.env` 文件:
```bash
cp .env.example .env
```

3. 启动开发服务器:
```bash
pnpm run start:all
```

4. 进行开发和测试

5. 提交代码前检查:
```bash
# 类型检查
pnpm run typecheck

# 构建测试
pnpm run build
cd web && pnpm run build
```

### Pull Request 指南

- 确保 PR 描述清晰地说明了更改的内容和原因
- 如果 PR 解决了某个 Issue,请在描述中引用该 Issue
- 保持 PR 的范围小而专注,一个 PR 只做一件事
- 确保代码通过所有检查
- 及时响应 Review 意见

## 开发建议

### 项目结构

- `src/`: 后端源代码
  - `config/`: 配置管理
  - `db/`: 数据库操作
  - `routes/`: API 路由
  - `services/`: 业务逻辑
  - `types/`: TypeScript 类型定义
  - `utils/`: 工具函数

- `web/src/`: 前端源代码
  - `api/`: API 调用
  - `components/`: 公共组件
  - `layouts/`: 布局组件
  - `router/`: 路由配置
  - `stores/`: 状态管理
  - `views/`: 页面组件

### 技术栈

- 后端: Fastify + TypeScript + SQLite
- 前端: Vue 3 + TypeScript + Naive UI
- 构建: Vite

### 常见任务

#### 添加新的 API 路由

1. 在 `src/routes/` 下创建或修改路由文件
2. 在 `src/services/` 中实现业务逻辑
3. 更新 TypeScript 类型定义
4. 在前端 `web/src/api/` 中添加对应的 API 调用

#### 添加新的页面

1. 在 `web/src/views/` 中创建页面组件
2. 在 `web/src/router/` 中添加路由配置
3. 如需要,在 `web/src/stores/` 中添加状态管理

#### 添加新的提供商预设

在 `web/src/constants/providers.ts` 中添加提供商配置。

## 行为准则

- 尊重所有贡献者
- 保持友好和专业的交流
- 接受建设性的批评
- 关注对项目最有利的事情

## 许可证

通过贡献代码,你同意你的贡献将在 MIT 许可证下发布。

## 问题?

如有任何问题,欢迎在 Issues 中提问或通过邮件联系: sxueck@outlook.com

