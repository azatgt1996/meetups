<template>
  <button ref="btnGroupItem" class="button-group__button" type="button" aria-selected="false" @click="onClick"
    :class="{ 'button-group__button_active': modelVal === value }">
    <slot />
  </button>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'

const btnGroupItem = ref()

const props = defineProps({
  value: { required: true }
})

const componentName = inject('componentName')
const modelVal = inject('modelVal')
const updateModelVal = inject('updateModelVal')

onMounted(() => {
  if (componentName !== 'UiButtonGroup') {
    console.warn('The below UiButtonGroupItem is not a child of UiButtonGroup:')
    console.warn(btnGroupItem.value)
  }
})

function onClick() {
  updateModelVal(props.value)
}
</script>

<style scoped>
/* _button-group.css */
.button-group__button {
  background-color: var(--white);
  border: 2px solid var(--blue);
  border-left: none;
  height: 44px;
  padding: 0 8px;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
  transition-property: background-color, fill;
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

.button-group__button:first-child {
  border-radius: 22px 0 0 22px;
  border-left: 2px solid var(--blue);
  padding-left: 10px;
  padding-right: 6px;
}

.button-group__button:last-child {
  border-radius: 0 22px 22px 0;
  padding-right: 10px;
}

.button-group__button:hover,
.button-group__button_active {
  background-color: var(--blue);
  color: var(--white);
}

.button-group__button :slotted(svg) {
  fill: var(--blue);
}

.button-group__button:hover :slotted(svg),
.button-group__button_active :slotted(svg) {
  fill: var(--white);
}
</style>
