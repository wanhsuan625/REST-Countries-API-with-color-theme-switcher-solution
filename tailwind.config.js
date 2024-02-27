/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs' : '576px',
        '2xl' : '1440px',
      },
      spacing: {
        '4.5' : '1.125rem',
        '7.5' : '1.875rem',
        '17' : '4.25rem',
        '18.5' : '4.625rem',
        '19' : '4.75rem',
        '25' : '6.25rem',
        '50' : '12.5rem',
        '120' : '30rem',
      },
      colors: {
        'light-gray' : '#e0e0e0',
      }
    },
  },
  plugins: [],
}

