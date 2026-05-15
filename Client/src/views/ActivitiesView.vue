<script setup lang="ts">
import { useSessionStore } from '../stores/session'
import { ref, onMounted } from 'vue'
import ActivityForm from '../components/ActivityForm.vue'
import { useActivities } from '../stores/activities'
import { useInfiniteScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { Activity } from '../../../server/types'

const session = useSessionStore()
const activitiesStore = useActivities()
const { activities, totalActivities, loading } = storeToRefs(activitiesStore)
const { fetchActivities, addActivity, deleteActivity, resetActivities, hasMore } = activitiesStore
const showAddActivityForm = ref(false)

useInfiniteScroll(
  window,
  async () => {
    await fetchActivities()
  },
  {
    distance: 10,
    canLoadMore: () => hasMore && !loading.value,
  }
)

onMounted(() => {
  resetActivities()
  fetchActivities()
})

function addActivityClick() {
  showAddActivityForm.value = !showAddActivityForm.value
}

async function handleNewActivity(newActivity: Omit<Activity, 'id' | 'user_id'>) {
  await addActivity(newActivity)
  showAddActivityForm.value = false
}

async function handleDeleteActivity(activityId: number) {
  await deleteActivity(activityId)
}

function formatDistance(distanceInMiles: number): string {
  if (distanceInMiles < 1) {
    const feet = Math.round(distanceInMiles * 5280)
    return `${feet} feet`
  }
  return `${distanceInMiles.toFixed(2)} miles`
}
</script>

<template>
  <div class="container notification is-dark" ref="scrollContainer">
    <h1 class="title">My Activities</h1>
    <button class="button is-primary is-fullwidth" @click="addActivityClick">Add Workout</button>
    <ActivityForm v-if="showAddActivityForm" @add-activity="handleNewActivity" />
    <p>Showing {{ activities.length }} of {{ totalActivities }}</p>

    <div class="card" v-for="activity in activities" :key="activity.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4">{{ session.user?.firstname }} {{ session.user?.lastname }}</p>
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
          <div v-if="activity.distance">
            <strong>Distance:</strong> {{ formatDistance(activity.distance) }}
            <br />
          </div>
          <time :datetime="activity.date">{{ activity.date }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a
          href="#"
          class="notification is-danger card-footer-item text-black"
          @click.prevent="handleDeleteActivity(activity.id)"
          >Delete</a
        >
      </footer>
    </div>

    <div v-if="loading" class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="skeleton-block"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
}
.card-footer a {
  margin-bottom: 0em;
}
.activity-image {
  max-height: 400px;
  object-fit: cover;
}
.skeleton-block {
  background: #e0e0e0;
  height: 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
</style>
