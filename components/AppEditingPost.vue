<script lang="ts" setup>
import type { PropType } from "vue";
import type { Post } from "~/utils/posts/types";
import { usePostsStore } from "~/utils/posts/usePostsStore";

const { editPost } = usePostsStore();

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});

const emits = defineEmits<{
  (name: "close"): void;
}>();

const modelValue = ref("");

onMounted(() => {
  modelValue.value = props.post.post;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <AppInputText v-model="modelValue" :textarea="true" class="w-full" />
    <div class="flex gap-3 justify-end">
      <AppBtn color="label" @click="emits('close')">Cancelar</AppBtn>
      <AppBtn @click="editPost(post.id, modelValue), emits('close')"
        >Editar</AppBtn
      >
    </div>
  </div>
</template>
