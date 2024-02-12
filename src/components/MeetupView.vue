<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />
    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <div v-if="authStore.isAuthenticated" class="meetup__aside-buttons">
            <template v-if="meetup.organizing">
              <UiButton tag="router-link" :to="{ name: 'meetup-edit', params: { meetupId: meetup.id } }"
                variant="primary" class="meetup__aside-button">Редактировать</UiButton>
              <UiButton variant="danger" class="meetup__aside-button"
                @click="handleDeleteMeetup" :disabled="disabledBtn">Удалить</UiButton>
            </template>
            <template v-if="!meetup.organizing">
              <UiButton v-if="attending" @click="handleAttendMeetup" variant="secondary"
                class="meetup__aside-button" :disabled="disabledBtn">Отменить участие</UiButton>
              <UiButton v-if="!attending" @click="handleAttendMeetup" variant="primary"
                class="meetup__aside-button" :disabled="disabledBtn">Участвовать</UiButton>
            </template>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useApi } from '../composables/useApi'
import { attendMeetup, leaveMeetup, deleteMeetup } from '../api/meetupsApi'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const showProgress = true

const authStore = useAuthStore()
const router = useRouter()
const disabledBtn = ref(false)

const props = defineProps({
  meetup: { type: Object, required: true },
})

const attending = ref(props.meetup.attending)

async function handleDeleteMeetup() {
  const {request, result, isLoading} = useApi(deleteMeetup, {showProgress, successToast: 'Митап удалён' })

  disabledBtn.value = isLoading.value
  await request(props.meetup.id)
  if (result.value.success) router.push({ name: 'meetups' })
  disabledBtn.value = isLoading.value
}

async function handleAttendMeetup() {
  const action = attending.value ? leaveMeetup : attendMeetup
  const {request, result, isLoading} = useApi(action, {showProgress, successToast: 'Сохранено' })

  disabledBtn.value = isLoading.value
  await request(props.meetup.id)
  if (result.value.success) attending.value = !attending.value
  disabledBtn.value = isLoading.value
}

</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
