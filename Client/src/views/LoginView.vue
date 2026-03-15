<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/session';

const router = useRouter();
const username = ref('');
const password = ref('');

function onLogin() {
    if (login(username.value, password.value)) {
        router.push('/');
    } else {
        alert('Invalid credentials');
    }
}
</script>

<template>
    <div class="container">
        <h1 class="title">Login</h1>
        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" v-model="username" />
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
</template>
