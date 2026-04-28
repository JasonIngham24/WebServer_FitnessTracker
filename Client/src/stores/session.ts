import { defineStore } from 'pinia'
import type { User } from '../../../server/types'
import { computed, ref } from 'vue'
import { login as apiLogin, signup as apiSignup } from '../services/users'

import { api as myApi } from '../services/myFetch'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)

  const messages = ref<FeedbackMessage[]>([])
  function addMessage(text: string, type: FeedbackMessage['type'] = 'info') {
    messages.value.push({ type, text })
    setTimeout(() => {
      messages.value.shift()
    }, 5000)
  }
  function handleError(error: Error | string) {
    const message = typeof error === 'string' ? error : error.message
    addMessage(message, 'danger')
    console.error(error)
  }

  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value > 0)

  function api<T>(endpoint: string, data?: unknown, options: RequestInit = {}) {
    loadingCount.value++

    return myApi<T>(endpoint, data, options)
      .catch((error) => {
        handleError(error)
        throw error
      })
      .finally(() => {
        loadingCount.value--
      })
  }

  async function login(email: string) {
    const response = await apiLogin(email)
    user.value = response.data
    return response
  }

  async function signup(firstName: string, lastName: string, username: string, email: string) {
    const response = await apiSignup({ firstName, lastName, username, email })
    user.value = response.data
    return response
  }

  async function loginAsUser(selectedUser: User) {
    user.value = selectedUser
    return { isSuccess: true, data: selectedUser }
  }

  return {
    user,
    messages,
    addMessage,
    handleError,
    isLoading,
    api,
    login,
    signup,
    loginAsUser,
  }
})

export default useSessionStore
