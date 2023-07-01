/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#00B4BD",
          secondary: "#3a82ee",
          accent: "#AB1B2F",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#a8c7eb",
          success: "#67daac",
          warning: "#fbb36a",
          error: "#e4695e",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#00B4BD",
          secondary: "#3a82ee",
          accent: "#AB1B2F",
          info: "#a8c7eb",
          success: "#67daac",
          warning: "#fbb36a",
          error: "#e4695e",
        },
      },
    ],
  },
};
