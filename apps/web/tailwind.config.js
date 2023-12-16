/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('ui/tailwind.preset')],
  content: [
    './*.html',
    './src/**/*.{ts,tsx,mdx}',
    '../../packages/ui/components/**/*.{ts,tsx}',
  ],
};
