import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkModeStore", () => {
  const isDarkMode = ref(false);

  function toggleColorMode() {
    if (localStorage.getItem("app-theme") === "dark") {
      isDarkMode.value = false;
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("app-theme");
    } else {
      isDarkMode.value = true;
      document.documentElement.classList.add("dark");
      localStorage.setItem("app-theme", "dark");
    }
  }

  function setColorMode() {
    if (localStorage.getItem("app-theme") === "dark") {
      isDarkMode.value = true;
      document.documentElement.classList.add("dark");
    } else {
      isDarkMode.value = false;
      document.documentElement.classList.remove("dark");
    }
  }
  return {
    toggleColorMode,
    setColorMode,
    isDarkMode,
  };
});
