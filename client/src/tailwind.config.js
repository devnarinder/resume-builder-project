/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Scan all JS/JSX/TS/TSX files in src directory
      './public/index.html',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF', // Primary blue
          secondary: '#64748B', // Secondary gray
          darkBg: '#1F2937', // Dark mode background
          lightBg: '#F9FAFB', // Light mode background
        },
      },
    },
    darkMode: 'class', // Enable dark mode using 'class'
    plugins: [],
  };
  