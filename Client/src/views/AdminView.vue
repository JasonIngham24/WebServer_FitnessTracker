<script setup lang="ts">
import { users } from '@/data/users';
import type { User } from '@/models/user';

function addUser() {
    // For simplicity, we'll just log to console.
    // In a real app, this would open a form.
    console.log('Add user');
}

function editUser(user: User) {
    console.log('Edit user', user);
}

function deleteUser(user: User) {
    console.log('Delete user', user);
}
</script>

<template>
    <div>
        <h1 class="title">Admin</h1>
        <h2 class="subtitle">Users</h2>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button class="button is-small is-info" @click="editUser(user)">Edit</button>
                        <button class="button is-small is-danger" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="button is-primary" @click="addUser">Add User</button>
    </div>
</template>
