/** @type {import('tailwindcss').Config} */
module.exports = {
  // presets: [require('ui/preset')],
  content: [
    "./stories/**/*.{ts,tsx,mdx}",
    "../../packages/ui/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}