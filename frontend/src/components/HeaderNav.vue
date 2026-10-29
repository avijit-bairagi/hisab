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
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.brand-link {
  color: inherit;
}
.brand-link:hover {
  opacity: 0.9;
}
</style>
