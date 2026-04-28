<script setup lang="ts">
import { useMessageStore } from '@/stores/messages'

const messageStore = useMessageStore()
</script>

<template>
  <div class="message-list">
    <div
      v-for="message in messageStore.messages"
      :key="message.id"
      class="message"
      :class="`message-${message.type}`"
    >
      {{ message.text }}
      <button @click="messageStore.removeMessage(message.id)">x</button>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  position: fixed;
  top: 60px; /* Adjust based on NavBar height */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
}

.message {
  padding: 1rem;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 500px;
}

.message-success {
  background-color: green;
}

.message-error {
  background-color: red;
}

.message-info {
  background-color: blue;
}

button {
  margin-left: 1rem;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
