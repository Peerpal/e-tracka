/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FDC80D',
        'primary-light': '#F2DD6F',
        'alt': '#DCD49F'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
