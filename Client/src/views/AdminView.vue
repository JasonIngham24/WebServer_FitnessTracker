<script setup lang="ts">
import { useUserStore } from '../stores/users'
import type { User } from '../../../server/types/index'
import { onMounted, ref } from 'vue'

const { users, fetchUsers } = useUserStore()
const editingUser = ref<User | null>(null)

onMounted(fetchUsers)

function addUser() {
  // For simplicity, we'll just log to console.
  // In a real app, this would open a form.
  console.log('Add user')
}

function editUser(user: User) {
  editingUser.value = { ...user }
}

function deleteUser(user: User) {
  const index = users.findIndex((u: User) => u.id === user.id)
  if (index !== -1) {
    users.splice(index, 1)
  }
}

function handleUpdateUser(updatedUser: User) {
  const index = users.findIndex((u: User) => u.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
  }
  editingUser.value = null
}
</script>

<template>
  <div class="container notification is-dark">
    <h1 class="title">Admin</h1>
    <h2 class="subtitle">Users</h2>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button class="button is-small is-info" @click="editUser(user)">Edit</button>
            <button class="button is-small is-danger" @click="deleteUser(user)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button is-primary" @click="addUser">Add User</button>

    <div v-if="editingUser" class="modal is-active">
      <div class="modal-background" @click="editingUser = null"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit User</p>
          <button class="delete" aria-label="close" @click="editingUser = null"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="handleUpdateUser(editingUser!)">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" v-model="editingUser!.firstname" />
              </div>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" v-model="editingUser!.lastname" />
              </div>
            </div>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" v-model="editingUser!.username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" v-model="editingUser!.email" />
              </div>
            </div>
            <div class="field">
              <label class="label">Role</label>
              <div class="control">
                <div class="select">
                  <select v-model="editingUser!.role">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="handleUpdateUser(editingUser!)">
            Save changes
          </button>
          <button class="button" @click="editingUser = null">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
