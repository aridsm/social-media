<script lang="ts" setup>
const router = useRouter();
const error = useError();
</script>

<template>
  <div
    class="flex h-[100vhmin] min-h-[100vhmin] md:h-screen md:min-h-screen max-w-[2000px] w-full mx-auto"
  >
    <AppMenu class="hidden xl:flex" />
    <div class="pt-24 flex flex-col items-center w-full flex-1">
      <icon icon="fa-solid fa-circle-exclamation" class="text-[2rem] mb-4" />
      <span class="text-lg font-bold">Ops!</span>
      <span class="text-lg font-bold">Error {{ error.statusCode }}</span>
      <span>{{ error.message }}</span>
      <AppBtn @click="router.push('/')" class="mt-4">Go to home</AppBtn>
    </div>
  </div>
</template>
