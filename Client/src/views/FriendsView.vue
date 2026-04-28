<script setup lang="ts">
import { useActivities } from '../stores/activities'
import { getFriends } from '../services/friends'
import { onMounted, ref, computed } from 'vue'
import type { User } from '../../../server/types'

const { activities, fetchActivities } = useActivities()
const friends = ref<User[]>([])

onMounted(async () => {
  fetchActivities()
  const result = await getFriends()
  if (result.isSuccess && result.data) {
    friends.value = result.data
  }
})

const friendsWithActivities = computed(() => {
  return friends.value.map((friend) => {
    const friendActivities = activities.filter((activity) => activity.user_id === friend.id)
    return {
      ...friend,
      activities: friendActivities
    }
  })
})

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
    <h1 class="title">Friends' Activities</h1>
    <div v-for="friend in friendsWithActivities" :key="friend.id">
      <div v-for="activity in friend.activities" :key="activity.id" class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ friend.firstName }} {{ friend.lastName }}</p>
              <p class="subtitle is-6">@{{ friend.username }}</p>
            </div>
          </div>

          <div class="content">
            <p>
              <strong>{{ activity.activity }}</strong>
            </p>
            <div class="card-image" v-if="activity.imageUrl">
              <figure class="image is-4by3">
                <img :src="activity.imageUrl" alt="Activity image" />
              </figure>
            </div>
            <p>Duration: {{ activity.duration }} minutes</p>
            <p v-if="activity.distance">Distance: {{ formatDistance(activity.distance) }}</p>
            <time :datetime="activity.date">
              {{ new Date(activity.date).toLocaleDateString() }}
            </time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 1.5rem;
}
.activity-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 15em;
}
</style>
