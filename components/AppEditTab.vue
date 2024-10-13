<script lang="ts" setup>
import { backgroundList } from "~/utils/images/background-list";
import { getBackgroundgUrl } from "~/utils/images/getUrlImage";
import type { Post } from "~/utils/posts/types";
import {
  Gender,
  RelationShip,
  type GeneralInformation,
  type User,
} from "~/utils/users/types";

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

const userForm = ref<User | undefined>(undefined);

const emits = defineEmits<{
  (name: "save", newData: User): void;
  (name: "back"): void;
}>();

onMounted(() => {
  userForm.value = {
    ...props.user,
    generalInformations: {
      dateOfBirth: props.user.generalInformations.dateOfBirth,
      placeOfBirth: props.user.generalInformations.placeOfBirth,
      livingIn: props.user.generalInformations.livingIn,
      gender: props.user.generalInformations.gender,
      relationShip: props.user.generalInformations.relationShip,
    },
  };
});

const modalBackgroundOpen = ref(false);
const userBackground = ref(props.user.backgroundPhoto);

const genderList = [
  {
    id: Gender.Female,
    name: "Female",
  },
  {
    id: Gender.Male,
    name: "Male",
  },
  {
    id: Gender.Other,
    name: "Other",
  },
];

const relationShipList = [
  {
    id: RelationShip.Single,
    name: "Single",
  },
  {
    id: RelationShip.InARelationShip,
    name: "In a relationship",
  },
  {
    id: RelationShip.Married,
    name: "Married",
  },
  {
    id: RelationShip.Divorced,
    name: "Divorced",
  },
  {
    id: RelationShip.Widowed,
    name: "Widowed",
  },
];
</script>

<template>
  <div v-if="userForm">
    <span class="font-bold block mb-4">Editing profile</span>

    <div class="flex flex-col gap-4 md:gap-6">
      <AppCard>
        <span class="font-bold mb-4 block">Profile data</span>
        <div>
          <AppInputText v-model="userForm.userName" label="User name" />
          <AppInputText
            v-model="userForm.name"
            label="Full name"
            class="mt-4 md:mt-6 3xl:mt-8"
          />

          <div class="mt-4 md:mt-6 3xl:mt-8">
            <span class="mb-2 block font-bold">Background</span>
            <div class="flex md:items-center gap-4 md:gap-6">
              <div
                class="flex gap-2 md:gap-4 md:items-center flex-col md:flex-row"
              >
                <div
                  class="w-24 h-12 md:w-32 md:h-16 2xl:w-40 2xl:h-20 overflow-hidden rounded-sm"
                >
                  <img
                    class="object-cover h-[100px] w-[100px] md:h-[150px] md:w-[150px] 2xl:h-[180px] 2xl:w-[180px] object"
                    :src="getBackgroundgUrl(userForm.backgroundPhoto)"
                    :alt="user.name"
                  />
                </div>
                <p>{{ user?.backgroundPhoto }}</p>
              </div>
              <AppBtn
                class="ml-auto"
                @click="
                  (modalBackgroundOpen = true),
                    (userBackground = user.backgroundPhoto)
                "
                >Change
              </AppBtn>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <span class="font-bold mb-4 block">Description</span>
        <AppInputText v-model="userForm.description" textarea />
      </AppCard>

      <AppCard>
        <span class="font-bold mb-4 block">Additional Information</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <AppInputText
            v-model="userForm.generalInformations.livingIn"
            label="Living in"
          />
          <AppSelectionInput
            v-model="userForm.generalInformations.relationShip"
            :list="relationShipList"
            clearable
            label="Relationship"
          />
          <AppInputText
            v-model="userForm.generalInformations.placeOfBirth"
            label="Place of Birth"
          />
          <AppSelectionInput
            v-model="userForm.generalInformations.gender"
            :list="genderList"
            clearable
            label="Gender"
          />
          <AppDateInput
            v-model="userForm.generalInformations.dateOfBirth"
            clearable
            label="Date of Birth"
            origin="top"
          />
        </div>
      </AppCard>

      <AppCard>
        <span class="font-bold mb-4 block">Contact Information</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <AppInputText
            v-model="userForm.contactInformations.cellphone"
            label="Cellphone"
          />
          <AppInputText
            v-model="userForm.contactInformations.phone"
            label="Phone"
          />
          <AppInputText
            v-model="userForm.contactInformations.email"
            label="E-mail"
          />
          <AppInputText
            v-model="userForm.contactInformations.instagram"
            label="Instagram"
          />
        </div>
      </AppCard>

      <div class="flex gap-4 justify-end">
        <AppBtn color="label" @click="emits('back')">Cancel</AppBtn>
        <AppBtn @click="emits('save', userForm)">Confirm</AppBtn>
      </div>

      <AppModal v-model:open="modalBackgroundOpen">
        <AppProfileCard
          :user="{ ...user, backgroundPhoto: userBackground }"
          :posts="posts"
          disabled
        />
        <div class="pt-6">
          <span class="font-bold mb-2 2xl:mb-4 block">Background options</span>
          <div
            class="gap-3 2xl:gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[18rem] sm:max-h-full overflow-auto"
          >
            <button
              v-for="background in backgroundList"
              :key="background"
              class="h-20 sm:w-32 sm:h-16 2xl:w-40 2xl:h-20 overflow-hidden border-4 rounded-md transition"
              :class="{
                'border-text dark:border-white ': background === userBackground,
                'border-transparent opacity-70 hover:opacity-100':
                  background !== userBackground,
              }"
              @click="userBackground = background"
            >
              <img
                class="object-cover h-[150px] w-[150px] 2xl:h-[180px] 2xl:w-[180px] object"
                :src="getBackgroundgUrl(background)"
                :alt="background"
              />
            </button>
          </div>
        </div>
        <div class="mt-4 2xl:mt-8 flex gap-4 justify-end">
          <AppBtn @click="modalBackgroundOpen = false" color="label">
            Cancel
          </AppBtn>
          <AppBtn
            @click="
              (userForm.backgroundPhoto = userBackground),
                (modalBackgroundOpen = false)
            "
            >Confirm
          </AppBtn>
        </div>
      </AppModal>
    </div>
  </div>
</template>
