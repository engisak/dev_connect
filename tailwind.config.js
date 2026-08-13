/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#006397",
        "primary-container": "#30afff",
        "on-primary": "#ffffff",
        "on-primary-container": "#004063",
        "secondary": "#006875",
        "secondary-container": "#92eeff",
        "on-secondary-container": "#006d7a",
        "surface": "#f7f9ff",
        "surface-container": "#eaeef5",
        "surface-container-low": "#f0f4fb",
        "surface-container-high": "#e4e8ef",
        "surface-container-highest": "#dfe3e9",
        "on-surface": "#171c21",
        "on-surface-variant": "#3f4851",
        "outline": "#6f7882",
        "outline-variant": "#bec7d3",
        "background": "#f7f9ff"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
