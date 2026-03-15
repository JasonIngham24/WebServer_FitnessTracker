<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isActive = ref(false);
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="container">
  <div class="navbar-brand">
    <RouterLink to="/" class="navbar-item">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
    </RouterLink>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="isActive = !isActive" :class="{ 'is-active': isActive }" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
    <div class="navbar-start">
      <RouterLink to="/" class="navbar-item">
        Home
      </RouterLink>

      <RouterLink to="/my-activity" class="navbar-item">
        My Activity
      </RouterLink>

      <RouterLink to="/statistics" class="navbar-item">
        Statistics
      </RouterLink>

      <RouterLink to="/friends" class="navbar-item">
        Friends Activity
      </RouterLink>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Admin
        </a>

        <div class="navbar-dropdown">
          <RouterLink to="/admin-users" class="navbar-item is-active">
            Users
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
</nav>
</template>

<style scoped>

</style>
