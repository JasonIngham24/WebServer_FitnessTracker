import type { User } from '../models/user';

export const users: User[] = [
    {
        id: 1,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        email: 'admin@example.com',
        friends: [2, 3],
    },
    {
        id: 2,
        role: 'user',
        firstName: 'User',
        lastName: 'One',
        username: 'user1',
        email: 'user1@example.com',
        friends: [1, 3],
    },
    {
        id: 3,
        role: 'user',
        firstName: 'User',
        lastName: 'Two',
        username: 'user2',
        email: 'user2@example.com',
        friends: [1, 2],
    },
];
