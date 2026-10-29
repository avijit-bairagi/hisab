import { computed } from 'vue';
const props = defineProps();
const categoryColor = computed(() => {
    return props.tool.category === 'FINANCE' ? 'primary' : 'accent';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "tool-card h-100 d-flex flex-column transition-swing" },
    rounded: "xl",
    elevation: "1",
    hover: true,
    to: (__VLS_ctx.tool.route),
    'aria-label': (`Open ${__VLS_ctx.tool.name}`),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "tool-card h-100 d-flex flex-column transition-swing" },
    rounded: "xl",
    elevation: "1",
    hover: true,
    to: (__VLS_ctx.tool.route),
    'aria-label': (`Open ${__VLS_ctx.tool.name}`),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VCardItem;
/** @type {[typeof __VLS_components.VCardItem, typeof __VLS_components.vCardItem, typeof __VLS_components.VCardItem, typeof __VLS_components.vCardItem, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "pb-2" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "pb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex align-center justify-space-between mb-3" },
});
const __VLS_9 = {}.VAvatar;
/** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    color: (__VLS_ctx.categoryColor),
    variant: "tonal",
    size: "48",
    rounded: "lg",
}));
const __VLS_11 = __VLS_10({
    color: (__VLS_ctx.categoryColor),
    variant: "tonal",
    size: "48",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    icon: (__VLS_ctx.tool.icon),
    size: "26",
}));
const __VLS_15 = __VLS_14({
    icon: (__VLS_ctx.tool.icon),
    size: "26",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_12;
const __VLS_17 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    size: "small",
    color: (__VLS_ctx.categoryColor),
    variant: "flat",
    ...{ class: "text-uppercase font-weight-bold" },
}));
const __VLS_19 = __VLS_18({
    size: "small",
    color: (__VLS_ctx.categoryColor),
    variant: "flat",
    ...{ class: "text-uppercase font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
(__VLS_ctx.tool.category);
var __VLS_20;
const __VLS_21 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "text-h6 font-weight-bold px-0 pt-0" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "text-h6 font-weight-bold px-0 pt-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
(__VLS_ctx.tool.name);
var __VLS_24;
var __VLS_8;
const __VLS_25 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ class: "flex-grow-1 text-body-2 text-medium-emphasis" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "flex-grow-1 text-body-2 text-medium-emphasis" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
(__VLS_ctx.tool.description);
var __VLS_28;
const __VLS_29 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ class: "px-4 pb-4 pt-0" },
}));
const __VLS_31 = __VLS_30({
    ...{ class: "px-4 pb-4 pt-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    color: "primary",
    variant: "tonal",
    block: true,
    rounded: "lg",
    appendIcon: "mdi-arrow-right",
    ...{ class: "text-none font-weight-medium" },
}));
const __VLS_35 = __VLS_34({
    color: "primary",
    variant: "tonal",
    block: true,
    rounded: "lg",
    appendIcon: "mdi-arrow-right",
    ...{ class: "text-none font-weight-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
var __VLS_36;
var __VLS_32;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-swing']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            categoryColor: categoryColor,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
