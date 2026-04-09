/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ib-dark': '#0A1628',
        'ib-blue': '#1E3A8A',
        'ib-blue-l': '#EFF6FF',
        'ib-blue-m': '#BFDBFE',
        'ib-teal': '#0D9488',
        'ib-teal-l': '#F0FDFA',
        'ib-amber': '#D97706',
        'ib-amber-l': '#FFFBEB',
        'ib-green': '#16A34A',
        'ib-green-l': '#F0FDF4',
        'ib-red': '#DC2626',
        'ib-red-l': '#FEF2F2',
        'ib-slate': '#475569',
        'ib-border': '#E2E8F0',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
};
