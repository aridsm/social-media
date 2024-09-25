<script lang="ts" setup>
import type { Action } from "~/utils/actions/types";

const props = defineProps({
  actions: {
    type: Array as PropType<Action[]>,
    required: true,
  },
  contentClass: String,
});

const show = ref(false);
const container = ref<HTMLDivElement>();

const visibleActions = computed(() => {
  return props.actions.filter((action) =>
    action.visible === undefined ? true : action.visible?.()
  );
});

function onOpen() {
  show.value = true;
}

function checkClickOutside(e: MouseEvent) {
  if (
    e.target !== container.value &&
    !container.value?.contains(e.target as Node)
  ) {
    show.value = false;
  }
}

onMounted(() => {
  window.addEventListener("click", checkClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", checkClickOutside);
});
</script>

<template>
  <div ref="container" class="relative" :class="contentClass">
    <slot :open="onOpen" />
    <Transition name="action">
      <ul
        v-if="show"
        class="bg-white dark:bg-neutral-600 container-action flex flex-col items-start border border-border dark:border-dark-border rounded-sm absolute top-full right-0"
      >
        <li
          v-for="action in visibleActions"
          :key="action.id"
          class="py-3 px-4 hovered w-full text-start flex items-center leading-none cursor-pointer"
          role="button"
          :class="action.class"
          @click="action.click(), (show = false)"
        >
          <icon v-if="action.id" :icon="action.icon" class="mr-4" />
          {{ action.text }}
        </li>
      </ul>
    </Transition>
  </div>
</template>
<style lang="scss">
.container-action {
  box-shadow: 6px 12px 20px rgba(0, 0, 0, 0.05);
}

.dark .container-action {
  box-shadow: 6px 12px 20px rgba(0, 0, 0, 0.1);
}

.action-enter-active,
.action-leave-active {
  transition: all 0.2s ease;
}

.action-enter-from,
.action-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
