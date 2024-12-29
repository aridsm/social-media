<script lang="ts" setup>
import { usePostsStore } from "~/utils/posts/usePostsStore";

const { findPosts } = usePostsStore();

const posts = computed(() => {
  return findPosts({ level: 1 });
});
</script>

<template>
  <AppPage>
    <AppNewPost />
    <div
      class="my-6 md:my-8 2xl:my-10 text-xs 2xl:text-sm text-zinc-400 dark:text-zinc-500 w-full h-[1px] bg-zinc-200 dark:bg-zinc-600 flex items-center justify-center"
    >
      <span class="bg-base dark:bg-zinc-800 px-6">Last posts</span>
    </div>

    <div class="flex flex-col gap-4 md:gap-6 flex-1 min-h-0">
      <AppPost
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :last-in-list="index === posts.length - 1"
      />
    </div>
  </AppPage>
</template>

<style></style>
