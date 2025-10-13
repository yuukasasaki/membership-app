<template>
  <div class="page">
    <h1>会員登録</h1>

    <form @submit.prevent="onSubmit" class="form">
      <label>
        名前
        <input v-model="name" required />
      </label>
      <label>
        メール
        <input v-model="email" type="email" required />
      </label>
      <label>
        パスワード
        <input v-model="password" type="password" required />
      </label>

      <div class="actions">
        <button type="submit">登録する</button>
        <router-link to="/login">ログイン画面へ</router-link>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../stores/userStore'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const message = ref('')

function onSubmit() {
  error.value = ''
  message.value = ''
  const res = registerUser({ name: name.value.trim(), email: email.value.trim(), password: password.value })
  if (!res.ok) {
    error.value = res.error ?? '登録に失敗しました'
    return
  }
  message.value = '登録できました！ログインしてください'
  // 登録が成功したらログインページへ移動する（少し待って遷移でもOK）
  setTimeout(() => router.push({ name: 'Login' }), 800)
}
</script>

<style scoped>
.page { padding: 20px }
.form { display:flex; flex-direction:column; gap:8px; max-width:320px; }
label { display:flex; flex-direction:column; }
.actions { display:flex; align-items:center; gap:12px; margin-top:8px; }
.error { color: #c00; margin-top:12px; }
.message { color: #0a0; margin-top:12px; }
</style>
