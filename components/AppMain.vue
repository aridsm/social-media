<script lang="ts" setup>
import { useCurrentUserStore } from '~/utils/users/useCurrentUserStore';
import { useDarkModeStore } from '~/utils/darkmode/darkModeStore';
import { useUsersStore } from '~/utils/users/useUsersStore';
import { getImgUrl } from '~/utils/images/getUrlImage';

const { searchUsers } = useUsersStore();
const { currentUser } = useCurrentUserStore();

const { toggleColorMode } = useDarkModeStore();

const { isDarkMode } = storeToRefs(useDarkModeStore());

const showMenu = ref(false)

const search = ref('');

const usersSearch = computed(() => {
  return search.value ? searchUsers(search.value) : [];
});

function checkOnOpen(open: any, close: any) {
  if (search.value.trim().length && usersSearch.value.length) {
    open()
  } else {
    close()
  }
}

</script>
<template>
  <div class="py-3 md:py-6 2xl:py-8 flex flex-col flex-1">
    <header class="flex items-center px-3 md:px-6 2xl:px-8">
      <button class="hovered w-10 h-10 text-lg rounded-full mr-4 xl:hidden" @click="showMenu = true">
        <icon icon="fa-solid fa-bars"></icon>
      </button>
      <AppMenu class="absolute top-0 xl:hidden h-[100vhmin] overflow-auto" :class="{
        'left-0': showMenu,
        '-left-[20rem]': !showMenu,
      }" @hide="showMenu = false" />
      <AppTooltip class="hidden xl:block flex-1 relative">
        <template #activator="{ open, close }">
          <AppInputText v-model="search" placeholder="Search user..." icon-name="fa-solid fa-magnifying-glass"
            color="sec" @input="() => checkOnOpen(open, close)" />
        </template>

        <template #default="{ close }">
          <ul class="min-w-[25rem] max-h-[25rem] overflow-auto">
            <li v-for="user in usersSearch" :key="user.id" @click="close">
              <NuxtLink :to="`/profile/${user.id}`" class="p-4 hovered flex gap-4">
                <AppAvatar :user="user" />
                <div class="flex flex-col gap-2">
                  <span class="text-primary ">@{{ user.userName }}</span>
                  <span>{{ user.name }}</span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </template>
      </AppTooltip>

      <div class="flex items-center justify-end gap-2 md:gap-4 ml-auto flex-1">
        <button class="rounded-full bg-border dark:bg-neutral-600 w-8 md:w-10 p-[2px]" @click="toggleColorMode">
          <div class="w-3 h-3 md:w-4 md:h-4 bg-text dark:bg-white rounded-full transition relative" :class="{
            'translate-x-[14px] md:translate-x-5': isDarkMode,
          }"></div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-comment-dots" class="text-sm md:text-[16px]" />
          <div class="notification">2</div>
        </button>
        <button class="btns-header hovered">
          <icon icon="fa-regular fa-bell" class="text-sm md:text-[16px]" />
          <div class="notification">14</div>
        </button>

        <NuxtLink :to="`/profile/${currentUser.id}`" class="flex items-center gap-4 px-2 hover:text-primary">
          <span class="hidden xl:block">@{{ currentUser.userName }}</span>
          <img class="w-8 h-8 md:w-10 md:h-10 bg-neutral-200 rounded-full" :src="getImgUrl(currentUser.photo)"
            :alt="currentUser.name"></img>
        </NuxtLink>

      </div>
    </header>

    <NuxtPage class="mt-2 md:mt-6 2xl:mt-8 flex-1" />
  </div>
</template>
<style scoped>
.btns-header {
  @apply w-12 h-8 rounded-full flex items-center justify-center relative;
}

.notification {
  @apply absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-red-600 rounded-full leading-none px-2 py-1 text-[10px] md:text-xs flex items-center text-white;
}
</style>
