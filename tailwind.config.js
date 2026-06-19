/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.njk", "./src/**/*.html", "./src/**/*.md"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Paytone One"', 'sans-serif'],
        body: ['"Comfortaa"', 'sans-serif'],
      },
      colors: {
        // Orange — main brand/CTA color, pulled from the pizza crust
        primary: {
          50:  '#FFF5EE',
          100: '#FFE6D0',
          200: '#FFC89E',
          300: '#FFA265',
          400: '#FF7530',
          500: '#E8571A',
          600: '#CC4510',
          700: '#A8340A',
          800: '#852608',
          900: '#621A05',
          950: '#3D0F02',
        },
        // Warm dark charcoal — for header, footer, dark text
        secondary: {
          50:  '#F5F0EE',
          100: '#EDE4E0',
          200: '#D4C4BE',
          300: '#B49890',
          400: '#8C6860',
          500: '#5C3E38',
          600: '#3D2820',
          700: '#1C1410',
          800: '#14100C',
          900: '#0D0B08',
          950: '#080604',
        },
        // Purple — from the "Grande" text outline
        accent: {
          50:  '#F7EEFB',
          100: '#EDD8F7',
          200: '#D9AEEE',
          300: '#BE7EE2',
          400: '#9F4ED3',
          500: '#7B2FA0',
          600: '#622480',
          700: '#4A1A60',
          800: '#321240',
          900: '#1E0B26',
          950: '#0F0514',
        },
        // Yellow/gold — from the cheese and oval background
        gold: {
          50:  '#FFFBEB',
          100: '#FFF3C4',
          200: '#FFE680',
          300: '#FFD740',
          400: '#F5C800',
          500: '#D4AA00',
          600: '#A88600',
          700: '#7A6000',
          800: '#4D3C00',
          900: '#261E00',
          950: '#130F00',
        },
        // Cream — warm off-white for light section backgrounds
        cream: {
          50:  '#FFFDF8',
          100: '#FFF8EE',
          200: '#FEEEDD',
          300: '#FDE0C0',
          400: '#FBCE9A',
          500: '#F5B870',
        },
      },
    },
  },
  plugins: [],
};
