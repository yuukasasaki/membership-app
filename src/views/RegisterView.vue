<template>
  <div class="register-container">
    <h1>新規会員登録</h1>

    <form @submit.prevent="submit">
      <div>
        <label>姓：</label>
        <input v-model="lastName" required />
      </div>
      <div>
        <label>名：</label>
        <input v-model="firstName" required />
      </div>
      <div>
        <label>メールアドレス：</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>パスワード：</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '送信中…' : '会員登録' }}
      </button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>

    <!-- 🔗 登録成功後に表示する「会員証リンク」 -->
    <div v-if="linkUrl" class="link-box">
      <p>🔗 会員証リンク：</p>
      <input :value="linkUrl" readonly @focus="selectLink" />
      <button @click="copy">コピー</button>

      <p class="tip">※ このリンクをブックマーク or ホーム画面に追加すると、次回から開くだけで会員証を表示できます</p>

      <!-- すぐ確認できる導線（同じタブで遷移） -->
      <router-link :to="`/card?token=${encodedToken}`">今すぐ会員証を表示する</router-link>
    </div>

    <router-link to="/login" style="display:block;margin-top:12px;">すでに登録済みの方はこちら</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const API_BASE = "https://smaregi-callback-worker.mcrn-ch.workers.dev";

const lastName = ref("");
const firstName = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const loading = ref(false);

// 署名付きURLと、中の token だけを抜いた文字列
const linkUrl = ref("");
const encodedToken = computed(() => {
  if (!linkUrl.value) return "";
  const m = linkUrl.value.match(/token=([^&]+)/);
  return m ? m[1] : "";
});

const copy = async () => {
  if (!linkUrl.value) return;
  await navigator.clipboard.writeText(linkUrl.value);
  message.value = "リンクをコピーしました！";
};

const selectLink = (event: FocusEvent) => {
  if (event.target instanceof HTMLInputElement) {
    event.target.select();
  }
};

const submit = async () => {
  message.value = "登録処理中...";
  loading.value = true;
  linkUrl.value = "";

  try {
    // 1) 会員登録（Worker → スマレジ）
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: lastName.value,
        firstName: firstName.value,
        mailAddress: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.value = `登録エラー: ${data.error || res.statusText}`;
      return;
    }

    // スマレジから返った customerCode を使う
    const customerCode = data.customerCode || data?.customerCode;
    if (!customerCode) {
      message.value = "登録は成功しましたが、customerCode が取得できませんでした💦";
      return;
    }

    // 2) 署名付きURLを発行（ブラウザだけで会員証を開けるリンク）
    const r2 = await fetch(`${API_BASE}/generate-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerCode }),
    });
    const d2 = await r2.json();

    if (!r2.ok) {
      message.value = `リンク発行エラー: ${d2.error || r2.statusText}`;
      return;
    }

    linkUrl.value = d2.url; // ← これを保存・ブックマークしてもらう
    message.value = "🎉 登録が完了しました！下のリンクを保存しておくと、開くだけで会員証を表示できます。";
  } catch (err: any) {
    message.value = `通信エラー: ${err.message || String(err)}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  max-width: 420px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
form div { margin-bottom: 1rem; text-align: left; }
input { width: 100%; padding: 0.5rem; border-radius: 6px; border: 1px solid #ccc; }
button { width: 100%; padding: 0.7rem; background:#3498db; color:#fff; border: none; border-radius: 6px; cursor: pointer; }
button:disabled { opacity: .6; cursor: not-allowed; }
button:hover { background:#2980b9; }
.message { margin-top: 1rem; font-weight: bold; }
.link-box { margin-top: 1rem; padding: 1rem; border: 1px dashed #aaa; border-radius: 8px; text-align: left; }
.link-box input { margin: .5rem 0; }
.tip { color:#666; font-size: .9rem; margin: .5rem 0 1rem; }
</style>
