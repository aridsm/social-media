<script lang="ts" setup>
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const { currentUser } = useCurrentUserStore();
const navLinks = [
  {
    name: "Feed",
    icon: "fa-regular fa-compass",
    path: "/",
  },
  {
    name: "Messages",
    icon: "fa-regular fa-envelope",
    path: "/messages",
  },
  {
    name: "Notifications",
    icon: "fa-regular fa-bell",
    path: "/notifications",
  },
  {
    name: "Profile",
    icon: "fa-regular fa-circle-user",
    path: `/profile/${currentUser.id}`,
  },
  {
    name: "Saved",
    icon: "fa-regular fa-bookmark",
    path: "/saved",
  },
  {
    name: "Groups",
    icon: "fa-solid fa-users",
    path: "/groups",
  },
];

const route = useRoute();

const currentPath = computed(() => {
  return route.path;
});
</script>

<template>
  <div
    class="p-6 2xl:p-8 w-[18rem] 2xl:w-[20rem] border-r border-r-neutral-200 dark:border-r-dark-border flex flex-col h-full"
  >
    <div class="flex uppercase font-bold items-end gap-2 leading-none">
      <div class="flex items-end">
        <div class="w-5 h-7 bg-text"></div>
        <div class="w-5 h-5 bg-primary"></div>
      </div>
      Lorem
    </div>

    <nav class="flex flex-col gap-2 2xl:gap-4 w-full mt-8">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="flex items-center gap-4 rounded-md px-4 w-full h-11"
        :class="{
          active: currentPath === link.path,
          hovered: currentPath !== link.path,
        }"
      >
        <icon :icon="link.icon" class="w-7" />
        <span class="leading-none -mb-1">{{ link.name }}</span>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="px-4 flex items-center gap-4 py-8 mt-2 border-t border-t-border dark:border-t-dark-border"
      >
        <icon icon="fa-solid fa-gear" class="w-7" />
        <span class="leading-none -mb-1">Settings</span>
      </NuxtLink>
    </nav>

    <button class="px-4 flex items-center gap-4 py-5 mt-auto font-bold">
      <icon icon="fa-solid fa-arrow-right-from-bracket" class="w-7" />
      <span class="leading-none -mb-1">Log out</span>
    </button>
  </div>
</template>

<style>
.active {
  @apply bg-text text-white dark:bg-indigo-500 hover:bg-text dark:hover:bg-indigo-500;
}
</style>
