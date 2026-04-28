<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isActive = ref(false);
</script>

<template>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img alt="Vue logo" width="30" height="30" src="@/assets/logo.svg" />

                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                   @click="isActive = !isActive" :class="{ 'is-active': isActive }"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
                <div class="navbar-start">
                    <RouterLink to="/" active-class="is-active" class="navbar-item">
                        Home
                    </RouterLink>

                    <RouterLink to="/activities" active-class="is-active" class="navbar-item">
                        Activities
                    </RouterLink>

                    <RouterLink to="/friends" active-class="is-active" class="navbar-item">
                        Friends
                    </RouterLink>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Admin
                        </a>

                        <div class="navbar-dropdown">
                            <RouterLink to="/admin" active-class="is-active" class="navbar-item">
                                Users
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <RouterLink to="/sign-up" active-class="is-active" class="button is-primary">
                                <strong>Sign up</strong>
                            </RouterLink>
                            <RouterLink to="/login" active-class="is-active" class="button is-light">
                                Log in
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.count {
    position: absolute;
    top: -3px;
    right: -7px;
    font-size: 0.75rem;
    transition: all 0.3s ease-in-out;
}
</style>
