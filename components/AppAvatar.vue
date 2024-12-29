<script lang="ts" setup>
import type { PropType } from "vue";
import { getImgUrl } from "~/utils/images/getUrlImage";
import type { User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const { currentUser } = useCurrentUserStore();
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  large: Boolean,
});
</script>

<template>
  <div
    class="relative rounded-full z-10"
    :class="{
      'h-32 w-32 md:h-36 md:w-36 2xl:h-44 2xl:w-44': large,
      'w-10 h-10 min-w-10 md:w-12 md:min-w-12 md:h-12': !large,
    }"
    :title="user?.name"
  >
    <img
      class="w-full h-full object-cover bg-zinc-200 rounded-full"
      :src="getImgUrl(user.photo)"
      :alt="user.name"
    />
    <div
      v-if="user.online && user.isFollowing && user.id !== currentUser.id"
      class="absolute rounded-full bg-emerald-400"
      :class="{
        'w-4 h-4 min-h-4 min-w-4 -right-1 -bottom-1': large,
        'w-3 h-3 min-h-3 min-w-3 -right-1 -bottom-1': !large,
      }"
    ></div>
  </div>
</template>
