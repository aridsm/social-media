<script setup lang="ts">
defineProps({
  contentClass: String,
});
const open = defineModel<boolean>("open");
</script>
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="z-[99999] bg-black/[.5] w-screen h-full flex justify-center items-center fixed top-0 left-0 px-4"
        @click.self="open = false"
      >
        <AppCard :class="contentClass">
          <slot />
        </AppCard>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
