/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mulish: ["var(--font-mulish)", "sans-serif"],
    },
    fontWeight: {
      light: "300",
      normal: "400",
      bold: "700",
    },
    colors: {
      yellow: "#FFD814",
      bluish: "#007185",
      black: "#0F1111",
      red: "#B12704",
      successgreen: "#007600",
      darkgreen: "#067D62",
    },
    extend: {},
  },
  plugins: [],
};
