import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import MypageView from '@/views/MypageView.vue'
import BarcodeView from '@/views/BarcodeView.vue'
import CardView from '@/views/CardView.vue' // ← 追加！
import { isLoggedIn } from '@/stores/auth'

// --- ルーター設定 ---
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // デフォルト：登録へ
    { path: '/', redirect: '/register' },

    { path: '/register', name: 'register', component: RegisterView },
    { path: '/login',    name: 'login',    component: LoginView },

    // ログイン必須ページ
    { path: '/mypage', name: 'mypage', component: MypageView, meta: { requiresAuth: true } },
    { path: '/barcode', name: 'barcode', component: BarcodeView, meta: { requiresAuth: true } },

    // 会員証リンク（?token=... を受け取って表示）※認証不要
    { path: '/card', name: 'card', component: CardView },

    // それ以外は登録へ
    { path: '/:pathMatch(.*)*', redirect: '/register' },
  ],
})

// --- ログインガード ---
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
