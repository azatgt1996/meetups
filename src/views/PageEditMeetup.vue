<template>
  <MeetupForm v-if="meetup" :meetup="meetup" />
  <UiContainer v-else>
    <UiAlert>Загрузка...</UiAlert>
  </UiContainer>
</template>

<script setup>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';

defineProps({
  meetupId: { type: Number, required: true },
})

// TODO: <title> "Редактирование митапа | Meetups"
// TODO: Добавить LayoutMeetupForm

const meetup = ref(null);

// TODO: При сабмите формы редактирования митапа - обновить его через API и перейти на страницу изменённого митапа
// TODO: При нажатии на "Отмена" вернуться на страницу этого митапа

</script>