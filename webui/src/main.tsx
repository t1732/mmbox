
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const container = document.getElementById('app');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
