<script lang="ts" setup>
import type { PropType } from "vue";
import { useCurrentUserStore } from "~/utils/currentUser/useCurrentUserStore";
import { getDateDifference } from "~/utils/getDateDifference";
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";

const onReply = ref(false);

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
  <div class="flex gap-6">
    <span class="w-10 h-10 min-w-10 bg-border rounded-full block mt-3"></span>
    <div
      class="flex flex-col bg-base p-6 w-full relative rounded-xl before-arrow"
    >
      <div class="flex items-center gap-4">
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
      </div>
      <p class="my-8 leading-relaxed">
        {{ post.post }}
      </p>

      <div class="flex gap-10 items-center">
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
        <div>
          <icon icon="fa-regular fa-comments" class="mr-1" />
          {{ posts?.length }}
        </div>

        <button
          v-if="post.level <= 2"
          class="ml-auto hovered px-2 rounded-full py-1"
          @click="onReply = true"
        >
          <icon icon="fa-solid fa-reply" class="mr-1" /> Reply
        </button>
      </div>
      <div
        v-if="onReply && post.level <= 2"
        class="border-t border-t-border pt-6 mt-4 flex gap-6 items-center"
      >
        <span
          class="max-h-10 min-h-10 max-w-10 min-w-10 bg-border rounded-full block"
        >
        </span>
        <AppInputText
          v-model="comment"
          icon-name="fa-regular fa-paper-plane"
          content-class="bg-white"
          class="w-full"
          @blur="
            addNewPost($event, post.id, (post.level || 0) + 1), (comment = '')
          "
        />
      </div>
      <div
        v-if="post.level <= 2 && posts?.length"
        class="flex flex-col bg-base rounded-xl px-6 pt-6 gap-2"
      >
        <AppComment
          v-for="comment in posts"
          :key="comment.id"
          :post="comment"
          class="comment"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.before-arrow {
  @apply before:top-5 before:block before:border-[12px] before:border-y-transparent before:border-l-transparent before:border-r-base before:w-1 before:absolute before:right-full;
}

.comment + .comment {
  @apply border-t border-t-border pt-2;
}
</style>
