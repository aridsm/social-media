/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F6F6F6",
        base2: "#F5F5F5",
        border: "#E1E1E1",
        primary: "#9793F0",
        text: "#3C3C49",
        label: "#A5A5A5",
        "dark-border": "#575454",
        neutral: {
          600: "#403F3F",
          700: "#333333",
        },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
