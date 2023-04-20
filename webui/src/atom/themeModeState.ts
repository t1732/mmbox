import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';

const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
export const themeModeState = atom<PaletteMode>(
  darkThemeMq.matches ? 'dark' : 'light',
);
