<script setup>
import { ref, onMounted } from 'vue'
import { useTokenStore } from '../stores/token.store.js'

const store = useTokenStore();

const metricDefs = ref([]);
const errMsg = ref('');

const newMetricName = ref('');

function addMetric() {
  // TODO validations
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.token },
    body: JSON.stringify({
      metric_definition: {
        name: newMetricName.value,
        user_id: 1 // TODO obvi real plz
      },
    }),
  };

  fetch("http://localhost:3000/metric_definitions", requestOptions)
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        const err = (data && data.message) || response.statusText;
        return Promise.reject(err);
      }

      metricDefs.value.push({
        name: data.name
      });

      newMetricName.value = '';
    })
    .catch(err => {
      errMsg.value = err;
    });
}

function fetchData() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.token },
    };

    fetch("http://localhost:3000/metric_definitions", requestOptions)
        .then(async response => {
            const data = await response.json()

            if (!response.ok) {
                const err = (data && data.message) || response.statusText;
                return Promise.reject(err)
            }

            metricDefs.value = data;
        })
        .catch(error => {
            errMsg.value = error
        });
}

onMounted(fetchData);

</script>

<template>
  <div class="container">
    <h2>Metric Definitions</h2>
    <h3>Debug</h3>
    <div>
      <p>Error is {{ errMsg }}.</p>
    </div>
    <h3>New Metric</h3>
    <div class="container">
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Metric Name</label>
          <input v-model="newMetricName" type="text" class="form-control" name="name" placeholder="Blood Pressure" />
        </div>
        <div class="mb-3">
          <button @click="addMetric" type="button" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
    <h3>List</h3>
    <div>
      <!-- TODO bootstrap icons -->
      <div>
        <!-- TODO alight to right, use icons? -->
        <button type="button" class="btn btn-primary m-2">Reload</button>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="metric in metricDefs">
          {{ metric.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
