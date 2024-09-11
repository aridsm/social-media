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
      class="bg-base2 border border-border px-4 h-10 rounded-full focus:outline-primary w-full text-base"
    />
    <button
      class="absolute top-1 right-2 text-lg rounded-full hovered w-8 h-8 flex justify-center items-center"
    >
      <icon v-if="iconName" :icon="iconName" />
    </button>
  </div>
</template>

<style></style>
