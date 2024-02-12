import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export const useQuerySync = (key, defaultValue) => {
  const queryParam = ref(defaultValue);
  const route = useRoute();

  onMounted(() => {
    if (route.query[key] && route.query[key] !== defaultValue)
      queryParam.value = route.query[key]
  })

  watchEffect(() => {
    const param = queryParam.value !== defaultValue ? queryParam.value : ''
    
    const query = new URLSearchParams(document.location.search)
  
    if (param) query.set(key, param)
    else query.delete(key)
  
    const queryString = query.toString()
    const fullPath = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
  
    window.history.replaceState(null, '', fullPath)
  })

  return queryParam;
};