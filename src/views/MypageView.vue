<template>
  <div class="mypage-container">
    <h1>会員証</h1>

    <div v-if="customerCode" class="card">
      <p>あなたの会員コード：</p>
      <h2>{{ customerCode }}</h2>

      <svg ref="barcode"></svg>

      <button @click="logout">ログアウト</button>
    </div>

    <div v-else>
      <p>ログイン情報が見つかりません。</p>
      <router-link to="/login">ログインページへ</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import JsBarcode from "jsbarcode";
import { useRouter } from "vue-router";
import { currentCustomerCode, logout as clearLogin } from "@/stores/auth";

const router = useRouter();
const customerCode = ref<string | null>(null);
const barcode = ref<SVGSVGElement | null>(null);

onMounted(async () => {
  customerCode.value = currentCustomerCode.value;

  // ✅ DOMの描画が完全に終わってからバーコード生成
  await nextTick();

  if (customerCode.value && barcode.value) {
    JsBarcode(barcode.value, customerCode.value, {
      format: "CODE128",
      lineColor: "#000000",
      width: 2,
      height: 80,
      displayValue: true,
      fontSize: 16,
      margin: 10,
    });
  } else {
    console.warn("バーコード生成スキップ：customerCode or barcode未定義");
  }
});

const logout = () => {
  clearLogin();
  customerCode.value = null;
  router.push("/login");
};
</script>

<style scoped>
.mypage-container {
  text-align: center;
  margin-top: 3rem;
}

.card {
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

svg {
  display: block;
  margin: 1.5rem auto;
}

button {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background: #e74c3c;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #c0392b;
}
</style>
