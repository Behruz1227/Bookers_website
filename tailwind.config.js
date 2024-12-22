/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Barcha komponentlar uchun Tailwindni faollashtiring
  ],
  theme: {
    fontFamily: {
      manrope: ['Manrope', 'sans-serif'],
    },
  },
  plugins: [],
};
