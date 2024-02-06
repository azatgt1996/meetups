<template>
  <MeetupForm :meetup="meetup" />
</template>

<script setup>
// TODO: title "Создание митапа | Meetups"
// TODO: Добавить LayoutMeetupForm
// TODO: При сабмите формы создания митапа - добавить его через API и перейти на страницу созданного митапа
// TODO: При нажатии на "Отмена" вернуться на главную страницу
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';

const meetup = ref(createMeetup())

</script>