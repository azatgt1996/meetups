<template>
  <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
  <UiAlert v-else>Программа пока пуста...</UiAlert>
</template>

<script setup>
import MeetupAgenda from '../components/MeetupAgenda.vue';
import UiAlert from '../components/UiAlert.vue';

defineProps({
  meetup: { type: Object, required: true },
})

</script>