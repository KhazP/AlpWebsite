/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': {}, // or 'postcss-nesting'
    'tailwindcss': {},
    'autoprefixer': {},
  },
};

export default config;
