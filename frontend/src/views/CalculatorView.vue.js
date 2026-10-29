import { ref } from 'vue';
import { apiService, ApiException } from '../services/api';
const expression = ref('');
const lastEvaluatedExpression = ref('');
const result = ref(null);
const formattedResult = ref('');
const loading = ref(false);
const errorMessage = ref('');
const history = ref([]);
function append(char) {
    errorMessage.value = '';
    expression.value += char;
}
function clear() {
    expression.value = '';
    result.value = null;
    formattedResult.value = '';
    errorMessage.value = '';
}
function backspace() {
    errorMessage.value = '';
    expression.value = expression.value.slice(0, -1);
}
function reuseHistory(item) {
    expression.value = item.result;
    result.value = item.result;
    formattedResult.value = item.formattedResult;
    lastEvaluatedExpression.value = item.expression;
}
async function evaluate() {
    if (!expression.value || !expression.value.trim()) {
        errorMessage.value = 'Please enter an expression to calculate.';
        return;
    }
    loading.value = true;
    errorMessage.value = '';
    try {
        const res = await apiService.evaluateCalculator(expression.value);
        result.value = res.result;
        formattedResult.value = res.formattedResult;
        lastEvaluatedExpression.value = res.expression;
        history.value.unshift(res);
        if (history.value.length > 10) {
            history.value.pop();
        }
    }
    catch (err) {
        if (err instanceof ApiException) {
            errorMessage.value = err.message;
        }
        else if (err instanceof Error) {
            errorMessage.value = err.message;
        }
        else {
            errorMessage.value = 'Failed to evaluate expression.';
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
// CSS variable injection 
// CSS variable injection end 
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
    color: "accent",
    variant: "tonal",
    size: "56",
    rounded: "lg",
}));
const __VLS_11 = __VLS_10({
    color: "accent",
    variant: "tonal",
    size: "56",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    icon: "mdi-calculator",
    size: "32",
}));
const __VLS_15 = __VLS_14({
    icon: "mdi-calculator",
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
    md: "7",
}));
const __VLS_23 = __VLS_22({
    cols: "12",
    md: "7",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    elevation: "2",
    rounded: "xl",
    ...{ class: "pa-4 pa-sm-6 border" },
}));
const __VLS_27 = __VLS_26({
    elevation: "2",
    rounded: "xl",
    ...{ class: "pa-4 pa-sm-6 border" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
const __VLS_29 = {}.VSheet;
/** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    color: "grey-lighten-4",
    rounded: "lg",
    ...{ class: "pa-4 mb-4 text-right" },
    elevation: "0",
    border: true,
}));
const __VLS_31 = __VLS_30({
    color: "grey-lighten-4",
    rounded: "lg",
    ...{ class: "pa-4 mb-4 text-right" },
    elevation: "0",
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption text-medium-emphasis text-truncate" },
    ...{ style: {} },
});
(__VLS_ctx.lastEvaluatedExpression || '&nbsp;');
const __VLS_33 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.expression),
    placeholder: "0",
    variant: "plain",
    hideDetails: true,
    density: "compact",
    ...{ class: "calc-input text-right font-weight-bold" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_35 = __VLS_34({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.expression),
    placeholder: "0",
    variant: "plain",
    hideDetails: true,
    density: "compact",
    ...{ class: "calc-input text-right font-weight-bold" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_37;
let __VLS_38;
let __VLS_39;
const __VLS_40 = {
    onKeydown: (__VLS_ctx.evaluate)
};
var __VLS_36;
if (__VLS_ctx.result !== null) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-h5 font-weight-bold text-primary mt-1 text-truncate" },
    });
    (__VLS_ctx.formattedResult);
}
var __VLS_32;
if (__VLS_ctx.errorMessage) {
    const __VLS_41 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ 'onClick:close': {} },
        type: "error",
        variant: "tonal",
        density: "compact",
        ...{ class: "mb-4" },
        closable: true,
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onClick:close': {} },
        type: "error",
        variant: "tonal",
        density: "compact",
        ...{ class: "mb-4" },
        closable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_45;
    let __VLS_46;
    let __VLS_47;
    const __VLS_48 = {
        'onClick:close': (...[$event]) => {
            if (!(__VLS_ctx.errorMessage))
                return;
            __VLS_ctx.errorMessage = '';
        }
    };
    __VLS_44.slots.default;
    (__VLS_ctx.errorMessage);
    var __VLS_44;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "calc-grid" },
});
const __VLS_49 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "error",
    rounded: "lg",
}));
const __VLS_51 = __VLS_50({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "error",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_53;
let __VLS_54;
let __VLS_55;
const __VLS_56 = {
    onClick: (__VLS_ctx.clear)
};
__VLS_52.slots.default;
var __VLS_52;
const __VLS_57 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('(');
    }
};
__VLS_60.slots.default;
var __VLS_60;
const __VLS_65 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
let __VLS_71;
const __VLS_72 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append(')');
    }
};
__VLS_68.slots.default;
var __VLS_68;
const __VLS_73 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.backspace)
};
__VLS_76.slots.default;
var __VLS_76;
const __VLS_81 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_85;
let __VLS_86;
let __VLS_87;
const __VLS_88 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('%');
    }
};
__VLS_84.slots.default;
var __VLS_84;
const __VLS_89 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}));
const __VLS_91 = __VLS_90({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "secondary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_93;
let __VLS_94;
let __VLS_95;
const __VLS_96 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('^');
    }
};
__VLS_92.slots.default;
var __VLS_92;
const __VLS_97 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}));
const __VLS_99 = __VLS_98({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
let __VLS_101;
let __VLS_102;
let __VLS_103;
const __VLS_104 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('/');
    }
};
__VLS_100.slots.default;
var __VLS_100;
const __VLS_105 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}));
const __VLS_107 = __VLS_106({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
let __VLS_109;
let __VLS_110;
let __VLS_111;
const __VLS_112 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('*');
    }
};
__VLS_108.slots.default;
var __VLS_108;
const __VLS_113 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_115 = __VLS_114({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
let __VLS_117;
let __VLS_118;
let __VLS_119;
const __VLS_120 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('7');
    }
};
__VLS_116.slots.default;
var __VLS_116;
const __VLS_121 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_123 = __VLS_122({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
let __VLS_125;
let __VLS_126;
let __VLS_127;
const __VLS_128 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('8');
    }
};
__VLS_124.slots.default;
var __VLS_124;
const __VLS_129 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_131 = __VLS_130({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
let __VLS_133;
let __VLS_134;
let __VLS_135;
const __VLS_136 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('9');
    }
};
__VLS_132.slots.default;
var __VLS_132;
const __VLS_137 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}));
const __VLS_139 = __VLS_138({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
let __VLS_141;
let __VLS_142;
let __VLS_143;
const __VLS_144 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('-');
    }
};
__VLS_140.slots.default;
var __VLS_140;
const __VLS_145 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_147 = __VLS_146({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
let __VLS_149;
let __VLS_150;
let __VLS_151;
const __VLS_152 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('4');
    }
};
__VLS_148.slots.default;
var __VLS_148;
const __VLS_153 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_155 = __VLS_154({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
let __VLS_157;
let __VLS_158;
let __VLS_159;
const __VLS_160 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('5');
    }
};
__VLS_156.slots.default;
var __VLS_156;
const __VLS_161 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_163 = __VLS_162({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
let __VLS_165;
let __VLS_166;
let __VLS_167;
const __VLS_168 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('6');
    }
};
__VLS_164.slots.default;
var __VLS_164;
const __VLS_169 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}));
const __VLS_171 = __VLS_170({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "primary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
let __VLS_173;
let __VLS_174;
let __VLS_175;
const __VLS_176 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('+');
    }
};
__VLS_172.slots.default;
var __VLS_172;
const __VLS_177 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_179 = __VLS_178({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
let __VLS_181;
let __VLS_182;
let __VLS_183;
const __VLS_184 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('1');
    }
};
__VLS_180.slots.default;
var __VLS_180;
const __VLS_185 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_187 = __VLS_186({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
let __VLS_189;
let __VLS_190;
let __VLS_191;
const __VLS_192 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('2');
    }
};
__VLS_188.slots.default;
var __VLS_188;
const __VLS_193 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_195 = __VLS_194({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
let __VLS_197;
let __VLS_198;
let __VLS_199;
const __VLS_200 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('3');
    }
};
__VLS_196.slots.default;
var __VLS_196;
const __VLS_201 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
    ...{ 'onClick': {} },
    size: "large",
    variant: "flat",
    color: "primary",
    rounded: "lg",
    ...{ class: "font-weight-bold" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_203 = __VLS_202({
    ...{ 'onClick': {} },
    size: "large",
    variant: "flat",
    color: "primary",
    rounded: "lg",
    ...{ class: "font-weight-bold" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
let __VLS_205;
let __VLS_206;
let __VLS_207;
const __VLS_208 = {
    onClick: (__VLS_ctx.evaluate)
};
__VLS_204.slots.default;
var __VLS_204;
const __VLS_209 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_210 = __VLS_asFunctionalComponent(__VLS_209, new __VLS_209({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
    ...{ style: {} },
}));
const __VLS_211 = __VLS_210({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_210));
let __VLS_213;
let __VLS_214;
let __VLS_215;
const __VLS_216 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('0');
    }
};
__VLS_212.slots.default;
var __VLS_212;
const __VLS_217 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}));
const __VLS_219 = __VLS_218({
    ...{ 'onClick': {} },
    size: "large",
    variant: "outlined",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
let __VLS_221;
let __VLS_222;
let __VLS_223;
const __VLS_224 = {
    onClick: (...[$event]) => {
        __VLS_ctx.append('.');
    }
};
__VLS_220.slots.default;
var __VLS_220;
const __VLS_225 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "accent",
    rounded: "lg",
}));
const __VLS_227 = __VLS_226({
    ...{ 'onClick': {} },
    size: "large",
    variant: "tonal",
    color: "accent",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
let __VLS_229;
let __VLS_230;
let __VLS_231;
const __VLS_232 = {
    onClick: (__VLS_ctx.evaluate)
};
__VLS_228.slots.default;
var __VLS_228;
var __VLS_28;
var __VLS_24;
const __VLS_233 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233({
    cols: "12",
    md: "5",
}));
const __VLS_235 = __VLS_234({
    cols: "12",
    md: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
__VLS_236.slots.default;
const __VLS_237 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
    elevation: "1",
    rounded: "xl",
    ...{ class: "pa-4 border mb-4" },
}));
const __VLS_239 = __VLS_238({
    elevation: "1",
    rounded: "xl",
    ...{ class: "pa-4 border mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_238));
__VLS_240.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex align-center justify-space-between mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "text-subtitle-1 font-weight-bold" },
});
if (__VLS_ctx.history.length > 0) {
    const __VLS_241 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
        ...{ 'onClick': {} },
        size: "small",
        variant: "text",
        color: "error",
        density: "compact",
    }));
    const __VLS_243 = __VLS_242({
        ...{ 'onClick': {} },
        size: "small",
        variant: "text",
        color: "error",
        density: "compact",
    }, ...__VLS_functionalComponentArgsRest(__VLS_242));
    let __VLS_245;
    let __VLS_246;
    let __VLS_247;
    const __VLS_248 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.history.length > 0))
                return;
            __VLS_ctx.history = [];
        }
    };
    __VLS_244.slots.default;
    var __VLS_244;
}
if (__VLS_ctx.history.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption text-medium-emphasis py-4 text-center" },
    });
}
else {
    const __VLS_249 = {}.VList;
    /** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
    // @ts-ignore
    const __VLS_250 = __VLS_asFunctionalComponent(__VLS_249, new __VLS_249({
        density: "compact",
        ...{ class: "pa-0" },
    }));
    const __VLS_251 = __VLS_250({
        density: "compact",
        ...{ class: "pa-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_250));
    __VLS_252.slots.default;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.history))) {
        const __VLS_253 = {}.VListItem;
        /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
        // @ts-ignore
        const __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
            ...{ 'onClick': {} },
            key: (index),
            rounded: "lg",
            ...{ class: "mb-1" },
        }));
        const __VLS_255 = __VLS_254({
            ...{ 'onClick': {} },
            key: (index),
            rounded: "lg",
            ...{ class: "mb-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_254));
        let __VLS_257;
        let __VLS_258;
        let __VLS_259;
        const __VLS_260 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.history.length === 0))
                    return;
                __VLS_ctx.reuseHistory(item);
            }
        };
        __VLS_256.slots.default;
        {
            const { title: __VLS_thisSlot } = __VLS_256.slots;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "d-flex justify-space-between" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-caption text-medium-emphasis" },
            });
            (item.expression);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-body-2 font-weight-bold text-primary" },
            });
            (item.formattedResult);
        }
        var __VLS_256;
    }
    var __VLS_252;
}
var __VLS_240;
const __VLS_261 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent(__VLS_261, new __VLS_261({
    elevation: "0",
    rounded: "xl",
    ...{ class: "pa-4 bg-grey-lighten-4 border" },
}));
const __VLS_263 = __VLS_262({
    elevation: "0",
    rounded: "xl",
    ...{ class: "pa-4 bg-grey-lighten-4 border" },
}, ...__VLS_functionalComponentArgsRest(__VLS_262));
__VLS_264.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "text-subtitle-2 font-weight-bold mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "text-caption text-medium-emphasis pl-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
var __VLS_264;
var __VLS_236;
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
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-sm-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-input']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-lighten-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            expression: expression,
            lastEvaluatedExpression: lastEvaluatedExpression,
            result: result,
            formattedResult: formattedResult,
            loading: loading,
            errorMessage: errorMessage,
            history: history,
            append: append,
            clear: clear,
            backspace: backspace,
            reuseHistory: reuseHistory,
            evaluate: evaluate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
