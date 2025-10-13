<template>
  <div class="page">
    <h1>ログイン</h1>

    <form @submit.prevent="onSubmit" class="form">
      <label>
        メールアドレス
        <input v-model="email" type="email" required />
      </label>
      <label>
        パスワード
        <input v-model="password" type="password" required />
      </label>

      <div class="actions">
        <button type="submit">ログイン</button>
        <router-link to="/register">新規登録はこちら</router-link>
      </div>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/stores/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  error.value = ''

  // デモ版: 入力が空でなければログイン成功扱い
  if (!email.value || !password.value) {
    error.value = 'メールとパスワードを入力してください'
    return
  }

  // ここで本来はAPIチェック等を行う
  login(email.value)

  // 成功したらバーコード画面へ
  router.push({ name: 'barcode' })
}
</script>

<style scoped>
.page { padding: 20px }
.form { display:flex; flex-direction:column; gap:10px; max-width:320px; }
label { display:flex; flex-direction:column; gap:6px; }
.actions { display:flex; align-items:center; gap:12px; margin-top:8px; }
button { padding:8px 12px; }
.error { color:#c00; margin-top:10px; }
</style>
