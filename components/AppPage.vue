<script lang="ts" setup>
defineProps({
  contentClass: String,
});
</script>

<template>
  <div
    class="flex flex-col min-h-0 px-4 md:px-6 2xl:px-8 overflow-y-auto overflow-x-hidden relative"
  >
    <div class="flex-1" :class="contentClass">
      <slot />
    </div>
    <footer
      class="text-label flex items-center gap-1 justify-center mt-4 md:mt-6 2xl:mt-8"
    >
      Made by
      <NuxtLink
        class="hover:text-primary flex items-center gap-2"
        to="https://github.com/aridsm"
        target="_blank"
      >
        Ariane Morelato
        <icon icon="fa-brands fa-github" class="text-lg" />
      </NuxtLink>
    </footer>
  </div>
</template>
