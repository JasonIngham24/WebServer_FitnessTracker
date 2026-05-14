import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Activity } from '../../../server/types'
import { createActivity, deleteActivityById, getActivities } from '../services/activities'

export const useActivities = defineStore('activities', () => {
  const activities = ref<Activity[]>([])
  const totalActivities = ref(0)
  const page = ref(1)
  const pageSize = 10
  const loading = ref(false)

  const hasMore = computed(() => activities.value.length < totalActivities.value)

  async function fetchActivities() {
    if (loading.value || (page.value > 1 && !hasMore.value)) {
      return
    }

    loading.value = true
    try {
      const result = await getActivities({ page: page.value, pageSize })
      if (result.data) {
        activities.value.push(...result.data)
        page.value++
      }
      totalActivities.value = result.total
    } finally {
      loading.value = false
    }
  }

  function resetActivities() {
    activities.value = []
    page.value = 1
    totalActivities.value = 0
  }

  async function addActivity(activity: Omit<Activity, 'id' | 'user_id'>) {
    const result = await createActivity(activity)
    if (result.isSuccess && result.data) {
      activities.value.unshift(result.data)
      totalActivities.value++
    }
    return result
  }

  async function deleteActivity(id: number) {
    await deleteActivityById(id)
    activities.value = activities.value.filter((a) => a.id !== id)
    totalActivities.value--
  }

  return {
    activities,
    totalActivities,
    loading,
    hasMore,
    fetchActivities,
    addActivity,
    deleteActivity,
    resetActivities
  }
})
