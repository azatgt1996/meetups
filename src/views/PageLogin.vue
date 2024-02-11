<template>
  <LayoutAuth title="Вход">
    <UiForm @submit="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" required />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block>Войти</UiButton>
      </template>

      <template #append> Нет аккаунта?
        <UiLink :to="{name: 'register'}" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script setup>
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useToaster } from '../plugins/toaster'
import { useAuthStore } from '../stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router';

const toaster = useToaster()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  await authStore.login(email.value, password.value)
  if (authStore.isAuthenticated) {
    toaster.success('Авторизация прошла успешно')

    const queryParams = route.query.from;
    if (queryParams) router.push({ path: queryParams })
    else router.push({ name: 'index' })
  } else {
    toaster.error('Неверные учётные данные...')
  }
};

</script>