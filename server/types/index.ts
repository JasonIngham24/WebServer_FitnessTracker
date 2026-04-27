export type Activity = {
  id: number
  userId: number
  activity: string
  duration: number
  distance?: number
  calories: number
  date: string
  imageUrl?: string
}

export type User = {
  id: number
  role: 'admin' | 'user'
  firstName: string
  lastName: string
  username: string
  email: string
  friends: number[]
}
