/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['AlegreyaSansSC', 'sans-serif'],
        custom4: ['RetroGaming', 'sans-serif'],
      }
    }
  },
  plugins: [],
}