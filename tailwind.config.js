/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'fintrack-purple': '#8477e4', 
        'fintrack-pink-light': '#efeefc',
        'fintrack-pink-dark': '#e584ee',
        'fintrack-bg': '#f8faff',
      }
    },
  },
  plugins: [],
}