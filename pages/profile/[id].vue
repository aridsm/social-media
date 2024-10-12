<script lang="ts" setup>
import type AppProfileData from "~/components/AppProfileData.vue";
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { type User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const user = ref<User>();
const route = useRoute();
const { getUserById } = useUsersStore();
const { findPosts } = usePostsStore();
const { editUser, currentUser } = useCurrentUserStore();
const activePage = ref<"data" | "followers" | "following" | "edit">("data");

onMounted(() => {
  user.value = getUserById(Number(route.params.id));
});

const posts = computed<Post[]>(() => {
  return findPosts({ userId: Number(route.params.id), level: 1 });
});
</script>

<template>
  <div
    class="flex flex-col min-h-0 px-4 md:px-6 2xl:px-8 gap-6 2xl:gap-8 overflow-y-auto overflow-x-hidden pb-4 2xl:pb-8 relative"
  >
    <AppProfileCard
      v-if="user"
      :user="user"
      :posts="posts"
      v-model:active-page="activePage"
    />

    <div class="text-center">
      <div
        class="flex flex-col gap-1 mb-4 cursor-pointer"
        @click="activePage = 'data'"
      >
        <span class="font-bold 2xl:text-lg">@{{ user?.userName }}</span>
        <span class="text-xl 2xl:text-2xl">{{ user?.name }}</span>
      </div>

      <p class="text-label">{{ user?.description }}</p>
    </div>
    <div
      class="flex justify-center gap-1 md:gap-8 items-center -ml-4 2xl:text-lg"
    >
      <button
        class="hovered px-4 py-1 rounded-full"
        @click="activePage = 'followers'"
      >
        <span class="font-bold">Followers</span>
        <span class="ml-2">{{ user?.followersIds.length }}</span>
      </button>
      <button
        class="hovered px-4 py-1 rounded-full"
        @click="activePage = 'following'"
      >
        <span class="font-bold">Following</span>
        <span class="ml-2">{{ user?.followingIds.length }}</span>
      </button>
      <div class="px-4">
        <span class="font-bold">Posts</span>
        <span class="ml-2">{{ posts.length }}</span>
      </div>
    </div>

    <div
      v-if="user && user.id !== currentUser.id"
      class="flex items-center justify-center gap-4 px-6"
    >
      <AppBtnFollow :user="user" squared />
      <AppBtn color="label">Send message</AppBtn>
    </div>

    <div
      v-if="user && user.followingIds.includes(currentUser.id)"
      class="mx-auto bg-purple-600 dark:bg-purple-700 text-white px-4 rounded-full leading-none pb-1 pt-2"
    >
      Following you
    </div>

    <div v-if="user" class="flex-1">
      <TransitionGroup name="tabs">
        <AppProfileData
          v-if="activePage === 'data'"
          :user="user"
          :posts="posts"
        />
        <AppFollowList v-if="activePage === 'followers'" :user="user" />
        <AppFollowList
          v-if="activePage === 'following'"
          :user="user"
          following
        />
        <AppEditTab
          v-if="activePage === 'edit'"
          :user="user"
          :posts="posts"
          @back="activePage = 'data'"
          @save="editUser($event), (activePage = 'data')"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<style scoped>
.tabs-enter-active,
.tabs-leave-active {
  transition: all 0.6s ease;
}

.tabs-enter-from,
.tabs-leave-to {
  transform: translateX(500px);
  position: absolute;
  width: 100%;
  opacity: 0;
}
</style>
