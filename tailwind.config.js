/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#004aad'
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem'
      }
    }
  },
  plugins: []
}
