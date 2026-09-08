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
        fi: {
          purple: '#4F46E5',
          'purple-dark': '#3730A3',
          'purple-deep': '#2E1065',
          'purple-light': '#EEF2FF',
          'purple-subtle': '#F5F3FF',
          'purple-brand': '#4338CA',
          emerald: '#00D09C',
          'emerald-dark': '#00A87D',
          'emerald-light': '#E6FAF5',
          navy: '#0F172A',
          dark: '#1E1B4B',
          card: '#FFFFFF',
          slate: '#64748B',
          'slate-light': '#94A3B8',
          bg: '#F6F8FC',
          surface: '#FFFFFF',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 4px 24px -2px rgba(15, 23, 42, 0.06), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(79, 70, 229, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        'glow-purple': '0 0 24px -4px rgba(79, 70, 229, 0.35)',
        'glow-emerald': '0 0 20px -5px rgba(0, 208, 156, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
