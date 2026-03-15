<script setup lang="ts">
import { getMyFriends } from '@/services/session';
import { activities } from '@/data/activities';

const friends = getMyFriends();

function getFriendActivities(friendId: number) {
    return activities.filter((a) => a.userId === friendId);
}
</script>
<template>
    <div>
        <h1 class="title">Friends</h1>
        <div v-for="friend in friends" :key="friend.id">
            <h2 class="subtitle">{{ friend.name }}'s Activities</h2>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Duration (minutes)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in getFriendActivities(friend.id)" :key="activity.id">
                        <td>{{ activity.activity }}</td>
                        <td>{{ activity.duration }}</td>
                        <td>{{ activity.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
