// TODO: реализовать функции, необходимые для авторизации, помимо работы с API
// Например, сохранения данных пользователя в LS, восстановления и удаления

let isLoggedIn = false;

/**
 * Авторизован ли текущий пользователь
 * @return {boolean}
 */
export function isAuthenticated() {
  return isLoggedIn;
}

export function login() {
  isLoggedIn = true;
}

export function logout() {
  isLoggedIn = false;
}
