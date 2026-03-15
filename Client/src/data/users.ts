import type { User } from '../models/user';

export const users: User[] = [
    {
        id: 1,
        role: 'admin',
        name: 'Admin User',
        friends: [2, 3],
    },
    {
        id: 2,
        role: 'user',
        name: 'User One',
        friends: [1, 3],
    },
    {
        id: 3,
        role: 'user',
        name: 'User Two',
        friends: [1, 2],
    },
];
