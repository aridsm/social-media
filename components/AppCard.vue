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
      'border border-border': !noBorder,
      'p-5 2xl:p-6 bg-white': !flat,
    }"
  >
    <slot />
  </div>
</template>

<style></style>
