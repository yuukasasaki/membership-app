import { computed } from 'vue';
import MemberBarcode from '@/components/MemberBarcode.vue';
import { currentEmail, logout } from '@/stores/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
// ログイン時に auth.ts で保存したメール
const email = computed(() => currentEmail.value ?? '');
// デモ用：メールから安定した疑似コードを作る（本番はサーバー発番）
function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++)
        h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
}
const memberCode = computed(() => {
    const hval = hash(email.value);
    const six = String(hval % 900000 + 100000); // 6桁
    return `M${six}`;
});
function onLogout() {
    logout();
    router.push({ name: 'login' });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.email) {
    // @ts-ignore
    [email,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "page" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "head" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({});
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.onLogout) },
    });
    // @ts-ignore
    [onLogout,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "label" },
    });
    /** @type {[typeof MemberBarcode, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MemberBarcode, new MemberBarcode({
        code: (__VLS_ctx.memberCode),
    }));
    const __VLS_1 = __VLS_0({
        code: (__VLS_ctx.memberCode),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [memberCode,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "email" },
    });
    (__VLS_ctx.email);
    // @ts-ignore
    [email,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "page" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        to: "/login",
    }));
    const __VLS_6 = __VLS_5({
        to: "/login",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    const { default: __VLS_8 } = __VLS_7.slots;
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['head']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['email']} */ ;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
