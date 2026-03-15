
<script setup lang="ts">
import { useSession } from '../services/session';
import { activities } from '../data/activities';
import type { Activity } from '../models/activity';
import { computed, ref } from 'vue';
import ActivityForm from '../components/ActivityForm.vue';

const session = useSession();
const showAddActivityForm = ref(false);

const myActivities = computed(() => {
    if (!session.user) {
        return [];
    }
    return activities.filter((a) => a.userId === session.user?.id);
});

function addActivity() {
    showAddActivityForm.value = !showAddActivityForm.value;
}

function handleNewActivity(newActivity: Omit<Activity, 'id' | 'userId'>) {
    const user = session.user;
    if (user) {
        activities.push({
            ...newActivity,
            id: activities.length + 1,
            userId: user.id,
        });
        showAddActivityForm.value = false;
    }
}

function editActivity(activity: Activity) {
    console.log('Edit activity', activity);
}

function deleteActivity(activity: Activity) {
    console.log('Delete activity', activity);
}
</script>

<template>
    <div class="container">
        <h1 class="title">My Activities</h1>
        <button class="button is-primary is-fullwidth" @click="addActivity">Add Workout</button>
        <ActivityForm v-if="showAddActivityForm" @add-activity="handleNewActivity" />

        <div class="card" v-for="activity in myActivities" :key="activity.id">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{ session.user?.username}}</p>
                    </div>
                </div>

                <div class="content">
                    {{ activity.activity }}
                    <br>
                    <strong>Duration:</strong> {{ activity.duration }} minutes
                    <br>
                    <time :datetime="activity.date">{{ activity.date }}</time>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item" @click.prevent="editActivity(activity)">Edit</a>
                <a href="#" class="card-footer-item" @click.prevent="deleteActivity(activity)">Delete</a>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin-top: 1rem;
}
</style>
