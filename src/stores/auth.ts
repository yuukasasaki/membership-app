import { computed, ref } from 'vue'

const CUSTOMER_CODE_KEY = 'customerCode'

export const currentCustomerCode = ref<string | null>(localStorage.getItem(CUSTOMER_CODE_KEY))
export const isLoggedIn = computed(() => Boolean(currentCustomerCode.value))

export function login(customerCode: string) {
  currentCustomerCode.value = customerCode
  localStorage.setItem(CUSTOMER_CODE_KEY, customerCode)
}

export function logout() {
  currentCustomerCode.value = null
  localStorage.removeItem(CUSTOMER_CODE_KEY)
}
