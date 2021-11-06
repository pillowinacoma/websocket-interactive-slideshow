const windmill = require('@windmill/react-ui/config')
module.exports = windmill({
  purge: ['./client/**/*.tsx'],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
})
