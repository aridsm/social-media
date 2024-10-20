<script lang="ts" setup>
import { useDarkModeStore } from "./utils/darkmode/darkModeStore";

const { setColorMode } = useDarkModeStore();

onMounted(() => {
  setColorMode();
});
</script>

<template>
  <div
    class="flex h-screen md:h-screen md:min-h-screen max-w-[2000px] w-full mx-auto"
    id="app"
  >
    <AppMenu class="hidden xl:flex" />
    <AppMain class="flex-1 flex flex-col h-full min-w-0" />
    <AppAside />
  </div>
</template>

<style></style>
