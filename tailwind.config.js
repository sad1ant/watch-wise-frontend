/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#2d2d3a',
        'light-purple': '#6a1b9a',
        'dark-hover-purple': '#4a0072',
      }
    },
  },
  plugins: []
}

