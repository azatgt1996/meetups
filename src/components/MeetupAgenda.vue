<template>
  <ul class="agenda">
    <li v-for="(item, idx) in agenda" :key="idx" class="agenda__item">
      <MeetupAgendaItem :agenda-item="item"/>
    </li>
  </ul>
</template>

<script setup>
import MeetupAgendaItem from './MeetupAgendaItem.vue'

defineProps({
  agenda: { type: Array, required: true },
})
</script>

<style scoped>
/* _agenda.css */
.agenda {
  margin: 0;
  padding: 0;
  list-style: none;
}

.agenda__item {
  border-top: 1px solid var(--grey-3);
}

.agenda__item:first-child {
  border-top: none;
}
</style>
