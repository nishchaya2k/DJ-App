/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "NeueMontreal-Thin": ["NeueMontreal-Thin"],
        "NeueMontreal": ["NeueMontreal"],
        "NeueMontreal-Med": ["NeueMontreal-Med"],
        "NeueMontreal-Bold": ["NeueMontreal-Bold"]
      },
      color: {
        "themePrimary": "#5C42FF"
      },
      backgroundColor: {
        "themePrimary": "#5C42FF"
      },
      textColor: {
        "themePrimary": "#5C42FF"
      }
    },
  },
  plugins: [],
}

