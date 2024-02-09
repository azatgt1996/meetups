<template>
  <div class="page-meetup">
    <MeetupView v-if="meetup" :meetup="meetup">
      <UiTabs>
        <template #tabs>
          <UiTab :to="{ name: 'meetup.description' }">Описание</UiTab>
          <UiTab :to="{ name: 'meetup.agenda' }">Программа</UiTab>
        </template>
        <RouterView :meetup="meetup"/>
      </UiTabs>
    </MeetupView>

    <UiContainer v-else-if="error">
      <UiAlert>{{ error }}</UiAlert>
    </UiContainer>

    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MeetupView from '../components/MeetupView.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiTabs from '../components/UiTabs.vue';
import UiTab from '../components/UiTab.vue';
import { getMeetup } from '../api/meetupsApi.js';
import { onBeforeRouteLeave } from 'vue-router';

const props = defineProps({
  meetupId: { type: Number, required: true },
})

const meetup = ref(null);
const error = ref(null);

const fetchMeetup = async () => {
  meetup.value = null;
  error.value = null;

  const result = await getMeetup(props.meetupId);
  if (result.success) {
    document.title = `${result.data.title} | Meetups`
    meetup.value = result.data;
  } else {
    error.value = result.error.message;
  }
};

watch(() => props.meetupId, fetchMeetup, { immediate: true });

onBeforeRouteLeave(() => meetup.value = null);

</script>