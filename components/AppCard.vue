<script lang="ts" setup>
defineProps({
  noBorder: Boolean,
  flat: Boolean,
  thin: Boolean,
});
</script>

<template>
  <div
    class="rounded-md"
    :class="{
      'p-4 xl:p-6 bg-white dark:bg-zinc-700 border dark:border-zinc-500/[.4]':
        !flat && !thin,
      'p-2 xl:p-4 bg-white dark:bg-zinc-700 border dark:border-zinc-500/[.4]':
        !flat && thin,
    }"
  >
    <slot />
  </div>
</template>

<style></style>
