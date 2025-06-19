/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
      {
        pattern: /bg-\[url\(.*\)\]/, 
      },
    ],
    theme: {
      extend: {
        fontFamily: {
          title: 'var(--titleFont)',
          text: 'var(--textFont)',
        },
      },
    },
    plugins: [],
  };
  