/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      colors: {
        'radar-black': '#0c0c0c',
        'warning-red': '#ff3333',
        'off-white': '#e5e5e5',
        'terminal-green': '#00ff00',
      },
      letterSpacing: {
        'tight': '-0.05em',
      },
    },
  },
  plugins: [],
};
