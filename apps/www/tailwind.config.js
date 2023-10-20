/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('ui/tailwind.preset')],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography', require("tailwindcss-animate")),
  ],
}
