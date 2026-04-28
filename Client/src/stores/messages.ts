import { reactive } from 'vue'
import { defineStore } from 'pinia'

export interface Message {
  id: number
  text: string
  type: 'success' | 'error' | 'info'
}

let nextId = 0

export const useMessageStore = defineStore('messages', () => {
  const messages = reactive<Message[]>([])

  function addMessage(text: string, type: Message['type'] = 'info') {
    messages.push({ id: nextId++, text, type })
    setTimeout(() => {
        const messageToRemove = messages[0];
    if (messageToRemove) {
        removeMessage(messageToRemove.id);
    }
    }, 5000)
  }

  function removeMessage(id: number) {
    const index = messages.findIndex((m) => m.id === id)
    if (index > -1) {
      messages.splice(index, 1)
    }
  }

  return { messages, addMessage, removeMessage }
})
