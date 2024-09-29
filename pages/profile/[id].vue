<script lang="ts" setup>
import type AppProfileData from '~/components/AppProfileData.vue';
import type { Post } from '~/utils/posts/types';
import { usePostsStore } from '~/utils/posts/usePostsStore';
import { type User } from '~/utils/users/types';
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';
import { useUsersStore } from '~/utils/users/useUsersStore';

const user = ref<User>()
const posts = ref<Post[]>([])
const route = useRoute()
const { getUserById } = useUsersStore()
const { findPosts } = usePostsStore()
const { currentUser } = useCurrentUserStore()
const activePage = ref<'data' | 'followers' | 'following' | 'edit'>('data')

onMounted(() => {
    user.value = getUserById(Number(route.params.id))
    posts.value = findPosts({ userId: Number(route.params.id), level: 1 })
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

</script>

<template>
    <div class="flex flex-col min-h-0 2xl:px-8 px-6 gap-8 overflow-y-auto overflow-x-hidden pb-2 relative">
        <div class="mb-12 bg-green-500 rounded-md py-4 pl-8 pr-4 h-36 flex items-start justify-between gap-10">
            <img :src="getImgUrl(user?.photo)"
                class="h-44 w-44 rounded-full border-8 border-base dark:border-gray-800" />
            <div class="flex flex-col flex-1 gap-4  h-full">
                <button class="self-end text-white text-lg flex flex-col mr-auto mt-auto" @click="activePage = 'data'">
                    <span class="font-bold">@{{ user?.userName }}</span>
                    <span>{{ user?.name }}</span>
                </button>

                <div class="flex gap-8 items-center -ml-4 text-white">
                    <button class="hovered px-4 py-1 rounded-full" @click="activePage = 'followers'">
                        <span class="font-bold">Followers</span> <span class="ml-2">{{ user?.followersIds.length
                            }}</span>
                    </button>
                    <button class="hovered px-4 py-1 rounded-full" @click="activePage = 'following'">
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

        <div v-if="user">
            <TransitionGroup name="tabs">
                <AppProfileData v-if="activePage === 'data'" :user="user" :posts="posts" />
                <AppFollowList v-if="activePage === 'followers'" :user="user" />
                <AppFollowList v-if="activePage === 'following'" :user="user" following />
            </TransitionGroup>
        </div>
    </div>
</template>
<style scoped>
.tabs-enter-active,
.tabs-leave-active {
    transition: all .8s ease;
}

.tabs-enter-from,
.tabs-leave-to {
    transform: translateX(500px);
    position: absolute;
    width: 100%;
    opacity: 0;
}
</style>