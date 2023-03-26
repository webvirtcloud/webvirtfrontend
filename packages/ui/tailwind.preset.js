// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
