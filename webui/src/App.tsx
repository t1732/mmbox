import { createContext, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { focusManager } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { themeModeState } from './atom';
import { useDeleteMailsMutation } from './api/hooks/useDeleteMialsMutation';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailBox } from './components/contents/MailBox';
import { ConfirmDialog } from './components/contents/ConfirmDialog';

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

  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteMailsMutation({
    onSuccess: () => {
      focusManager.setFocused(true);
    },
  });
  const handleDelete = () => {
    setOpenConfirm(true);
  };
  const handleApply = () => {
    deleteMutation.mutate();
    setOpenConfirm(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutWrapper
          loading={deleteMutation.isLoading}
          handleDelete={handleDelete}
        >
          <MailBox />
        </LayoutWrapper>
        <ConfirmDialog
          open={openConfirm}
          title="Confirmation"
          message="Delete all emails ?"
          handleApply={handleApply}
          handleCancel={() => {
            setOpenConfirm(false);
          }}
        />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
