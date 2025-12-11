/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",  // purple
        secondary: "#10B981", // green
      }
    },
  },
  plugins: [],
};
