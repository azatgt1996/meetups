<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
           :class="{'image-uploader__preview-loading': uploading}"
           :style="fileUrl ? `--bg-url: url(${fileUrl})` : ''">
      <span class="image-uploader__text">
        {{ text }}
      </span>
      <input ref="input" type="file" accept="image/*"
             class="image-uploader__input" v-bind="$attrs"
             @change="onChange" @click="onClick"/>
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  preview: String,
  uploader: Function,
})

const emit = defineEmits(['select', 'upload', 'error', 'remove'])

const input = ref()
const fileUrl = ref(props.preview)
const uploading = ref(false)

const text = computed(() => {
  if (fileUrl.value) return 'Удалить изображение'
  if (uploading.value) return 'Загрузка...'
  return 'Загрузить изображение'
})

function onChange(event) {
  const file = event.target.files[0]

  if (!props.uploader)
    fileUrl.value = URL.createObjectURL(file)
  else {
    uploading.value = true
    props.uploader(file)
      .then(result => {
        fileUrl.value = result.image
        emit('upload', result)
      })
      .catch(err => {
        input.value.value = null
        emit('error', err)
      })
      .finally(() => uploading.value = false)
  }
  emit('select', file)
}

function onClick(event) {
  if (fileUrl.value) {
    event.preventDefault()
    input.value.value = null
    fileUrl.value = null
    emit('remove')
  }
}
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
