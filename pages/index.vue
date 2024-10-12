<script lang="ts" setup>
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const newPost = ref("");

const { findPosts, addNewPost } = usePostsStore();
const { currentUser } = useCurrentUserStore();

const posts = computed(() => {
  return findPosts({ level: 1 });
});
</script>

<template>
  <div
    class="flex flex-col min-h-0 overflow-auto overflow-x-hidden px-4 md:px-6 2xl:px-8"
  >
    <AppCard>
      <div class="flex items-start gap-4">
        <AppAvatar :user="currentUser" />
        <AppInputText
          class="flex-1"
          v-model="newPost"
          textarea
          placeholder="What are you thinking?"
        />
      </div>
      <div class="flex justify-between items-center mt-3">
        <div class="flex gap-2 xl:gap-4 items-center">
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-image" />
            <span class="hidden xl:block">Image</span>
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-file" />
            <span class="hidden xl:block">File</span>
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-location-dot" />
            <span class="hidden xl:block">Location</span>
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
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
    <div
      class="my-6 md:my-8 2xl:my-10 text-xs 2xl:text-sm text-label dark:text-neutral-500 w-full h-[1px] bg-border dark:bg-neutral-600 flex items-center justify-center"
    >
      <span class="bg-base dark:bg-neutral-800 px-6">Last posts</span>
    </div>

    <div class="flex flex-col gap-4 md:gap-6 2xl:gap-8 flex-1 min-h-0">
      <AppPost
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :last-in-list="index === posts.length - 1"
      />
    </div>
  </div>
</template>

<style></style>
