import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser, logoutUser, getUser } from '../api/authApi';

const userData = localStorage.user ? JSON.parse(localStorage.user) : null

export const useAuthStore = defineStore('auth', () => {
  const user = ref(userData);
  const isAuthenticated = computed(() => !!user.value);

  const getCurrentUser = async () => {
    const result = await getUser()
    if (result.success) {
      user.value = result.data
      localStorage.user = JSON.stringify(user.value)
    }
  }

  const login = async (email, password) => {
    const result = await loginUser(email, password)
    if (result.success) {
      user.value = result.data
      localStorage.user = JSON.stringify(user.value)
    }
  }

  const logout = async () => {
    const result = await logoutUser()
    if (result.success) {
      user.value = null
      delete localStorage.user
    }
  }

  return {
    user,
    isAuthenticated,
    getCurrentUser,
    login,
    logout,
  };
});
