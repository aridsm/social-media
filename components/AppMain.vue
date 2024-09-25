<script lang="ts" setup>
import { useDarkModeStore } from "~/utils/darkmode/darkModeStore";

const { toggleColorMode } = useDarkModeStore();

const { isDarkMode } = storeToRefs(useDarkModeStore());
</script>
<template>
  <div class="2xl:py-8 py-6">
    <header class="flex items-start justify-between mb-10 2xl:px-8 px-6">
      <div class="flex uppercase font-bold items-end gap-2 leading-none">
        <div class="flex items-end">
          <div class="w-5 h-7 bg-text"></div>
          <div class="w-5 h-5 bg-primary"></div>
        </div>
        Lorem
      </div>

      <div class="flex items-center gap-4">
        <button
          class="rounded-full bg-border dark:bg-neutral-600 w-10 p-[2px]"
          @click="toggleColorMode"
        >
          <div
            class="w-4 h-4 bg-text dark:bg-white rounded-full transition relative"
            :class="{
              'translate-x-5': isDarkMode,
            }"
          ></div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-comment-dots" class="text-[16px]" />
          <div class="notification">2</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-bell" class="text-[16px]" />
          <div class="notification">14</div>
        </button>
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
