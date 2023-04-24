import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';

const darkModeMq = window.matchMedia('(prefers-color-scheme: dark)');
export const colorModeState = atom<PaletteMode>(
  darkModeMq.matches ? 'dark' : 'light',
);
