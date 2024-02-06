<template>
  <component :is="tag" class="link">
    <slot/>
  </component>
</template>

<script setup>

defineProps({
  tag: {
    type: String,
    default: 'router-link',
    validator: (value) => ['a', 'router-link'].includes(value)
  }
})
</script>

<style scoped>
/* _link.css */
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
