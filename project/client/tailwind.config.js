const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: colors.violet[600],
      },
    },
  },
}
