module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/assets/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    maxWidth: {
      'half': '50%',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
