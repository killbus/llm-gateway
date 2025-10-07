<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui';

const themeOverrides = {
  common: {
    primaryColor: '#18a058',
    borderRadius: '8px',
    borderColor: '#e8e8e8',
    dividerColor: '#e8e8e8',
    fontFamily: '__Inter_1c856b, __Inter_Fallback_1c856b, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  Card: {
    borderRadius: '8px',
    borderColor: '#e8e8e8',
    color: '#ffffff',
    boxShadow: 'none',
    paddingMedium: '16px',
    paddingSmall: '12px',
  },
  Layout: {
    color: 'transparent',
    siderColor: '#ffffff',
    headerColor: '#ffffff',
  },
  Menu: {
    itemColorActive: 'rgba(24, 160, 88, 0.1)',
    itemColorHover: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
  },
  Modal: {
    borderRadius: '8px',
    boxShadow: 'none',
  },
  Input: {
    borderRadius: '8px',
  },
  Button: {
    borderRadius: '8px',
  },
};
</script>

