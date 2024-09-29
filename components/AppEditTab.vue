<script lang="ts" setup>
import { backgroundList } from '~/utils/images/background-list';
import { getBackgroundgUrl } from '~/utils/images/getUrlImage';
import type { Post } from '~/utils/posts/types';
import { Gender, RelationShip, type GeneralInformation, type User } from '~/utils/users/types';

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    },
    posts: {
        type: Object as PropType<Post[]>,
        required: true
    },
})

const userForm = ref<User | undefined>(undefined)

const emits = defineEmits<{
    (name: 'save', newData: User): void
}>()

onMounted(() => {
    userForm.value = {
        ...props.user, generalInformations: {
            dateOfBirth: props.user.generalInformations.dateOfBirth,
            placeOfBirth: props.user.generalInformations.placeOfBirth,
            livingIn: props.user.generalInformations.livingIn,
            gender: props.user.generalInformations.gender,
            relationShip: props.user.generalInformations.relationShip,
        }
    }
})

const modalBackgroundOpen = ref(false)
const userBackground = ref(props.user.backgroundPhoto)

const genderList = [
    {
        id: Gender.Female,
        name: 'Female'
    },
    {
        id: Gender.Male,
        name: 'Male'
    },
    {
        id: Gender.Other,
        name: 'Other'
    }
]

const relationShipList = [
    {
        id: RelationShip.Single,
        name: 'Single'
    },
    {
        id: RelationShip.InARelationShip,
        name: 'In a relationship'
    },
    {
        id: RelationShip.Married,
        name: 'Married'
    },
    {
        id: RelationShip.Divorced,
        name: 'Divorced'
    },
    {
        id: RelationShip.Widowed,
        name: 'Widowed'
    },
]
</script>

<template>
    <div v-if="userForm" class="flex flex-col gap-8">
        <span class="font-bold block">Editing profile</span>


        <AppCard>
            <span class="font-bold mb-4 block">Profile data</span>
            <div>
                <AppInputText v-model="userForm.name" label="Full name" />

                <div class=" mt-8">
                    <span class="mb-2 block text-primary font-bold">Background</span>
                    <div class="flex items-center gap-8">
                        <div class="w-40 h-20 overflow-hidden">
                            <img class="object-cover h-[180px] w-[180px] object"
                                :src="getBackgroundgUrl(userForm.backgroundPhoto)" :alt="user.name" />
                        </div>
                        <p>{{ user?.backgroundPhoto }}</p>
                        <AppBtn class="ml-auto"
                            @click="modalBackgroundOpen = true, userBackground = user.backgroundPhoto">Change</AppBtn>
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
            <div class="grid grid-cols-2 gap-8">
                <AppInputText v-model="userForm.generalInformations.livingIn" label="Living in" />
                <AppSelectionInput v-model="userForm.generalInformations.relationShip" :list="relationShipList"
                    label="Relationship" />
                <AppInputText v-model="userForm.generalInformations.placeOfBirth" label="Place of Birth" />
                <AppSelectionInput v-model="userForm.generalInformations.gender" :list="genderList" label="Gender" />
                <AppInputText v-model="userForm.generalInformations.dateOfBirth" label="Date of Birth" />
            </div>
        </AppCard>

        <div class="flex gap-4 justify-end">
            <AppBtn color="label">Cancel</AppBtn>
            <AppBtn @click="emits('save', userForm)">Confirm</AppBtn>
        </div>

        <AppModal v-model:open="modalBackgroundOpen" content-class="w-[45vw]">
            <AppProfileCard :user="{ ...user, backgroundPhoto: userBackground }" :posts="posts" disabled />
            <div class="pt-10">
                <span class="font-bold mb-4 block">Background options</span>
                <div class="gap-4 grid grid-cols-5">
                    <button v-for="background in backgroundList" :key="background"
                        class="w-40 h-20 overflow-hidden border-4 rounded-md transition" :class="{
                            'border-text dark:border-white ': background === userBackground,
                            'border-transparent opacity-70 hover:opacity-100': background !== userBackground,
                        }" @click="userBackground = background">
                        <img class="object-cover h-[180px] w-[180px] object" :src="getBackgroundgUrl(background)"
                            :alt="background" />
                    </button>
                </div>
            </div>
            <div class="mt-8 flex gap-4 justify-end">
                <AppBtn @click="modalBackgroundOpen = false" color="label">Cancel</AppBtn>
                <AppBtn @click="userForm.backgroundPhoto = userBackground, modalBackgroundOpen = false">Confirm</AppBtn>
            </div>
        </AppModal>
    </div>
</template>