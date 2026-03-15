import type { User } from '../models/user';

export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'password',
        role: 'admin',
        name: 'Admin User',
        friends: [2, 3],
    },
    {
        id: 2,
        username: 'user1',
        password: 'password',
        role: 'user',
        name: 'User One',
        friends: [1, 3],
    },
    {
        id: 3,
        username: 'user2',
        password: 'password',
        role: 'user',
        name: 'User Two',
        friends: [1, 2],
    },
];
