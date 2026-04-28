<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import MessageList from './components/MessageList.vue';
</script>

<template>
  <header>
    <NavBar />
    <MessageList />
  </header>

  <main class="section">
    <RouterView />
  </main>
</template>

<style>
</style>

