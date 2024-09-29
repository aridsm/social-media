<script lang="ts" setup>
import { getImgUrl } from '~/utils/images/getUrlImage';
import type { User } from '~/utils/users/types';
import { useUsersStore } from '~/utils/users/useUsersStore';

const { getUsersByIds, searchUsers } = useUsersStore()

const props = defineProps({
    following: Boolean,
    user: {
        type: Object as PropType<User>,
        required: true
    },
})

const usersList = ref<User[]>([])
const defaultUsersList = ref<User[]>([])
const search = ref('')

onMounted(() => {
    if (props.following) {
        usersList.value = getUsersByIds(props.user.followingIds)
    } else {
        usersList.value = getUsersByIds(props.user.followersIds)
    }
    defaultUsersList.value = [...usersList.value]
})

watch(() => search.value, () => {
    usersList.value = searchUsers(search.value, defaultUsersList.value)
})
</script>
<template>
    <div>
        <span class="font-bold mb-6 block">{{ following ? 'Following' : 'Followers' }} ({{ following ?
            user.followingIds.length : user.followersIds.length }})</span>
        <div class="grid grid-cols-2 gap-8">
            <AppInputText v-model="search" class="col-span-2" placeholder="Search user..."
                icon-name="fa-solid fa-magnifying-glass" color="sec" />
            <NuxtLink v-for="user in usersList" :key="user.id">
                <AppCard class="flex items-center gap-4 w-full">
                    <img class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(user?.photo)" :alt="user.name" />
                    <div class="flex flex-col gap-1">
                        <NuxtLink class="cursor-pointer hover:text-primary" :to="`/profile/${user.id}`">
                            @{{ user.userName }}
                        </NuxtLink>
                        <span class="text-label">{{ user.name }}</span>
                    </div>
                    <AppBtnFollow class="ml-auto self-start" />
                </AppCard>
            </NuxtLink>
        </div>
        <p v-if="!usersList.length" class="text-label text-center my-8">No results</p>
    </div>
</template>