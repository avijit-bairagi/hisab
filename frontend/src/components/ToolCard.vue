<template>
  <v-card
    class="tool-card h-100 d-flex flex-column transition-swing cursor-pointer"
    rounded="xl"
    elevation="1"
    hover
    :to="tool.route"
    :aria-label="`Open ${tool.name}`"
  >
    <v-card-item class="pb-2">
      <div class="d-flex align-center justify-space-between mb-3">
        <v-avatar
          :color="categoryColor"
          variant="tonal"
          size="48"
          rounded="lg"
        >
          <v-icon :icon="tool.icon" size="26" />
        </v-avatar>
        <div class="d-flex align-center ga-2">
          <v-chip
            size="small"
            :color="categoryColor"
            variant="flat"
            class="text-uppercase font-weight-bold"
          >
            {{ tool.category }}
          </v-chip>
          <v-icon icon="mdi-arrow-right" size="18" color="medium-emphasis" class="card-arrow" />
        </div>
      </div>

      <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
        {{ tool.name }}
      </v-card-title>
    </v-card-item>

    <v-card-text class="flex-grow-1 text-body-2 text-medium-emphasis pb-5">
      {{ tool.description }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ToolDefinition } from '../types';

const props = defineProps<{
  tool: ToolDefinition;
}>();

const categoryColor = computed(() => {
  return props.tool.category === 'FINANCE' ? 'primary' : 'accent';
});
</script>

<style scoped>
.tool-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  user-select: none;
}
.tool-card:hover {
  transform: translateY(-3px);
  border-color: rgba(25, 118, 210, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}
.tool-card:hover .card-arrow {
  color: rgb(var(--v-theme-primary)) !important;
  transform: translateX(3px);
}
.card-arrow {
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>
