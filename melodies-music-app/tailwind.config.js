import lineClamp from '@tailwindcss/line-clamp';
import scrollbarHide from 'tailwind-scrollbar-hide';

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [lineClamp, scrollbarHide],
};
