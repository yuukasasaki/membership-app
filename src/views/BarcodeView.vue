<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMsg = ref('')
const successMsg = ref('')

// 会員コードを自動採番（例：時刻ベースで一意に）
function generateMemberCode() {
  const timestamp = Date.now().toString().slice(-6)
  return `M${timestamp}`
}

async function submit() {
  errorMsg.value = ''
  successMsg.value = ''

  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    errorMsg.value = 'すべての項目を入力してください'
    return
  }

  const memberCode = generateMemberCode()

  const body = {
    customerCode: memberCode,
    firstName: firstName.value,
    lastName: lastName.value,
    firstKana: 'タロウ', // 仮でOK（スマレジはカナ必須）
    lastKana: 'ヤマダ',
    mailAddress: email.value,
    sex: '0',
    mailReceiveFlag: '1',
  }

  const res = await fetch('https://smaregi-callback-worker.mcrn-ch.workers.dev/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    errorMsg.value = json?.detail || json?.message || `エラー（${res.status}）`
  } else {
    // ✅ ローカルにも保存（ログインに使う）
    localStorage.setItem('user', JSON.stringify({
      email: email.value,
      password: password.value,
      memberCode
    }))

    successMsg.value = '会員登録が完了しました！'
    setTimeout(() => router.push({ name: 'login' }), 1500)
  }
}
</script>

<template>
  <div class="page">
    <h1>会員登録</h1>
    <form class="form" @submit.prevent="submit">
      <label>姓 <input v-model="lastName" type="text" /></label>
      <label>名 <input v-model="firstName" type="text" /></label>
      <label>メールアドレス <input v-model="email" type="email" /></label>
      <label>パスワード <input v-model="password" type="password" /></label>
      <button type="submit">登録</button>
    </form>

    <p v-if="errorMsg" class="error">❌ {{ errorMsg }}</p>
    <p v-if="successMsg" class="success">✅ {{ successMsg }}</p>
  </div>
</template>

<style scoped>
.page { padding: 20px; max-width: 420px; }
.form { display: grid; gap: 10px; margin-top: 12px; }
label { display: grid; gap: 4px; font-size: 14px; }
input { padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; }
button { margin-top: 10px; padding: 10px 16px; background:#409eff; border:none; color:#fff; border-radius:8px; cursor:pointer; }
.error { color: #d33; margin-top: 10px; }
.success { color: #2d7; margin-top: 10px; }
</style>
