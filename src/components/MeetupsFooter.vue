<template>
  <footer class="footer">
    <UiContainer>&copy; 2023-{{ new Date().getFullYear() }} Azat Galyautdinov</UiContainer>
  </footer>
</template>

<script setup>
import UiContainer from './UiContainer.vue';

</script>

<style scoped>
/* _footer.css */
.footer {
  padding: 100px 0 60px;
  text-align: center;
}
</style>
