<template>
  <LayoutMeetupForm title="Редактирование митапа">
    <MeetupForm v-if="meetup" :meetup="meetup" submit-text="Сохранить"
                @submit="handleSubmit" @cancel="handleCancel"/>
    <UiAlert v-else>Загрузка...</UiAlert>
  </LayoutMeetupForm>
</template>

<script setup>
import { ref, watch } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useRouter } from 'vue-router';
import { getMeetup, putMeetup } from '../api/meetupsApi';
import { postImage } from '../api/imageApi';
import { useToaster } from '../plugins/toaster';
import { onBeforeRouteLeave } from 'vue-router';
import { useApi } from '../composables/useApi';

const props = defineProps({
  meetupId: { type: Number, required: true },
})

const meetup = ref(null);

const router = useRouter()
const toaster = useToaster()

async function handleSubmit(data) {
  if (data.imageToUpload) {
    const formData = new FormData()
    formData.append('file', data.imageToUpload)

    const result = await postImage(formData)
    if (result.error) return toaster.error(result.error.message)

    data.image = result.data.image
    data.imageId = result.data.id
  }

  const { request, result } = useApi(putMeetup, {showProgress: true, successToast: 'Сохранено', errorToast: true})

  await request(data)
  if (result.value.success) router.push({ name: 'meetup', params: { meetupId: props.meetupId } })
}

function handleCancel() {
  router.push({ name: 'meetup', params: { meetupId: props.meetupId } })
}

const fetchMeetup = async () => {
  meetup.value = null;

  const result = await getMeetup(props.meetupId);
  if (result.success) {
    meetup.value = result.data;
  } else {
    toaster.error(result.error.message);
  }
};

watch(() => props.meetupId, fetchMeetup, { immediate: true });

onBeforeRouteLeave(() => meetup.value = null);

</script>