<template>
  <v-app-bar flat border color="surface" height="64" class="px-2">
    <v-container class="d-flex align-center pa-0 fill-height" style="max-width: 1200px">
      <!-- Brand Logo / Title -->
      <router-link to="/" class="brand-link d-flex align-center text-decoration-none">
        <v-avatar color="primary" size="40" class="mr-3 elevation-1">
          <v-icon icon="mdi-calculator-variant" color="white" size="24" />
        </v-avatar>
        <div class="brand-text">
          <span class="text-h6 font-weight-bold text-primary">Hisab</span>
          <span class="d-none d-sm-inline text-caption text-medium-emphasis ml-2">
            Everyday calculations, made simple
          </span>
        </div>
      </router-link>

      <v-spacer />

      <!-- Navigation Links -->
      <div class="d-none d-md-flex align-center ga-1">
        <v-btn
          to="/"
          variant="text"
          prepend-icon="mdi-home-outline"
          rounded="lg"
          :active="$route.path === '/'"
        >
          Home
        </v-btn>
        <v-btn
          to="/tools/calculator"
          variant="text"
          prepend-icon="mdi-calculator"
          rounded="lg"
          :active="$route.path === '/tools/calculator'"
        >
          Calculator
        </v-btn>
        <v-btn
          to="/tools/dps-calculator"
          variant="text"
          prepend-icon="mdi-piggy-bank-outline"
          rounded="lg"
          :active="$route.path === '/tools/dps-calculator'"
        >
          DPS
        </v-btn>
        <v-btn
          to="/tools/tax-calculator"
          variant="text"
          prepend-icon="mdi-file-document-edit-outline"
          rounded="lg"
          :active="$route.path === '/tools/tax-calculator'"
        >
          BD Tax
        </v-btn>
      </div>

      <!-- Mobile Menu Toggle -->
      <v-menu v-model="mobileMenu" location="bottom end" :close-on-content-click="true">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-menu"
            variant="text"
            class="d-md-none"
            aria-label="Navigation menu"
          />
        </template>
        <v-list density="comfortable" rounded="lg" elevation="3" class="mt-2" min-width="200">
          <v-list-item to="/" prepend-icon="mdi-home-outline" title="Home" />
          <v-divider />
          <v-list-item to="/tools/calculator" prepend-icon="mdi-calculator" title="Calculator" />
          <v-list-item to="/tools/dps-calculator" prepend-icon="mdi-piggy-bank-outline" title="DPS Calculator" />
          <v-list-item to="/tools/tax-calculator" prepend-icon="mdi-file-document-edit-outline" title="Tax Calculator" />
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenu = ref(false);
</script>

<style scoped>
.brand-link {
  color: inherit;
}
.brand-link:hover {
  opacity: 0.9;
}
</style>
