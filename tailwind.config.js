/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FCF9EE',
          100: '#F7F0D4',
          200: '#EEDEA6',
          300: '#E4CA78',
          400: '#DAB64A',
          500: '#C99E28',
          600: '#A97E1C',
          700: '#835C15',
          800: '#604113',
          900: '#422C10',
        },
        forest: {
          950: '#040B07',
          900: '#07130D',
          800: '#112216',
          700: '#18291C',
          600: '#263E2C',
          500: '#3D5C43',
        },
        ocean: {
          950: '#020B10',
          900: '#061722',
          800: '#0A2330',
          700: '#0D364A',
          600: '#085C7D',
          500: '#087C9C',
          400: '#15A8D1',
        },
        earth: {
          900: '#1E1B18',
          800: '#2F2B26',
          700: '#48423B',
          600: '#686055',
          500: '#8C8274',
          400: '#B0A798',
          300: '#D5CEC2',
          200: '#EAE6DD',
          100: '#F5F3EE',
          50: '#FAF9F6',
        }
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
