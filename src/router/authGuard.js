import { useAuthStore } from '../stores/useAuthStore'

/** @implements {import('vue-router').NavigationGuard} */
export function authGuard(to) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.meta.requireAuth)
    return { name: 'login', query: { from: to.path } }
  else if (isAuthenticated && to.meta.requireGuest)
    return { name: 'meetups' }
}
