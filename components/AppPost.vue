<script lang="ts" setup>
const comment = ref("");
</script>

<template>
  <AppCard>
    <div class="flex items-center gap-4">
      <span class="w-10 h-10 bg-gray-300 rounded-full block"></span>
      <div>
        <div class="flex gap-6 items-center">
          <p>@johndoe</p>
          <AppBtnFollow />
        </div>
        <p class="text-label text-sm">3 hours ago</p>
      </div>
    </div>
    <p class="my-8 leading-relaxed">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste dicta odit
      similique iure. Recusandae obcaecati laborum dolore explicabo dolorum? Rem
      sint quis, in omnis obcaecati nam. Culpa totam blanditiis dolorum.
    </p>

    <div class="flex gap-10">
      <div><icon icon="fa-regular fa-eye" class="mr-1" /> 328</div>
      <div class="text-primary">
        <icon icon="fa-solid fa-thumbs-up" class="mr-1" /> 72
      </div>
      <div><icon icon="fa-regular fa-thumbs-down" class="mr-1" /> 0</div>
      <div><icon icon="fa-regular fa-comments" class="mr-1" /> 14</div>

      <button class="ml-auto hovered px-2 rounded-full py-1">
        <icon icon="fa-solid fa-share-nodes" class="mr-1" /> Share
      </button>
    </div>

    <div class="border-t border-t-border pt-6 mt-4 flex gap-6 items-center">
      <span
        class="max-h-10 min-h-10 max-w-10 min-w-10 bg-gray-300 rounded-full block"
      ></span>
      <AppInputText
        v-model="comment"
        icon-name="fa-regular fa-paper-plane"
        class="w-full"
      />
    </div>
  </AppCard>
</template>
