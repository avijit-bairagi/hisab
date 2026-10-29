<template>
  <v-container class="py-16 text-center" style="max-width: 600px">
    <v-avatar color="primary" variant="tonal" size="96" class="mb-6">
      <v-icon icon="mdi-help-rhombus-outline" size="56" color="primary" />
    </v-avatar>
    <h1 class="text-h3 font-weight-bold mb-2">404</h1>
    <h2 class="text-h5 font-weight-bold mb-3">Page Not Found</h2>
    <p class="text-body-1 text-medium-emphasis mb-8">
      The page you are looking for doesn't exist or has been moved. Explore our suite of calculators from the home page.
    </p>
    <v-btn
      to="/"
      color="primary"
      size="large"
      rounded="pill"
      prepend-icon="mdi-home"
      class="font-weight-medium"
    >
      Return to Home
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
</script>
