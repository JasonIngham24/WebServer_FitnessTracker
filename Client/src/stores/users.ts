import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../../../server/types";
import { api } from "../services/myFetch";
import type { DataListEnvelope } from "../../../server/types/dataEnvelopes";

export const useUsers = defineStore("users", () => {
    const users = ref<User[]>([]);
    const totalUsers = ref(0);

    async function fetchUsers() {
        const result = await api<DataListEnvelope<User>>("users");
        users.value = result.data;
        totalUsers.value = result.total;
    }

    return {
        users,
        totalUsers,
        fetchUsers,
    };
});
