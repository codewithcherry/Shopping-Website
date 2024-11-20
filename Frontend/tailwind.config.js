/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./src/assets/index.html"
  ],
  theme:{
    extend: {
      keyframes: {
        grow: {
          '0%': { width: '0%' },
          '25%': { width: '20%' },
          '50%': { width: '40%' },
          '75%': { width: '60%' },
          '100%': { width: '80%' },
        },
      },
      animation: {
        grow: 'grow 0.5s ease-in-out forwards', // Add "forwards" to retain final state
      },
    },
  },
  plugins: [],
}