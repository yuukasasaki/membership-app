<template>
  <div class="login-container">
    <h1>ログイン</h1>

    <form @submit.prevent="login">
      <div>
        <label>メールアドレス：</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>パスワード：</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'ログイン中…' : 'ログイン' }}
      </button>
    </form>

    <p v-if="message">{{ message }}</p>

    <router-link to="/register">まだ登録していない方はこちら</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login as saveLogin } from "@/stores/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const message = ref("");
const loading = ref(false);

const login = async () => {
  message.value = "ログイン中...";
  loading.value = true;

  try {
    const res = await fetch("https://smaregi-callback-worker.mcrn-ch.workers.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mailAddress: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (res.ok && data.customerCode) {
      saveLogin(data.customerCode);
      message.value = "ログイン成功！";
      await router.push("/mypage");
    } else {
      message.value = data.error || "メールアドレスまたはパスワードが正しくありません。";
    }
  } catch (err: unknown) {
    message.value = `通信エラー: ${err instanceof Error ? err.message : String(err)}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
form div {
  margin-bottom: 1rem;
  text-align: left;
}
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 0.7rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
