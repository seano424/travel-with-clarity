module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008BFF'
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite'
      }
    },
    debugScreens: {
      position: ['bottom', 'right'],
      style: {
        backgroundColor: '#C0FFEE',
        color: 'black',
      },
      prefix: 'screen: ',
    },
  },
  plugins: [
    require('tailwindcss-debug-screens')
  ],
}