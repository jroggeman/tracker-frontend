<script setup>
  import { ref } from 'vue'

  const leftDrawerOpen = ref(false);

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
</script>

<template>
  <q-layout view="hHh Lpr lfr"><!-- capitalize final F? -->
    <q-header>
      <q-toolbar>
        <!-- TODO what properties? -->
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Tracker</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>Analytics</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>Metrics</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>Dashboards</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>Ingestion</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
