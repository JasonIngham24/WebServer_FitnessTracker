import type { Activity } from '../models/activity';

export const activities: Activity[] = [
    {
        id: 1,
        userId: 1,
        activity: 'Running',
        duration: 30,
        date: '2026-03-15',
    },
    {
        id: 2,
        userId: 1,
        activity: 'Swimming',
        duration: 60,
        date: '2026-03-14',
    },
    {
        id: 3,
        userId: 2,
        activity: 'Running',
        duration: 45,
        date: '2026-03-15',
    },
    {
        id: 4,
        userId: 2,
        activity: 'Weightlifting',
        duration: 60,
        date: '2026-03-14',
    },
    {
        id: 5,
        userId: 3,
        activity: 'Yoga',
        duration: 60,
        date: '2026-03-15',
    },
];
