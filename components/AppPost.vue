<script lang="ts" setup>
import type { PropType } from "vue";
import { useCurrentUserStore } from "~/utils/currentUser/useCurrentUserStore";
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";

const showComments = ref(false);

const { addNewPost, editPost, removePost, likePost, dislikePost, findPosts } =
  usePostsStore();
const { currentUser } = useCurrentUserStore();

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});

const comment = ref("");

const posts = computed(() => {
  return findPosts({ parentId: props.post.id });
});
</script>

<template>
  <AppCard>
    <div class="flex items-center gap-4">
      <span class="w-10 h-10 bg-gray-300 rounded-full block"></span>
      <div>
        <div class="flex gap-4 items-center">
          <NuxtLink
            class="cursor-pointer hover:text-primary"
            :to="`/profile/${post.userId}`"
            target="_blank"
          >
            @{{ post.user.userName }}
          </NuxtLink>
          <AppBtnFollow
            v-if="!post.user.isFollowing && post.userId !== currentUser.id"
          />
        </div>
        <p class="text-label text-sm">{{ getDateDifference(post.date) }}</p>
      </div>
      <button
        class="ml-auto hovered w-8 h-8 rounded-full flex items-center justify-center"
      >
        <icon icon="fa-solid fa-ellipsis-vertical" />
      </button>
    </div>
    <p class="my-8 leading-relaxed">
      {{ post.post }}
    </p>

    <div class="flex gap-10 items-center">
      <div><icon icon="fa-regular fa-eye" class="mr-1" /> {{ post.views }}</div>
      <button
        :class="{
          'text-green-500': post.liked,
        }"
        @click="likePost(post.id)"
      >
        <icon
          :icon="
            post.liked ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'
          "
          class="mr-1"
        />
        {{ post.likes }}
      </button>
      <button
        :class="{
          'text-red-500': post.disliked,
        }"
        @click="dislikePost(post.id)"
      >
        <icon
          :icon="
            post.disliked
              ? 'fa-solid fa-thumbs-down'
              : 'fa-regular fa-thumbs-down'
          "
          class="mr-1"
        />
        {{ post.dislikes }}
      </button>
      <button class="mr-auto" @click="showComments = true">
        <icon icon="fa-regular fa-comments" class="mr-1" />
        {{ posts.length }}
      </button>

      <button
        v-if="!showComments"
        class="hovered px-2 rounded-full py-1"
        @click="showComments = true"
      >
        <icon icon="fa-solid fa-reply" class="mr-1" /> Reply
      </button>
      <button class="hovered px-2 rounded-full py-1">
        <icon icon="fa-solid fa-share-nodes" class="mr-1" /> Share
      </button>
    </div>
    <div
      v-if="showComments"
      class="border-t relative border-t-border pt-6 mt-4 flex gap-6 items-center"
    >
      <button
        @click="showComments = false"
        class="absolute -top-2 btn-hide-comments bg-base w-10 flex items-center justify-center border rounded-full border-border"
      >
        <icon icon="fa-solid fa-chevron-up" />
      </button>
      <span
        class="max-h-10 min-h-10 max-w-10 min-w-10 bg-gray-300 rounded-full block"
      >
      </span>
      <AppInputText
        v-model="comment"
        icon-name="fa-regular fa-paper-plane"
        class="w-full"
        @blur="addNewPost($event, post.id, 2), (comment = '')"
      />
    </div>
    <div v-if="showComments" class="flex flex-col rounded-xl gap-6 mt-6">
      <AppComment v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </AppCard>
</template>

<style lang="scss" scoped>
.btn-hide-comments {
  right: calc(50% - 20px);
}
</style>
