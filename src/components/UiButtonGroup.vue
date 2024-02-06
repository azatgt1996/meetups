<template>
  <div class="button-group" role="group">
    <slot/>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'

const props = defineProps({
  modelValue: { required: true }
})

const emit = defineEmits(['update:modelValue'])

provide('componentName', 'UiButtonGroup')
provide('modelVal', computed(() => props.modelValue))
provide('updateModelVal', (value) => emit('update:modelValue', value))


</script>

<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
