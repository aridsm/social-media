<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  iconName: String,
  placeholder: String,
  contentClass: String,
  textarea: Boolean,
  error: String,
  rows: {
    type: Number,
    default: 4,
  },
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
    <span v-if="label" class="block mb-1 text-zinc-400">{{ label }}</span>

    <icon
      v-if="iconName"
      :icon="iconName"
      class="absolute opacity-35 top-[14px] left-5 text-sm 2xl:text-lg"
    />

    <textarea
      v-if="textarea"
      v-model="modelValue"
      :rows="rows"
      :placeholder="placeholder || 'Write...'"
      class="input-styles rounded-md"
      :class="[
        contentClass,
        {
          'bg-base dark:bg-zinc-800': color === 'base',
          'bg-white dark:bg-transparent': color === 'sec',
          'border border-zinc-300 dark:border-zinc-500': border,
        },
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
      @keypress.enter="action"
    />

    <input
      v-else
      v-model="modelValue"
      :placeholder="placeholder || 'Write...'"
      class="input-styles rounded-md"
      :class="[
        {
          'bg-base dark:bg-zinc-800': color === 'base',
          'bg-white dark:bg-transparent': color === 'sec',
          '!pl-[3.5rem]': iconName,
          '!pr-[3rem]': action,
          'border border-zinc-300 dark:border-dark-border': border,
        },
        contentClass,
      ]"
      @blur="emits('blur', modelValue)"
      @input="emits('input', modelValue)"
      @keypress.enter="action"
    />
    <button
      v-if="action"
      class="absolute top-[7px] right-2 2xl:right-3 text-sm rounded-full hovered w-8 h-8 2xl:w-9 2xl:h-9 flex justify-center items-center"
      @click="action"
    >
      <icon icon="fa-regular fa-paper-plane" />
    </button>
    <span v-if="error" class="text-red-400 mt-2 block text-sm">{{
      error
    }}</span>
  </div>
</template>

<style scoped>
.input-styles {
  @apply placeholder:text-zinc-400 border border-zinc-200 dark:border-zinc-500/[.4] dark:placeholder:text-zinc-400 px-5 py-3 text-zinc-600 dark:text-white focus:outline-none focus:outline-2  focus:outline-indigo-500 dark:focus:outline-indigo-500 w-full dark:hover:outline-base;
  font-size: inherit !important;
}
</style>
