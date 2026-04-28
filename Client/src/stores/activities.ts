import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Activity } from '../../../server/types'
import { createActivity, deleteActivityById, getActivities } from '../services/activities'
import { useSessionStore } from './session'

export const useActivities = defineStore('activities', () => {
  const activities = ref<Activity[]>([])
  const totalActivities = ref(0)
  const session = useSessionStore()

  async function fetchActivities() {
    if (!session.user) {
      activities.value = []
      totalActivities.value = 0
      return
    }
    const result = await getActivities()
    if (result.data) {
      activities.value = result.data
    }
    totalActivities.value = result.total
  }

  async function addActivity(activity: Omit<Activity, 'id' | 'user_id'>) {
    const result = await createActivity(activity)
    if (result.isSuccess) {
      activities.value.push(result.data!)
    }
    return result
  }

  async function deleteActivity(id: number) {
    await deleteActivityById(id)
    activities.value = activities.value.filter((a) => a.id !== id)
  }

  return {
    activities,
    totalActivities,
    fetchActivities,
    addActivity,
    deleteActivity
  }
})
