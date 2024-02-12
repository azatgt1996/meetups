<template>
  <LayoutMeetupForm title="Создание митапа">
    <MeetupForm :meetup="meetup" submit-text="Сохранить"
                @submit="handleSubmit" @cancel="handleCancel"/>
  </LayoutMeetupForm>
</template>

<script setup>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';
import { postImage } from '../api/imageApi';
import { postMeetup } from '../api/meetupsApi';
import { useToaster } from '../plugins/toaster';

const meetup = ref(createMeetup())
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

  const { request, result } = useApi(postMeetup, {showProgress: true, successToast: 'Сохранено', errorToast: true})

  await request(data)
  if (result.value.success) router.push({ name: 'meetup', params: { meetupId: result.value.data.id } })
}

function handleCancel() {
  router.push({ name: 'index' })
}

</script>