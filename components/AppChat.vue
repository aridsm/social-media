<script setup lang="ts">
import dayjs from "dayjs";
import type { Chat } from "~/utils/messages/types";
import { useMessagesStore } from "~/utils/messages/useMessagesStore";
import type { User } from "~/utils/users/types";
import { useUsersStore } from "~/utils/users/useUsersStore";

const emits = defineEmits<{
  (name: "back"): void;
}>();

const { sendMessage, markChatAsRead } = useMessagesStore();
const { getUserById } = useUsersStore();

const user = ref<User>();
const chat = ref<HTMLDivElement>();

const selectedChat = defineModel<Chat>({ required: true });

const newMessage = ref<string>("");

watch(
  () => selectedChat.value,
  () => {
    user.value = getUserById(selectedChat.value.userId!);
    markChatAsRead(selectedChat.value.id);
  },
  {
    deep: true,
    immediate: true,
  }
);

function scrollToBottom() {
  if (chat.value) {
    chat.value.scrollTop = chat.value?.scrollHeight + 400;
  }
}

onMounted(() => {
  scrollToBottom();
});

function addNewMessage() {
  sendMessage(selectedChat.value?.id!, newMessage.value);
  newMessage.value = "";
  scrollToBottom();
}

const actionsList = ref([
  {
    id: 1,
    text: "Report",
    icon: "fa-regular fa-flag",
    click: () => {},
  },
]);
</script>

<template>
  <AppCard v-if="user" class="lg:!px-0 lg:py-6 flex flex-col">
    <button
      class="flex md:hidden items-center gap-2 hovered rounded-full mb-3 pr-3 py-1 pl-1 self-start"
      @click="emits('back')"
    >
      <div
        class="rounded-full !text-[10px] bg-indigo-500 text-white w-5 h-5 flex items-center justify-center"
      >
        <icon icon="fa-solid fa-chevron-left" />
      </div>
      <span class="text-sm text-zinc-400">Back</span>
    </button>
    <div class="flex items-center px-0 pb-4 lg:px-6 lg:pb-6">
      <NuxtLink
        class="flex items-center gap-6 hover:text-indigo-500 mr-auto"
        :to="`/profile/${selectedChat.userId}`"
      >
        <AppAvatar :user="user!" />
        <div class="flex flex-col">
          <p class="font-bold">@{{ user?.userName }}</p>
          <p class="text-zinc-400">
            {{ user?.name }}
          </p>
        </div>
      </NuxtLink>
      <button class="hovered rounded-full px-3 py-1 mr-2">
        <icon icon="fa-solid fa-video" />
      </button>
      <AppActions v-slot="{ open }" :actions="actionsList">
        <button
          class="hovered w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center relative"
          @click="open"
        >
          <icon icon="fa-solid fa-ellipsis-vertical" />
        </button>
      </AppActions>
    </div>

    <div
      ref="chat"
      class="flex-1 flex flex-col gap-4 px-3 lg:px-6 min-h-0 overflow-auto"
    >
      <p
        v-if="!selectedChat.messages.length"
        class="text-center text-zinc-400 flex flex-col items-center"
      >
        <icon icon="fa-regular fa-comments" class="text-2xl mb-3" />
        No message with {{ user.name }}
      </p>
      <div
        v-for="(message, index) in selectedChat.messages"
        :key="message.id"
        :class="{
          'ml-10': message.own,
          'mr-10': !message.own,
        }"
      >
        <div
          class="rounded-md relative p-4 break-all before-arrow"
          :class="{
            'bg-indigo-500 text-white before-arrow-right': message.own,
            'bg-base dark:bg-zinc-600 before-arrow-left': !message.own,
          }"
        >
          <p>{{ message.message }}</p>
        </div>
        <div
          v-if="selectedChat.messages[index + 1]?.own !== message.own"
          class="text-xs text-zinc-400 text-end mt-2"
        >
          <span>{{ dayjs(message.date).format("MM/DD/YY h:mm[ ]a") }}</span>

          <icon
            v-if="message?.read && message?.own"
            icon="fa-solid fa-check-double"
            class="text-blue-400 ml-3"
          />
          <icon
            v-if="!message?.read && message?.own"
            icon="fa-solid fa-check"
            class="text-zinc-400 ml-3"
          />
        </div>
      </div>
    </div>

    <div class="lg:px-6 pt-4">
      <AppInputText
        v-model="newMessage"
        :action="addNewMessage"
        placeholder="Write message..."
      />
    </div>
  </AppCard>
</template>

<style scoped>
.card-selected {
  @apply bg-zinc-300 dark:bg-zinc-600;
}

.before-arrow {
  @apply before:top-5 before:block before:border-[6px] before:border-y-transparent before:w-1 before:absolute;
}

.before-arrow.before-arrow-left {
  @apply before:right-full before:border-l-transparent before:border-r-base dark:before:border-r-zinc-600;
}

.before-arrow.before-arrow-right {
  @apply before:left-full before:border-r-transparent before:border-l-indigo-500;
}
</style>
