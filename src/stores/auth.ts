// src/stores/auth.ts
import { ref } from 'vue'

const AUTH_KEY = 'membership_app_logged_in'
const EMAIL_KEY = 'membership_app_email'

// 画面リロードしても状態を復元
export const isLoggedIn = ref(localStorage.getItem(AUTH_KEY) === '1')
export const currentEmail = ref<string | null>(localStorage.getItem(EMAIL_KEY))

export function login(email?: string) {
  isLoggedIn.value = true
  localStorage.setItem(AUTH_KEY, '1')

  if (email) {
    currentEmail.value = email
    localStorage.setItem(EMAIL_KEY, email)
  }
}

export function logout() {
  isLoggedIn.value = false
  localStorage.removeItem(AUTH_KEY)

  currentEmail.value = null
  localStorage.removeItem(EMAIL_KEY)
}
