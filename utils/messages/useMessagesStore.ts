import { useUsersStore } from "../users/useUsersStore";
import type { Chat, Message } from "./types";

export const useMessagesStore = defineStore("messages", () => {
  const { getUserById } = useUsersStore();

  const chats = ref<Chat[]>([
    {
      id: 1,
      userId: 1,
      messages: [
        {
          id: 2,
          message: "Oi",
          read: true,
          date: "2024-07-10T04:00:00Z",
          own: false,
        },
        {
          id: 3,
          message: "oi!",
          read: true,
          date: "2024-07-10T04:04:00Z",
          own: true,
        },
        {
          id: 4,
          message: "pois é",
          read: true,
          date: "2024-07-10T04:10:00Z",
          own: false,
        },
      ],
    },
    {
      id: 5,
      userId: 4,
      messages: [
        {
          id: 6,
          message: "Hello...",
          read: false,
          date: "2024-07-12T12:40:00Z",
          own: false,
        },
      ],
    },
  ]);

  function sendMessage(chatId: number, message: string) {
    if (!message.trim()) {
      return;
    }
    const newMessage: Message = {
      date: new Date().toISOString(),
      id: Math.random(),
      own: true,
      read: false,
      message,
    };

    const chatIndex = chats.value.findIndex((chat) => chatId === chat.id);

    if (chatIndex >= 0) {
      chats.value[chatIndex].messages.push(newMessage);
    }

    chats.value.splice(0, 0, chats.value.splice(chatIndex, 1)[0]);
  }

  function getNotReadMessages(chat?: Chat) {
    if (!chat) {
      let notReadMessages: Message[] = [];

      chats.value.forEach((chat) => {
        const chatNotReadMessages = chat.messages.filter(
          (message) => !message.read && !message.own
        );
        notReadMessages.push(...chatNotReadMessages);
      });

      return notReadMessages;
    } else {
      return chat.messages.filter((message) => !message.read && !message.own);
    }
  }

  function markChatAsRead(chatId: number) {
    const chat = chats.value.find((c) => c.id === chatId);

    if (chat) {
      const notOwnMessages = chat.messages.filter((c) => !c.own);
      notOwnMessages.forEach((message) => {
        message.read = true;
      });
    }
  }

  function getOrAddNewChat(userId: number) {
    const chatExists = chats.value.find((chat) => chat.userId === userId);

    if (!chatExists) {
      const newChat = {
        userId,
        id: Math.random(),
        messages: [],
      };

      chats.value.unshift(newChat);
      return newChat;
    } else {
      return chatExists;
    }
  }

  function removeChatWithNoMessages() {
    chats.value = chats.value.filter((chat) => chat.messages.length);
  }

  function filterChats(search: string) {
    return chats.value.filter((chat) => {
      const user = getUserById(chat.userId);

      return (
        user?.userName
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim()) ||
        user?.name.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
    });
  }

  return {
    chats,
    getNotReadMessages,
    sendMessage,
    markChatAsRead,
    getOrAddNewChat,
    removeChatWithNoMessages,
    filterChats,
  };
});
