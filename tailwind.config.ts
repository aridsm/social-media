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
        base: "#F7F7F7",
        base2: "#F2F2F2",
        border: "#E1E1E1",
        primary: "#9793F0",
        text: "#3C3C49",
        label: "#BABABA",
      },
    },
  },
  plugins: [],
};
