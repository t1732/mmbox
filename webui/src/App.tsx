import { createContext, useMemo } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { themeModeState } from './atom';
import { useDeleteMailsMutation } from './api/hooks/useDeleteMialsMutation';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailBox } from './components/contents/MailBox';

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
  const [mode, setMode] = useAtom(themeModeState);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [setMode],
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const deleteMutation = useDeleteMailsMutation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutWrapper
          loading={deleteMutation.isLoading}
          handleDelete={() => deleteMutation.mutate()}
        >
          <MailBox />
        </LayoutWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
