/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      height: {
        '30': '120px',
      },
      colors: {
        lightGrey: '#f8f9fa',
        black: '#1F2421',
        blue: '#216869',
        green: '#49A078',
        'light-green': '#9CC5A1',
        grey: '#DCE1DE',
        ashGrey: '#E7EBE9',
      },
      fontFamily: {
        workSans: ['Work Sans', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        noto: ['Noto Sans Linear B', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
