<script lang="ts" setup>
import type { User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const { getUsersByIds, searchUsers } = useUsersStore();
const { currentUser } = useCurrentUserStore();

const props = defineProps({
  following: Boolean,
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const usersList = ref<User[]>([]);
const defaultUsersList = ref<User[]>([]);
const search = ref("");

onMounted(() => {
  if (props.following) {
    usersList.value = getUsersByIds(props.user.followingIds);
  } else {
    usersList.value = getUsersByIds(props.user.followersIds);
  }
  defaultUsersList.value = [...usersList.value];
});

watch(
  () => search.value,
  () => {
    usersList.value = searchUsers(search.value, defaultUsersList.value);
  }
);
</script>
<template>
  <div>
    <span class="font-bold mb-4 2xl:mb-6 block"
      >{{ following ? "Following" : "Followers" }} ({{
        following ? user.followingIds.length : user.followersIds.length
      }})</span
    >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-8">
      <AppInputText
        v-model="search"
        class="md:col-span-2"
        placeholder="Search user..."
        icon-name="fa-solid fa-magnifying-glass"
        color="sec"
      />
      <NuxtLink v-for="user in usersList" :key="user.id">
        <AppCard class="flex items-center gap-4 w-full">
          <AppAvatar :user="user" />
          <div class="flex flex-col gap-1">
            <NuxtLink
              class="cursor-pointer hover:text-primary"
              :to="`/profile/${user.id}`"
            >
              @{{ user.userName }}
            </NuxtLink>
            <span class="text-label">{{ user.name }}</span>
          </div>
          <AppBtnFollow
            v-if="user.id !== currentUser.id"
            class="ml-auto self-start"
            :user="user"
          />
        </AppCard>
      </NuxtLink>
    </div>
    <p v-if="!usersList.length" class="text-label text-center my-8">
      No results
    </p>
  </div>
</template>
