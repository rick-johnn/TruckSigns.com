/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#1e3a5f',
          50: '#f0f5fa',
          100: '#dce7f3',
          200: '#c1d5e9',
          300: '#97bad9',
          400: '#6696c4',
          500: '#4478af',
          600: '#365f94',
          700: '#1e3a5f',
          800: '#1a3352',
          900: '#0f2744',
          950: '#0a1a2e',
        },
        'usa-red': {
          DEFAULT: '#b91c1c',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
