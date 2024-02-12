<template>
  <UiContainer>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <UiRadioGroup v-model="filter.date" :options="dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <UiFormGroup inline>
          <UiInput v-model.trim="filter.search" rounded small placeholder="Поиск" type="search">
            <template #left-icon>
              <UiIcon icon="search" />
            </template>
          </UiInput>
        </UiFormGroup>
        <UiFormGroup inline>
          <UiButtonGroup v-model="view">
            <UiButtonGroupItem value="list">
              <UiIcon icon="list1" svg/>
            </UiButtonGroupItem>
            <UiButtonGroupItem value="calendar">
              <UiIcon icon="calendar" svg/>
            </UiButtonGroupItem>
          </UiButtonGroup>
        </UiFormGroup>
      </div>
    </div>

    <KeepAlive v-if="meetups" include="MeetupsCalendar">
      <component :is="viewComponent" v-if="filteredMeetups.length" :meetups="filteredMeetups" />
      <UiAlert v-else>Митапов по заданным условиям не найдено...</UiAlert>
    </KeepAlive>
    <UiAlert v-else>Загрузка...</UiAlert>
  </UiContainer>
</template>

<script setup>
import { computed } from 'vue';
import MeetupsList from '../components/MeetupsList.vue';
import MeetupsCalendar from '../components/MeetupsCalendar.vue';
import UiRadioGroup from '../components/UiRadioGroup.vue';
import UiButtonGroup from '../components/UiButtonGroup.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiIcon from '../components/UiIcon.vue';
import UiButtonGroupItem from '../components/UiButtonGroupItem.vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import { useMeetupsFetch } from '../composables/useMeetupsFetch.js';
import { useMeetupsFilter } from '../composables/useMeetupsFilter.js';
import { useQuerySync } from '../composables/useQuerySync.js';

const { meetups } = useMeetupsFetch();

const { filteredMeetups, filter, dateFilterOptions } = useMeetupsFilter(meetups);

const view = useQuerySync('view', 'list')

const viewComponent = computed(() => view.value === 'list' ? MeetupsList : MeetupsCalendar);

</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
</style>
