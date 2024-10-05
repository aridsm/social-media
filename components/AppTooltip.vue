<script lang="ts" setup>
defineProps({
  origin: {
    type: String as PropType<"bottom" | "top">,
    default: "bottom",
  },
  position: {
    type: String as PropType<"right" | "left">,
    default: "left",
  },
});

const show = ref(false);
const tooltip = ref<HTMLDivElement>();

function onOpen() {
  show.value = true;
}

function onClose() {
  show.value = false;
}

function checkClickOutside(e: MouseEvent) {
  if (
    e.target !== tooltip.value &&
    !tooltip.value?.contains(e.target as Node)
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
  <div ref="tooltip" class="relative">
    <slot name="activator" :open="onOpen" :close="onClose" />
    <Transition name="action">
      <div
        v-if="show"
        class="bg-white tooltip z-10 min-w-max dark:bg-neutral-600 flex flex-col items-start border border-border dark:border-dark-border rounded-sm absolute"
        :class="{
          'tooltip-top': origin === 'top',
          'tooltip-bottom': origin === 'bottom',
          'left-0': position === 'left',
          'right-0': position === 'right',
        }"
      >
        <slot :open="onOpen" :close="onClose" />
      </div>
    </Transition>
  </div>
</template>
<style lang="scss">
.tooltip {
  box-shadow: 6px 12px 25px rgba(0, 0, 0, 0.08);
}
.tooltip-bottom {
  top: calc(100% + 8px);
}

.tooltip-top {
  bottom: calc(100% + 8px);
}
.dark .tooltip {
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
