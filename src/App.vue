<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="flex items-center">
    <header>
      <div>
      Tracker
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
      </div>
    </header>
  </div>

  <RouterView />
</template>

<style scoped></style>
