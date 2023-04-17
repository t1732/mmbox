module.exports = {
  content: [
    './webui/index.html',
    './webui/src/**/*.{js,jsx,ts,tsx,html}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {},
    colors: {},
    fontFamily: {},
  },
  darkmode: 'class',
  plugins: [require('tw-elements/dist/plugin.cjs')],
};
