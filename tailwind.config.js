/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "var(--color_default)",
        gray: "var(--color_gray)",
        brown: "var(--color_brown)",
        orange: "var(--color_orange)",
        yellow: "var(--color_yellow)",
        green: "var(--color_green)",
        blue: "var(--color_blue)",
        purple: "var(--color_purple)",
        pink: "var(--color_pink)",
        red: "var(--color_red)",
      },
      backgroundColor: {
        default: "var(--color_default_background)",
        gray: "var(--color_gray_background)",
        brown: "var(--color_brown_background)",
        orange: "var(--color_orange_background)",
        yellow: "var(--color_yellow_background)",
        green: "var(--color_green_background)",
        blue: "var(--color_blue_background)",
        purple: "var(--color_purple_background)",
        pink: "var(--color_pink_background)",
        red: "var(--color_red_background)",
      },
    },
  },
  plugins: [],
};
