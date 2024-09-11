<script lang="ts" setup></script>
<template>
  <div class="2xl:p-8 p-6">
    <header class="flex items-start justify-between mb-10">
      <div class="flex uppercase font-bold items-end gap-2 leading-none">
        <div class="flex items-end">
          <div class="w-5 h-7 bg-text"></div>
          <div class="w-5 h-5 bg-primary"></div>
        </div>
        Lorem
      </div>

      <div class="flex gap-4">
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-comment-dots" class="text-lg 2xl:text-xl" />
          <div class="notification">2</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-bell" class="text-lg 2xl:text-xl" />
          <div class="notification">14</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-solid fa-gear" class="text-lg 2xl:text-xl" />
        </button>
      </div>
    </header>

    <RouterView />
  </div>
</template>
<style scoped>
.btns-header {
  @apply border border-border w-14 h-10 rounded-full flex items-center justify-center relative;
}

.notification {
  @apply absolute -top-2 -right-2 bg-red-600 rounded-full leading-none px-2 pb-1 py-[6px] text-xs flex items-center text-white;
}
</style>
