<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  iconName: String,
  placeholder: String,
  contentClass: String,
  textarea: Boolean,
  action: {
    type: Function as PropType<() => void>,
  },
});

const emits = defineEmits<{
  (name: 'blur', value: string): void;
  (name: 'input', value: string): void;
}>();

const modelValue = defineModel<string>({ required: true });
</script>
<template>
  <div class="relative">
    <textarea
      v-if="textarea"
      v-model="modelValue"
      :rows="4"
      :placeholder="placeholder || 'Write...'"
      class="input-styles"
      :class="contentClass"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
    />

    <input
      v-else
      v-model="modelValue"
      :placeholder="placeholder || 'Write...'"
      class="input-styles"
      :class="[
        {
          'padding-icon': iconName || action,
        },
        contentClass,
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
    />
    <button
      v-if="action"
      class="absolute top-[3px] right-1 text-lg rounded-full hovered w-8 h-8 flex justify-center items-center"
      @click="action"
    >
      <icon icon="fa-regular fa-paper-plane" />
    </button>

    <icon
      v-if="iconName"
      :icon="iconName"
      class="absolute top-2 right-3 text-lg"
    />
  </div>
</template>

<style>
.input-styles {
  @apply placeholder:text-label dark:placeholder:text-neutral-400 bg-base dark:bg-neutral-600 border border-border dark:border-dark-border px-4 py-2 rounded-sm text-text dark:text-white focus:outline-primary dark:focus:outline-indigo-500 focus:outline-none w-full text-sm;
}

.padding-icon {
  padding-right: 2.5rem !important;
}
</style>
