<template>
  <UiInput :model-value="model" @input="model = $event.target.valueAsNumber" :type="type">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script setup>
import { computed } from 'vue';
import UiInput from './UiInput.vue';

const props = defineProps({
  modelValue: Number,
  type: {
    type: String,
    default: 'date',
    validator: (val) => ['date', 'time', 'datetime-local'].includes(val)
  },
  step: String,
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    if ([null, undefined].includes(props.modelValue)) return ''

    const isoDate = new Date(props.modelValue).toISOString()
    switch (props.type) {
      case 'date': return isoDate.slice(0, 10)
      case 'datetime-local': return isoDate.slice(0, 16)
      case 'time':
        return isoDate.slice(11, props.step && props.step % 60 !== 0 ? 19 : 16)
    }
  },
  set: (value) => emit('update:modelValue', value)
})
</script>
