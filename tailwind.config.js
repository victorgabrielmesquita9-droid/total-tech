/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E1420',
        surface: '#161D2E',
        surface2: '#1F2740',
        line: '#2A3350',
        text: '#E8ECF4',
        muted: '#8593AD',
        mint: '#5EE6C7',
        amber: '#F5A94E',
        blue: '#6FA8FF',
        coral: '#FF7E9E',
      },
      fontFamily: {
        mono: ['var(--font-jbmono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        typeIn: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '30%': { transform: 'translate(3%,2%)' },
          '50%': { transform: 'translate(-2%,3%)' },
          '70%': { transform: 'translate(2%,-2%)' },
          '90%': { transform: 'translate(-3%,1%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        rise: 'rise 0.6s cubic-bezier(0.16,1,0.3,1) both',
        grain: 'grain 8s steps(8) infinite',
      },
    },
  },
  plugins: [],
};
