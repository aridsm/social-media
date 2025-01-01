<script setup lang="tsx">
const show = ref(false);
const title = ref("");
const action = ref<() => void>();

function confirm({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) {
  title.value = message;
  action.value = onConfirm;
  show.value = true;
}

defineExpose({
  confirm,
});
</script>

<template>
  <AppModal
    v-model:open="show"
    content-class="flex flex-col items-center gap-4"
  >
    <icon icon="circle-exclamation" class="text-3xl text-indigo-500" />
    <p class="text-5">{{ title }}</p>
    <div class="flex gap-4">
      <AppBtn color="label" @click="show = false">Cancel</AppBtn>
      <AppBtn
        @click="
          () => {
            action?.();
            show = false;
          }
        "
      >
        Confirm
      </AppBtn>
    </div>
  </AppModal>
</template>

<style lang="scss"></style>
