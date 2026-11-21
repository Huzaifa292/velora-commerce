/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        velora: {
          ivory: '#F8F6F1',
          white: '#FFFFFF',
          black: '#111111',
          charcoal: '#242424',
          beige: '#D8C9B5',
          sand: '#E8DFD3',
          taupe: '#A89B8A',
          gold: '#B69A70',
          'gold-light': '#D6C09C',
          'gold-dark': '#9A7E56',
          darkBg: '#121212',
          darkSidebar: '#0D0D0D',
          darkCard: '#1C1C1C',
          darkBorder: '#2E2E2E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'luxury-hover': '0 30px 60px -20px rgba(0, 0, 0, 0.12)',
        'luxury-gold': '0 10px 30px -10px rgba(182, 154, 112, 0.3)',
        'admin-card': '0 4px 20px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
