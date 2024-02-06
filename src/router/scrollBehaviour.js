// TODO: Task 05-vue-router/03-ScrollBehavior

/** @implements {import('vue-router').RouterScrollBehavior} */
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash }
  
  if (to.meta.saveScrollPosition && from.meta.saveScrollPosition)
    return false

  return { top: 0, left: 0 }
}
