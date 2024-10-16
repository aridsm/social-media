<script lang="ts" setup>
defineProps({
  noBorder: Boolean,
  flat: Boolean,
});
</script>

<template>
  <div
    class="rounded-md"
    :class="{
      'p-4 xl:p-6 bg-white dark:bg-neutral-700': !flat,
    }"
  >
    <slot />
  </div>
</template>

<style></style>
