<script lang="ts" setup>
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const emits = defineEmits<{
  (name: "hide"): void;
}>();

const { currentUser } = useCurrentUserStore();
const navLinks = [
  {
    name: "Feed",
    icon: "fa-regular fa-compass",
    path: "/",
  },
  {
    name: "Search user",
    icon: "fa-solid fa-magnifying-glass",
    path: "/users",
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
    class="px-6 py-8 z-[9999] transition-all dark:bg-zinc-800 flex-col w-[20rem] xl:w-[15rem] 2xl:w-[20rem] h-full border-r border-r-zinc-200 dark:border-r-zinc-600"
  >
    <div class="flex uppercase font-bold items-end gap-2 leading-none my-2">
      <div class="flex items-end">
        <div class="w-5 h-7 bg-zinc-600"></div>
        <div class="w-5 h-5 bg-indigo-500"></div>
      </div>
      Lorem

      <button
        class="ml-auto hovered w-7 h-7 rounded-full xl:hidden"
        @click="emits('hide')"
      >
        <icon icon="fa-solid fa-chevron-left"></icon>
      </button>
    </div>

    <nav class="flex flex-col gap-2 2xl:gap-4 w-full mt-8">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="flex items-center gap-4 rounded-md px-4 w-full h-9 2xl:h-11"
        :class="{
          active: currentPath === link.path,
          hovered: currentPath !== link.path,
        }"
        @click="emits('hide')"
      >
        <icon :icon="link.icon" class="w-7" />
        <span class="leading-none">{{ link.name }}</span>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="px-4 flex items-center gap-4 py-8 mt-2 border-t border-t-zinc-200 dark:border-t-zinc-600"
      >
        <icon icon="fa-solid fa-gear" class="w-7" />
        <span class="leading-none">Settings</span>
      </NuxtLink>
    </nav>

    <button class="px-4 flex items-center gap-4 py-5 mt-auto font-bold">
      <icon icon="fa-solid fa-arrow-right-from-bracket" class="w-7" />
      <span class="leading-none">Log out</span>
    </button>
  </div>
</template>

<style>
.active {
  @apply bg-indigo-500 text-white hover:bg-indigo-500;
}
</style>
