<template>
  <UiCalendarView v-slot="{date}">
    <div v-for="(meetup, key) in getMeetups(date)" :key="key">
      <UiCalendarEvent tag="a" :href="`/meetups/${meetup.id}`" :title="meetup.title">
        {{ meetup.title }}
      </UiCalendarEvent>
    </div>
  </UiCalendarView>
</template>

<script setup>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

const props = defineProps({
  meetups: { type: Array, required: true },
})

function getMeetups(date) {
  return props.meetups.filter(m => {
    const _date = new Date(new Date(m.date).toDateString()).valueOf()
    return date === _date
  })
}

</script>