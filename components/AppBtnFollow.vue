<script lang="ts" setup>
import type { PropType } from 'vue';
import type { User } from '~/utils/users/types';
import { useUsersStore } from '~/utils/users/useUsersStore';

const { toggleFollowUser } = useUsersStore()

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})
</script>
<template>
  <button
    class="gap-2 flex text-xs 2xl:text-sm items-center rounded-full px-4 2xl:px-5 py-[5px] text-white text-base hover:opacity-75 active:opacity-65 "
    :class="{
      'bg-primary dark:bg-indigo-500': !user.isFollowing,
      'bg-neutral-600': user.isFollowing
    }" @click="() => toggleFollowUser(user.id)">
    <icon v-if="!user.isFollowing" icon="fa-solid fa-plus" class="text-xs" />
    <span v-if="!user.isFollowing" class="leading-none mt-[2px]">Follow</span>
    <span v-else class="leading-none mt-[2px]">Unfollow</span>
  </button>
</template>
<style></style>
