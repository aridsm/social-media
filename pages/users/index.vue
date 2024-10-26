<script lang="ts" setup>
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";
import { type User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const router = useRouter();
const users = ref<User[]>([]);
const search = ref("");
const { searchUsers } = useUsersStore();

function onSearch($event: string) {
  users.value = $event?.length ? searchUsers($event) : [];
}
</script>

<template>
  <AppPage class="pt-2">
    <AppInputText
      v-model="search"
      color="sec"
      @input="onSearch"
      placeholder="Search user..."
      icon-name="fa-solid fa-magnifying-glass"
    />

    <span class="font-bold mb-2 2xl:mb-4 block mt-6 2xl:mt-8">
      Results ({{ users.length }})
    </span>
    <div v-if="users.length" class="grid gap-4 grid-cols-1 md:grid-cols-2">
      <NuxtLink
        v-for="user in users"
        :key="user.id"
        class="cursor-pointer hover:text-primary"
        :to="`/profile/${user.id}`"
      >
        <AppCard class="flex gap-4 w-full items-center">
          <AppAvatar :user="user" />
          <div class="flex flex-col items-start justify-between w-full">
            @{{ user.userName }}

            <span class="text-label">{{ user.name }}</span>
          </div>
        </AppCard>
      </NuxtLink>
    </div>
    <p v-else class="text-label text-center">No result</p>
  </AppPage>
</template>
