<script setup>
import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useTokenStore } from '../stores/token.store.js'

const email = ref('')
const pass = ref('')

const error = ref('')

const store = useTokenStore();

const { tokenValue } = storeToRefs(store);

function doLogin() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email.value,
            password: pass.value
        })
    };
    fetch("http://localhost:3000/auth/login", requestOptions)
        .then(async res => {
            const data = await res.json()

            if (!res.ok) {
                const err = (data && data.message) || res.statusText;
                return Promise.reject(err);
            }

            store.tokenValue = data.token;
        })
        .catch(err => {
            error.value = err;
        });
}
</script>

<template>
    <div class="container">
      <h2>Login</h2>
      <form>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="text" class="form-control" name="email" placeholder="john.smith@email.fake">
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="pass" type="password" class="form-control" name="password" />
        </div>

        <div class="mb-3">
          <button type="button" @click="doLogin" class="btn btn-primary">Login</button>
        </div>
      </form>

      Token is {{ tokenValue }}, error is {{ error }}
    </div>
</template>
