/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#3b82f6', // Electric Blue
          hover: '#2563eb',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#000000',
            '[class~="lead"]': {
              color: '#000000',
            },
            a: {
              color: '#3b82f6',
              textDecoration: 'underline',
              '&:hover': {
                color: '#2563eb',
              },
            },
            code: {
              color: '#000000',
              backgroundColor: '#f5f5f5',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontFamily: 'JetBrains Mono',
            },
            pre: {
              backgroundColor: '#000000',
              color: '#ffffff',
              fontFamily: 'JetBrains Mono',
            },
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
