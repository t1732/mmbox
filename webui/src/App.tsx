import { createContext, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { colorModeState, searchParamsState } from './atom';
import { useDeleteMailsMutation } from './api/hooks/useDeleteMialsMutation';
import { LayoutWrapper } from './components/LayoutWrapper';
import { ScrollTop } from './components/ScrollTop';
import { MailBox } from './pages/mails/MailBox';
import { ConfirmDialog } from './components/ConfirmDialog';
import { SearchDialog } from './components/SearchDialog';

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
  const [colorMode, setColorMode] = useAtom(colorModeState);
  const colorModeContext = useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [setColorMode],
  );
  const theme = useMemo(
    () => createTheme(getDesignTokens(colorMode)),
    [colorMode],
  );

  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteMailsMutation();
  const handleDelete = () => {
    setOpenConfirm(true);
  };
  const handleApply = () => {
    deleteMutation.mutate();
    setOpenConfirm(false);
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [{ word: searchWord, date: searchDate }, setSearchParams] =
    useAtom(searchParamsState);
  const handleSearch = (word: string, date: string) => {
    setSearchParams({ word, date });
    setSearchOpen(false);
  };

  return (
    <ColorModeContext.Provider value={colorModeContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutWrapper
          loading={deleteMutation.isLoading}
          colorMode={colorMode}
          searchingBadge={searchWord === '' && searchDate === ''}
          handleDelete={handleDelete}
          handleSearch={() => setSearchOpen(true)}
          handleToggleColorMode={colorModeContext.toggleColorMode}
        >
          <div id="back-to-top" />
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
        <SearchDialog
          open={searchOpen}
          defaultWord={searchWord}
          defaultDate={searchDate}
          handleCancel={() => setSearchOpen(false)}
          handleSearch={handleSearch}
        />
        <ScrollTop targetId="back-to-top" />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
