const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // [true, false, media, class]
  theme: {
    fontFamily: {
      brand: ['"PixelAzureBonds"'],
      sans: ['"Source Code Pro"', ...defaultTheme.fontFamily.sans]
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
