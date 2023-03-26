/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind.preset')],
  content: [
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}