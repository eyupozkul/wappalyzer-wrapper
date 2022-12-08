/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#f2f2f2",
        "url-input-border": "#d2d2d2",
        "analyse-button-color": "#4352d1",
      },
    },
  },
};
