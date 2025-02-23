<script setup>
import { ref, onMounted, watch } from 'vue';
import { useTokenStore } from '../stores/token.store.js'
import { useRoute } from 'vue-router';

const store = useTokenStore();

const route = useRoute();

const fullMetric = ref({});
const metricProps = ref([]);
const errMsg = ref('');

function fetchData() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.token },
    };

    fetch("http://localhost:3000/metric_definitions/" + route.params.id, requestOptions)
        .then(async response => {
            const data = await response.json()

            if (!response.ok) {
                const err = (data && data.message) || response.statusText;
                return Promise.reject(err)
            }

            metricProps.value = data;
            fullMetric.value = data;
            metricProps.value = fullMetric.value.properties;
        })
        .catch(error => {
            errMsg.value = error
        });
}

onMounted(() => {
  fetchData();
});

watch(
    () => route.params.id,
    (newId, oldId) => {
        fetchData();
    }
);
</script>

<template>
  <div class="container">
      Error is {{ errMsg }}.
      Looking at {{ $route.params.id }}
  </div>
  <div class="container">
      <h3>{{ fullMetric.name }}</h3>
      <h4>Properties</h4>
      <table v-if="metricProps && metricProps.length" class="table">
          <thead>
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Remove</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="prop in metricProps">
                  <td>{{ prop.name }}</td>
                  <td>{{ prop.data_type }}</td>
                  <td>
                      <button type="button" class="btn btn-danger">x</button>
                  </td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td><input type="text" name="property_name" class="form-control"></td>
                  <td>
                      <select name="property_type" class="form-select">
                          <option value="integer">Integer</option>
                          <option value="string">String</option>
                          <option value="boolean">Boolean</option>
                          <option value="enum">Enum</option>
                      </select>
                  </td>
                  <td>
                      <button class="btn btn-success">Add</button>
                  </td>
              </tr>
          </tfoot>
      </table>
      <div v-else>
          Nothing here :)
      </div>
  </div>
</template>
