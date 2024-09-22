<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  color: {
    type: String as PropType<"label" | "text">,
  },
});
</script>

<template>
  <button
    class="gap-2 flex items-center rounded-sm h-10 px-6 hover:opacity-80 active:opacity-90"
    :class="{
      'bg-gray-200 text-text': color === 'label',
      'bg-text text-white': color === 'text' || !color,
    }"
  >
    <slot />
  </button>
</template>
