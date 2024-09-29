<script lang="ts" setup>
import dayjs from 'dayjs';
import type { PropType } from 'vue';
import type { Post } from '~/utils/posts/types';
import { Gender, RelationShip, type User } from '~/utils/users/types';

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    },
    posts: {
        type: Object as PropType<Post[]>,
        required: true
    }
})

const hasGeneralInformations = computed(() => {
    return props.user ? Object.values(props.user?.generalInformations).length : false
})

const relationShipList = {
    [RelationShip.Divorced]: 'Divorced',
    [RelationShip.InARelationShip]: 'In a relationship',
    [RelationShip.Married]: 'Married',
    [RelationShip.Single]: 'Single',
    [RelationShip.Widowed]: 'Widowed',
}

const gendersList = {
    [Gender.Female]: 'Female',
    [Gender.Male]: 'Male',
    [Gender.Other]: 'Other',
}

</script>

<template>
    <div class="flex flex-col min-h-0 gap-8">
        <AppCard>
            <p class="font-bold mb-6">Description</p>
            <p>{{ user?.description }}</p>
        </AppCard>

        <AppCard v-if="hasGeneralInformations">
            <p class="font-bold mb-10">Additional Information</p>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex gap-4">
                    <p class="font-bold">Living In</p>
                    <p>{{ user?.generalInformations?.livingIn || 'N/A' }}</p>
                </div>
                <div class="flex gap-4">
                    <p class="font-bold">Relashionship</p>
                    <p>{{ relationShipList[user?.generalInformations?.relationShip] || 'N/A' }}</p>
                </div>
                <div class="flex gap-4">
                    <p class="font-bold">Place of Birth</p>
                    <p>{{ user?.generalInformations?.placeOfBirth || 'N/A' }}</p>
                </div>
                <div class="flex gap-4">
                    <p class="font-bold">Gender</p>
                    <p>{{ gendersList[user?.generalInformations?.gender] || 'N/A' }}</p>
                </div>
                <div class="flex gap-4">
                    <p class="font-bold">Date of Birth</p>
                    <p>{{ dayjs(user?.generalInformations?.dateOfBirth).format('MM/DD/YYYY') || 'N/A' }}</p>
                </div>
            </div>
        </AppCard>

        <div v-if="posts.length">
            <div
                class="mb-10 mt-2 text-sm text-label dark:text-neutral-500 w-full h-[1px] bg-border dark:bg-neutral-600 flex items-center justify-center">
                <span class="bg-base dark:bg-neutral-800 px-6">Last posts</span>
            </div>
            <div class="flex flex-col gap-8">

                <AppPost v-for="post in posts" :key="post.id" :post="post" />
            </div>
            <p class="text-label text-center mt-8">End of list</p>
        </div>
        <p v-else class="text-label text-center">No posts here</p>
    </div>
</template>