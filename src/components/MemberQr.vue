<template>
  <div class="qr-wrap">
    <canvas ref="canvasEl"></canvas>
    <div v-if="showText" class="code">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QRCode from 'qrcode'

const props = defineProps<{
  text: string
  showText?: boolean
  size?: number
}>()

const canvasEl = ref<HTMLCanvasElement | null>(null)

async function render() {
  if (!canvasEl.value || !props.text) return
  await QRCode.toCanvas(canvasEl.value, props.text, {
    width: props.size ?? 160,
    margin: 1,
    errorCorrectionLevel: 'M', // L/M/Q/H
  })
}

onMounted(render)
watch(() => props.text, render)
</script>

<style scoped>
.qr-wrap { display:inline-block; text-align:center; }
.code { margin-top:8px; font-weight:600; letter-spacing:1px; }
</style>
