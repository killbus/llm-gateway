<template>
  <n-card class="overview-card">
    <template #header>
      <div class="card-header">
        <span class="card-title">提供商概览</span>
      </div>
    </template>

    <n-grid :cols="2" :x-gap="12" :y-gap="12">
      <n-gi>
        <div class="stat-item">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">总数</div>
        </div>
      </n-gi>
      <n-gi>
        <div class="stat-item">
          <div class="stat-value stat-enabled">{{ stats.enabled }}</div>
          <div class="stat-label">已启用</div>
        </div>
      </n-gi>
    </n-grid>

    <n-divider style="margin: 16px 0" />

    <n-space vertical :size="12">
      <n-text strong style="font-size: 13px">分类分布</n-text>
      <n-space v-if="Object.keys(categoryStats).length > 0" :size="8">
        <n-tag
          v-for="(count, category) in categoryStats"
          :key="category"
          type="info"
          size="small"
          :bordered="false"
          class="category-tag"
        >
          {{ category }}: {{ count }}
        </n-tag>
      </n-space>
      <n-text v-else depth="3" style="font-size: 12px">
        暂无分类信息
      </n-text>
    </n-space>

    <n-divider style="margin: 16px 0" />

    <n-space vertical :size="12">
      <n-text strong style="font-size: 13px">功能支持</n-text>
      <n-grid :cols="3" :x-gap="8" :y-gap="8">
        <n-gi v-for="(count, feature) in featureStats" :key="feature">
          <div class="feature-item">
            <span class="feature-name">{{ getFeatureName(feature) }}</span>
            <span class="feature-count" :class="{ active: count > 0 }">{{ count }}</span>
          </div>
        </n-gi>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  NCard,
  NGrid,
  NGi,
  NText,
  NDivider,
  NSpace,
  NTag,
} from 'naive-ui';
import type { Provider } from '@/types';
import { getProviderById } from '@/constants/providers';

interface Props {
  providers: Provider[];
}

const props = defineProps<Props>();

const stats = computed(() => {
  const total = props.providers.length;
  const enabled = props.providers.filter(p => p.enabled).length;

  return {
    total,
    enabled,
  };
});

const categoryStats = computed(() => {
  const categories: Record<string, number> = {};
  
  props.providers.forEach(provider => {
    const preset = getProviderById(provider.id);
    if (preset?.category) {
      categories[preset.category] = (categories[preset.category] || 0) + 1;
    }
  });

  return categories;
});

const featureStats = computed(() => {
  const features = {
    chat: 0,
    vision: 0,
    tools: 0,
    embeddings: 0,
    images: 0,
    audio: 0,
  };

  props.providers.forEach(provider => {
    const preset = getProviderById(provider.id);
    if (preset) {
      Object.keys(features).forEach(feature => {
        if (preset.features[feature as keyof typeof preset.features]) {
          features[feature as keyof typeof features]++;
        }
      });
    }
  });

  return features;
});

function getFeatureName(feature: string): string {
  const names: Record<string, string> = {
    chat: '对话',
    vision: '视觉',
    tools: '工具',
    embeddings: '嵌入',
    images: '图像',
    audio: '音频',
  };
  return names[feature] || feature;
}
</script>

<style scoped>
.overview-card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
}

.stat-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e8e8e8;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #262626;
  line-height: 1.2;
}

.stat-value.stat-enabled {
  color: #18a058;
}

.stat-label {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
}

.category-tag {
  background: rgba(24, 160, 88, 0.08);
  color: #18a058;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.feature-item:hover {
  background: #f0f2f5;
}

.feature-name {
  font-size: 12px;
  color: #595959;
}

.feature-count {
  font-size: 12px;
  font-weight: 600;
  color: #8c8c8c;
  padding: 2px 8px;
  background: #ffffff;
  border-radius: 4px;
}

.feature-count.active {
  color: #18a058;
  background: rgba(24, 160, 88, 0.1);
}
</style>
