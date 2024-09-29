<script lang="ts" setup>
import { getBackgroundgUrl, getImgUrl } from '~/utils/images/getUrlImage';
import type { Post } from '~/utils/posts/types';
import { type User } from '~/utils/users/types';
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    },
    posts: {
        type: Object as PropType<Post[]>,
        required: true
    },
    disabled: Boolean
})

const activePage = defineModel<'data' | 'followers' | 'following' | 'edit'>('activePage')

const { currentUser } = useCurrentUserStore()

const actionsList = ref([
    {
        id: 1,
        text: "Report",
        icon: "fa-regular fa-flag",
        visible: () => currentUser.id !== props.user?.id,
        click: () => { },
    },
    {
        id: 2,
        text: "Edit information",
        icon: "fa-regular fa-pen-to-square",
        visible: () => currentUser.id === props.user?.id && activePage.value !== 'edit',
        click: () => {
            activePage.value = 'edit'
        },
    },
])

</script>

<template>
    <div class="mb-12 rounded-md py-4 pl-8 pr-4 h-40 bg-neutral-700 flex items-start justify-between gap-10 bg-cover"
        :style="{ backgroundImage: `url(${getBackgroundgUrl(user?.backgroundPhoto)})` }">
        <img :src="getImgUrl(user?.photo)"
            class="h-48 w-48 rounded-full border-8 border-base dark:border-neutral-800" />
        <div class="flex flex-col flex-1 gap-4  h-full">
            <button class="self-end text-white flex flex-col mr-auto mt-auto" @click="activePage = 'data'">
                <span class="font-bold text-lg">@{{ user?.userName }}</span>
                <span class="text-2xl">{{ user?.name }}</span>
            </button>

            <div class="flex gap-8 items-center -ml-4 text-white text-lg">
                <button class="hovered px-4 py-1 rounded-full" :disabled="disabled" @click="activePage = 'followers'">
                    <span class="font-bold">Followers</span> <span class="ml-2">{{ user?.followersIds.length
                        }}</span>
                </button>
                <button class="hovered px-4 py-1 rounded-full" :disabled="disabled" @click="activePage = 'following'">
                    <span class="font-bold">Following</span> <span class="ml-2">{{ user?.followingIds.length
                        }}</span>
                </button>
                <div class="px-4">
                    <span class="font-bold">Posts</span> <span class="ml-2">{{ posts.length }}</span>
                </div>
            </div>
        </div>
        <AppActions v-if="!disabled" v-slot="{ open }" :actions="actionsList">
            <button class="hovered w-8 h-8 rounded-full text-white flex items-center justify-center relative"
                @click="open">
                <icon icon="fa-solid fa-ellipsis-vertical" />
            </button>
        </AppActions>
    </div>
</template>