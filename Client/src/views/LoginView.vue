<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getAllUsers } from '../services/session'

const router = useRouter()
const users = getAllUsers()
const selectedUser = ref('')

function onLogin() {
  if (login(selectedUser.value)) {
    router.push('/')
  } else {
    alert('Please select a user')
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="container">
        <h1 class="title">Login</h1>
        <div class="field">
          <label class="label">Select User</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="selectedUser">
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
            <button class="button is-primary" @click="onLogin">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
