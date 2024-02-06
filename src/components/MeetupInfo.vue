<template>
  <ul class="meetup-info">
    <li>
      <UiIcon class="meetup-info__icon" icon="user"/>
      {{ organizer }}
    </li>
    <li>
      <UiIcon class="meetup-info__icon" icon="map"/>
      {{ place }}
    </li>
    <li>
      <UiIcon class="meetup-info__icon" icon="cal-lg"/>
      <time :datetime="isoDate">{{ formattedDate }}</time>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import UiIcon from './UiIcon.vue';
import { formatAsIsoDate, formatAsLocalDate } from '../utils/dateUtils';

const props = defineProps({
  organizer: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Number, required: true }
})

const isoDate = computed(() => formatAsIsoDate(props.date))
const formattedDate = computed(() => formatAsLocalDate(props.date))

</script>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
