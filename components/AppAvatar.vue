<script lang="ts" setup>
import { getImgUrl } from "~/utils/images/getUrlImage";

defineProps({
  src: String,
  alt: String,
});
</script>

<template>
  <img
    class="w-8 min-w-8 h-8 md:w-10 md:min-w-10 md:h-10 bg-neutral-200 rounded-full z-10"
    :src="getImgUrl(src)"
    :alt="alt"
  />
</template>
