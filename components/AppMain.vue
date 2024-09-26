<script lang="ts" setup>
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";
import { useDarkModeStore } from "~/utils/darkmode/darkModeStore";

const { currentUser } = useCurrentUserStore();

const { toggleColorMode } = useDarkModeStore();

const { isDarkMode } = storeToRefs(useDarkModeStore());

const search = ref('')

const getImgUrl = (img: string) =>
  new URL(`../assets/avatar/${img}`, import.meta.url).href;

</script>
<template>
  <div class="2xl:py-8 py-6">
    <header class="flex items-start mb-10 2xl:px-8 px-6">
    <AppInputText v-model="search" class="flex-1" placeholder="Search user..." 
    icon-name="fa-solid fa-magnifying-glass"/>
      <div class="flex items-center justify-end gap-4 ml-auto flex-1">
        <button class="rounded-full bg-border dark:bg-neutral-600 w-10 p-[2px]" @click="toggleColorMode">
          <div class="w-4 h-4 bg-text dark:bg-white rounded-full transition relative" :class="{
            'translate-x-5': isDarkMode,
          }"></div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-comment-dots" class="text-[16px]" />
          <div class="notification">2</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-bell" class="text-[16px]" />
          <div class="notification">14</div>
        </button>
        
      <div class="flex items-center gap-4 px-2">
        <img class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(currentUser.photo)"
          :alt="currentUser.name"></img>
        <span>@{{ currentUser.userName }}</span>
      </div>

      </div>
    </header>

    <RouterView />
  </div>
</template>
<style scoped>
.btns-header {
  @apply w-12 h-8 rounded-full flex items-center justify-center relative;
}

.notification {
  @apply absolute -top-2 -right-2 bg-red-600 rounded-full leading-none px-2 pb-1 py-[5px] text-xs flex items-center text-white;
}
</style>
