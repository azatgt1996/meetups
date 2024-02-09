<template>
  <nav class="nav">
    <NavLink v-if="$route.meta.showReturnToMeetups" :to="{ name: 'meetups' }" title="&larr; Вернуться к списку"/>
    <!-- Ссылки гостя -->
    <NavLink auth="-" :to="{ name: 'login' }" title="Вход"/>
    <NavLink auth="-" :to="{ name: 'register' }" title="Регистрация"/>
    <!-- Ссылки авторизованного пользователя -->
    <NavLink auth="+" :to="{ name: 'meetups', query: { participation: 'attending' } }" title="Мои митапы"/>
    <NavLink auth="+" :to="{ name: 'meetups', query: { participation: 'organizing' } }" title="Организуемые митапы"/>
    <NavLink auth="+" :to="{ name: 'create-meetup' }" title="Создать митап"/>
    <a v-if="authStore.isAuthenticated" href="#" class="nav__link" @click="handleLogout">
      {{ authStore.user.fullname }} (выйти)
    </a>
    <!-- Ссылка - не часть проекта -->
    <NavLink :to="{ name: 'demo' }" title="🎨 Components Demo"/>
    <a href="https://course-vue.javascript.ru/api/" target="_blank" class="nav__link">📄 API Docs</a>
  </nav>
</template>

<script setup lang="jsx">
import { useAuthStore } from "../stores/useAuthStore"
// TODO: Task 05-vue-router/01-AuthPages
/*
  TODO: Добавить работу с аутентификацией в навигации:
        - Разные ссылки у гостя и авторизованного пользователя
        - Кнопка выхода
  TODO: Добавить именованные маршруты
*/

function NavLink({to, title, auth}) { // auth + (для авторизованных), auth - (для неавторизованных)
  const isVisible = !auth || auth == '+' && authStore.isAuthenticated || auth == '-' && !authStore.isAuthenticated
  return isVisible && <RouterLink to={to} class="nav__link">{title}</RouterLink>
}

const authStore = useAuthStore()

function handleLogout() {

}
</script>

<style scoped>
/* _nav.css */
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.nav__link {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.nav__link + .nav__link {
  margin-top: 8px;
}

.nav__link:hover {
  color: var(--blue);
}

.nav__link:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .nav__link,
  .nav__link + .nav__link {
    margin-top: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
