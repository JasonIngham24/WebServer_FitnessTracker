import type { Activity } from '../models/activity'
import { ref } from 'vue'

export const activities = ref<Activity[]>([
  {
    id: 1,
    userId: 1,
    activity: 'Running',
    duration: 30,
    distance: 5,
    calories: 300,
    date: '2026-03-15',
    imageUrl:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    userId: 1,
    activity: 'Cycling',
    duration: 60,
    distance: 20,
    calories: 500,
    date: '2026-03-14',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1713184149461-69b0abeb3daa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    userId: 2,
    activity: 'Swimming',
    duration: 45,
    calories: 400,
    date: '2026-03-15',
    imageUrl:
      'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    userId: 2,
    activity: 'Yoga',
    duration: 60,
    calories: 150,
    date: '2026-03-14',
    imageUrl:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    userId: 3,
    activity: 'Weightlifting',
    duration: 60,
    calories: 200,
    date: '2026-03-15',
    imageUrl:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    userId: 1,
    activity: 'Running',
    duration: 35,
    distance: 6,
    calories: 350,
    date: '2026-03-13',
    imageUrl:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
])
