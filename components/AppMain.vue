<script lang="ts" setup>
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';
import { useDarkModeStore } from '~/utils/darkmode/darkModeStore';
import { useUsersStore } from '~/utils/users/useUsersStore';
import { getImgUrl } from '~/utils/images/getUrlImage';

const { searchUsers } = useUsersStore();
const { currentUser } = useCurrentUserStore();

const { toggleColorMode } = useDarkModeStore();

const { isDarkMode } = storeToRefs(useDarkModeStore());

const search = ref('');

const usersSearch = computed(() => {
  return search.value ? searchUsers(search.value) : [];
});

function checkOnOpen(open: any, close: any) {
  if (search.value.trim().length) {
    open()
  } else {
    close()
  }
}

</script>
<template>
  <div class="2xl:py-8 py-6">
    <header class="flex items-start mb-16 2xl:px-8 px-6">
      <AppTooltip class="flex-1 relative">
        <template #activator="{ open, close }">
          <AppInputText v-model="search" placeholder="Search user..." icon-name="fa-solid fa-magnifying-glass"
            color="sec" @input="() => checkOnOpen(open, close)" />
        </template>

        <template #default="{ close }">
          <ul class="w-full">
            <li v-for="user in usersSearch" :key="user.id" @click="close">
              <NuxtLink :to="`/profile/${user.id}`" class="p-4 hovered flex gap-4">
                <img :src="getImgUrl(user.photo)" class="w-10 h-10 rounded-full" />
                <div class="flex flex-col gap-2">
                  <span class="text-primary ">@{{ user.userName }}</span>
                  <span>{{ user.name }}</span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </template>
      </AppTooltip>
      <div class="flex items-center justify-end gap-4 ml-auto flex-1">
        <button class="rounded-full bg-border dark:bg-neutral-600 w-10 p-[2px]" @click="toggleColorMode">
          <div class="w-4 h-4 bg-text dark:bg-white rounded-full transition relative" :class="{
            'translate-x-5': isDarkMode,
          }"></div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-comment-dots" class="text-[16px]" />
          <div class="notification">2</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-bell" class="text-[16px]" />
          <div class="notification">14</div>
        </button>

        <NuxtLink :to="`/profile/${currentUser.id}`" class="flex items-center gap-4 px-2 hover:text-primary">
          <span>@{{ currentUser.userName }}</span>
          <img class="w-10 h-10 bg-neutral-200 rounded-full" :src="getImgUrl(currentUser.photo)"
            :alt="currentUser.name"></img>
        </NuxtLink>

      </div>
    </header>

    <NuxtPage />

  </div>
</template>
<style scoped>
.btns-header {
  @apply w-12 h-8 rounded-full flex items-center justify-center relative;
}

.notification {
  @apply absolute -top-2 -right-2 bg-red-600 rounded-full leading-none px-2 pb-1 py-[5px] text-xs flex items-center text-white;
}
</style>
