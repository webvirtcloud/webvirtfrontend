/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('ui/tailwind.preset')],
  content: ['./*.html', './src/**/*.css', './src/**/*.{ts,tsx,mdx}'],
};
