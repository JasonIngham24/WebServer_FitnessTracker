import { api } from './myFetch'
import type { Friend, User, Activity } from '../../../server/types/index'
import type {
  DataListEnvelope,
  DataEnvelope
} from '../../../server/types/dataEnvelopes'
import { useSessionStore } from '../stores/session'

export interface FriendWithActivities extends User {
  activities: Activity[]
}

export function getFriends() {
  const session = useSessionStore()
  return api<DataListEnvelope<User>>(`friends?user_id=${session.user?.id}`, undefined, {
    method: 'GET'
  })
}

export function getFriendsActivities() {
  const session = useSessionStore()
  return api<DataListEnvelope<FriendWithActivities>>(
    `friends/activities?user_id=${session.user?.id}`,
    undefined,
    { method: 'GET' }
  )
}

export function removeFriend(friend_id: number) {
    const session = useSessionStore();
    return api<DataEnvelope<Friend>>(`friends/${friend_id}`, { user_id: session.user?.id }, { method: 'DELETE' });
}
