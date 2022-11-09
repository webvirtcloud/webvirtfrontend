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
        alt: 'var(--color-text-alt)',
        alt2: 'var(--color-text-alt2)',
      },
      backgroundColor: {
        body: 'var(--color-bg-body)',
        base: 'var(--color-bg-base)',
        alt: 'var(--color-bg-alt)',
        alt2: 'var(--color-bg-alt2)',

        input: 'var(--color-bg-input)',

        'interactive-hover': 'var(--color-bg-interactive-hover)',

        'control-default': 'var(--color-bg-control-default)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
