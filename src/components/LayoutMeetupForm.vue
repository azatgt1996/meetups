<template>
  <div class="page-meetup-form">
    <UiContainer>
      <UiPageTitle>{{ title }}</UiPageTitle>
      <slot />
    </UiContainer>
  </div>
</template>

<script setup>
import UiContainer from './UiContainer.vue';
import UiPageTitle from './UiPageTitle.vue';

defineProps({
  title: String,
})
</script>

<style scoped>
.page-meetup-form {
  padding: 70px 0;
}

@media all and (max-width: 992px) {
  .page-meetup-form {
    padding: 48px 0;
  }
}
</style>
