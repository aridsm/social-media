<script lang="ts" setup>
import dayjs from "dayjs";
import type { PropType } from "vue";
import type { Post } from "~/utils/posts/types";
import { Gender, RelationShip, type User } from "~/utils/users/types";
import { useCurrentUserStore } from "~/utils/users/useCurrentUserStore";

const { currentUser } = useCurrentUserStore();

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
  },
});

const hasGeneralInformations = computed(() => {
  return props.user
    ? Object.values(props.user?.generalInformations).length
    : false;
});

const hasContactInformations = computed(() => {
  return props.user
    ? Object.values(props.user?.contactInformations).length
    : false;
});

const relationShipList = {
  [RelationShip.Divorced]: "Divorced",
  [RelationShip.InARelationShip]: "In a relationship",
  [RelationShip.Married]: "Married",
  [RelationShip.Single]: "Single",
  [RelationShip.Widowed]: "Widowed",
};

const gendersList = {
  [Gender.Female]: "Female",
  [Gender.Male]: "Male",
  [Gender.Other]: "Other",
};
</script>

<template>
  <div class="flex flex-col min-h-0 gap-4 md:gap-6">
    <AppCard v-if="hasGeneralInformations">
      <p class="font-bold mb-6">Additional Information</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex gap-4">
          <p class="label">Living In</p>
          <p>{{ user?.generalInformations?.livingIn || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Relashionship</p>
          <p>
            {{
              relationShipList[user?.generalInformations?.relationShip] || "N/A"
            }}
          </p>
        </div>
        <div class="flex gap-4">
          <p class="label">Place of Birth</p>
          <p>{{ user?.generalInformations?.placeOfBirth || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Gender</p>
          <p>{{ gendersList[user?.generalInformations?.gender] || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Date of Birth</p>
          <p>
            {{
              user?.generalInformations?.dateOfBirth
                ? dayjs(user?.generalInformations?.dateOfBirth).format(
                    "MM/DD/YYYY"
                  )
                : "N/A"
            }}
          </p>
        </div>
      </div>
    </AppCard>

    <AppCard v-if="hasContactInformations">
      <p class="font-bold mb-6">Contact Information</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex gap-4">
          <p class="label">E-mail</p>
          <p>{{ user?.contactInformations?.email || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Cellphone</p>
          <p>{{ user?.contactInformations?.cellphone || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Phone</p>
          <p>{{ user?.contactInformations?.phone || "N/A" }}</p>
        </div>
        <div class="flex gap-4">
          <p class="label">Instagram</p>
          <p>{{ user?.contactInformations?.instagram || "N/A" }}</p>
        </div>
      </div>
    </AppCard>

    <div>
      <div
        class="mb-6 md:mb-8 2xl:mb-10 mt-2 text-xs 2xl:text-sm text-label dark:text-neutral-500 w-full h-[1px] bg-border dark:bg-neutral-600 flex items-center justify-center"
      >
        <span class="bg-base dark:bg-neutral-800 px-6">Last posts</span>
      </div>

      <AppNewPost v-if="currentUser.id === user?.id" class="mb-4 md:mb-6" />

      <div v-if="posts.length">
        <div class="flex flex-col gap-4 md:gap-6">
          <AppPost v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <p class="text-label text-center mt-4 md:mt-8">End of list</p>
      </div>
      <p v-else class="text-label text-center">No posts here</p>
    </div>
  </div>
</template>

<style scoped>
.label {
  @apply w-24 md:w-auto text-label;
}
</style>
