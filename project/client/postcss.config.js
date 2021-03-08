module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('./tailwind.js'),
    require('autoprefixer'),
  ],
}
