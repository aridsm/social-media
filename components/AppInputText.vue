<script lang="ts" setup>
const props = defineProps({
  iconName: String,
  placeholder: String,
});

const modelValue = defineModel<String>({ required: true });
</script>
<template>
  <div class="relative">
    <input
      v-model="modelValue"
      :placeholder="placeholder || 'Write...'"
      class="bg-base2 border border-border px-4 h-14 rounded-lg focus:outline-primary w-full"
    />
    <button
      class="absolute top-2 right-2 text-xl rounded-full hovered w-10 h-10 flex justify-center items-center"
    >
      <icon v-if="iconName" :icon="iconName" />
    </button>
  </div>
</template>

<style></style>
