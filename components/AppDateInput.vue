<script lang="ts" setup>
import dayjs from "dayjs";
import type { PropType } from "vue";

defineProps({
  placeholder: String,
  contentClass: String,
  label: String,
  color: {
    type: String as PropType<"base" | "sec">,
    default: "base",
  },
  clearable: Boolean,
  origin: {
    type: String as PropType<"bottom" | "top">,
    default: "bottom",
  },
  position: {
    type: String as PropType<"right" | "left">,
    default: "right",
  },
});

const maxYear = dayjs(new Date()).get("year");
const minYear = 1910;

const weekDayNames = [
  {
    index: 0,
    name: "Sunday",
    abbr: "S",
  },
  {
    index: 1,
    name: "Monday",
    abbr: "M",
  },
  {
    index: 2,
    name: "Tuesday",
    abbr: "S",
  },
  {
    index: 3,
    name: "Wednesday",
    abbr: "W",
  },
  {
    index: 4,
    name: "Thrusday",
    abbr: "T",
  },
  {
    index: 5,
    name: "Friday",
    abbr: "F",
  },
  {
    index: 6,
    name: "Saturday",
    abbr: "S",
  },
];

const monthNames: any = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const years = ref<{ id: number; name: string }[]>([]);

const modelValue = defineModel<Date | string | null | undefined>({
  required: true,
});

const selectedDate = ref<Date | string | null | undefined>();

const selectedYear = computed({
  get: () => dateData.value.year,
  set: (year) => {
    selectedDate.value = dayjs(selectedDate.value).set("year", year).toString();
  },
});

const dateData = computed(() => ({
  day: dayjs(selectedDate.value).date(),
  month: dayjs(selectedDate.value).month(),
  year: dayjs(selectedDate.value).year(),
  weekDay: dayjs(selectedDate.value).day(),
  daysInMonth: dayjs(selectedDate.value).daysInMonth(),
  firstDay: dayjs(selectedDate.value).startOf("month"),
  lastDay: dayjs(selectedDate.value).endOf("month"),
}));

const daysInMonthList = computed(() => {
  const days = [];

  const fillCalendar = 6 - dateData.value.lastDay.$W;

  const totalDaysInCalendar =
    dateData.value.firstDay.$W + dateData.value.daysInMonth + fillCalendar;

  const monthBefore = dayjs(selectedDate.value).subtract(1, "month").toString();
  const totalDaysMonthBefore = dayjs(monthBefore).daysInMonth();

  let i = 1;
  while (i <= totalDaysInCalendar) {
    let disabled = false;
    let value = i - dateData.value.firstDay.$W;

    if (i <= dateData.value.firstDay.$W) {
      value = totalDaysMonthBefore - dateData.value.firstDay.$W + i;
      disabled = true;
    }

    if (i > dateData.value.firstDay.$W + dateData.value.daysInMonth) {
      value = i - (dateData.value.firstDay.$W + dateData.value.daysInMonth);
      disabled = true;
    }

    days.push({
      id: i,
      disabled,
      value,
    });

    ++i;
  }

  return days;
});

onMounted(() => {
  selectedDate.value = modelValue.value || new Date();

  const currentYear = dayjs(new Date()).get("year");

  for (let i = currentYear; i >= minYear; i--) {
    years.value.push({
      id: i,
      name: i.toString(),
    });
  }
});

function setMonthDay(day: number) {
  selectedDate.value = dayjs(selectedDate.value).set("date", day).toString();
}

function onSelectMonthBefore() {
  const monthBefore = dayjs(selectedDate.value).subtract(1, "month");

  if (monthBefore.$y >= minYear) {
    selectedDate.value = monthBefore.toString();
  }
}

function onSelectMonthAfter() {
  const monthAfter = dayjs(selectedDate.value).add(1, "month");
  if (monthAfter.$y <= maxYear) {
    selectedDate.value = monthAfter.toString();
  }
}
</script>
<template>
  <div class="relative">
    <span v-if="label" class="block mb-1 text-label">{{ label }}</span>

    <AppTooltip class="relative" :origin="origin">
      <template #activator="{ open, isOpen }">
        <button
          class="input-styles pr-10 flex items-center"
          :class="[
            {
              'bg-base dark:bg-neutral-600': color === 'base',
              'bg-white dark:bg-neutral-700': color === 'sec',
            },
            contentClass,
          ]"
          @click="open"
        >
          <span v-if="modelValue" class="mr-auto">{{
            dayjs(modelValue).format("MM/DD/YYYY")
          }}</span>
          <span v-else class="mr-auto text-label">{{
            placeholder || "Select..."
          }}</span>
          <button
            v-if="clearable && modelValue"
            @click.stop="modelValue = null"
            class="hovered w-5 h-5 rounded-full flex items-center justify-center mr-4"
          >
            <icon icon="fa-solid fa-xmark" class="text-label text-md" />
          </button>
          <icon
            icon="fa-solid fa-chevron-down"
            class="text-primary transition"
            :class="{ 'rotate-90': isOpen }"
          />
        </button>
      </template>

      <template #default="{ close }">
        <div class="px-2 py-4 w-[280px] md:w-[380px]">
          <div class="flex items-center justify-between mb-4 pl-3">
            <div class="flex gap-3 items-center">
              <span>{{ monthNames[dateData.month] }}</span>

              <AppSelectionInput v-model="selectedYear" :list="years" />
            </div>
            <div class="flex">
              <AppBtn
                color="transparent"
                @click="onSelectMonthBefore"
                class="text-xs"
              >
                <icon icon="fa-solid fa-chevron-left" />
              </AppBtn>
              <AppBtn
                color="transparent"
                class="text-xs"
                @click="onSelectMonthAfter"
              >
                <icon icon="fa-solid fa-chevron-right" />
              </AppBtn>
            </div>
          </div>
          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="weekDayName in weekDayNames"
              :key="weekDayName.index"
              class="flex items-center justify-center p-2 text-label"
            >
              {{ weekDayName.abbr }}
            </div>
            <button
              v-for="monthDay in daysInMonthList"
              :key="monthDay.id"
              class="p-1 md:p-2 rounded-md"
              :disabled="monthDay.disabled"
              :class="{
                'bg-primary dark:bg-indigo-500 text-white':
                  dateData.day === monthDay.value && !monthDay.disabled,
                'text-label': monthDay.disabled,
              }"
              @click="setMonthDay(monthDay.value)"
            >
              {{ monthDay.value }}
            </button>
          </div>
          <AppBtn
            class="mt-4 mx-auto"
            @click="(modelValue = selectedDate), close()"
          >
            Select date
          </AppBtn>
        </div>
      </template>
    </AppTooltip>
  </div>
</template>

<style>
.input-styles {
  @apply placeholder:text-label dark:placeholder:text-neutral-400 border border-border dark:border-dark-border px-4 py-2 2xl:py-3 rounded-md text-text dark:text-white focus:outline-primary dark:focus:outline-indigo-500 focus:outline-none w-full text-sm;
}
</style>
