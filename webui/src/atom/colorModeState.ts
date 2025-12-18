import { atom } from "jotai";

import { LocalStorageWrapper } from "../tools/localStorageWrapper";

import type { PaletteMode } from "@mui/material";

const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
const defaultColorMode = LocalStorageWrapper.get().colorMode ?? null;
export const colorModeState = atom<PaletteMode>(
  defaultColorMode ?? (darkModeMq.matches ? "dark" : "light"),
);
