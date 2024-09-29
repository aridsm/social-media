<script lang="ts" setup>
import dayjs from 'dayjs';
import type { Post } from '~/utils/posts/types';
import { usePostsStore } from '~/utils/posts/usePostsStore';
import { Gender, RelationShip, type User } from '~/utils/users/types';
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';
import { useUsersStore } from '~/utils/users/useUsersStore';

const user = ref<User>()
const posts = ref<Post[]>([])
const route = useRoute()
const { getUserById } = useUsersStore()
const { findPosts } = usePostsStore()
const { currentUser } = useCurrentUserStore()

onMounted(() => {
    user.value = getUserById(Number(route.params.id))
    posts.value = findPosts({ userId: Number(route.params.id), level: 1 })
})

const hasGeneralInformations = computed(() => {
    return user.value ? Object.values(user.value?.generalInformations).length : false
})

const getImgUrl = (img: string) =>
    new URL(`../../assets/avatar/${img}`, import.meta.url).href;


const actionsList = ref([
    {
        id: 1,
        text: "Report",
        icon: "fa-regular fa-flag",
        visible: () => currentUser.id !== user.value?.id,
        click: () => { },
    },
    {
        id: 2,
        text: "Edit information",
        icon: "fa-regular fa-pen-to-square",
        visible: () => currentUser.id === user.value?.id,
        click: () => {
        },
    },
])

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
    <div class="flex flex-col min-h-0 overflow-auto 2xl:px-8 px-6 gap-8">
        <div class="mb-8 bg-green-500 rounded-md py-4 pl-8 pr-4 h-36 flex items-start justify-between gap-10">
            <img :src="getImgUrl(user?.photo)"
                class="h-44 w-44 rounded-full border-8 border-base dark:border-gray-800" />
            <div class="flex flex-col flex-1 gap-4  h-full">
                <div class="self-end text-white text-lg flex flex-col mr-auto mt-auto">
                    <span class="font-bold">@{{ user?.userName }}</span>
                    <span>{{ user?.name }}</span>
                </div>

                <div class="flex gap-8 items-center -ml-4 text-white">
                    <button class="hovered px-4 py-1 rounded-full">
                        <span class="font-bold">Followers</span> <span class="ml-2">{{ user?.followersIds.length
                            }}</span>
                    </button>
                    <button class="hovered px-4 py-1 rounded-full">
                        <span class="font-bold">Following</span> <span class="ml-2">{{ user?.followingIds.length
                            }}</span>
                    </button>
                    <div class="px-4">
                        <span class="font-bold">Posts</span> <span class="ml-2">{{ posts.length }}</span>
                    </div>
                </div>
            </div>
            <AppActions v-slot="{ open }" :actions="actionsList">
                <button class="hovered w-8 h-8 rounded-full text-white flex items-center justify-center relative"
                    @click="open">
                    <icon icon="fa-solid fa-ellipsis-vertical" />
                </button>
            </AppActions>
        </div>

        <AppCard>
            <p class="font-bold mb-6">Description</p>
            <p>{{ user?.description }}</p>
        </AppCard>

        <AppCard v-if="hasGeneralInformations">
            <p class="font-bold mb-10">General Information</p>
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
            <AppPost v-for="post in posts" :key="post.id" :post="post" />
            <p class="text-label text-center mt-8">End of list</p>
        </div>
        <p v-else class="text-label text-center">No posts here</p>
    </div>
</template>