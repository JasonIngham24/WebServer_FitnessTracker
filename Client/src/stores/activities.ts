import { defineStore } from "pinia";
import { ref } from "vue";
import type { Activity } from "../../../server/types";
import { api } from "../services/api";

export const useActivities = defineStore("activities", () => {
    const activities = ref<Activity[]>([]);

    async function fetchActivities() {
        activities.value = await api<Activity[]>("activities");
    }

    async function addActivity(activity: Omit<Activity, "id" | "userId">) {
        const newActivity = await api<Activity>("activities", activity);
        activities.value.push(newActivity);
    }

    async function deleteActivity(id: number) {
        await api(`activities/${id}`, undefined, { method: "DELETE" });
        activities.value = activities.value.filter((a) => a.id !== id);
    }

    return {
        activities,
        fetchActivities,
        addActivity,
        deleteActivity,
    };
});
