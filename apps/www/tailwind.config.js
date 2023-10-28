/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('ui/tailwind.preset')],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography', require("tailwindcss-animate")),
  ],
}
