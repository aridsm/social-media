<script lang="ts" setup>
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
    path: "/profile",
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
    class="p-6 2xl:p-8 w-[18rem] 2xl:w-[20rem] border-r border-r-gray-200 flex flex-col h-full"
  >
    <div class="flex items-center gap-4 px-2">
      <span class="w-10 h-10 bg-gray-200 rounded-full"></span>
      <span>@jennyoliver</span>
    </div>
    <nav class="flex flex-col gap-2 2xl:gap-4 w-full mt-8">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="flex items-center gap-4 rounded-sm px-4 w-full h-10"
        :class="{
          'active hover:bg-text': currentPath === link.path,
          hovered: currentPath !== link.path,
        }"
      >
        <icon :icon="link.icon" class="w-7" />
        <span class="leading-none -mb-1">{{ link.name }}</span>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="px-4 flex items-center gap-4 py-8 mt-2 border-t border-t-border"
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
  @apply bg-text text-white;
}
</style>
