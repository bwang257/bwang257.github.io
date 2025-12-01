/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      colors: {
        'wpi-crimson': 'rgb(220, 50, 50)',
        'charcoal': '#0f0f10',
      },
    },
  },
  plugins: [],
};
