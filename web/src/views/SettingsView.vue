<template>
  <div>
    <n-space vertical :size="24">
      <n-card title="系统信息">
        <n-descriptions :column="1" bordered>
          <n-descriptions-item label="当前用户">
            {{ authStore.user?.username || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="提供商数量">
            {{ providerStore.providers.length }}
          </n-descriptions-item>
          <n-descriptions-item label="虚拟密钥数量">
            {{ virtualKeyStore.virtualKeys.length }}
          </n-descriptions-item>
          <n-descriptions-item label="启用的密钥">
            {{ enabledKeysCount }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { NSpace, NCard, NDescriptions, NDescriptionsItem } from 'naive-ui';
import { useAuthStore } from '@/stores/auth';
import { useProviderStore } from '@/stores/provider';
import { useVirtualKeyStore } from '@/stores/virtual-key';

const authStore = useAuthStore();
const providerStore = useProviderStore();
const virtualKeyStore = useVirtualKeyStore();

const enabledKeysCount = computed(() => {
  return virtualKeyStore.virtualKeys.filter(k => k.enabled).length;
});

onMounted(async () => {
  await Promise.all([
    providerStore.fetchProviders(),
    virtualKeyStore.fetchVirtualKeys(),
  ]);
});
</script>

