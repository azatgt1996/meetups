<template>
  <div>
    <h2>{{ section }}</h2>
    <slot></slot>
  </div>
</template>

<script setup>
import { provide } from 'vue';

const props = defineProps({
  section: String,
})

provide('demo:section', props.section);

</script>