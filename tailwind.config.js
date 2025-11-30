/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
      },

      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 10s ease-in-out infinite',
        pulseGlowSlow: 'pulseGlow 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
