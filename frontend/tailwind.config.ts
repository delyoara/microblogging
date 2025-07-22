import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        josefin: ['var(--font-josefin)'],
        montserrat: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};

export default config;
