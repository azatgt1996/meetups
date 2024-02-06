import { isAuthenticated } from '../services/authService'

/** @implements {import('vue-router').NavigationGuard} */
export function authGuard(to) {
  if (!isAuthenticated() && to.meta.requireAuth)
    return { path: '/login', query: { from: to.path } }
  else if (isAuthenticated() && to.meta.requireGuest)
    return { path: '/' }
}
