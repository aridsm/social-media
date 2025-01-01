<script lang="ts" setup>
import { useDarkModeStore } from "./utils/darkmode/darkModeStore";

const { setColorMode } = useDarkModeStore();
const loading = ref(true);

onMounted(() => {
  setColorMode();
  loading.value = false;
});
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center w-full justify-center h-screen md:h-screen md:min-h-screen"
  >
    <div
      class="w-20 h-20 border-4 animate-spin border-indigo-500 rounded-full border-t-zinc-500/[.5]"
    ></div>
  </div>
  <div
    v-else
    class="flex h-screen md:h-screen md:min-h-screen max-w-[2000px] w-full mx-auto bg-base dark:bg-zinc-800"
    id="app"
  >
    <AppMenu class="hidden xl:flex" />
    <AppMain class="flex-1 flex flex-col h-full min-w-0" />
    <AppAside />
  </div>
</template>

<style></style>
