import { ref } from 'vue';
import { createProgress } from '../plugins/progress'
import { createToaster } from '../plugins/toaster'

/**
 * @template T
 * @typedef {function(...[*]): Promise<ResultContainer<T>>} IApiFunction
 */

/**
 * @template T
 * @template {IApiFunction<T>} K
 * @typedef IUseApiReturn
 * @param {Ref<ResultContainer<T>>} result - Реактивный результат
 * @param {Ref<boolean>} isLoading - Реактивный флаг загрузки
 * @param {K} request - Функция запуска запроса
 */

/**
 * Компосабл для выполнения запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром и тостером для отображения результата
 * Возвращает реактивные переменные с результатом
 *
 * @template T
 *
 * @param {IApiFunction<T>} apiFunc - функция, выполняющая запрос к API, и возвращающая промис с
 * @param {object} options
 * @param {boolean=false} [options.showProgress] - показывать ли прогресс загрузки через Progress плагин
 * @param {boolean|string=false} [options.successToast] - В случае успешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @param {boolean|string=false} [options.errorToast] - В случае неуспешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @return {IUseApiReturn<T, typeof apiFunc>}
 */
export function useApi(apiFunc, { showProgress = false, successToast = false, errorToast = false } = {}) {
  const result = ref(null);
  const isLoading = ref(false);

  const progress = createProgress()
  const toaster = createToaster()

  const request = async (...args) => {
    isLoading.value = true
    if (showProgress) progress.start()
    result.value = await apiFunc(...args)
    if (showProgress) progress.finish()

    if (successToast && result.value.success)
      toaster.success(typeof successToast === 'string' ? successToast : result.value.success)

    if (errorToast && result.value.error)
      toaster.error(typeof errorToast === 'string' ? errorToast : result.value.error.message)

    isLoading.value = false
  };

  return {
    request,
    result,
    isLoading,
  };
}
