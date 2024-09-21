<script lang="ts" setup>
const dummySuggestedUsers = [
  {
    id: 1,
    name: "Anthony Baker",
    user: "@tonybaker",
    following: false,
  },
  {
    id: 2,
    name: "Alice Jackson",
    user: "@alicejack",
    following: false,
  },
  {
    id: 3,
    name: "Ben Elliot",
    user: "@benelliot",
    following: false,
  },
];
</script>

<template>
  <aside
    class="p-6 2xl:p-8 w-[25vw] border-l border-l-border h-full flex flex-col"
  >
    <div>
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">Suggested people</span>
        <AppSeeAllBtn />
      </div>
      <ul class="flex flex-col gap-4 2xl:gap-6">
        <li v-for="user in dummySuggestedUsers" :key="user.id">
          <AppCard class="flex items-center gap-4 w-full">
            <div class="w-10 h-10 rounded-full bg-border"></div>
            <div class="flex flex-col">
              <span class="font-bold">{{ user.user }}</span>
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

      <div class="bg-gray-200 w-full h-20"></div>
    </div>

    <footer class="text-text mt-auto">Made by Ariane Morelato</footer>
  </aside>
</template>

<style></style>
