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
        base: "#F6F7F0",
        base2: "#F5F6EF",
        border: "#E2E4D0",
        primary: "#9793F0",
        text: "#3C3C49",
        label: "#9393B5",
      },
    },
  },
  plugins: [],
};
