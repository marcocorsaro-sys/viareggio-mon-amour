import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      colors: {
        navy: {
          DEFAULT: '#0d1f3c',
          50: '#e8ecf4',
          100: '#c2cde3',
          200: '#96a6cc',
          300: '#6a7eb5',
          400: '#4861a3',
          500: '#2d4690',
          600: '#213877',
          700: '#162a5e',
          800: '#0d1f3c',
          900: '#071326',
        },
        cream: {
          DEFAULT: '#f7f3ec',
          50: '#fdfcfa',
          100: '#f7f3ec',
          200: '#ede5d4',
          300: '#dfd3b8',
          400: '#cdb890',
        },
        gold: {
          DEFAULT: '#c8973a',
          light: '#e8b85a',
          dark: '#9a7020',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
