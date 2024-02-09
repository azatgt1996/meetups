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

const props = defineProps({
  meetupId: { type: Number },
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

// const setMeetup = (value) => (meetup.value = value);

// defineExpose({ setMeetup })

</script>

<!-- <script>
export default {
  async beforeRouteEnter(to) {
    const result = await getMeetup(+to.params.meetupId);
    if (result.success) {
      return (vm) => {
        document.title = `${result.data.title} | Meetups`
        vm.setMeetup(result.data);
      };
    } else {
      return { name: 'meetups' };
    }
  },
}
</script> -->