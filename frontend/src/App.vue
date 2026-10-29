<template>
  <v-app class="app-root">
    <HeaderNav />

    <v-main class="app-main">
      <router-view />
    </v-main>

    <v-footer border color="surface" class="py-6 text-center d-flex flex-column">
      <v-container style="max-width: 1200px" class="pa-0">
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-2">
          <div class="text-caption text-medium-emphasis">
            <strong>Hisab</strong> — Everyday calculations, made simple.
          </div>
          <div class="text-caption text-medium-emphasis">
            v1.0.0 &bull; Fast, private, browser-ready financial utilities
          </div>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue';
</script>

<style>
.app-root {
  background-color: #F8FAFC !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.app-main {
  min-height: calc(100vh - 64px - 80px);
}
</style>
