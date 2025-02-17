<script setup>
import { ref, onMounted } from 'vue'
import { useTokenStore } from '../stores/token.store.js'
import * as bootstrap from 'bootstrap'

const store = useTokenStore();

const metricDefs = ref([]);
const errMsg = ref('');

const newMetricName = ref('');

const modalWindow = ref()

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

      closeModal();
      // register below as followup to close event

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

function closeModal() {
  modalWindow.value.hide();
}

function showModal() {
  modalWindow.value.show();
}

onMounted(() => {
  fetchData();
  modalWindow.value = new bootstrap.Modal("#new-metric-modal", {});
});

</script>

<template>
  <div class="container">
    <h2>Metric Definitions</h2>
    <h3>Debug</h3>
    <div>
      <p>Error is {{ errMsg }}.</p>
    </div>

    <div class="row">
      <div class="col-3">
        <button type="button" class="btn btn-primary mb-2" @click="showModal" >Add Metric</button>
        <div class="list-group">
          <a v-for="metric in metricDefs" href="#" class="list-group-item list-group-item-action">
            {{ metric.name }}
          </a>
        </div>
      </div>
      <div class="col-9">
      </div>
    </div>

    <div class="modal fade" id="new-metric-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">New Metric</h1>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Metric Name</label>
                <input v-model="newMetricName" type="text" class="form-control" name="name" placeholder="Blood Pressure" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="addMetric">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
