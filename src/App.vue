<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
  </LayoutBase>
</template>

<script setup>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useAuthStore } from './stores/useAuthStore';
import { useToaster } from './plugins/toaster';

const authStore = useAuthStore()
const toaster = useToaster()

if (authStore.isAuthenticated) authStore.getCurrentUser()

httpClient.onUnauthenticated(() => {
  delete localStorage.useToaster
  location.reload()
});

httpClient.onNetworkError(() => {
  toaster.error('проблема с сетью')
});

window.addEventListener('error', (event) => {
  toaster.error(event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  toaster.error(event.reason);
});
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
