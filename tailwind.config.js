// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./*.html', './src/**/*.css', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
      textColor: {
        body: 'var(--color-text-body)',
      },
      backgroundColor: {
        body: 'var(--color-bg-body)',
        'control-default': 'var(--color-bg-control-default)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
