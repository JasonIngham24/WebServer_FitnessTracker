import { reactive, readonly } from "vue";
import type { User } from "../../../server/types/index";
import { api } from "./api";

const session = reactive({
    user: null as User | null,
});

export function useSession() {
    return readonly(session);
}

export async function login(name: string) {
    const user = await api<User>("users/login", { name });
    if (user) {
        session.user = user;
    }
    return user;
}

export function logout() {
    session.user = null;
}

export async function getMyFriends() {
    if (!session.user) {
        return [];
    }
    return await api<User[]>(`users/${session.user.id}/friends`);
}

export async function getAllUsers() {
    return await api<User[]>("users");
}
