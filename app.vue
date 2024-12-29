<script lang="ts" setup>
import { useDarkModeStore } from "./utils/darkmode/darkModeStore";

const { setColorMode } = useDarkModeStore();

onMounted(() => {
  setColorMode();
});
</script>

<template>
  <div
    class="flex h-screen md:h-screen md:min-h-screen max-w-[2000px] w-full mx-auto bg-base dark:bg-zinc-800"
    id="app"
  >
    <AppMenu class="hidden xl:flex" />
    <AppMain class="flex-1 flex flex-col h-full min-w-0" />
    <AppAside />
  </div>
</template>

<style></style>
