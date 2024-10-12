<script lang="tsx" setup>
import { getImgUrl } from "~/utils/images/getUrlImage";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useUsersStore } from "~/utils/users/useUsersStore";

const { recommendedUsers, friendsOnline } = useUsersStore();
const { currentUser } = useCurrentUserStore();
</script>

<template>
  <aside
    class="hidden xl:flex flex-col p-6 2xl:p-8 w-[22rem] 2xl:w-[28rem] border-l border-l-border dark:border-l-dark-border h-full"
  >
    <div>
      <div class="flex justify-between items-center mb-2 2xl:mb-4">
        <span class="font-bold">Suggested people</span>
        <AppSeeAllBtn />
      </div>
      <ul class="flex flex-col gap-4 2xl:gap-6">
        <li v-for="user in recommendedUsers" :key="user.id">
          <AppCard class="flex gap-4 w-full">
            <img
              class="w-8 h-8 2xl:w-10 2xl:h-10 bg-neutral-200 rounded-full"
              :src="getImgUrl(user?.photo)"
              :alt="user.name"
            />
            <div class="flex flex-row items-start justify-between w-full gap-2">
              <div class="flex flex-col">
                <NuxtLink
                  class="cursor-pointer hover:text-primary"
                  :to="`/profile/${user.id}`"
                >
                  @{{ user.userName }}
                </NuxtLink>
                <span class="text-label">{{ user.name }}</span>
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
          <AppCard class="flex items-center gap-4 w-full">
            <img
              class="w-10 h-10 bg-neutral-200 rounded-full"
              :src="getImgUrl(user?.photo)"
              :alt="user.name"
            />
            <div class="flex flex-col gap-1">
              <NuxtLink
                class="cursor-pointer hover:text-primary"
                :to="`/profile/${user.id}`"
              >
                @{{ user.userName }}
              </NuxtLink>
              <span class="text-label">{{ user.name }}</span>
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

    <footer class="text-text mt-auto">Made by Ariane Morelato</footer>
  </aside>
</template>

<style></style>
