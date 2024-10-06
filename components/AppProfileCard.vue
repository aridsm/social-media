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
    class="rounded-lg mb-10 p-4 h-28 2xl:h-36 bg-neutral-700 flex items-start justify-between bg-cover"
    :style="{
      backgroundImage: `url(${getBackgroundgUrl(user?.backgroundPhoto)})`,
    }"
  >
    <img
      :src="getImgUrl(user?.photo)"
      class="h-36 w-36 2xl:h-44 2xl:w-44 cursor-pointer mx-auto rounded-full border-8 border-base dark:border-neutral-800"
      @click="activePage = 'data'"
    />
    <AppActions
      v-if="!disabled && activePage !== 'edit'"
      v-slot="{ open }"
      :actions="actionsList"
      class="right-12 top-4 actions"
    >
      <button
        class="hover:bg-neutral-200 w-8 h-8 2xl:w-10 2xl:h-10 bg-white rounded-full text-neutral-700 flex items-center justify-center"
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
</style>
