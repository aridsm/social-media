<script lang="ts" setup>
import type { Action } from '~/utils/actions/types';

const props = defineProps({
  actions: {
    type: Array as PropType<Action[]>,
    required: true,
  },
  contentClass: String,
});

const visibleActions = computed(() => {
  return props.actions.filter((action: Action) =>
    action.visible === undefined ? true : action.visible?.()
  );
});

</script>

<template>
  <AppTooltip>
    <template #activator="{ open }">
      <slot :open="open" />
    </template>

    <template #default="{ close }">
      <ul>
        <li v-for="action in visibleActions" :key="action.id"
          class="py-3 px-4 hovered w-full text-start flex items-center leading-none cursor-pointer whitespace-nowrap"
          role="button" :class="action.class" @click="action.click(), close()">
          <icon v-if="action.id" :icon="action.icon" class="mr-4" />
          {{ action.text }}
        </li>
      </ul>
    </template>
  </AppTooltip>
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
