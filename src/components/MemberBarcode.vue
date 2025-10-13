<template>
  <div>
    <svg ref="svgEl" />
    <div v-if="showText" class="code">{{ code }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import JsBarcode from 'jsbarcode'

const props = defineProps<{
  code: string
  showText?: boolean
}>()

const svgEl = ref<SVGSVGElement | null>(null)

function render() {
  if (!svgEl.value) return
  // @ts-ignore（型定義なしでもOKにするため）
  JsBarcode(svgEl.value, props.code, {
    format: 'CODE128',
    width: 2,
    height: 64,
    displayValue: props.showText ?? true,
  })
}

onMounted(render)
watch(() => props.code, render)
</script>

<style scoped>
.code { margin-top: 8px; font-weight: 600; letter-spacing: 2px; }
</style>
