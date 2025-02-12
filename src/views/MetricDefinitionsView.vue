<script setup>
import { ref } from 'vue'

const data = ref([
  {
    name: "Blood Pressure",
    properties: [
      {
        name: "Diastolic"
      },
      {
        name: "Systolic"
      },
    ],
  },
  {
    name: "Workouts",
    properties: [
      {
        name: "type"
      }
    ],
  },
])
</script>
<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item" v-for="metric in data">
        {{ metric.name }}
      </li>
    </ul>
  </div>
</template>
