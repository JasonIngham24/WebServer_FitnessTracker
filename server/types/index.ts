export type Activity = {
  id: number
  user_id: number
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
  firstname: string
  lastname: string
  username: string
  email: string
}

export type Friend = {
  id: number
  user_id: number
  friend_id: number
}
