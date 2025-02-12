<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex items-center">
    <header>
      <Navbar />
    </header>
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
