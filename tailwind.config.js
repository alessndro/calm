/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",


  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   'darkGray': '#EAEAEA',
    //   'lightGray': '#F1F2F4',
    // }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}