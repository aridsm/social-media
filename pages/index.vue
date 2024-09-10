<script lang="ts" setup>
const newPost = ref("");
</script>

<template>
  <main>
    <AppCard>
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 rounded-full bg-gray-300"></div>
        <AppInputText
          class="flex-1"
          v-model="newPost"
          placeholder="What are you thinking?"
        />
      </div>
      <AppBtn class="ml-auto mt-4">
        Post
        <icon icon="fa-regular fa-paper-plane"
      /></AppBtn>
    </AppCard>

    <div
      class="my-10 text-sm text-label w-full h-[1px] bg-border flex items-center justify-center"
    >
      <span class="bg-base px-6">Last posts</span>
    </div>

    <div>
      <AppPost />
    </div>
  </main>
</template>

<style></style>
