import { ref } from 'vue';
import { apiService, ApiException } from '../services/api';
const form = ref({
    monthlyDeposit: 5000,
    durationMonths: 60,
    annualInterestRate: 8.5,
    depositTiming: 'BEGINNING_OF_MONTH',
    compoundingFrequency: 'MONTHLY'
});
const durationPresets = [
    { label: '1 Year', months: 12 },
    { label: '3 Years', months: 36 },
    { label: '5 Years', months: 60 },
    { label: '7 Years', months: 84 },
    { label: '10 Years', months: 120 }
];
const timingOptions = [
    { label: 'Beginning of Month (Advance / Annuity Due)', value: 'BEGINNING_OF_MONTH' },
    { label: 'End of Month (Arrears / Ordinary Annuity)', value: 'END_OF_MONTH' }
];
const compoundingOptions = [
    { label: 'Monthly (Most Common in BD)', value: 'MONTHLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Semi-Annually', value: 'SEMI_ANNUALLY' },
    { label: 'Annually', value: 'ANNUALLY' }
];
const result = ref(null);
const loading = ref(false);
const errorMessage = ref('');
const rules = {
    required: (v) => v !== '' && v !== null && v !== undefined || 'This field is required',
    positiveNumber: (v) => v > 0 || 'Must be greater than 0',
    nonNegativeNumber: (v) => v >= 0 || 'Must be 0 or greater',
    positiveInteger: (v) => Number.isInteger(v) && v > 0 || 'Must be a positive whole number'
};
function formatCurrency(val) {
    if (val === undefined || val === null)
        return '0.00';
    return Number(val).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
async function calculate() {
    if (form.value.monthlyDeposit <= 0 || form.value.durationMonths <= 0 || form.value.annualInterestRate < 0) {
        errorMessage.value = 'Please fill all required fields with valid positive values.';
        return;
    }
    loading.value = true;
    errorMessage.value = '';
    try {
        const res = await apiService.calculateDps(form.value);
        result.value = res;
    }
    catch (err) {
        if (err instanceof ApiException) {
            errorMessage.value = err.message;
        }
        else if (err instanceof Error) {
            errorMessage.value = err.message;
        }
        else {
            errorMessage.value = 'Failed to calculate DPS maturity.';
        }
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "py-8" },
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "py-8" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-4" },
});
const __VLS_5 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    to: "/",
    variant: "text",
    prependIcon: "mdi-arrow-left",
    ...{ class: "text-none px-2" },
}));
const __VLS_7 = __VLS_6({
    to: "/",
    variant: "text",
    prependIcon: "mdi-arrow-left",
    ...{ class: "text-none px-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex align-center ga-3 mb-6" },
});
const __VLS_9 = {}.VAvatar;
/** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    color: "primary",
    variant: "tonal",
    size: "56",
    rounded: "lg",
}));
const __VLS_11 = __VLS_10({
    color: "primary",
    variant: "tonal",
    size: "56",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    icon: "mdi-piggy-bank-outline",
    size: "32",
}));
const __VLS_15 = __VLS_14({
    icon: "mdi-piggy-bank-outline",
    size: "32",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-h4 font-weight-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-body-2 text-medium-emphasis mb-0" },
});
const __VLS_17 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    cols: "12",
    md: "5",
}));
const __VLS_23 = __VLS_22({
    cols: "12",
    md: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    elevation: "1",
    rounded: "xl",
    ...{ class: "pa-5 border" },
}));
const __VLS_27 = __VLS_26({
    elevation: "1",
    rounded: "xl",
    ...{ class: "pa-5 border" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-subtitle-1 font-weight-bold mb-4" },
});
const __VLS_29 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.form.monthlyDeposit),
    modelModifiers: { number: true, },
    label: "Monthly Deposit Amount (BDT)",
    type: "number",
    min: "100",
    step: "500",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.positiveNumber]),
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.form.monthlyDeposit),
    modelModifiers: { number: true, },
    label: "Monthly Deposit Amount (BDT)",
    type: "number",
    min: "100",
    step: "500",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.positiveNumber]),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "text-caption font-weight-medium text-medium-emphasis mb-1 d-block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex flex-wrap ga-2" },
});
for (const [preset] of __VLS_getVForSourceType((__VLS_ctx.durationPresets))) {
    const __VLS_33 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        key: (preset.months),
        size: "small",
        variant: (__VLS_ctx.form.durationMonths === preset.months ? 'flat' : 'outlined'),
        color: (__VLS_ctx.form.durationMonths === preset.months ? 'primary' : 'secondary'),
        clickable: true,
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        key: (preset.months),
        size: "small",
        variant: (__VLS_ctx.form.durationMonths === preset.months ? 'flat' : 'outlined'),
        color: (__VLS_ctx.form.durationMonths === preset.months ? 'primary' : 'secondary'),
        clickable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_37;
    let __VLS_38;
    let __VLS_39;
    const __VLS_40 = {
        onClick: (...[$event]) => {
            __VLS_ctx.form.durationMonths = preset.months;
        }
    };
    __VLS_36.slots.default;
    (preset.label);
    var __VLS_36;
}
const __VLS_41 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    modelValue: (__VLS_ctx.form.durationMonths),
    modelModifiers: { number: true, },
    label: "Duration (Months)",
    type: "number",
    min: "1",
    max: "360",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    suffix: "months",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.positiveInteger]),
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.form.durationMonths),
    modelModifiers: { number: true, },
    label: "Duration (Months)",
    type: "number",
    min: "1",
    max: "360",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    suffix: "months",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.positiveInteger]),
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const __VLS_45 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    modelValue: (__VLS_ctx.form.annualInterestRate),
    modelModifiers: { number: true, },
    label: "Annual Interest / Profit Rate (%)",
    type: "number",
    min: "0",
    max: "100",
    step: "0.25",
    suffix: "%",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.nonNegativeNumber]),
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.form.annualInterestRate),
    modelModifiers: { number: true, },
    label: "Annual Interest / Profit Rate (%)",
    type: "number",
    min: "0",
    max: "100",
    step: "0.25",
    suffix: "%",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.nonNegativeNumber]),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_49 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.form.depositTiming),
    label: "Deposit Timing",
    items: (__VLS_ctx.timingOptions),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.form.depositTiming),
    label: "Deposit Timing",
    items: (__VLS_ctx.timingOptions),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const __VLS_53 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.form.compoundingFrequency),
    label: "Compounding Frequency",
    items: (__VLS_ctx.compoundingOptions),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.form.compoundingFrequency),
    label: "Compounding Frequency",
    items: (__VLS_ctx.compoundingOptions),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
if (__VLS_ctx.errorMessage) {
    const __VLS_57 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        ...{ 'onClick:close': {} },
        type: "error",
        variant: "tonal",
        density: "compact",
        ...{ class: "mb-4" },
        closable: true,
    }));
    const __VLS_59 = __VLS_58({
        ...{ 'onClick:close': {} },
        type: "error",
        variant: "tonal",
        density: "compact",
        ...{ class: "mb-4" },
        closable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    let __VLS_61;
    let __VLS_62;
    let __VLS_63;
    const __VLS_64 = {
        'onClick:close': (...[$event]) => {
            if (!(__VLS_ctx.errorMessage))
                return;
            __VLS_ctx.errorMessage = '';
        }
    };
    __VLS_60.slots.default;
    (__VLS_ctx.errorMessage);
    var __VLS_60;
}
const __VLS_65 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    color: "primary",
    size: "large",
    block: true,
    rounded: "lg",
    loading: (__VLS_ctx.loading),
    ...{ class: "font-weight-bold" },
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    color: "primary",
    size: "large",
    block: true,
    rounded: "lg",
    loading: (__VLS_ctx.loading),
    ...{ class: "font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
let __VLS_71;
const __VLS_72 = {
    onClick: (__VLS_ctx.calculate)
};
__VLS_68.slots.default;
var __VLS_68;
var __VLS_28;
var __VLS_24;
const __VLS_73 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    cols: "12",
    md: "7",
}));
const __VLS_75 = __VLS_74({
    cols: "12",
    md: "7",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
__VLS_76.slots.default;
if (__VLS_ctx.result) {
    const __VLS_77 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
        elevation: "1",
        rounded: "xl",
        ...{ class: "pa-5 border mb-6" },
    }));
    const __VLS_79 = __VLS_78({
        elevation: "1",
        rounded: "xl",
        ...{ class: "pa-5 border mb-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    __VLS_80.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex align-center justify-space-between mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "text-subtitle-1 font-weight-bold" },
    });
    const __VLS_81 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        color: "success",
        size: "small",
        variant: "flat",
    }));
    const __VLS_83 = __VLS_82({
        color: "success",
        size: "small",
        variant: "flat",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    __VLS_84.slots.default;
    var __VLS_84;
    const __VLS_85 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
        ...{ class: "mb-4" },
    }));
    const __VLS_87 = __VLS_86({
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    __VLS_88.slots.default;
    const __VLS_89 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
        cols: "12",
        sm: "4",
    }));
    const __VLS_91 = __VLS_90({
        cols: "12",
        sm: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    __VLS_92.slots.default;
    const __VLS_93 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-grey-lighten-5" },
    }));
    const __VLS_95 = __VLS_94({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-grey-lighten-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    __VLS_96.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-h6 font-weight-bold text-secondary" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.totalPrincipal));
    var __VLS_96;
    var __VLS_92;
    const __VLS_97 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        cols: "12",
        sm: "4",
    }));
    const __VLS_99 = __VLS_98({
        cols: "12",
        sm: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    __VLS_100.slots.default;
    const __VLS_101 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-grey-lighten-5" },
    }));
    const __VLS_103 = __VLS_102({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-grey-lighten-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_104.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-h6 font-weight-bold text-success" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.estimatedProfit));
    var __VLS_104;
    var __VLS_100;
    const __VLS_105 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        cols: "12",
        sm: "4",
    }));
    const __VLS_107 = __VLS_106({
        cols: "12",
        sm: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    __VLS_108.slots.default;
    const __VLS_109 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-primary text-white" },
    }));
    const __VLS_111 = __VLS_110({
        border: true,
        rounded: "lg",
        ...{ class: "pa-3 text-center bg-primary text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    __VLS_112.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-white text-opacity-90" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-h6 font-weight-bold" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.maturityAmount));
    var __VLS_112;
    var __VLS_108;
    var __VLS_88;
    if (__VLS_ctx.result.breakdown && __VLS_ctx.result.breakdown.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "text-subtitle-2 font-weight-bold mb-2" },
        });
        const __VLS_113 = {}.VTable;
        /** @type {[typeof __VLS_components.VTable, typeof __VLS_components.vTable, typeof __VLS_components.VTable, typeof __VLS_components.vTable, ]} */ ;
        // @ts-ignore
        const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
            density: "compact",
            ...{ class: "border rounded-lg" },
        }));
        const __VLS_115 = __VLS_114({
            density: "compact",
            ...{ class: "border rounded-lg" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_114));
        __VLS_116.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ class: "text-left font-weight-bold" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ class: "text-right font-weight-bold" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ class: "text-right font-weight-bold" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ class: "text-right font-weight-bold" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [row] of __VLS_getVForSourceType((__VLS_ctx.result.breakdown))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (row.year),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (row.year);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "text-right" },
            });
            (__VLS_ctx.formatCurrency(row.depositedAmount));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "text-right text-success" },
            });
            (__VLS_ctx.formatCurrency(row.earnedProfit));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "text-right font-weight-medium" },
            });
            (__VLS_ctx.formatCurrency(row.balance));
        }
        var __VLS_116;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-grey-lighten-4 pa-4 rounded-lg border" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption font-weight-bold mb-1" },
    });
    const __VLS_117 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        icon: "mdi-information-outline",
        size: "14",
        ...{ class: "mr-1" },
    }));
    const __VLS_119 = __VLS_118({
        icon: "mdi-information-outline",
        size: "14",
        ...{ class: "mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "text-caption text-medium-emphasis pl-4 mb-0" },
    });
    for (const [assumption, idx] of __VLS_getVForSourceType((__VLS_ctx.result.assumptions))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (assumption);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    var __VLS_80;
}
else {
    const __VLS_121 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        border: true,
        rounded: "xl",
        ...{ class: "pa-8 text-center bg-surface" },
    }));
    const __VLS_123 = __VLS_122({
        border: true,
        rounded: "xl",
        ...{ class: "pa-8 text-center bg-surface" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    __VLS_124.slots.default;
    const __VLS_125 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
        color: "primary",
        variant: "tonal",
        size: "64",
        ...{ class: "mb-4" },
    }));
    const __VLS_127 = __VLS_126({
        color: "primary",
        variant: "tonal",
        size: "64",
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_126));
    __VLS_128.slots.default;
    const __VLS_129 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
        icon: "mdi-chart-line",
        size: "32",
    }));
    const __VLS_131 = __VLS_130({
        icon: "mdi-chart-line",
        size: "32",
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    var __VLS_128;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-h6 font-weight-bold mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-body-2 text-medium-emphasis mb-4 mx-auto" },
        ...{ style: {} },
    });
    const __VLS_133 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        rounded: "lg",
    }));
    const __VLS_135 = __VLS_134({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_134));
    let __VLS_137;
    let __VLS_138;
    let __VLS_139;
    const __VLS_140 = {
        onClick: (__VLS_ctx.calculate)
    };
    __VLS_136.slots.default;
    var __VLS_136;
    var __VLS_124;
}
var __VLS_76;
var __VLS_20;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-5']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-block']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-5']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-success']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-success']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            durationPresets: durationPresets,
            timingOptions: timingOptions,
            compoundingOptions: compoundingOptions,
            result: result,
            loading: loading,
            errorMessage: errorMessage,
            rules: rules,
            formatCurrency: formatCurrency,
            calculate: calculate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
