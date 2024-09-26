<script lang="tsx" setup>
import { useUsersStore } from "~/utils/users/useUsersStore";

const { recommendedUsers } = useUsersStore();

const getImgUrl = (img: string) =>
  new URL(`../assets/avatar/${img}`, import.meta.url).href;
</script>

<template>
  <aside
    class="p-6 2xl:p-8 w-[25vw] border-l border-l-border dark:border-l-dark-border h-full flex flex-col"
  >
    <div>
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">Suggested people</span>
        <AppSeeAllBtn />
      </div>
      <ul class="flex flex-col gap-4 2xl:gap-6">
        <li v-for="user in recommendedUsers" :key="user.id">
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
                target="_blank"
              >
                @{{ user.userName }}
              </NuxtLink>
              <span class="text-label">{{ user.name }}</span>
            </div>
            <AppBtnFollow class="ml-auto self-start" />
          </AppCard>
        </li>
      </ul>
    </div>

    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">Advertising</span>
        <AppSeeAllBtn />
      </div>

      <div class="bg-neutral-200 w-full h-20"></div>
    </div>

    <footer class="text-text mt-auto">Made by Ariane Morelato</footer>
  </aside>
</template>

<style></style>
