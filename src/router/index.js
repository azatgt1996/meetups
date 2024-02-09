import { createRouter, createWebHistory } from 'vue-router';
import { scrollBehavior } from './scrollBehaviour.js';
import { authGuard } from './authGuard.js';

/** @type {import('vue-router').RouteRecordRaw[]} */
export const routes = [
  // Only for demo
  {
    path: '/demo',
    name: 'demo',
    meta: { title: 'Components demo' },
    component: () => import('../views/demo/PageDemo.vue'),
  },
  {
    path: '/',
    name: 'index',
    meta: { title: 'Список митапов' },
    component: () => import('../views/PageMeetups.vue'),
  },
  // TODO: Task 05-vue-router/01-AuthPages
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Вход' },
    component: () => import('../views/PageLogin.vue'),
    props: (to) => ({ from: to.query.from })
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'Регистрация' },
    component: () => import('../views/PageRegister.vue')
  },
  {
    path: '/meetups',
    name: 'meetups',
    redirect: { name: 'index' },
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    redirect: (to) => ({ name: 'meetup.description', params: to.params }),
    component: () => import('../views/PageMeetup.vue'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup.description',
        component: () => import('../views/PageMeetupDescription.vue'),
      },
      {
        path: 'agenda',
        name: 'meetup.agenda',
        component: () => import('../views/PageMeetupAgenda.vue'),
      },
    ],
  },
  {
    path: '/meetups/create',
    name: 'create-meetup',
    meta: { title: 'Создание митапа' },
    // TODO: Добавить страницу создания митапа
  },
  {
    path: '/meetups/:meetupId(\\d+)/edit',
    name: 'edit-meetup',
    meta: { title: 'Редактирование митапа' },
    // TODO: Добавить страницу редактирования митапа
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { title: 'Страница не найдена' },
    component: () => import('../views/PageNotFound.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach(authGuard);
router.afterEach(to => {
  document.title = `${to.meta.title} | Meetups`
})
