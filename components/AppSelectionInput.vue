<script lang="ts" setup>
import type { PropType } from "vue";

const modelValue = defineModel<number | undefined | null>({ required: true });
const show = defineModel("show", { default: false });

const emits = defineEmits<{
  (name: "select", value: number, item: Item): void;
}>();

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
    <span v-if="label" class="block mb-1 text-zinc-400">{{ label }}</span>

    <AppTooltip v-model:show="show" class="flex-1 relative">
      <template #activator="{ open, isOpen }">
        <slot name="activator" :attrs="{ open, isOpen }">
          <button
            v-if="!$slots.activator"
            class="input-styles pr-10 flex items-center gap-4"
            :class="[
              {
                'bg-base dark:bg-zinc-800': color === 'base',
                'bg-white dark:bg-transparent': color === 'sec',
              },
              contentClass,
            ]"
            @click="open"
          >
            <span v-if="modelValue" class="mr-auto">{{
              selectedItem?.name
            }}</span>
            <span v-else class="mr-auto text-zinc-400">{{
              placeholder || "Select..."
            }}</span>
            <button
              v-if="clearable && modelValue"
              @click.stop="modelValue = null"
              class="hovered w-5 h-5 rounded-md flex items-center justify-center"
            >
              <icon icon="fa-solid fa-xmark" class="text-zinc-400" />
            </button>
            <icon
              icon="fa-solid fa-chevron-down"
              class="text-indigo-500 transition"
              :class="{ 'rotate-90': isOpen }"
            />
          </button>
        </slot>
      </template>

      <template #default="{ close }">
        <ul class="w-full max-h-72 min-w-[10rem] overflow-auto">
          <li
            v-for="item in list"
            :key="item.id"
            class="cursor-pointer p-4 hovered w-full"
            @click="
              (modelValue = item.id), close(), emits('select', item.id, item)
            "
          >
            {{ item.name }}
          </li>
        </ul>
      </template>
    </AppTooltip>
  </div>
</template>

<style scoped>
.input-styles {
  @apply placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border border-zinc-200 dark:border-zinc-500/[.4] px-5 py-3 rounded-md text-zinc-600 dark:text-white focus:outline-indigo-500 dark:focus:outline-indigo-500 focus:outline-none w-full;
}
</style>
