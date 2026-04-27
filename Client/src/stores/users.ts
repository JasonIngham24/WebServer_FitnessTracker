import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../../../server/types";
import { api } from "../services/api";

export const useUsers = defineStore("users", () => {
    const users = ref<User[]>([]);

    async function fetchUsers() {
        users.value = await api<User[]>("users");
    }

    return {
        users,
        fetchUsers,
    };
});
