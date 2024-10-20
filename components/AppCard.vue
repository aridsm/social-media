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
      'p-4 xl:p-6 bg-white dark:bg-neutral-700': !flat && !thin,
      'p-2 xl:p-4 bg-white dark:bg-neutral-700': !flat && thin,
    }"
  >
    <slot />
  </div>
</template>

<style></style>
