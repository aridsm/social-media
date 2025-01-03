<script lang="ts" setup>
import { getBackgroundgUrl, getImgUrl } from "~/utils/images/getUrlImage";
import type { Post } from "~/utils/posts/types";
import { type User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
  },
  disabled: Boolean,
});

const activePage = defineModel<"data" | "followers" | "following" | "edit">(
  "activePage"
);

const { currentUser } = useCurrentUserStore();

const actionsList = ref([
  {
    id: 1,
    text: "Report",
    icon: "fa-regular fa-flag",
    visible: () => currentUser.id !== props.user?.id,
    click: () => {},
  },
  {
    id: 2,
    text: "Edit information",
    icon: "fa-regular fa-pen-to-square",
    visible: () =>
      currentUser.id === props.user?.id && activePage.value !== "edit",
    click: () => {
      activePage.value = "edit";
    },
  },
]);
</script>

<template>
  <div
    class="background-profile"
    :style="{
      backgroundImage: `url(${getBackgroundgUrl(user?.backgroundPhoto)})`,
    }"
  >
    <AppAvatar
      :user="user"
      large
      class="cursor-pointer mx-auto border-8 rounded-full border-base dark:border-zinc-800"
      @click="activePage = 'data'"
    />
    <AppActions
      v-if="!disabled && activePage !== 'edit'"
      v-slot="{ open }"
      :actions="actionsList"
      class="right-7 md:right-12 top-2 md:top-4 actions"
    >
      <button
        class="hover:bg-zinc-200 w-8 h-8 2xl:w-10 2xl:h-10 bg-white rounded-full text-zinc-700 flex items-center justify-center"
        @click="open"
      >
        <icon
          icon="fa-solid fa-ellipsis-vertical"
          class="text-[16px] 2xl:text-xl"
        />
      </button>
    </AppActions>
  </div>
</template>

<style scoped>
.actions {
  position: absolute !important;
}

.background-profile {
  @apply rounded-lg mb-10 p-4 h-24 md:h-28 2xl:h-36 bg-zinc-700 flex items-start justify-between;
  background-size: 150% auto;
}

@media (min-width: 768px) {
  .background-profile {
    background-size: cover;
  }
}
</style>
