<script setup lang="ts">
import { useSession } from '../services/session'
import { computed } from 'vue'
import { activities } from '../data/activities'
import type { Activity } from '../types/index'

const session = useSession()

const userActivities = computed(() => {
  if (!session.user) {
    return []
  }
  return activities.value.filter((activity) => activity.userId === session.user?.id)
})

const today = new Date('2026-03-15')

const dailyActivities = computed(() => {
  return userActivities.value.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate.toDateString() === today.toDateString()
  })
})

const startOfWeek = new Date(today)
startOfWeek.setDate(today.getDate() - today.getDay())

const endOfWeek = new Date(startOfWeek)
endOfWeek.setDate(startOfWeek.getDate() + 6)

const weeklyActivities = computed(() => {
  return userActivities.value.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= startOfWeek && activityDate <= endOfWeek
  })
})

function calculateStats(activityList: Activity[]) {
  const totalDistance = activityList.reduce((sum, activity) => sum + (activity.distance || 0), 0)
  const totalDuration = activityList.reduce((sum, activity) => sum + activity.duration, 0)
  const totalCalories = activityList.reduce((sum, activity) => sum + activity.calories, 0)

  const activityCounts: { [key: string]: number } = {}
  activityList.forEach((activity) => {
    const activityName = activity.activity as string
    activityCounts[activityName] = (activityCounts[activityName] || 0) + 1
  })

  const mostFrequentActivity =
    activityList.length > 0
      ? Object.keys(activityCounts).reduce((a, b) => {
          const countA = activityCounts[a]
          const countB = activityCounts[b]
          if (countA !== undefined && countB !== undefined) {
            return countA > countB ? a : b
          }
          return a
        })
      : 'N/A'

  return {
    totalDistance,
    totalDuration,
    mostFrequentActivity,
    totalCalories,
  }
}

const dailyStats = computed(() => calculateStats(dailyActivities.value))
const weeklyStats = computed(() => calculateStats(weeklyActivities.value))
const allTimeStats = computed(() => calculateStats(userActivities.value))
</script>

<template>
  <main>
    <div v-if="!session.user" class="notification is-primary">
      <h1 class="title">Welcome to the Fitness Tracker App!</h1>
      <p class="subtitle">Track your activities and see your progress over time.</p>
      <p>
        Log in to access your activities, view your friends' activities, and check your statistics.
      </p>
    </div>

    <div v-if="session.user" class="notification is-dark fixed-grid has-1-cols">
      <div class="notification is-info">
        <h2 class="title">Today's Activity</h2>
        <p>Distance: {{ dailyStats.totalDistance }} km</p>
        <p>Duration: {{ dailyStats.totalDuration }} minutes</p>
        <p>Most Frequent Activity: {{ dailyStats.mostFrequentActivity }}</p>
        <p>Calories Burned: {{ dailyStats.totalCalories }}</p>
      </div>

      <div class="notification is-link">
        <h2 class="title">This Week's Activity</h2>
        <p>Distance: {{ weeklyStats.totalDistance }} km</p>
        <p>Duration: {{ weeklyStats.totalDuration }} minutes</p>
        <p>Most Frequent Activity: {{ weeklyStats.mostFrequentActivity }}</p>
        <p>Calories Burned: {{ weeklyStats.totalCalories }}</p>
      </div>

      <div class="notification is-warning">
        <h2 class="title">All Time Activity</h2>
        <p>Distance: {{ allTimeStats.totalDistance }} km</p>
        <p>Duration: {{ allTimeStats.totalDuration }} minutes</p>
        <p>Most Frequent Activity: {{ allTimeStats.mostFrequentActivity }}</p>
        <p>Calories Burned: {{ allTimeStats.totalCalories }}</p>
      </div>
    </div>
  </main>
</template>
