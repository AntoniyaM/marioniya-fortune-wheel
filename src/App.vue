<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Marioniya logo" class="logo" src="@/assets/images/marioniya-logo.svg" width="300" height="300" />
    </RouterLink>
  </header>

  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
