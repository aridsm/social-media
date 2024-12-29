<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  color: {
    type: String as PropType<"label" | "text" | "transparent">,
  },
  disabled: Boolean,
});
</script>

<template>
  <button
    :disabled="disabled"
    class="gap-2 flex items-center rounded-md h-9 2xl:h-11 px-6 disabled:opacity-40 hover:opacity-80 active:opacity-90"
    :class="{
      'bg-zinc-200 text-zinc-600 dark:bg-zinc-600 dark:text-white':
        color === 'label',
      'bg-zinc-600 text-white dark:bg-indigo-500 ': color === 'text' || !color,
      'bg-transparent': color === 'transparent',
    }"
  >
    <slot />
  </button>
</template>
