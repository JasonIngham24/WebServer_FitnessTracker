import type { User } from '../types/index'

export const users: User[] = [
  {
    id: 1,
    role: 'admin',
    firstName: 'Jason',
    lastName: 'Ingham',
    username: 'Inghamj1',
    email: 'admin@example.com',
    friends: [2, 3],
  },
  {
    id: 2,
    role: 'user',
    firstName: 'Smitty',
    lastName: 'WerbenJagerManJensen',
    username: 'The_#1',
    email: 'user1@example.com',
    friends: [1, 3],
  },
  {
    id: 3,
    role: 'user',
    firstName: 'Bread',
    lastName: 'Pitt',
    username: 'Not_BradPitt',
    email: 'user2@example.com',
    friends: [1, 2],
  },
]
