<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['add-activity']);

const activityType = ref('');
const duration = ref(0);
const date = ref(new Date().toISOString().substr(0, 10));

const activityOptions = ['Running', 'Walking', 'Biking', 'Swimming', 'Weightlifting', 'Yoga'];

function handleSubmit() {
  if (!activityType.value || duration.value <= 0) {
    alert('Please fill in all fields.');
    return;
  }

  const newActivity = {
    activity: activityType.value,
    duration: duration.value,
    date: date.value,
  };

  emit('add-activity', newActivity);

  // Reset form fields
  activityType.value = '';
  duration.value = 0;
  date.value = new Date().toISOString().substr(0, 10);
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
