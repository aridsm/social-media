<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  color: {
    type: String as PropType<"label" | "text" | "transparent">,
  },
});
</script>

<template>
  <button
    class="gap-2 flex items-center rounded-md h-9 2xl:h-11 px-6 hover:opacity-80 active:opacity-90"
    :class="{
      'bg-neutral-200 text-text dark:bg-neutral-600 dark:text-white':
        color === 'label',
      'bg-text text-white dark:bg-indigo-500': color === 'text' || !color,
      'bg-transparent': color === 'transparent',
    }"
  >
    <slot />
  </button>
</template>
