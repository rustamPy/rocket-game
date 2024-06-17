/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customColor: {
          'ORANGE': '#dca828', // Replace with your custom hex color
          'BLUE': '#1f2937',
          'DEFAULT': '#2391FF', // You can define different shades here if needed
          'dark': '#004080',
        },
      },
    },
  },
  plugins: [],
};
