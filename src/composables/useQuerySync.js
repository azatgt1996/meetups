import { ref, watchEffect, watch, toValue } from 'vue';
import { useRoute } from 'vue-router';

const toLastItem = (itemOrArray) => Array.isArray(itemOrArray) ? itemOrArray.reverse()[0] : itemOrArray;

export const useQuerySync = (key, defaultValue) => {
  const queryParam = ref(defaultValue);
  const route = useRoute();

  watch(() => toValue(route.query),
    query => queryParam.value = toLastItem(query[key]) || defaultValue,
    { immediate: true })

  watchEffect(() => {
    const param = queryParam.value !== defaultValue ? queryParam.value : ''
    
    const query = new URLSearchParams(document.location.search)
  
    if (param) query.set(key, param)
    else query.delete(key)
  
    const queryString = query.toString()
    const fullPath = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
  
    window.history.replaceState(history.state, '', fullPath)
  })

  return queryParam;
};