<script setup lang="ts">
import { ref } from 'vue'
import type { Activity, User } from '../types/index'
import { useSession } from '../services/session'
import { users } from '../data/users'

const props = defineProps<{
  activity: Activity
}>()

const emit = defineEmits(['close'])

const session = useSession()
const friends = ref<User[]>(users.filter((u) => session.user?.friends.includes(u.id)))
const selectedFriend = ref<number | null>(null)

function share() {
  if (selectedFriend.value) {
    const friend = friends.value.find((f) => f.id === selectedFriend.value)
    if (friend) {
      alert(`Shared ${props.activity.activity} with ${friend.username}`)
      emit('close')
    }
  } else {
    alert('Please select a friend to share with.')
  }
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Share Activity</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <p><strong>Activity:</strong> {{ activity.activity }}</p>
        <p><strong>Duration:</strong> {{ activity.duration }} minutes</p>
        <div class="field">
          <label class="label">Share with:</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedFriend">
                <option :value="null" disabled>Select a friend</option>
                <option v-for="friend in friends" :key="friend.id" :value="friend.id">
                  {{ friend.firstName }} {{ friend.lastName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="share">Share</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>
