
<script setup lang="ts">
import { useSession } from '../services/session';
import { activities } from '../data/activities';
import type { Activity } from '../models/activity';
import { computed } from 'vue';

const session = useSession();
const myActivities = computed(() => {
    if (!session.user) {
        return [];
    }
    return activities.filter((a) => a.userId === session.user?.id);
});

function addActivity() {
    console.log('Add activity');
}

function editActivity(activity: Activity) {
    console.log('Edit activity', activity);
}

function deleteActivity(activity: Activity) {
    console.log('Delete activity', activity);
}
</script>

<template>
    <div>
        <h1 class="title">My Activities</h1>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>Duration (minutes)</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in myActivities" :key="activity.id">
                    <td>{{ activity.activity }}</td>
                    <td>{{ activity.duration }}</td>
                    <td>{{ activity.date }}</td>
                    <td>
                        <button class="button is-small is-info" @click="editActivity(activity)">Edit</button>
                        <button class="button is-small is-danger" @click="deleteActivity(activity)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="button is-primary" @click="addActivity">Add Activity</button>
    </div>
</template>
