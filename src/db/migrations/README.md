# 数据库迁移说明

## 移除 cache_mode 字段

### 背景

Portkey Gateway 的语义缓存功能需要额外的向量数据库(Milvus 或 Pinecone)支持,不适合本项目的轻量化定位。因此,我们决定只保留简单缓存功能,移除语义缓存相关的配置选项。

### 迁移内容

- 从 `virtual_keys` 表中移除 `cache_mode` 字段
- 所有启用缓存的虚拟密钥将固定使用简单缓存模式

### 如何应用迁移

**注意:在应用迁移前,请先备份数据库文件 `data/gateway.db`**

#### 方法 1: 使用 SQLite 命令行工具

```bash
# 备份数据库
cp data/gateway.db data/gateway.db.backup

# 应用迁移
sqlite3 data/gateway.db < src/db/migrations/remove-cache-mode.sql
```

#### 方法 2: 手动操作(推荐)

由于项目使用的是 sql.js(内存数据库),建议采用以下方式:

1. **备份数据库**
   ```bash
   cp data/gateway.db data/gateway.db.backup
   ```

2. **重启应用**
   
   应用启动时会自动检测并添加缺失的字段。由于代码已经移除了 `cache_mode` 字段的引用,新创建的虚拟密钥将不再包含该字段。

3. **清理旧数据(可选)**
   
   如果需要完全移除 `cache_mode` 字段,可以在应用运行时通过管理界面或 API 重新创建虚拟密钥。

### 向后兼容性

- 已有的虚拟密钥如果包含 `cache_mode` 字段,该字段将被忽略
- 代理逻辑已更新为固定使用 `mode: "simple"`,不再读取 `cache_mode` 字段
- 前端界面已移除缓存模式选择器

### 验证迁移

迁移完成后,可以通过以下方式验证:

1. 检查虚拟密钥列表,确认缓存列只显示"已启用"或"未启用"
2. 创建新的虚拟密钥并启用缓存
3. 发送请求并检查是否正常使用简单缓存
4. 查看仪表盘的缓存命中统计

### 回滚

如果需要回滚,可以恢复备份的数据库文件:

```bash
cp data/gateway.db.backup data/gateway.db
```

然后重启应用。

