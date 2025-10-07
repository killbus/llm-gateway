# 发版检查清单

## 发版前准备

### 代码质量检查

- [ ] 所有功能已完成并测试通过
- [ ] 代码已通过 TypeScript 类型检查
- [ ] 前后端构建成功
- [ ] 没有明显的 bug 或问题
- [ ] 代码已经过 code review

### 文档更新

- [ ] README.md 已更新
- [ ] CHANGELOG.md 已更新版本信息
- [ ] API 文档已更新(如有变更)
- [ ] 配置示例已更新(如有变更)

### 版本号更新

- [ ] 更新 `package.json` 中的版本号
- [ ] 更新 `web/package.json` 中的版本号
- [ ] 版本号遵循语义化版本规范(SemVer)

### 测试

- [ ] 本地开发环境测试通过
- [ ] 生产构建测试通过
- [ ] Docker 镜像构建测试通过
- [ ] 主要功能流程测试通过:
  - [ ] 用户注册/登录
  - [ ] 提供商管理
  - [ ] 虚拟密钥管理
  - [ ] 路由配置
  - [ ] 模型管理
  - [ ] Docker 容器管理

## 发版流程

### 1. 创建发版分支

```bash
git checkout -b release/v1.0.0
```

### 2. 更新版本号

```bash
# 更新 package.json
npm version 1.0.0 --no-git-tag-version

# 更新 web/package.json
cd web
npm version 1.0.0 --no-git-tag-version
cd ..
```

### 3. 更新 CHANGELOG.md

在 CHANGELOG.md 中添加新版本的更新内容。

### 4. 提交更改

```bash
git add .
git commit -m "chore: release v1.0.0"
```

### 5. 合并到主分支

```bash
git checkout main
git merge release/v1.0.0
```

### 6. 创建标签

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
```

### 7. 推送到远程

```bash
git push origin main
git push origin v1.0.0
```

### 8. 创建 GitHub Release

1. 访问 GitHub 仓库的 Releases 页面
2. 点击 "Draft a new release"
3. 选择刚创建的标签
4. 填写 Release 标题和描述
5. 从 CHANGELOG.md 复制更新内容
6. 发布 Release

### 9. 验证

- [ ] GitHub Actions CI 通过
- [ ] Docker 镜像构建成功
- [ ] Docker Hub 上的镜像可以正常拉取和运行

## 发版后

### 通知

- [ ] 在 GitHub Discussions 发布公告
- [ ] 更新项目主页(如有)
- [ ] 通知相关用户和贡献者

### 监控

- [ ] 关注 GitHub Issues 中的问题报告
- [ ] 监控 Docker Hub 下载量
- [ ] 收集用户反馈

## 回滚计划

如果发现严重问题需要回滚:

1. 删除有问题的标签:
```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

2. 在 GitHub 上删除对应的 Release

3. 修复问题后重新发版

## 版本号规范

遵循语义化版本 2.0.0 规范:

- **主版本号(MAJOR)**: 不兼容的 API 修改
- **次版本号(MINOR)**: 向下兼容的功能性新增
- **修订号(PATCH)**: 向下兼容的问题修正

示例:
- `1.0.0` -> `1.0.1`: bug 修复
- `1.0.0` -> `1.1.0`: 新功能
- `1.0.0` -> `2.0.0`: 破坏性变更

