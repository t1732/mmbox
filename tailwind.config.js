module.exports = {
  content: [
    './webui/index.html',
    './webui/src/**/*.{js,jsx,ts,tsx,html}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {},
    colors: {
      transparent: 'transparent',
      logo: {
        from: '#6ee7b7',
        to: '#7dd3fc',
      },
      app: {
        primary: {
          50: '#f8faf',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
    fontFamily: {},
  },
  darkmode: 'class',
  plugins: [require('tw-elements/dist/plugin.cjs')],
};
