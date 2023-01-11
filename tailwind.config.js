/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mulish: ["var(--font-mulish)", "sans-serif"],
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      bold: "700",
    },
    colors: {
      yellow: "#FFD814",
      bluish: "#007185",
      black: "#0F1111",
      red: "#B12704",
      successgreen: "#007600",
      darkgreen: "#067D62",
      grey: "#DDDDDD",
      white: "#FFFFFF",
    },
    extend: {
      screens: {
        xs: "320px",
        xxs: "290px",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
