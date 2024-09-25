<script lang="ts" setup>
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const newPost = ref("");

const { findPosts, addNewPost } = usePostsStore();
const {currentUser} = useCurrentUserStore()

const posts = computed(() => {
  return findPosts({ level: 1 });
});

const getImgUrl = (img: string )=> new URL(`../assets/avatar/${img}`, import.meta.url).href;
</script>

<template>
  <div class="flex flex-col min-h-0 overflow-auto 2xl:px-8 px-6">
    <AppCard>
      <div class="flex items-start gap-4">
        
      <img class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(currentUser.photo)" :alt="currentUser.name"></img>
        <AppInputText
          class="flex-1"
          v-model="newPost"
          textarea
          placeholder="What are you thinking?"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex gap-4 items-center">
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-image" />
            Image
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-file" />
            File
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-solid fa-location-dot" />
            Location
          </button>
          <button
            class="flex items-center gap-2 hovered rounded-full py-1 px-3"
          >
            <icon icon="fa-regular fa-face-smile" />
            Emojis
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
      class="my-10 text-sm text-label w-full h-[1px] bg-border dark:bg-neutral-600 flex items-center justify-center"
    >
      <span class="bg-base dark:bg-neutral-800 px-6">Last posts</span>
    </div>

    <div class="flex flex-col gap-6 flex-1 min-h-0">
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
