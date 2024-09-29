<script lang="ts" setup>
import type AppProfileData from '~/components/AppProfileData.vue';
import type { Post } from '~/utils/posts/types';
import { usePostsStore } from '~/utils/posts/usePostsStore';
import { type User } from '~/utils/users/types';
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';
import { useUsersStore } from '~/utils/users/useUsersStore';

const user = ref<User>()
const route = useRoute()
const { getUserById } = useUsersStore()
const { findPosts } = usePostsStore()
const { currentUser, editUser } = useCurrentUserStore()
const activePage = ref<'data' | 'followers' | 'following' | 'edit'>('data')

onMounted(() => {
    user.value = getUserById(Number(route.params.id))
})

const posts = computed<Post[]>(() => {
    return findPosts({ userId: Number(route.params.id), level: 1 })
})

</script>

<template>
    <div class="flex flex-col min-h-0 2xl:px-8 px-6 gap-8 overflow-y-auto overflow-x-hidden pb-2 relative">
        <AppProfileCard v-if="user" :user="user" :posts="posts" v-model:active-page="activePage" />

        <div v-if="user">
            <TransitionGroup name="tabs">
                <AppProfileData v-if="activePage === 'data'" :user="user" :posts="posts" />
                <AppFollowList v-if="activePage === 'followers'" :user="user" />
                <AppFollowList v-if="activePage === 'following'" :user="user" following />
                <AppEditTab v-if="activePage === 'edit'" :user="user" :posts="posts"
                    @save="editUser($event), activePage = 'data'" />
            </TransitionGroup>
        </div>
    </div>
</template>
<style scoped>
.tabs-enter-active,
.tabs-leave-active {
    transition: all .6s ease;
}

.tabs-enter-from,
.tabs-leave-to {
    transform: translateX(500px);
    position: absolute;
    width: 100%;
    opacity: 0;
}
</style>