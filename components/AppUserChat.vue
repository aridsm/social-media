<script setup lang="ts">
import type { Chat, Message } from "~/utils/messages/types";
import { useMessagesStore } from "~/utils/messages/useMessagesStore";
import type { User } from "~/utils/users/types";
import { useUsersStore } from "~/utils/users/useUsersStore";

const props = defineProps({
  chat: {
    type: Object as PropType<Chat>,
    required: true,
  },
});

const { getNotReadMessages } = useMessagesStore();
const { getUserById } = useUsersStore();

const notReadMessages = ref<Message[]>([]);
const lastMessage = ref<Message>();
const user = ref<User>();

function getData() {
  notReadMessages.value = getNotReadMessages(props.chat);
  lastMessage.value = getLastMessage(props.chat);
}

watch(
  () => props.chat,
  () => {
    getData();
  },
  {
    deep: true,
  }
);

function getLastMessage(chat: Chat) {
  return chat.messages[chat.messages.length - 1];
}

onMounted(() => {
  getData();
  user.value = getUserById(props.chat.userId);
});
</script>

<template>
  <AppCard
    v-if="user"
    thin
    class="flex items-center gap-4 cursor-pointer hovered px-3"
  >
    <AppAvatar :user="user!" />
    <div class="w-full min-w-0">
      <p>@{{ user?.userName }}</p>
      <div class="flex gap-2 items-center justify-between ">
        <p class="text-label leading-none mt-2 flex gap-1 h-5 min-w-0 flex-1 ">
          <span v-if="lastMessage?.message" >{{ !lastMessage?.own ? `${user?.userName}: ` : "You: " }}</span>
          <p v-if="lastMessage?.message" class="truncate text-ellipsis" >{{ lastMessage?.message }}</p>
        </p>
        <icon
          v-if="lastMessage?.read && lastMessage?.own"
          icon="fa-solid fa-check-double"
          class="text-blue-400"
        />
        <icon
          v-if="!lastMessage?.read && lastMessage?.own"
          icon="fa-solid fa-check"
          class="text-label"
        />
        <p
          v-else-if="notReadMessages?.length"
          class="bg-red-600 rounded-full leading-none w-5 h-5 text-[10px] md:text-xs flex items-center justify-center text-white"
        >
          {{ notReadMessages?.length }}
        </p>
      </div>
    </div>
  </AppCard>
</template>
