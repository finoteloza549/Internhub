/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36aff7',
          500: '#0c93e4',
          600: '#0275c3',
          700: '#035da0',
          800: '#074f83',
          900: '#0c426e',
          950: '#082a49',
        },
      },
    },
  },
  plugins: [],
};
