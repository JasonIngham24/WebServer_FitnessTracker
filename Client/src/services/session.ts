import { reactive, readonly } from 'vue';
import { users } from '@/data/users';
import type { User } from '@/models/user';

const session = reactive({
    user: null as User | null,
});

export function useSession() {
    return readonly(session);
}

export function login(username: string, password?: string) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        session.user = user;
    }
    return user;
}

export function logout() {
    session.user = null;
}

export function getMyFriends() {
    if (!session.user) {
        return [];
    }
    return users.filter((u) => session.user?.friends.includes(u.id));
}
