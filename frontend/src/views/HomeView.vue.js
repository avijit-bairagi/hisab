import { ref, computed, onMounted } from 'vue';
import ToolCard from '../components/ToolCard.vue';
import { INITIAL_TOOLS, searchTools } from '../tools/registry';
import { apiService } from '../services/api';
const tools = ref(INITIAL_TOOLS);
const searchQuery = ref('');
const selectedCategory = ref('ALL');
onMounted(async () => {
    try {
        const remoteTools = await apiService.getTools();
        if (remoteTools && remoteTools.length > 0) {
            tools.value = remoteTools;
        }
    }
    catch {
        // If backend isn't ready or during offline dev, fallback is already in place
    }
});
const filteredTools = computed(() => {
    let result = searchTools(tools.value, searchQuery.value);
    if (selectedCategory.value !== 'ALL') {
        result = result.filter((t) => t.category === selectedCategory.value);
    }
    return result;
});
function clearFilters() {
    searchQuery.value = '';
    selectedCategory.value = 'ALL';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-view" },
});
const __VLS_0 = {}.VSheet;
/** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    color: "primary",
    ...{ class: "hero-section py-12 px-4 text-center" },
    rounded: "b-xl",
}));
const __VLS_2 = __VLS_1({
    color: "primary",
    ...{ class: "hero-section py-12 px-4 text-center" },
    rounded: "b-xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    color: "white",
    variant: "outlined",
    size: "small",
    ...{ class: "mb-4 font-weight-bold" },
}));
const __VLS_10 = __VLS_9({
    color: "white",
    variant: "outlined",
    size: "small",
    ...{ class: "mb-4 font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-h4 text-sm-h3 font-weight-bold text-white mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-body-1 text-white text-opacity-90 mb-8 mx-auto" },
    ...{ style: {} },
});
const __VLS_12 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    elevation: "4",
    rounded: "pill",
    ...{ class: "mx-auto" },
    maxWidth: "580",
}));
const __VLS_14 = __VLS_13({
    elevation: "4",
    rounded: "pill",
    ...{ class: "mx-auto" },
    maxWidth: "580",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick:clear': {} },
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "Search tools (e.g. calculator, DPS, income tax)...",
    prependInnerIcon: "mdi-magnify",
    clearable: (true),
    variant: "solo",
    hideDetails: true,
    density: "comfortable",
    ...{ class: "search-input" },
    autofocus: true,
    'aria-label': "Search tools",
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick:clear': {} },
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "Search tools (e.g. calculator, DPS, income tax)...",
    prependInnerIcon: "mdi-magnify",
    clearable: (true),
    variant: "solo",
    hideDetails: true,
    density: "comfortable",
    ...{ class: "search-input" },
    autofocus: true,
    'aria-label': "Search tools",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    'onClick:clear': (...[$event]) => {
        __VLS_ctx.searchQuery = '';
    }
};
var __VLS_19;
var __VLS_15;
var __VLS_7;
var __VLS_3;
const __VLS_24 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ class: "py-10" },
    ...{ style: {} },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "py-10" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex flex-wrap align-center justify-space-between mb-6 ga-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-h5 font-weight-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-body-2 font-weight-regular text-medium-emphasis ml-2" },
});
(__VLS_ctx.filteredTools.length);
(__VLS_ctx.filteredTools.length === 1 ? 'tool' : 'tools');
if (__VLS_ctx.searchQuery) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-weight-bold text-primary" },
    });
    (__VLS_ctx.searchQuery);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex ga-2" },
});
const __VLS_28 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'ALL' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'ALL' ? 'primary' : 'secondary'),
    size: "small",
    clickable: true,
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'ALL' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'ALL' ? 'primary' : 'secondary'),
    size: "small",
    clickable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (...[$event]) => {
        __VLS_ctx.selectedCategory = 'ALL';
    }
};
__VLS_31.slots.default;
var __VLS_31;
const __VLS_36 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'GENERAL' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'GENERAL' ? 'accent' : 'secondary'),
    size: "small",
    clickable: true,
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'GENERAL' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'GENERAL' ? 'accent' : 'secondary'),
    size: "small",
    clickable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (...[$event]) => {
        __VLS_ctx.selectedCategory = 'GENERAL';
    }
};
__VLS_39.slots.default;
var __VLS_39;
const __VLS_44 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'FINANCE' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'FINANCE' ? 'primary' : 'secondary'),
    size: "small",
    clickable: true,
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    variant: (__VLS_ctx.selectedCategory === 'FINANCE' ? 'flat' : 'outlined'),
    color: (__VLS_ctx.selectedCategory === 'FINANCE' ? 'primary' : 'secondary'),
    size: "small",
    clickable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (...[$event]) => {
        __VLS_ctx.selectedCategory = 'FINANCE';
    }
};
__VLS_47.slots.default;
var __VLS_47;
if (__VLS_ctx.filteredTools.length > 0) {
    const __VLS_52 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.filteredTools))) {
        const __VLS_56 = {}.VCol;
        /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            key: (tool.id),
            cols: "12",
            sm: "6",
            md: "4",
        }));
        const __VLS_58 = __VLS_57({
            key: (tool.id),
            cols: "12",
            sm: "6",
            md: "4",
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        __VLS_59.slots.default;
        /** @type {[typeof ToolCard, ]} */ ;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
            tool: (tool),
        }));
        const __VLS_61 = __VLS_60({
            tool: (tool),
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        var __VLS_59;
    }
    var __VLS_55;
}
else {
    const __VLS_63 = {}.VSheet;
    /** @type {[typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, typeof __VLS_components.VSheet, typeof __VLS_components.vSheet, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        border: true,
        rounded: "xl",
        ...{ class: "pa-12 text-center my-6" },
        color: "surface",
    }));
    const __VLS_65 = __VLS_64({
        border: true,
        rounded: "xl",
        ...{ class: "pa-12 text-center my-6" },
        color: "surface",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    const __VLS_67 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        color: "grey-lighten-3",
        size: "72",
        ...{ class: "mb-4" },
    }));
    const __VLS_69 = __VLS_68({
        color: "grey-lighten-3",
        size: "72",
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    __VLS_70.slots.default;
    const __VLS_71 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        icon: "mdi-file-search-outline",
        size: "36",
        color: "grey",
    }));
    const __VLS_73 = __VLS_72({
        icon: "mdi-file-search-outline",
        size: "36",
        color: "grey",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    var __VLS_70;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-h6 font-weight-bold mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-body-2 text-medium-emphasis mb-5 mx-auto" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-weight-medium text-high-emphasis" },
    });
    (__VLS_ctx.searchQuery);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    const __VLS_75 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        prependIcon: "mdi-close",
        rounded: "pill",
    }));
    const __VLS_77 = __VLS_76({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "tonal",
        prependIcon: "mdi-close",
        rounded: "pill",
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    let __VLS_79;
    let __VLS_80;
    let __VLS_81;
    const __VLS_82 = {
        onClick: (__VLS_ctx.clearFilters)
    };
    __VLS_78.slots.default;
    var __VLS_78;
    var __VLS_66;
}
var __VLS_27;
/** @type {__VLS_StyleScopedClasses['home-view']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm-h3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['my-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-high-emphasis']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ToolCard: ToolCard,
            searchQuery: searchQuery,
            selectedCategory: selectedCategory,
            filteredTools: filteredTools,
            clearFilters: clearFilters,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
