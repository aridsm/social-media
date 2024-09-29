<script lang="ts" setup>
import type { PropType } from "vue";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { useUsersStore } from "~/utils/users/useUsersStore";
import { getImgUrl } from "~/utils/images/getUrlImage";

const showComments = ref(false);
const comment = ref("");
const editing = ref(false);

const { addNewPost, removePost, likePost, dislikePost, findPosts } =
  usePostsStore();
const { currentUser } = useCurrentUserStore();
const { getUserById } = useUsersStore();

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
  lastInList: Boolean,
});

const posts = computed(() => {
  return findPosts({ parentId: props.post.id });
});

const isComment = computed(() => {
  return props.post.level > 1;
});

const user = computed(() => {
  return getUserById(props.post.userId);
});

const actionsList = ref([
  {
    id: 1,
    text: "Save",
    icon: "fa-regular fa-bookmark",
    click: () => { },
  },
  {
    id: 2,
    text: "Report",
    icon: "fa-regular fa-flag",
    visible: () => currentUser.id !== props.post.userId,
    click: () => { },
  },
  {
    id: 4,
    text: "Edit",
    icon: "fa-regular fa-pen-to-square",
    visible: () => currentUser.id === props.post.userId,
    click: () => {
      editing.value = true;
    },
  },
  {
    id: 3,
    text: "Delete",
    icon: "fa-regular fa-trash-can",
    class: "text-red-600 dark:text-red-400",
    visible: () => currentUser.id === props.post.userId,
    click: () => {
      removePost(props.post);
    },
  },
]);

function onAddNewPost() {
  addNewPost(comment.value, props.post.id, (props.post.level || 0) + 1);

  comment.value = "";
}
</script>

<template>
  <AppCard :no-border="isComment" :flat="isComment" class="relative" :class="{
    'flex gap-6 mt-6': isComment,
  }">
    <div v-if="isComment && !lastInList && showComments"
      class="h-full w-4 text-border dark:text-neutral-500 hover:text-neutral-300 dark:hover:text-neutral-400 cursor-pointer flex justify-center absolute top-6 left-3"
      @click="showComments = false">
      <div class="h-full w-[1px] bg-current" />
    </div>
    <img v-if="isComment" class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(user?.photo)"
      :alt="currentUser.name" />

    <div :class="{
      'bg-base dark:bg-neutral-600': post.level === 2,
      'bg-neutral-200/[.3] dark:bg-neutral-500/[.15]': post.level === 3,
      ' p-6 w-full relative rounded-xl before-arrow': isComment,
    }">
      <div class="flex items-center gap-4">
        <img v-if="post.level === 1" class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(user?.photo)"
          :alt="currentUser.name" />
        <div>
          <div class="flex gap-4 items-center">
            <NuxtLink class="cursor-pointer hover:text-primary" :to="`/profile/${post.userId}`">
              @{{ user?.userName }}
            </NuxtLink>
            <AppBtnFollow v-if="!user?.isFollowing && post.userId !== currentUser.id" />
          </div>
          <p class="text-label text-sm">{{ getDateDifference(post.date) }}</p>
        </div>

        <div class="ml-auto flex items-center gap-3">
          <span v-if="post.edited"
            class="text-label text-sm border border-border dark:border-dark-border rounded-full px-3 pt-1 pb-[2px] leading-none">Edited</span>
          <AppActions v-slot="{ open }" :actions="actionsList">
            <button class="hovered w-8 h-8 rounded-full flex items-center justify-center relative" @click="open">
              <icon icon="fa-solid fa-ellipsis-vertical" />
            </button>
          </AppActions>
        </div>
      </div>
      <div class="my-6">
        <p v-if="!editing" class="leading-relaxed">
          {{ post.post }}
        </p>
        <AppEditingPost v-else :post="post" @close="editing = false" />
      </div>

      <div class="flex gap-10 items-center">
        <div v-if="!isComment">
          <icon icon="fa-regular fa-eye" class="mr-1" /> {{ post.views }}
        </div>
        <button :class="{
          'text-green-500': post.liked,
        }" @click="likePost(post.id)">
          <icon :icon="post.liked ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'
            " class="mr-1" />
          {{ post.likes }}
        </button>
        <button :class="{
          'text-red-500': post.disliked,
        }" @click="dislikePost(post.id)">
          <icon :icon="post.disliked
            ? 'fa-solid fa-thumbs-down'
            : 'fa-regular fa-thumbs-down'
            " class="mr-1" />
          {{ post.dislikes }}
        </button>
        <button v-if="post.level <= 2" class="mr-auto" @click="showComments = true">
          <icon icon="fa-regular fa-comments" class="mr-1" />
          {{ posts.length }}
        </button>

        <button v-if="!showComments && post.level <= 2" class="hovered px-2 rounded-full py-1"
          @click="showComments = true">
          <icon icon="fa-solid fa-reply" class="mr-1" /> Reply
        </button>
        <button v-if="!isComment" class="hovered px-2 rounded-full py-1">
          <icon icon="fa-solid fa-share-nodes" class="mr-1" /> Share
        </button>
      </div>
      <Transition name="posts">
        <div v-if="showComments" class="w-full">
          <div
            class="border-t relative border-t-neutral-200 dark:border-t-dark-border pt-6 mt-4 flex gap-6 items-center">
            <button @click="showComments = false"
              class="absolute -top-2 btn-hide-comments hover:bg-neutral-100 bg-base dark:bg-neutral-600 dark:hover:bg-dark-border w-10 flex items-center justify-center border rounded-full border-neutral-200 dark:border-dark-border">
              <icon icon="fa-solid fa-chevron-up" />
            </button>

            <img v-if="post.level === 1" class="w-10 h-10 bg-neutral-200 rounded-full"
              :src="getImgUrl(currentUser?.photo)" :alt="currentUser.name" />

            <AppInputText v-model="comment" class="w-full" :action="onAddNewPost" />
          </div>
          <div v-if="post.level <= 2" class="flex flex-col rounded-xl">
            <p v-if="!posts.length && post.level === 1" class="text-label text-center mt-6">
              Be the first to comment!
            </p>
            <TransitionGroup name="list">
              <AppPost v-for="(post, index) in posts" :key="post.id" :post="post"
                :last-in-list="index === posts.length - 1" />
            </TransitionGroup>
          </div>
        </div>
      </Transition>
      <div v-if="!showComments && post.level === 1"
        class="mt-4 pt-2 border-t border-t-border dark:border-t-dark-border">
        <button class="mt-4 block mx-auto text-primary dark:text-neutral-100 hovered py-1 px-3 rounded-full"
          @click="showComments = true">
          View comments
        </button>
      </div>
    </div>
  </AppCard>
</template>

<style lang="scss" scoped>
.btn-hide-comments {
  right: calc(50% - 20px);
}

.before-arrow {
  @apply before:top-4 before:block before:border-[8px] before:border-y-transparent before:border-l-transparent before:border-r-base dark:before:border-r-neutral-600 before:w-1 before:absolute before:right-full;
}

.comment+.comment {
  @apply border-t border-t-border pt-2;
}

.posts-enter-active,
.posts-leave-active {
  transition: all .2s ease;
}

.posts-enter-from,
.posts-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all .4s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(-300px);
  position: absolute;
  opacity: 0;
}
</style>
