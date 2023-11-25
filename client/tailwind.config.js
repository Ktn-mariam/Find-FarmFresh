/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './src/**/*.{html,js,jsx,tsx,ts}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '56': '234px',
        '68': '272px',
        '88': '340px',
        '98': '500px',
        '110': '740px',
        '112': '660px',
        '100': '800px',
      },
      gridTemplateColumns: {
        '14': 'repeat(14, 1fr)',
      },
      height: {
        '30': '120px',
        '68': '272px',
        '76': '290px',
        '110': '470px',
      },
      colors: {
        lightGrey: '#f8f9fa',
        black: '#1F2421',
        blue: '#216869',
        green: '#49A078',
        'light-green': '#9CC5A1',
        grey: '#DCE1DE',
        ashGrey: '#E7EBE9',
        lightGreen: '#2b9348',
        mintCream: '#E1F5E7',
        celadon: '#B7E4C7',
        // NEW COLOURS I WILL BE USING
        night: '#0D0A0B', // black
        charcoal: '#454955', //grey
        coolGray: '#9C9CA5',
        frenchGray: '#C8C6CD',
        platinum: '#DEDBE1',
        beige: '#DBE4CD',
        magnolia: '#F3EFF5', //cream
        teaGreen1: '#D3E0BF', //lighest
        teaGreen2: '#C3D8A4',
        pistachio1: '#B3D089',
        pistachio2: '#A3C86E',
        pistachio3: '#93C053',
        appleGreen: '#72B01D',
        asparagus: '#679E1A',
        officeGreen: '#3F7D20', //darkest
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
})
