
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {backgroundImage: {
        futuristic: "url('/bg/futuristic-blue.svg')",
      },},
  },
  plugins: [],
}
