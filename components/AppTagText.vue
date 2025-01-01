<script lang="tsx" setup>
import { type PropType } from "vue";
import AppSelectionInput from "./AppSelectionInput.vue";
import { useUsersStore } from "~/utils/users/useUsersStore";

const { searchUsers } = useUsersStore();
defineProps({
  iconName: String,
  placeholder: {
    type: String,
    default: "Write...",
  },
  contentClass: String,
  error: String,
  label: String,
  color: {
    type: String as PropType<"base" | "sec">,
    default: "base",
  },
  disabled: Boolean,
  action: {
    type: Function as PropType<() => void>,
  },
});

const autotext = ref<HTMLDivElement | null>(null);
const container = ref<HTMLDivElement | null>(null);
const router = useRouter();

const modelValue = defineModel<string>({ required: true });
const selectionShown = ref(false);

const users = computed(() => searchUsers(searchValue.value));
const prevValue = ref(modelValue.value);
const showPlaceholder = ref(!modelValue.value.length);
const tagMatch = ref({
  match: "",
  index: -1,
});

const TAGModelValue = ref();
const searchValue = ref("");
const selectionComponent = ref();

watch(
  () => modelValue.value,
  () => {
    if (autotext.value) {
      autotext.value.innerHTML = modelValue.value;
      showPlaceholder.value = !modelValue.value.length;
    }
  }
);

onMounted(() => {
  onFormatTextContent(modelValue.value);
});

function removeLastOccurrence(str: string, subStr: string) {
  const index = str.lastIndexOf(subStr);

  if (index === -1) {
    return str;
  }

  return str.substring(0, index) + str.substring(index + subStr.length);
}

function onSelectUser(_: any, item: any) {
  appendTag({
    text: item.name,
    value: item.id,
    index: tagMatch.value.index,
  });

  const innerHTML = decodeHTMLEntity(autotext.value!.innerHTML);

  const strSliced = innerHTML.slice(0, tagMatch.value.index);
  const newStr = removeLastOccurrence(strSliced, tagMatch.value.match);

  onFormatTextContent(newStr + innerHTML.slice(tagMatch.value.index));
  modelValue.value = decodeHTMLEntity(autotext.value!.innerHTML);

  TAGModelValue.value = undefined;
  prevValue.value = modelValue.value;
}

function appendTag({
  value,
  text,
  index,
}: {
  value: string;
  text: string;
  className?: string;
  index?: number;
}) {
  if (autotext.value) {
    const span = document.createElement("span");
    span.addEventListener("click", () => router.push(`/profile/${value}`));
    span.setAttribute("contenteditable", "false");
    span.setAttribute("title", text);
    span.setAttribute("data-value", value);
    span.className =
      "text-white bg-pink-500 px-3 py-1 rounded-md cursor-pointer hover:opacity-90 active:opacity-80 text-nowrap";
    span.innerText = `@${text}`;

    if (index === undefined) {
      autotext.value.appendChild(span);
    } else {
      const decodedStr = decodeHTMLEntity(autotext.value.innerHTML);
      const newStr = insertString(decodedStr, span.outerHTML, index);
      autotext.value.innerHTML = newStr;
      onFormatTextContent(newStr);
    }
  }
}

function onFormatTextContent(str: string) {
  if (!autotext.value) return;

  const regexSpanContent = /<span[^>]*>@(.*?)<\/span>/g; // captura o conteúdo de dentro da span
  const regexSpan = /(<span[^>]*>.*?<\/span>)/g;
  const regexValue = /data\-value="([^"]*)"/;

  // separa a string em seções de strings de texto normal e strings de spans (["string", "<span ...></span>", "string"])
  const sections = str.split(regexSpan).filter((sec) => sec !== "");
  const sectionsLength = sections?.length;

  autotext.value.innerText = "";

  for (let i = 0; i < sectionsLength; i++) {
    const section = sections[i];
    const match = regexSpanContent.exec(section)?.[1]; // o conteúdo dentro da tag span (<span ...>conteúdo</span>)
    if (match) {
      //  se a seção for um span, adiciona a tag formatada
      const valueContent = section.match(regexValue)?.[1];
      appendTag({
        text: match,
        value: valueContent || "",
      });
    } else {
      // se for um texto comum, adiciona o texto
      const text = document.createTextNode(section);
      autotext.value?.appendChild(text);
    }
  }
}

