<template>
  <div class="toasts">
    <UiToast v-for="item in toastList" :text="item.text" :type="item.type" :key="item.id" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UiToast from './UiToast.vue';

const props = defineProps({
  delay: { type: Number, default: 5000 }
})

let counter = 0;

const toastList = ref([])

const toast = (text, type, delay = props.delay) => {
  const id = counter++
  toastList.value.push({ id, text, type })

  setTimeout(() => {
    toastList.value = toastList.value.filter(t => t.id !== id)
  }, delay)
}

const success = (text) => toast(text, 'success')

const error = (text) => toast(text, 'error')

defineExpose({ success, error })
</script>

<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast+.toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
