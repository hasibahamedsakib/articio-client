/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      hotPink: "#ff6899",
      orchid: "#d86fe7",
    },

    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
