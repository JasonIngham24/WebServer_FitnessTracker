<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '../stores/session';
import router from '../router/index';

const session = useSessionStore();
const firstname = ref('');
const lastname = ref('');
const username = ref('');
const email = ref('');

function signup() {
    session.signup(firstname.value, lastname.value, username.value, email.value)
        .then(() => {
            router.push('/');
        })
        .catch(err => {
            alert(err.message);
        });
}
</script>

<template>
    <div class="container">
        <h1 class="title">Sign Up</h1>
        <div class="field">
            <label class="label">First Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="First Name" v-model="firstname">
            </div>
        </div>
        <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Last Name" v-model="lastname">
            </div>
        </div>
        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" placeholder="Username" v-model="username">
            </div>
        </div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" type="email" placeholder="Email" v-model="email">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-primary" @click="signup">Sign Up</button>
            </div>
        </div>
    </div>
</template>
