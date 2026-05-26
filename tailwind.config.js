/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: '#06b6d4',          // maps to electric cyan
        forest: '#0f172a',        // maps to deep slate navy
        'sage-light': '#cbd5e1',  // maps to light slate
        'sage-pale': '#f8fafc',   // maps to slate white
        cream: '#f1f5f9',         // maps to light grey slate
      }
    }
  },
  plugins: [],
}
