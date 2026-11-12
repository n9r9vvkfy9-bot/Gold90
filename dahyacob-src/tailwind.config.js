/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { blush: '#F9DDE6', rose: '#F2B8C9', gold: '#C9A24A', ink: '#2B2326', pearl: '#FFF8F9' },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
