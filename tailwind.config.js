/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07101E',
        surface: '#0C1828',
        green: {
          DEFAULT: '#4191FF',
          dim: '#1D65D4',
          dark: '#0E3A8A',
        },
        sand: '#93C5FD',
        cream: '#EEF4FF',
        gray: {
          DEFAULT: '#6879A0',
          light: '#94A3C0',
          dark: '#1E2A40',
        },
      },
      fontFamily: {
        playfair: ['"Sora"', 'system-ui', 'sans-serif'],
        dm: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 10rem)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(-2%, 4%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [],
}
