import { ref } from 'vue';
import { apiService, ApiException } from '../services/api';
const taxYears = ['2024-2025', '2025-2026'];
const categories = [
    { label: 'General Individual (Male under 65) — ৳3,50,000 threshold', value: 'GENERAL' },
    { label: 'Female & Senior Citizens (65+) — ৳4,00,000 threshold', value: 'FEMALE_AND_SENIOR' },
    { label: 'Persons with Disabilities — ৳4,75,000 threshold', value: 'DISABLED' },
    { label: 'Gazetted War-wounded Freedom Fighters — ৳5,00,000 threshold', value: 'FREEDOM_FIGHTER' }
];
const locations = [
    { label: 'Dhaka & Chattogram City Corporation areas (Min Tax ৳5,000)', value: 'DHAKA_CHATTOGRAM_CITY' },
    { label: 'Other City Corporation areas (Min Tax ৳4,000)', value: 'OTHER_CITY' },
    { label: 'Non-City Corporation / Upazila / Rural areas (Min Tax ৳3,000)', value: 'NON_CITY' }
];
const form = ref({
    taxYear: '2024-2025',
    category: 'GENERAL',
    location: 'DHAKA_CHATTOGRAM_CITY',
    annualSalary: 1200000,
    otherIncome: 0,
    eligibleInvestment: 150000,
    disabledDependentsCount: 0
});
const result = ref(null);
const loading = ref(false);
const errorMessage = ref('');
function formatCurrency(val) {
    if (val === undefined || val === null)
        return '0.00';
    return Number(val).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
async function calculate() {
    if (form.value.annualSalary < 0 || (form.value.otherIncome ?? 0) < 0) {
        errorMessage.value = 'Income amounts cannot be negative.';
        return;
    }
    loading.value = true;
    errorMessage.value = '';
    try {
        const res = await apiService.calculateTax(form.value);
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
            errorMessage.value = 'Failed to calculate Bangladesh income tax.';
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
    icon: "mdi-file-document-edit-outline",
    size: "32",
}));
const __VLS_15 = __VLS_14({
    icon: "mdi-file-document-edit-outline",
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
    ...{ class: "text-subtitle-1 font-weight-bold mb-3" },
});
const __VLS_29 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.form.taxYear),
    label: "Assessment Year",
    items: (__VLS_ctx.taxYears),
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.form.taxYear),
    label: "Assessment Year",
    items: (__VLS_ctx.taxYears),
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_33 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    modelValue: (__VLS_ctx.form.category),
    label: "Taxpayer Category",
    items: (__VLS_ctx.categories),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}));
