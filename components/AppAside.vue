<script lang="tsx" setup>
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const { recommendedUsers, friendsOnline } = useUsersStore();
const { currentUser } = useCurrentUserStore();
</script>

<template>
  <aside
    class="hidden xl:flex flex-col p-6 2xl:p-8 w-[20rem] 2xl:w-[24rem] border-l border-l-zinc-200 dark:border-l-zinc-600 bg-base dark:bg-zinc-800 h-full"
  >
    <div>
      <div class="flex justify-between items-center mb-2 2xl:mb-4">
        <span class="font-bold">Suggested people</span>
        <AppSeeAllBtn />
      </div>
      <ul class="flex flex-col gap-4 2xl:gap-6">
        <li v-for="user in recommendedUsers" :key="user.id">
          <AppCard class="flex gap-4 w-full" thin>
            <AppAvatar :user="user" />
            <div class="flex flex-row items-start justify-between w-full gap-2">
              <div class="flex flex-col">
                <NuxtLink
                  class="cursor-pointer hover:text-indigo-500"
                  :to="`/profile/${user.id}`"
                >
                  @{{ user.userName }}
                </NuxtLink>
                <span class="text-zinc-400">{{ user.name }}</span>
              </div>

              <AppBtnFollow
                v-if="user.id !== currentUser.id"
                class="ml-auto"
                :user="user"
              />
            </div>
          </AppCard>
        </li>
      </ul>
    </div>

    <div class="mt-8">
      <div class="flex justify-between items-center mb-2 2xl:mb-4">
        <span class="font-bold">Friends online</span>
        <AppSeeAllBtn />
      </div>

      <ul class="flex flex-col gap-4 2xl:gap-6">
        <li v-for="user in friendsOnline" :key="user.id">
          <AppCard thin class="flex items-center gap-4 w-full">
            <AppAvatar :user="user" />
            <div class="flex flex-col">
              <NuxtLink
                class="cursor-pointer hover:text-indigo-500"
                :to="`/profile/${user.id}`"
              >
                @{{ user.userName }}
              </NuxtLink>
              <span class="text-zinc-400">{{ user.name }}</span>
            </div>
            <AppBtnFollow
              v-if="user.id !== currentUser.id"
              class="ml-auto self-start"
              :user="user"
            />
          </AppCard>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style></style>
