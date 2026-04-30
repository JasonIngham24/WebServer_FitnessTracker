<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'
import { useMessageStore } from '../stores/messages'
import { getUsers } from '../services/users'
import type { User } from '../../../server/types'

const router = useRouter()
const session = useSessionStore()
const messages = useMessageStore()
const username = ref('')
const users = ref<User[]>([])

onMounted(async () => {
  const response = await getUsers()
  if (response.isSuccess) {
    users.value = response.data
  }
})

async function onLogin() {
  const response = await session.login(username.value)
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
          <label class="label">Username</label>
          <div class="control">
            <div class="select">
              <select v-model="username">
                <option disabled value="">Please select one</option>
                <option v-for="user in users" :key="user.id" :value="user.username">
                  {{ user.username }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="onLogin" :disabled="!username">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
