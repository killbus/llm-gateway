-- 移除 cache_mode 字段的迁移脚本
-- 注意: SQLite 不支持直接删除列,需要重建表

-- 1. 创建新表(不包含 cache_mode 字段)
CREATE TABLE virtual_keys_new (
  id TEXT PRIMARY KEY,
  key_value TEXT NOT NULL UNIQUE,
  key_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  provider_id TEXT,
  model_id TEXT,
  routing_strategy TEXT DEFAULT 'single',
  model_ids TEXT,
  routing_config TEXT,
  enabled INTEGER DEFAULT 1,
  rate_limit INTEGER,
  cache_enabled INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL,
  FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE SET NULL
);

-- 2. 复制数据(排除 cache_mode 字段)
INSERT INTO virtual_keys_new (
  id, key_value, key_hash, name, provider_id, model_id,
  routing_strategy, model_ids, routing_config,
  enabled, rate_limit, cache_enabled, created_at, updated_at
)
SELECT 
  id, key_value, key_hash, name, provider_id, model_id,
  routing_strategy, model_ids, routing_config,
  enabled, rate_limit, cache_enabled, created_at, updated_at
FROM virtual_keys;

-- 3. 删除旧表
DROP TABLE virtual_keys;

-- 4. 重命名新表
ALTER TABLE virtual_keys_new RENAME TO virtual_keys;

-- 5. 重建索引
CREATE INDEX idx_virtual_keys_hash ON virtual_keys(key_hash);
CREATE INDEX idx_virtual_keys_value ON virtual_keys(key_value);
CREATE INDEX idx_virtual_keys_provider ON virtual_keys(provider_id);
CREATE INDEX idx_virtual_keys_model ON virtual_keys(model_id);