const __VLS_35 = __VLS_34({
    modelValue: (__VLS_ctx.form.category),
    label: "Taxpayer Category",
    items: (__VLS_ctx.categories),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const __VLS_37 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    modelValue: (__VLS_ctx.form.location),
    label: "Residential Location / Zone",
    items: (__VLS_ctx.locations),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
}));
const __VLS_39 = __VLS_38({
    modelValue: (__VLS_ctx.form.location),
    label: "Residential Location / Zone",
    items: (__VLS_ctx.locations),
    itemTitle: "label",
    itemValue: "value",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-subtitle-1 font-weight-bold mb-3" },
});
const __VLS_41 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    modelValue: (__VLS_ctx.form.annualSalary),
    modelModifiers: { number: true, },
    label: "Annual Gross Salary / Employment Income (BDT)",
    type: "number",
    min: "0",
    step: "10000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "Basic, allowances, bonuses before tax",
    persistentHint: true,
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.form.annualSalary),
    modelModifiers: { number: true, },
    label: "Annual Gross Salary / Employment Income (BDT)",
    type: "number",
    min: "0",
    step: "10000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "Basic, allowances, bonuses before tax",
    persistentHint: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const __VLS_45 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    modelValue: (__VLS_ctx.form.otherIncome),
    modelModifiers: { number: true, },
    label: "Other Annual Income (BDT)",
    type: "number",
    min: "0",
    step: "5000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "Rent, bank interest, freelancing, business",
    persistentHint: true,
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.form.otherIncome),
    modelModifiers: { number: true, },
    label: "Other Annual Income (BDT)",
    type: "number",
    min: "0",
    step: "5000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "Rent, bank interest, freelancing, business",
    persistentHint: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_49 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.form.eligibleInvestment),
    modelModifiers: { number: true, },
    label: "Eligible Investment Amount (BDT)",
    type: "number",
    min: "0",
    step: "5000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "DPS (up to 1.2L), Sanchayapatra, Capital Market, Provident Fund",
    persistentHint: true,
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.form.eligibleInvestment),
    modelModifiers: { number: true, },
    label: "Eligible Investment Amount (BDT)",
    type: "number",
    min: "0",
    step: "5000",
    prefix: "৳",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-3" },
    hint: "DPS (up to 1.2L), Sanchayapatra, Capital Market, Provident Fund",
    persistentHint: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const __VLS_53 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.form.disabledDependentsCount),
    modelModifiers: { number: true, },
    label: "Children / Dependents with Disabilities",
    type: "number",
    min: "0",
    max: "10",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
    hint: "+৳ 50,000 threshold exemption per dependent",
    persistentHint: true,
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.form.disabledDependentsCount),
    modelModifiers: { number: true, },
    label: "Children / Dependents with Disabilities",
    type: "number",
    min: "0",
    max: "10",
    variant: "outlined",
    density: "comfortable",
    ...{ class: "mb-4" },
    hint: "+৳ 50,000 threshold exemption per dependent",
    persistentHint: true,
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "text-subtitle-1 font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    (__VLS_ctx.result.profileSummary);
    const __VLS_81 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        color: "primary",
        size: "small",
        variant: "flat",
    }));
    const __VLS_83 = __VLS_82({
        color: "primary",
        size: "small",
        variant: "flat",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    __VLS_84.slots.default;
    (__VLS_ctx.result.taxYear);
    var __VLS_84;
    const __VLS_85 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
        border: true,
        rounded: "xl",
        ...{ class: "pa-4 mb-5 bg-primary text-white text-center" },
    }));
    const __VLS_87 = __VLS_86({
        border: true,
        rounded: "xl",
        ...{ class: "pa-4 mb-5 bg-primary text-white text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    __VLS_88.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-white text-opacity-90" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-h4 font-weight-bold my-1" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.finalTax));
    if (__VLS_ctx.result.minimumTaxApplied) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-caption text-warning font-weight-bold" },
        });
    }
    var __VLS_88;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold mb-2" },
    });
    const __VLS_89 = {}.VTable;
    /** @type {[typeof __VLS_components.VTable, typeof __VLS_components.vTable, typeof __VLS_components.VTable, typeof __VLS_components.vTable, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }));
    const __VLS_91 = __VLS_90({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    __VLS_92.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.grossIncome));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-medium text-medium-emphasis" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right text-success" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.exemptSalaryIncome));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        ...{ class: "bg-grey-lighten-5" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right font-weight-bold" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.taxableIncome));
    var __VLS_92;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold mb-2" },
    });
    const __VLS_93 = {}.VTable;
    /** @type {[typeof __VLS_components.VTable, typeof __VLS_components.vTable, typeof __VLS_components.VTable, typeof __VLS_components.vTable, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }));
    const __VLS_95 = __VLS_94({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    __VLS_96.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-center font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-right font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-right font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [slab, idx] of __VLS_getVForSourceType((__VLS_ctx.result.slabBreakdowns))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (idx),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (slab.slabDescription);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "text-center" },
        });
        (slab.ratePercent);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "text-right" },
        });
        (__VLS_ctx.formatCurrency(slab.taxableAmountInSlab));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "text-right font-weight-medium" },
        });
        (__VLS_ctx.formatCurrency(slab.taxForSlab));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        ...{ class: "bg-grey-lighten-5 font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        colspan: "3",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.taxBeforeRebate));
    var __VLS_96;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold mb-2" },
    });
    const __VLS_97 = {}.VTable;
    /** @type {[typeof __VLS_components.VTable, typeof __VLS_components.vTable, typeof __VLS_components.VTable, typeof __VLS_components.vTable, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }));
    const __VLS_99 = __VLS_98({
        density: "compact",
        ...{ class: "border rounded-lg mb-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    __VLS_100.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.taxBeforeRebate));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right text-success" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.eligibleRebate));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "font-weight-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.taxAfterRebate));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        ...{ class: "bg-grey-lighten-5 font-weight-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "text-right text-primary" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.result.finalTax));
    var __VLS_100;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-grey-lighten-4 pa-4 rounded-lg border" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption font-weight-bold mb-1" },
    });
    const __VLS_101 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        icon: "mdi-shield-check-outline",
        size: "14",
        ...{ class: "mr-1" },
    }));
    const __VLS_103 = __VLS_102({
        icon: "mdi-shield-check-outline",
        size: "14",
        ...{ class: "mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "text-caption text-medium-emphasis pl-4 mb-0" },
    });
    for (const [note, idx] of __VLS_getVForSourceType((__VLS_ctx.result.notes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (note);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    var __VLS_80;
}
else {
    const __VLS_105 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        border: true,
        rounded: "xl",
        ...{ class: "pa-8 text-center bg-surface" },
    }));
    const __VLS_107 = __VLS_106({
        border: true,
        rounded: "xl",
        ...{ class: "pa-8 text-center bg-surface" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    __VLS_108.slots.default;
    const __VLS_109 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        color: "primary",
        variant: "tonal",
        size: "64",
        ...{ class: "mb-4" },
    }));
    const __VLS_111 = __VLS_110({
        color: "primary",
        variant: "tonal",
        size: "64",
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    __VLS_112.slots.default;
    const __VLS_113 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        icon: "mdi-calculator-variant-outline",
        size: "32",
    }));
    const __VLS_115 = __VLS_114({
        icon: "mdi-calculator-variant-outline",
        size: "32",
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    var __VLS_112;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-h6 font-weight-bold mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-body-2 text-medium-emphasis mb-4 mx-auto" },
        ...{ style: {} },
    });
    const __VLS_117 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        rounded: "lg",
    }));
    const __VLS_119 = __VLS_118({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    let __VLS_121;
    let __VLS_122;
    let __VLS_123;
    const __VLS_124 = {
        onClick: (__VLS_ctx.calculate)
    };
    __VLS_120.slots.default;
    var __VLS_120;
    var __VLS_108;
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
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-success']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-success']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
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
            taxYears: taxYears,
            categories: categories,
            locations: locations,
            form: form,
            result: result,
            loading: loading,
            errorMessage: errorMessage,
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
