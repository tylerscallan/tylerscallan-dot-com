import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode feature flag: change to 'media' to enable automatic dark mode
  darkMode: 'class',
  content: [
    path.join(__dirname, '../index.html'),
    path.join(__dirname, '../src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        neutral: {
          850: '#1f1f1f',
        },
        cream: '#FAFAF9',
      },
    },
  },
  plugins: [],
}
