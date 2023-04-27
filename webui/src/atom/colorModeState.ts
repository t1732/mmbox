import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';
import { LocalStorageWrapper } from '../tools/localStorageWrapper';

const darkModeMq = window.matchMedia('(prefers-color-scheme: dark)');
const defaultColorMode = LocalStorageWrapper.get().colorMode ?? null;
export const colorModeState = atom<PaletteMode>(
  defaultColorMode ?? (darkModeMq.matches ? 'dark' : 'light'),
);
