/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          400: '#36bffa', 500: '#0ca5eb', 600: '#0086c9',
          700: '#016aa3', 800: '#065986', 900: '#0b4a6f',
        },
        lumen: { 400: '#facc15', 500: '#eab308' },
      },
    },
  },
  plugins: [],
};
