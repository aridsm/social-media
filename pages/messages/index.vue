<script setup lang="ts">
import type { Chat } from "~/utils/messages/types";
import { useMessagesStore } from "~/utils/messages/useMessagesStore";
import type { User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const route = useRoute();

const { chats, getOrAddNewChat, removeChatWithNoMessages, filterChats } =
  useMessagesStore();
const { friendsOnline } = useUsersStore();

const selectedChat = ref<Chat>();
const search = ref("");
const newChatModalOpen = ref(false);
const chatsFiltered = ref<Chat[]>([]);
const chatsOpen = ref(false);

onMounted(() => {
  const userId = route.query.userId;
  if (userId) {
    onAddNewChat(Number(userId));
  }
});

watch(
  () => [search.value, chats.length],
  () => {
    chatsFiltered.value = filterChats(search.value);
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  removeChatWithNoMessages();
});

function onAddNewChat(userId: number) {
  const newChat = getOrAddNewChat(userId);
  selectedChat.value = newChat;
  chatsOpen.value = true;
}
</script>

<template>
  <AppPage content-class="flex flex-col min-h-0 flex-1 h-full">
    <div class="flex flex-col lg:flex-row lg:gap-6 h-full flex-1">
      <div
        class="w-full lg:w-[16rem] 2xl:w-[20rem] flex flex-col gap-4 min-w-0 min-h-0"
      >
        <p class="font-bold">Users online ({{ friendsOnline.length }})</p>
        <ul class="flex gap-4 overflow-auto">
          <li v-for="user in friendsOnline" :key="user.id">
            <button @click="() => onAddNewChat(user.id)">
              <AppAvatar :user="user" />
            </button>
          </li>
        </ul>
        <div class="flex items-center justify-between mt-4">
          <p class="font-bold">Chats ({{ chats.length }})</p>
          <button
            class="flex items-center gap-2 hovered rounded-full pr-1 pl-3 py-1"
            @click="newChatModalOpen = true"
          >
            <span class="text-sm text-label">New chat</span>
            <div
              class="rounded-full bg-indigo-500 text-white w-6 h-6 flex items-center justify-center"
            >
              <icon icon="fa-solid fa-plus" />
            </div>
          </button>
        </div>
        <AppInputText
          v-model="search"
          placeholder="Search chat..."
          icon-name="fa-solid fa-magnifying-glass"
          color="sec"
        />
        <div class="flex flex-col gap-4 min-h-0 overflow-auto">
          <p v-if="!chatsFiltered.length" class="text-label text-center mt-2">
            No results
          </p>
          <AppUserChat
            v-for="chat in chatsFiltered"
            :key="chat.id"
            :class="{
              'card-selected': selectedChat?.id === chat.id,
            }"
            :chat="chat"
            @click="(selectedChat = chat), (chatsOpen = true)"
          />
        </div>
      </div>

      <AppChat
        v-if="selectedChat"
        v-model="selectedChat"
        class="flex-1 h-full hidden lg:flex flex-col min-w-0 min-h-0"
      />
      <div
        v-else
        class="hidden lg:flex flex-col items-center justify-center flex-1 min-w-0 text-label"
      >
        <icon icon="fa-regular fa-comments" class="text-2xl mb-3" />
        <p>Send a Message</p>
        <AppBtn
          class="flex items-center gap-2 rounded-full mt-4"
          @click="newChatModalOpen = true"
        >
          New chat

          <icon icon="fa-solid fa-plus" />
        </AppBtn>
      </div>
    </div>

    <AppModal modal-classes="block lg:hidden" v-model:open="chatsOpen">
      <button
        class="flex items-center gap-2 hovered rounded-full mb-3 pr-3 py-1 pl-1"
        @click="(chatsOpen = false), (selectedChat = undefined)"
      >
        <div
          class="rounded-full !text-[10px] bg-indigo-500 text-white w-5 h-5 flex items-center justify-center"
        >
          <icon icon="fa-solid fa-chevron-left" />
        </div>
        <span class="text-sm text-label">Back</span>
      </button>
      <AppChat
        v-if="selectedChat"
        v-model="selectedChat"
        class="min-w-0 min-h-0 max-w-[35rem] w-[85vw] !h-[78vh]"
      />
    </AppModal>

    <AppModal v-model:open="newChatModalOpen">
      <AppNewChatUsersModal
        @add-chat="onAddNewChat"
        @close="newChatModalOpen = false"
      />
    </AppModal>
  </AppPage>
</template>

<style scoped>
.card-selected {
  @apply bg-border/[.5] dark:bg-neutral-600;
}
</style>
