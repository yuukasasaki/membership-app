import { onMounted, ref, watch } from 'vue';
import JsBarcode from 'jsbarcode';
const props = defineProps();
const svgEl = ref(null);
function render() {
    if (!svgEl.value)
        return;
    // @ts-ignore（型定義なしでもOKにするため）
    JsBarcode(svgEl.value, props.code, {
        format: 'CODE128',
        width: 2,
        height: 64,
        displayValue: props.showText ?? true,
    });
}
onMounted(render);
watch(() => props.code, render);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.svg)({
    ref: "svgEl",
});
/** @type {typeof __VLS_ctx.svgEl} */ ;
// @ts-ignore
[svgEl,];
if (__VLS_ctx.showText) {
    // @ts-ignore
    [showText,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "code" },
    });
    (__VLS_ctx.code);
    // @ts-ignore
    [code,];
}
/** @type {__VLS_StyleScopedClasses['code']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
