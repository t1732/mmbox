import { createContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, PaletteMode, useMediaQuery } from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailBox } from './components/contents/MailBox';

const queryClient = new QueryClient();
const ColorModeContext = createContext({ toggleColorMode: () => {} });
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // light mode
          primary: {
            main: '#ffffff',
          },
          secondary: {
            main: red[700],
          },
        }
      : {
          // dark mode
          primary: {
            main: '#000000',
          },
          secondary: {
            main: red[400],
          },
        }),
  },
});

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutWrapper>
          <QueryClientProvider client={queryClient}>
            <MailBox />
          </QueryClientProvider>
        </LayoutWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
