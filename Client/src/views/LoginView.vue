<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'
import { useMessageStore } from '../stores/messages'

const router = useRouter()
const session = useSessionStore()
const messages = useMessageStore()
const email = ref('')

async function onLogin() {
  const response = await session.login(email.value)
  if (response.isSuccess) {
    router.push('/')
  } else {
    messages.addMessage('Invalid credentials', 'error')
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
            <input class="input" type="email" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="onLogin" :disabled="!email">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
