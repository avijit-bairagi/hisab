<template>
  <div class="home-view">
    <!-- Hero Section -->
    <v-sheet color="primary" class="hero-section py-12 px-4 text-center" rounded="b-xl">
      <v-container style="max-width: 800px">
        <v-chip color="white" variant="outlined" size="small" class="mb-4 font-weight-bold">
          FAST • ACCURATE • FREE
        </v-chip>
        <h1 class="text-h4 text-sm-h3 font-weight-bold text-white mb-3">
          Hisab — Everyday calculations, made simple.
        </h1>
        <p class="text-body-1 text-white text-opacity-90 mb-8 mx-auto" style="max-width: 620px">
          Simple, practical tools for calculations, savings, taxes, and everyday financial planning.
        </p>

        <!-- Search Bar -->
        <v-card elevation="4" rounded="pill" class="mx-auto" max-width="580">
          <v-text-field
            v-model="searchQuery"
            placeholder="Search tools (e.g. calculator, DPS, income tax)..."
            prepend-inner-icon="mdi-magnify"
            :clearable="true"
            variant="solo"
            hide-details
            density="comfortable"
            class="search-input"
            autofocus
            aria-label="Search tools"
            @click:clear="searchQuery = ''"
          />
        </v-card>
      </v-container>
    </v-sheet>

    <!-- Main Content: Tools Grid -->
    <v-container class="py-10" style="max-width: 1200px">
      <!-- Search filter indicator and category bar -->
      <div class="d-flex flex-wrap align-center justify-space-between mb-6 ga-3">
        <div>
          <h2 class="text-h5 font-weight-bold">
            Available Tools
            <span class="text-body-2 font-weight-regular text-medium-emphasis ml-2">
              ({{ filteredTools.length }} {{ filteredTools.length === 1 ? 'tool' : 'tools' }})
            </span>
          </h2>
          <p v-if="searchQuery" class="text-caption text-medium-emphasis">
            Showing results for <span class="font-weight-bold text-primary">"{{ searchQuery }}"</span>
          </p>
        </div>

        <!-- Category filter pills -->
        <div class="d-flex ga-2">
          <v-chip
            :variant="selectedCategory === 'ALL' ? 'flat' : 'outlined'"
            :color="selectedCategory === 'ALL' ? 'primary' : 'secondary'"
            size="small"
            clickable
            @click="selectedCategory = 'ALL'"
          >
            All Tools
          </v-chip>
          <v-chip
            :variant="selectedCategory === 'GENERAL' ? 'flat' : 'outlined'"
            :color="selectedCategory === 'GENERAL' ? 'accent' : 'secondary'"
            size="small"
            clickable
            @click="selectedCategory = 'GENERAL'"
          >
            General
          </v-chip>
          <v-chip
            :variant="selectedCategory === 'FINANCE' ? 'flat' : 'outlined'"
            :color="selectedCategory === 'FINANCE' ? 'primary' : 'secondary'"
            size="small"
            clickable
            @click="selectedCategory = 'FINANCE'"
          >
            Finance
          </v-chip>
        </div>
      </div>

      <!-- Tools Grid -->
      <v-row v-if="filteredTools.length > 0">
        <v-col
          v-for="tool in filteredTools"
          :key="tool.id"
          cols="12"
          sm="6"
          md="4"
        >
          <ToolCard :tool="tool" />
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-sheet
        v-else
        border
        rounded="xl"
        class="pa-12 text-center my-6"
        color="surface"
      >
        <v-avatar color="grey-lighten-3" size="72" class="mb-4">
          <v-icon icon="mdi-file-search-outline" size="36" color="grey" />
        </v-avatar>
        <h3 class="text-h6 font-weight-bold mb-2">No tools match your search</h3>
        <p class="text-body-2 text-medium-emphasis mb-5 mx-auto" style="max-width: 440px">
          We couldn't find any tool matching "<span class="font-weight-medium text-high-emphasis">{{ searchQuery }}</span>". Try searching with different keywords like <em>math</em>, <em>DPS</em>, or <em>tax</em>.
        </p>
        <v-btn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-close"
          rounded="pill"
          @click="clearFilters"
        >
          Clear Search
        </v-btn>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ToolCard from '../components/ToolCard.vue';
import { INITIAL_TOOLS, searchTools } from '../tools/registry';
import { apiService } from '../services/api';
import type { ToolDefinition } from '../types';

const tools = ref<ToolDefinition[]>(INITIAL_TOOLS);
const searchQuery = ref('');
const selectedCategory = ref<'ALL' | 'GENERAL' | 'FINANCE'>('ALL');

onMounted(async () => {
  try {
    const remoteTools = await apiService.getTools();
    if (remoteTools && remoteTools.length > 0) {
      tools.value = remoteTools;
    }
  } catch {
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
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 60%, #0284c7 100%);
}
.search-input :deep(.v-field) {
  border-radius: 9999px;
  padding-left: 10px;
}
</style>
