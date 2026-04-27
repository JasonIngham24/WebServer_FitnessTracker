<script setup lang="ts">
import { useSession } from '../services/session'
import type { Activity } from '../../../server/types/index'
import { computed, ref, onMounted } from 'vue'
import ActivityForm from '../components/ActivityForm.vue'
import ShareActivity from '../components/ShareActivity.vue'
import { useActivities } from '../stores/activities'

const session = useSession()
const { activities, fetchActivities, addActivity, deleteActivity: deleteActivityFromStore } = useActivities()
const showAddActivityForm = ref(false)
const showShareModal = ref(false)
const selectedActivity = ref<Activity | null>(null)

onMounted(fetchActivities)

const myActivities = computed(() => {
  if (!session.user) {
    return []
  }
  return activities.filter((a: Activity) => a.userId === session.user?.id)
})

function addActivityClick() {
  showAddActivityForm.value = !showAddActivityForm.value
}

async function handleNewActivity(newActivity: Omit<Activity, 'id' | 'userId'>) {
    await addActivity(newActivity)
    showAddActivityForm.value = false
}

async function deleteActivity(activity: Activity) {
    await deleteActivityFromStore(activity.id)
}

function shareActivity(activity: Activity) {
  selectedActivity.value = activity
  showShareModal.value = true
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
  <div class="container notification is-dark">
    <h1 class="title">My Activities</h1>
    <button class="button is-primary is-fullwidth" @click="addActivityClick">Add Workout</button>
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
          @click.prevent="deleteActivity(activity)"
          >Delete</a
        >
        <a
          href="#"
          class="notification is-info card-footer-item text-black"
          @click.prevent="shareActivity(activity)"
          >Share</a
        >
      </footer>
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
  object-fit: cover;
  max-height: 15em;
}
.card-footer-item {
  text-decoration: none;
}
</style>
