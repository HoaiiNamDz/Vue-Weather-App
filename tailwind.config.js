module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      dropShadow: {
        'main': 'rgba(0, 0, 0, 0.6) 0.2rem 0.2rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

