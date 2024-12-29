<script lang="ts" setup>
import type { PropType } from "vue";
import type { User } from "~/utils/users/types";
import { useUsersStore } from "~/utils/users/useUsersStore";

const { toggleFollowUser } = useUsersStore();

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  squared: Boolean,
});
</script>
<template>
  <button
    class="gap-2 flex items-center justify-center hover:opacity-75 active:opacity-65"
    :class="{
      'bg-indigo-500 border border-transparent dark:bg-indigo-500 text-white':
        !user.isFollowing,
      'bg-transparent border text-indigo-500 dark:text-white border-indigo-500  dark:border-zinc-200':
        user.isFollowing,
      'py-[10px] rounded-md w-28': squared,
      'px-3 py-1 rounded-full text-xs 2xl:text-sm ': !squared,
    }"
    @click="() => toggleFollowUser(user.id)"
  >
    <icon v-if="!user.isFollowing" icon="fa-solid fa-plus" class="text-xs" />
    <span v-if="!user.isFollowing" class="leading-none">Follow</span>
    <span v-else class="leading-none">Unfollow</span>
  </button>
</template>
<style></style>
