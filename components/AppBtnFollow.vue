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
      'bg-primary border 2xl:border-2 border-transparent dark:bg-indigo-500 text-white':
        !user.isFollowing,
      'bg-transparent border 2xl:border-2 text-indigo-500 dark:text-white border-primary  dark:border-neutral-200':
        user.isFollowing,
      'py-[10px] 2xl:py-3 rounded-md w-28': squared,
      'px-3 2xl:px-5 py-[2px] md:py-1 2xl:py-[5px] rounded-full text-xs 2xl:text-sm ':
        !squared,
    }"
    @click="() => toggleFollowUser(user.id)"
  >
    <icon v-if="!user.isFollowing" icon="fa-solid fa-plus" class="text-xs" />
    <span v-if="!user.isFollowing" class="leading-none mt-[2px]">Follow</span>
    <span v-else class="leading-none mt-[2px]">Unfollow</span>
  </button>
</template>
<style></style>
