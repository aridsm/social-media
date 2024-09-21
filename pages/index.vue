<script lang="ts" setup>
import { usePostsStore } from "~/utils/posts/usePostsStore";

const newPost = ref("");

const { findPosts, addNewPost } = usePostsStore();
</script>

<template>
  <div class="flex flex-col min-h-0 overflow-auto 2xl:px-8 px-6">
    <AppCard>
      <div class="flex items-center gap-6">
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>
        <AppInputText
          class="flex-1"
          v-model="newPost"
          placeholder="What are you thinking?"
        />
      </div>
      <AppBtn
        class="ml-auto mt-4 flex gap-3"
        @click="addNewPost(newPost), (newPost = '')"
      >
        Post
        <icon icon="fa-regular fa-paper-plane" class="mb-[2px]"
      /></AppBtn>
    </AppCard>

    <div
      class="my-10 text-sm text-label w-full h-[1px] bg-border flex items-center justify-center"
    >
      <span class="bg-base px-6">Last posts</span>
    </div>

    <div class="flex flex-col gap-12 flex-1 min-h-0">
      <AppPost
        v-for="post in findPosts({ level: 1 })"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<style></style>
