<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="remove">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="agendaItemOptions" name="type" v-model="localItem.type"/>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="startsAt"/>
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="localItem.endsAt"/>
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup v-for="(el, key) in agendaItemFormSchemas[localItem.type]"
                 :key="key" :label="el.label">
      <component :is="el.component" v-bind="el.props" v-model="localItem[el.props.name]"/>
    </UiFormGroup>

  </fieldset>
</template>

<script setup>
import { agendaItemOptions, talkLanguageOptions } from '../services/meetupService';
import { computed, reactive, watch } from 'vue';
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import dayjs from 'dayjs';

/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */
const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: UiInput,
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */
const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: UiInput,
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: UiInput,
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: UiInput,
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: UiDropdown,
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
        width: 'auto',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: UiInput,
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: UiInput,
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

const props = defineProps({
  agendaItem: { type: Object, required: true },
})

const emit = defineEmits(['update:agendaItem', 'remove'])

const localItem = reactive({ ...props.agendaItem })

const remove = () => emit('remove')

watch(localItem, () => {
  emit('update:agendaItem', { ...localItem })
}, { deep: true })

const startsAt = computed({
  get: () => localItem.startsAt,
  set: (value) => {

    const start0 = dayjs('2000-01-01' + localItem.startsAt)
    const start1 = dayjs('2000-01-01' + value)
    const diff = start1.diff(start0)
    const end = dayjs('2000-01-01' + localItem.endsAt)

    localItem.startsAt = value
    localItem.endsAt = new Date(end.$d.valueOf() + diff).toLocaleTimeString().slice(0,5)
  }
})

</script>

<style scoped>
/* _agenda-item-form.css */

.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
