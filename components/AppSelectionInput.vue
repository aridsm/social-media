<script lang="ts" setup>
import type { PropType } from "vue";

const modelValue = defineModel<number | undefined | null>({ required: true });

type Item = { id: number; name: string; [key: string]: any };
const itemsMap = ref<Map<number, Item>>();
const selectedItem = ref<Item>();

const props = defineProps({
  placeholder: String,
  contentClass: String,
  label: String,
  color: {
    type: String as PropType<"base" | "sec">,
    default: "base",
  },
  list: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  clearable: Boolean,
});

onMounted(() => {
  itemsMap.value = new Map(props.list.map((item) => [item.id, item]));
  getSelectedItem();
});

watch(
  () => modelValue.value,
  () => {
    getSelectedItem();
  },
  {
    immediate: true,
  }
);

function getSelectedItem() {
  selectedItem.value = modelValue.value
    ? itemsMap.value?.get(modelValue.value)
    : undefined;
}
</script>
<template>
  <div class="relative">
    <span v-if="label" class="font-bold block mb-1 text-primary">{{
      label
    }}</span>

    <AppTooltip class="flex-1 relative">
      <template #activator="{ open }">
        <button
          class="input-styles pr-10 flex items-center gap-4"
          :class="[
            {
              'bg-base dark:bg-neutral-600': color === 'base',
              'bg-white dark:bg-neutral-700': color === 'sec',
            },
            contentClass,
          ]"
          @click="open"
        >
          <span v-if="modelValue" class="mr-auto">{{
            selectedItem?.name
          }}</span>
          <span v-else class="mr-auto text-label">{{
            placeholder || "Select..."
          }}</span>
          <button
            v-if="clearable && modelValue"
            @click.stop="modelValue = null"
            class="hovered w-5 h-5 rounded-full flex items-center justify-center"
          >
            <icon icon="fa-solid fa-xmark" class="text-label text-md" />
          </button>
          <icon icon="fa-solid fa-chevron-down" class="text-primary" />
        </button>
      </template>

      <template #default="{ close }">
        <ul class="w-full max-h-72 min-w-[10rem] overflow-auto">
          <li
            v-for="item in list"
            :key="item.id"
            class="cursor-pointer p-4 hovered w-full"
            @click="(modelValue = item.id), close()"
          >
            {{ item.name }}
          </li>
        </ul>
      </template>
    </AppTooltip>
  </div>
</template>

<style>
.input-styles {
  @apply placeholder:text-label dark:placeholder:text-neutral-400 border border-border dark:border-dark-border px-4 py-2 2xl:py-3 rounded-md text-text dark:text-white focus:outline-primary dark:focus:outline-indigo-500 focus:outline-none w-full text-sm;
}
</style>
