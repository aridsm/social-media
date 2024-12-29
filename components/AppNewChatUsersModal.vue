<script setup lang="ts">
import type { User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const emits = defineEmits<{
  (name: "add-chat", userId: number): void;
  (name: "close"): void;
}>();

const { getUsersByIds, searchUsers } = useUsersStore();
const { currentUser } = useCurrentUserStore();

const users = ref<User[]>([]);
const selectedUser = ref<User>();
const search = ref("");

watch(
  () => search.value,
  () => {
    users.value = searchUsers(
      search.value,
      getUsersByIds(currentUser.followingIds)
    );
  },
  {
    immediate: true,
  }
);

// onMounted(() => {
//   users.value = getUsersByIds(currentUser.followingIds);
// });

function startConversationHandler() {
  emits("add-chat", selectedUser.value?.id!);
  emits("close");
}
</script>

<template>
  <div class="w-[85vw] md:w-[30rem]">
    <p class="font-bold mb-4">New Chat</p>
    <AppInputText
      v-model="search"
      class="mb-4"
      placeholder="Search user..."
      icon-name="fa-solid fa-magnifying-glass"
    />
    <ul
      class="flex flex-col gap-4 h-[50vh] md:h-[20rem] 2xl:h-[28rem] overflow-auto"
    >
      <li v-for="user in users" :key="user.id">
        <AppCard
          thin
          class="flex items-center gap-4 w-full hovered border-l-4"
          role="button"
          :class="{
            '!bg-zinc-200/[.5]  dark:!bg-zinc-600 !border-l-indigo-500':
              selectedUser?.id === user?.id,
          }"
          @click="selectedUser = user"
        >
          <AppAvatar :user="user" />
          <div class="flex flex-col">
            <p>@{{ user.userName }}</p>
            <span class="text-zinc-400">{{ user.name }}</span>
          </div>
        </AppCard>
      </li>
      <li v-if="!users.length" class="text-zinc-400 text-center my-4">
        No result
      </li>
    </ul>

    <div class="flex items-center gap-4 mt-4 justify-end">
      <AppBtn color="label" @click="emits('close')">Cancel</AppBtn>
      <AppBtn :disabled="!selectedUser?.id" @click="startConversationHandler">
        Start conversation
      </AppBtn>
    </div>
  </div>
</template>
