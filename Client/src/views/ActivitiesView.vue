<script setup lang="ts">
import { useSession } from '../services/session'
import { activities } from '../data/activities'
import type { Activity } from '../models/activity'
import { computed, ref } from 'vue'
import ActivityForm from '../components/ActivityForm.vue'
import ShareActivity from '../components/ShareActivity.vue'

const session = useSession()
const showAddActivityForm = ref(false)
const showShareModal = ref(false)
const selectedActivity = ref<Activity | null>(null)

const myActivities = computed(() => {
  if (!session.user) {
    return []
  }
  return activities.value.filter((a) => a.userId === session.user?.id)
})

function addActivity() {
  showAddActivityForm.value = !showAddActivityForm.value
}

function handleNewActivity(newActivity: Omit<Activity, 'id' | 'userId'>) {
  const user = session.user
  if (user) {
    activities.value.push({
      ...newActivity,
      id: activities.value.length + 1,
      userId: user.id,
    })
    showAddActivityForm.value = false
  }
}

function deleteActivity(activity: Activity) {
  const index = activities.value.findIndex((a) => a.id === activity.id)
  if (index !== -1) {
    activities.value.splice(index, 1)
  }
}

function shareActivity(activity: Activity) {
  selectedActivity.value = activity
  showShareModal.value = true
}
</script>

<template>
  <div class="container">
    <h1 class="title">My Activities</h1>
    <button class="button is-primary is-fullwidth" @click="addActivity">Add Workout</button>
    <ActivityForm v-if="showAddActivityForm" @add-activity="handleNewActivity" />
    <ShareActivity
      v-if="showShareModal && selectedActivity"
      :activity="selectedActivity"
      @close="showShareModal = false"
    />
    <div class="card" v-for="activity in myActivities" :key="activity.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4">{{ session.user?.firstName }} {{ session.user?.lastName }}</p>
            <p class="subtitle is-6">@{{ session.user?.username }}</p>
            <div class="card-image" v-if="activity.imageUrl">
              <figure class="image">
                <img :src="activity.imageUrl" alt="Activity image" class="activity-image" />
              </figure>
            </div>
          </div>
        </div>
        <div class="content">
          {{ activity.activity }}
          <br />
          <strong>Duration:</strong> {{ activity.duration }} minutes
          <br />
          <time :datetime="activity.date">{{ activity.date }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click.prevent="deleteActivity(activity)">Delete</a>
        <a href="#" class="card-footer-item" @click.prevent="shareActivity(activity)">Share</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
}
.activity-image {
  object-fit: cover;
  max-height: 100em;
}
</style>
