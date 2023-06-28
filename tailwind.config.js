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
        mytheme: {
          primary: "#3a82ee",
          secondary: "#00B4BE",
          accent: "#f4a564",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#a8c7eb",
          success: "#67daac",
          warning: "#fbb36a",
          error: "#e4695e",
        },
      },
      "dark",
    ],
  },
};
