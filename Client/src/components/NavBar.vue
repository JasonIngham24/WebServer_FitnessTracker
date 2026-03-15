<script setup lang="ts">
import { useSession, logout } from '@/services/session';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isActive = ref(false);
const session = useSession();
const router = useRouter();

function onLogout() {
    logout();
    router.push('/login');
}
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
      <RouterLink to="/activities" class="navbar-item" v-if="session.user">
        My Activity
      </RouterLink>

      <RouterLink to="/friends" class="navbar-item" v-if="session.user">
        Friends Activity
      </RouterLink>

      <div class="navbar-item has-dropdown is-hoverable" v-if="session.user?.role === 'admin'">
        <a class="navbar-link">
          Admin
        </a>

        <div class="navbar-dropdown">
          <RouterLink to="/admin" class="navbar-item is-active">
            Users
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" @click="onLogout" v-if="session.user">
            Log out
          </a>
           <RouterLink to="/login" class="button is-primary" v-else>
            <strong>Log in</strong>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  </div>
</nav>
</template>

<style scoped>

</style>
