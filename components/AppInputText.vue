<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  iconName: String,
  placeholder: String,
  contentClass: String,
  textarea: Boolean,
  label: String,
  color: {
    type: String as PropType<"base" | "sec">,
    default: "base",
  },
  action: {
    type: Function as PropType<() => void>,
  },
});

const emits = defineEmits<{
  (name: "blur", value: string | number | undefined): void;
  (name: "input", value: string | number | undefined): void;
}>();

const modelValue = defineModel<string | number | undefined>({ required: true });
</script>
<template>
  <div class="relative">
    <span v-if="label" class="block mb-1 text-label">{{ label }}</span>
    <textarea
      v-if="textarea"
      v-model="modelValue"
      :rows="4"
      :placeholder="placeholder || 'Write...'"
      class="input-styles"
      :class="[
        contentClass,
        {
          'bg-base dark:bg-neutral-600': color === 'base',
          'bg-white dark:bg-neutral-700': color === 'sec',
        },
      ]"
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
          'bg-base dark:bg-neutral-600': color === 'base',
          'bg-white dark:bg-neutral-700': color === 'sec',
          'padding-icon': iconName || action,
        },
        contentClass,
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
    />
    <button
      v-if="action"
      class="absolute top-[2px] 2xl:top-[7px] right-2 text-sm 2xl:text-lg rounded-full hovered w-8 h-8 flex justify-center items-center"
      @click="action"
    >
      <icon icon="fa-regular fa-paper-plane" />
    </button>

    <icon
      v-if="iconName"
      :icon="iconName"
      class="absolute top-3 right-4 text-sm 2xl:text-lg"
    />
  </div>
</template>

<style scoped>
.input-styles {
  @apply placeholder:text-label dark:placeholder:text-neutral-400 border border-border dark:border-dark-border px-4 py-2 2xl:py-3 rounded-md text-text dark:text-white focus:outline-primary dark:focus:outline-indigo-500 focus:outline-none w-full;
  font-size: inherit !important;
}

.padding-icon {
  padding-right: 2.5rem !important;
}
</style>
