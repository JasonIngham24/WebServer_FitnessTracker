<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const router = useRouter()
const session = useSessionStore()
const email = ref('')
const password = ref('')

async function onLogin() {
  const response = await session.login(email.value, password.value)
  if (response.isSuccess) {
    router.push('/')
  } else {
    alert('Invalid login')
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="container">
        <h1 class="title">Login</h1>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" v-model="email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" v-model="password" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="onLogin">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
