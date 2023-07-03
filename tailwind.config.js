/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Playfair Display', "cursive"],
        font: ['Poppins', "cursive"],
       },
    },
  },
  plugins: [
  ],
}

