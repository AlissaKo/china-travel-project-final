/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#071f26',
        deep: '#09272f',
        panel: '#10323a',
        muted: '#8da5a8',
        coral: '#ff3347',
        aqua: '#55d6cf',
        sand: '#e9c77b'
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}