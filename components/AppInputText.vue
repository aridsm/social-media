<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
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
  border: Boolean,
});

const emits = defineEmits<{
  (name: "blur", value: any): void;
  (name: "input", value: any): void;
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
      class="input-styles rounded-md"
      :class="[
        contentClass,
        {
          'bg-base dark:bg-neutral-600': color === 'base',
          'bg-white dark:bg-neutral-700': color === 'sec',
          'border border-border dark:border-neutral-500': border,
        },
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
    />

    <input
      v-else
      v-model="modelValue"
      :placeholder="placeholder || 'Write...'"
      class="input-styles rounded-full"
      :class="[
        {
          'bg-base dark:bg-neutral-600': color === 'base',
          'bg-white dark:bg-neutral-700': color === 'sec',
          'padding-icon': iconName || action,
          'border border-border dark:border-dark-border': border,
        },
        contentClass,
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
    />
    <button
      v-if="action"
      class="absolute top-[2px] 2xl:top-[8px] right-3 text-sm 2xl:text-lg rounded-full hovered w-8 h-8 flex justify-center items-center"
      @click="action"
    >
      <icon icon="fa-regular fa-paper-plane" />
    </button>

    <icon
      v-if="iconName"
      :icon="iconName"
      class="absolute top-[10px] 2xl:top-[14px] right-5 text-sm 2xl:text-lg"
    />
  </div>
</template>

<style scoped>
.input-styles {
  @apply placeholder:text-label dark:placeholder:text-neutral-400  px-5 py-2 2xl:py-3 text-text dark:text-white focus:outline-none focus:outline-4 focus:outline-primary dark:focus:outline-indigo-500 w-full;
  font-size: inherit !important;
}

.padding-icon {
  padding-right: 2.5rem !important;
}
</style>
