import { api } from './myFetch';
import type { Activity } from '../../../server/types/index';
import type { DataListEnvelope, DataEnvelope } from '../../../server/types/dataEnvelopes';
import { useSessionStore } from '../stores/session';

export function getActivities() {
    const session = useSessionStore();
    return api<DataListEnvelope<Activity>>('activities', { user_id: session.user?.id });
}

export function getActivity(id: number) {
    return api<DataEnvelope<Activity>>(`activities/${id}`);
}

export function createActivity(activity: Omit<Activity, 'id' | 'user_id'>) {
    const session = useSessionStore();
    const activityWithUser = { ...activity, user_id: session.user?.id ?? 0 };
    return api<DataEnvelope<Activity>>('activities', activityWithUser);
}

export function updateActivity(id: number, activity: Partial<Activity>) {
    return api<DataEnvelope<Activity>>(`activities/${id}`, activity, { method: 'PATCH' });
}

export function deleteActivityById(id: number) {
    return api<DataEnvelope<Activity>>(`activities/${id}`, undefined, { method: 'DELETE' });
}
