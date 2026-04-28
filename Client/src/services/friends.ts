import { api } from './myFetch';
import type { Friend, User } from '../../../server/types/index';
import type { DataListEnvelope, DataEnvelope } from '../../../server/types/dataEnvelopes';
import { useSessionStore } from '../stores/session';


export function getFriends() {
    const session = useSessionStore();
    return api<DataListEnvelope<User>>('friends', { user_id: session.user?.id });
}

export function addFriend(friend_id: number) {
    const session = useSessionStore();
    return api<DataEnvelope<Friend>>('friends', { user_id: session.user?.id, friend_id });
}

export function removeFriend(friend_id: number) {
    const session = useSessionStore();
    return api<DataEnvelope<Friend>>(`friends/${friend_id}`, { user_id: session.user?.id }, { method: 'DELETE' });
}
