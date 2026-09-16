<template>
  <div class="card">
    <h1>会員証</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="!customerCode">読み込み中…</div>

    <div v-else class="code-box">
      <p>会員コード：<strong>{{ customerCode }}</strong></p>
      <svg ref="barcode"></svg>
      <p class="hint">※ 画面の明るさを上げると読み取りやすいです</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import JsBarcode from "jsbarcode";

const API_BASE = "https://smaregi-callback-worker.mcrn-ch.workers.dev";
const customerCode = ref<string | null>(null);
const error = ref<string | null>(null);
const barcode = ref<SVGSVGElement | null>(null);

onMounted(async () => {
  try {
    // URL の ?token=... を取得
    const token = new URL(location.href).searchParams.get("token");
    if (!token) {
      error.value = "token がありません";
      return;
    }

    // 署名検証 → 会員コードを取得
    const res = await fetch(`${API_BASE}/verify?token=${encodeURIComponent(token)}`);
    const data = await res.json();

    if (!res.ok || !data.ok) {
      error.value = data.error || "token 検証に失敗しました";
      return;
    }

    customerCode.value = data.customerCode;

    // バーコード描画
    await nextTick();
    if (barcode.value && customerCode.value) {
      JsBarcode(barcode.value, customerCode.value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 16,
        margin: 10,
      });
    }
  } catch (e: any) {
    error.value = e.message || String(e);
  }
});
</script>

<style scoped>
.card { max-width: 420px; margin: 2rem auto; padding:2rem; background:#fff; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); text-align:center; }
.error { color:#c0392b; font-weight:bold; }
.code-box { margin-top: 1rem; }
.hint { color:#666; font-size:.9rem; margin-top:.5rem; }
</style>
