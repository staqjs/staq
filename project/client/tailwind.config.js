const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [],
  prefix: 'sjs-',
  theme: {
    extend: {
      colors: {
        // primary: colors.violet[600],
        primary: colors.coolGray[900],
        secondary: colors.coolGray[800],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '2/5': '40%',
        '3/5': '60%',
      },
      minHeight: {
        sm: '400px',
        md: '800px',
        lg: '1200px',
      },
    },
  },
}
