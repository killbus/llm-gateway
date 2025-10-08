<template>
  <div>
    <n-space vertical :size="24">
      <n-card title="系统设置">
        <n-space align="center" justify="space-between">
          <div>允许新用户注册</div>
          <n-switch :value="allowRegistration" @update:value="onToggleAllowRegistration" />
        </n-space>
      </n-card>

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
import { computed, onMounted, ref } from 'vue';
import { NSpace, NCard, NDescriptions, NDescriptionsItem, NSwitch, useMessage } from 'naive-ui';
import { useAuthStore } from '@/stores/auth';
import { useProviderStore } from '@/stores/provider';
import { useVirtualKeyStore } from '@/stores/virtual-key';

import { configApi } from '@/api/config';

const authStore = useAuthStore();
const providerStore = useProviderStore();
const virtualKeyStore = useVirtualKeyStore();

const message = useMessage();
const allowRegistration = ref(true);

async function onToggleAllowRegistration(val: boolean) {
  try {
    await configApi.updateSystemSettings({ allowRegistration: val });
    allowRegistration.value = val;
    message.success('设置已保存');
  } catch (e: any) {
    message.error('保存失败');
  }
}

const enabledKeysCount = computed(() => {
  return virtualKeyStore.virtualKeys.filter(k => k.enabled).length;
});

onMounted(async () => {
  const s = await configApi.getSystemSettings();
  allowRegistration.value = s.allowRegistration;
  await Promise.all([
    providerStore.fetchProviders(),
    virtualKeyStore.fetchVirtualKeys(),
  ]);
});
</script>