function onInput() {
  if (autotext.value!.innerHTML === "<br>") {
    autotext.value!.innerHTML = "";
    checkShowPlaceholder();
    return;
  }

  checkShowPlaceholder();

  const innerHTML = decodeHTMLEntity(autotext.value!.innerHTML);

  const index = getStringIndexDifference(prevValue.value, innerHTML);
  prevValue.value = innerHTML;
  const strSliced = innerHTML.slice(0, index + 1);

  const mentionRegex = /@[\w]*\s?$/;
  const match = strSliced.match(mentionRegex);
  if (match) {
    searchValue.value = match[0].replace("@", "");
    tagMatch.value = {
      index: index + 1,
      match: match[0],
    };
    selectionShown.value = true;
  }
}

function insertString(str: string, value: string, index: number) {
  return str.slice(0, index) + value + str.slice(index);
}

function getStringIndexDifference(str1: string, str2: string) {
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      return i;
    }
  }

  if (str1.length !== str2.length) {
    return minLength;
  }

  return -1;
}

function decodeHTMLEntity(str: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

function checkShowPlaceholder() {
  if (autotext.value?.innerHTML.length) {
    showPlaceholder.value = false;
  } else {
    showPlaceholder.value = true;
  }
}

function onBlur() {
  modelValue.value = decodeHTMLEntity(autotext.value!.innerHTML);
  checkShowPlaceholder();
}
</script>
<template>
  <div ref="container" class="relative w-full">
    <span v-if="label" class="block mb-1 text-zinc-400">
      {{ label }}
    </span>
    <div
      ref="autotext"
      :contenteditable="!disabled"
      :placeholder="showPlaceholder ? placeholder : ''"
      class="input-styles autotext rounded-lg w-full max-h-28 overflow-auto leading-7 relative"
      :class="[
        contentClass,
        {
          'bg-base dark:bg-neutral-800': color === 'base',
          'bg-white dark:bg-transparent': color === 'sec',
          '!bg-transparent h-min !px-0 !py-1': disabled,
          'border border-zinc-200 dark:border-zinc-500/[.4]': !disabled,
        },
      ]"
      @keypress.enter.prevent
      @input="onInput"
      @blur="onBlur"
    ></div>
    <AppSelectionInput
      v-model="TAGModelValue"
      v-model:show="selectionShown"
      :list="users"
      @select="onSelectUser"
    >
      <template #activator></template>
    </AppSelectionInput>

    <button
      v-if="action"
      class="absolute top-[7px] right-2 2xl:right-3 text-sm rounded-full hovered w-8 h-8 2xl:w-10 2xl:h-10 flex justify-center items-center"
      @click="action"
    >
      <icon icon="fa-regular fa-paper-plane" />
    </button>
    <icon
      v-if="iconName"
      :icon="iconName"
      class="absolute top-[10px] 2xl:top-[14px] right-5 text-sm 2xl:text-lg"
    />

    <span v-if="error" class="text-red-400 mt-2 block text-sm">{{
      error
    }}</span>
  </div>
</template>

<style scoped>
.input-styles {
  @apply placeholder:text-zinc-400 dark:placeholder:text-neutral-400  px-3 2xl:px-5 py-2 2xl:py-3 text-zinc-600 dark:text-white focus:outline-none focus:outline-2 focus:outline-indigo-500 w-full;
  font-size: inherit !important;
}

.padding-icon {
  padding-right: 2.5rem !important;
}

.selected {
  @apply text-white bg-indigo-500 px-3 py-1 rounded-md;
}

.autotext::before {
  content: attr(placeholder);
  @apply text-zinc-400;
}
</style>
