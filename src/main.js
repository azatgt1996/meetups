/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createProgress } from './plugins/progress/index.js';
import { createToaster } from './plugins/toaster/index.js';
import { createPinia } from 'pinia';

const progress = createProgress({ router })
const toaster = createToaster()
const pinia = createPinia()

// подключение плагинов: router, pinia, head(title), toaster, progress
createApp(App)
  .use(progress)
  .use(toaster)
  .use(router)
  .use(pinia)
  .mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
