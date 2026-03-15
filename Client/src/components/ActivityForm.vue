<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Activity } from '../models/activity'

const emit = defineEmits(['add-activity'])

const activityType = ref('')
const duration = ref(0)
const date = ref(new Date().toISOString().substr(0, 10))
const distance = ref(0)

const activityOptions = ['Running', 'Walking', 'Biking', 'Swimming', 'Weightlifting', 'Yoga']

const activityImageMap: { [key: string]: string } = {
  Running:
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Walking:
    'https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Biking:
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Swimming:
    'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Weightlifting:
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Yoga: 'https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

const isDistanceActivity = computed(() => {
  return ['Running', 'Walking', 'Biking', 'Swimming'].includes(activityType.value)
})

function handleSubmit() {
  if (
    !activityType.value ||
    duration.value <= 0 ||
    (isDistanceActivity.value && distance.value <= 0)
  ) {
    alert('Please fill in all fields.')
    return
  }

  const imageUrl = activityImageMap[activityType.value]

  const newActivity: Omit<Activity, 'id' | 'userId' | 'calories'> & {
    calories?: number
    distanceUnit?: string
  } = {
    activity: activityType.value,
    duration: duration.value,
    date: date.value,
    imageUrl: imageUrl,
  }

  if (isDistanceActivity.value) {
    newActivity.distance = distance.value
  }

  emit('add-activity', newActivity)

  // Reset form fields
  activityType.value = ''
  duration.value = 0
  date.value = new Date().toISOString().substr(0, 10)
  distance.value = 0
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Activity Type</label>
      <div class="control">
        <div class="select">
          <select v-model="activityType">
            <option disabled value="">Please select one</option>
            <option v-for="option in activityOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Duration (minutes)</label>
      <div class="control">
        <input class="input" type="number" v-model.number="duration" />
      </div>
    </div>

    <div class="field" v-if="isDistanceActivity">
      <label class="label">Distance (Miles)</label>
      <div class="control">
        <input class="input" type="number" v-model.number="distance" step="any" />
      </div>
    </div>

    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <input class="input" type="date" v-model="date" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-primary">Add Activity</button>
      </div>
    </div>
  </form>
</template>
