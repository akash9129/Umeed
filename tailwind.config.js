/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kashi: {
          dark: '#08172E',
          indigo: '#0E2445',
          navy: '#15325B',
          saffron: {
            DEFAULT: '#F97316',
            light: '#FB923C',
            dark: '#C2410C',
          },
          marigold: {
            DEFAULT: '#F59E0B',
            light: '#FBBF24',
            warm: '#D97706',
            soft: '#FEF3C7',
          },
          sand: '#FAF6EE',
          cream: '#FFFDF9',
          terracotta: '#B45309',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-marigold': '0 0 30px rgba(245, 158, 11, 0.35)',
        'glow-saffron': '0 0 30px rgba(249, 115, 22, 0.3)',
        'premium': '0 12px 35px -8px rgba(8, 23, 46, 0.12), 0 4px 10px -3px rgba(8, 23, 46, 0.05)',
        'floating': '0 20px 40px -10px rgba(8, 23, 46, 0.25)',
      }
    },
  },
  plugins: [],
}
