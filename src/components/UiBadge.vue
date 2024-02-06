<template>
  <span class="badge" :class="badgeClass"><slot /></span>
</template>

<script setup>
import { computed } from 'vue'

const badgeClasses = {
  primary: 'badge_primary',
  success: 'badge_success',
};

const props = defineProps({
  type: {
    type: String,
    required: false,
    validator: (value) => ['primary', 'success'].includes(value)
  }
})

const badgeClass = computed(() => badgeClasses[props.type])
</script>

<style scoped>
/* _badge.css */
.badge {
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  display: inline-block;
  padding: 4px 12px;
}

.badge_primary {
  color: var(--blue);
  background-color: var(--blue-extra);
}

.badge_success {
  color: var(--green);
  background-color: var(--green-light);
}
</style>
