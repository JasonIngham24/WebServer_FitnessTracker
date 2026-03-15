<script setup lang="ts">
import { getMyFriends } from '@/services/session'
import { activities } from '@/data/activities'

const friends = getMyFriends()

function getFriendActivities(friendId: number) {
  return activities.value.filter((a) => a.userId === friendId)
}
</script>

<template>
  <div class="container notification is-dark">
    <h1 class="title">Friends' Activities</h1>
    <div v-for="friend in friends" :key="friend.id">
      <div v-for="activity in getFriendActivities(friend.id)" :key="activity.id" class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left"></div>
            <div class="media-content">
              <p class="title is-4">{{ friend.firstName }} {{ friend.lastName }}</p>
              <p class="subtitle is-6">@{{ friend.username }}</p>
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
              <strong>Distance:</strong> {{ activity.distance }} Miles
              <br />
            </div>
            <time :datetime="activity.date">{{ activity.date }}</time>
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
.activity-image {
  object-fit: cover;
  max-height: 15em;
}
</style>
