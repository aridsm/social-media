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
        base: "#F4F4F4",
        base2: "#F5F5F5",
        "dark-border": "#575454",
        zinc: {
          600: "#3D3D42",
          700: "#333337",
        },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
