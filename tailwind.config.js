/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          500: '#fbbf24',
          600: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
};