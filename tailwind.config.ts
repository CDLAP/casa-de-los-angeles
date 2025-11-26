import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Casa de los Ángeles - RENOVADA
        gold: {
          DEFAULT: '#C9A961',
          light: '#E4D4A8',
          dark: '#A08447',
          50: '#FBF9F3',
          100: '#F5EFE0',
          200: '#EBE0C2',
          300: '#E4D4A8',
          400: '#D4BC7A',
          500: '#C9A961',
          600: '#A08447',
          700: '#7A6535',
          800: '#544624',
          900: '#2E2713',
        },
        // Verde Esmeralda Premium - NUEVO
        emerald: {
          DEFAULT: '#006B54', // Verde Starbucks vibrante
          light: '#00A67E',   // Más claro para hover
          dark: '#004D3D',    // Más oscuro para fondos
          sage: '#8BA888',    // Verde sage para acentos sutiles
          forest: '#1A3A2E',  // Verde bosque profundo (reemplazo del charcoal)
          50: '#E6F4F0',
          100: '#CCE9E1',
          200: '#99D3C3',
          300: '#66BDA5',
          400: '#33A787',
          500: '#006B54',
          600: '#005643',
          700: '#004032',
          800: '#002B22',
          900: '#001511',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          50: '#FFFFFF',
          100: '#FAF8F3',
          200: '#F5F0E6',
          300: '#EBE4D4',
          400: '#DDD3BC',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#4D4D4D',
          100: '#404040',
          200: '#333333',
          300: '#262626',
          400: '#1A1A1A',
          500: '#0D0D0D',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
        'section-sm': 'clamp(2rem, 5vw, 4rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C9A961 0%, #E4D4A8 50%, #C9A961 100%)',
        'noise': "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
}

export default config
