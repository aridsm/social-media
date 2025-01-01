<script lang="ts" setup>
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const newPost = ref("");

const { addNewPost } = usePostsStore();
const { currentUser } = useCurrentUserStore();
</script>

<template>
  <AppCard>
    <div class="flex items-start gap-4">
      <AppAvatar :user="currentUser" />
      <AppTagText
        v-model="newPost"
        placeholder="What are you thinking?"
        content-class="h-28"
      />
    </div>
    <div class="flex justify-between items-center mt-3 md:mt-4">
      <div class="flex gap-2 xl:gap-4 items-center">
        <button class="flex items-center gap-2 hovered rounded-full py-1 px-3">
          <icon icon="fa-solid fa-image" />
          <span class="hidden xl:block">Image</span>
        </button>
        <button class="flex items-center gap-2 hovered rounded-full py-1 px-3">
          <icon icon="fa-solid fa-file" />
          <span class="hidden xl:block">File</span>
        </button>
        <button class="flex items-center gap-2 hovered rounded-full py-1 px-3">
          <icon icon="fa-solid fa-location-dot" />
          <span class="hidden xl:block">Location</span>
        </button>
        <button class="flex items-center gap-2 hovered rounded-full py-1 px-3">
          <icon icon="fa-regular fa-face-smile" />
          <span class="hidden xl:block">Emojis</span>
        </button>
      </div>
      <AppBtn
        class="ml-auto flex gap-3"
        @click="addNewPost(newPost), (newPost = '')"
      >
        Post
        <icon icon="fa-regular fa-paper-plane" class="mb-[2px]" />
      </AppBtn>
    </div>
  </AppCard>
</template>
