import { createRouter, createWebHistory } from 'vue-router'
import BarcodeView from '@/views/BarcodeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { isLoggedIn } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'barcode',
      component: BarcodeView,
      meta: { requiresAuth: true }, // ← 🔒ログイン必須
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

// ✅ グローバルナビゲーションガード
router.beforeEach((to, from, next) => {
  // requiresAuthがtrueで、ログインしていなかったら/loginへ
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
