// src/stores/auth.ts
import { ref } from 'vue'

export const currentEmail = ref<string | null>(localStorage.getItem('email'))
export const isLoggedIn = ref(!!currentEmail.value)

export function login(email: string) {
  currentEmail.value = email
  isLoggedIn.value = true
  localStorage.setItem('email', email)
}

export function logout() {
  currentEmail.value = null
  isLoggedIn.value = false
  localStorage.removeItem('email')
}
