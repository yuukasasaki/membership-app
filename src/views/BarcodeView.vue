<script setup lang="ts">
import { computed } from 'vue'
import MemberBarcode from '@/components/MemberBarcode.vue'
import MemberQr from '@/components/MemberQr.vue'
import { currentEmail, logout } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = computed(() => currentEmail.value ?? '')

// デモ用: メールから6桁コード生成（既に入れてあるやつ）
function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
const memberCode = computed(() => {
  const hval = hash(email.value)
  const six = String(hval % 900000 + 100000)
  return `M${six}`
})

function onLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="page" v-if="email">
    <div class="head">
      <h1>会員証</h1>
      <button @click="onLogout">ログアウト</button>
    </div>

    <div class="card">
      <p class="label">会員コード</p>
      <div class="grid">
        <div>
          <MemberBarcode :code="memberCode" />
          <small>バーコード（CODE128）</small>
        </div>
        <div>
          <MemberQr :text="memberCode" />
          <small>QRコード</small>
        </div>
      </div>
      <p class="email">{{ email }}</p>
    </div>
  </div>

  <div v-else class="page">
    <p>ログインしてください</p>
    <router-link to="/login">ログインへ</router-link>
  </div>
</template>

<style scoped>
.page { padding: 20px }
.head { display:flex; justify-content:space-between; align-items:center; }
.card { margin-top:16px; padding:16px; border:1px solid #ddd; border-radius:10px; display:inline-block; text-align:center; }
.label { margin-bottom:8px; color:#666; }
.email { margin-top:8px; color:#666; font-size:14px; }
.grid { display:grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
small { display:block; margin-top:6px; color:#777; }
button { padding:8px 12px; border:none; border-radius:6px; background:#409eff; color:#fff; cursor:pointer; }
button:hover { opacity:.9; }
</style>
