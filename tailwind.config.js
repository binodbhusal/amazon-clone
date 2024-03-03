/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        amazonclone: {
          background: '#EAEDED',
          light_blue: '#232F3A',
          yellow: '#FEBD69',
          DEFAULT: '#131921',
        },
      },
      fontFamily: {
        'Amazon-Ember-Regular': ['Amazon Ember Regular', 'sans-serif'],
        'Amazon-Ember-He': ['Amazon Ember Heavy', 'sans-serif'],
        'Amazon-Ember-Bd': ['Amazon Ember Bold', 'sans-serif'],
        'Amazon-Ember-Th': ['Amazon Ember Thin', 'sans-serif'],
      },
    },
  },
  plugins: [
    '@tailwindcss/line-clamp',
    'tw-elements/dist/plugin.cjs',
  ],
};
