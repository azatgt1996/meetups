import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const defaultContainer = () => document.body.appendChild(document.createElement('div'))
  const instance = createApp(TheTopProgressBar).mount(container ?? defaultContainer())

  if (router) {
    router.beforeEach((to, from, next) => {
      instance.start('navigation')
      next()
    })

    router.afterEach((to, from, failure) => {
      instance.finish('navigation')
    })

    router.onError((error) => {
      instance.fail()
    })
  }

  const progress = {
    start: instance.start,
    finish: instance.finish,
    fail: instance.fail,

    install(app) {
      app.provide(PROGRESS_KEY, progress)
    }
  }

  return progress
}
