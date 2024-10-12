<script lang="ts" setup>
import { useDarkModeStore } from "./utils/darkmode/darkModeStore";

const { setColorMode } = useDarkModeStore();

onMounted(() => {
  setColorMode();
});
</script>

<template>
  <div
    class="flex h-screen max-w-[2000px] w-full mx-auto min-h-screen"
    id="app"
  >
    <AppMenu class="hidden xl:flex" />
    <AppMain class="flex-1 flex flex-col h-full" />
    <AppAside />
  </div>
</template>

<style></style>
