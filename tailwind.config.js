/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'miku': {
          DEFAULT: '#39C5BB',
          hover: '#2BA89F',
          light: '#5DDDD4',
          dark: '#2A9E95',
        }
      },
      fontFamily: {
        sans: ["'HarmonyOS Sans'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
        mono: ["'Cascadia Code'", "'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        'ios': '8px',
        'card': '12px',
        'modal': '16px',
      },
      boxShadow: {
        'ios': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'miku': '0 4px 12px rgba(57, 197, 187, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-out infinite',
        'spin-slow': 'spin 1.5s linear infinite',
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}
