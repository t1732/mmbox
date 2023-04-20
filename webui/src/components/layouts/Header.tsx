import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Typography,
  Toolbar,
} from '@mui/material';
import { searchParamsState, themeModeState } from '../../atom';
import { SearchDialog } from '../contents/SearchDialog';
import { IconButton } from '../parts/IconButton';
import { DeleteIcon, SearchIcon, ThemeModeIcon } from '../parts/icon';

type Props = {
  loading: boolean;
  handleDelete: () => void;
};

export const Header = ({ loading, handleDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const [{ word: searchWord, date: searchDate }, setSearchParams] =
    useAtom(searchParamsState);

  const [mode, setMode] = useAtom(themeModeState);
  const toggleThemeMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (word: string, date: string) => {
    setSearchParams({ word, date });
    setOpen(false);
  };

  return (
    <AppBar color="primary" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary.main',
              textDecoration: 'none',
            }}
          >
            MMBOX
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="search"
              color="secondary"
              onClick={() => setOpen(true)}
              disabled={loading}
              loadingProps={{ size: 24, color: 'secondary' }}
            >
              <Badge
                color="secondary"
                variant={
                  searchWord === '' && searchDate === '' ? 'standard' : 'dot'
                }
              >
                <SearchIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="delete"
              color="secondary"
              onClick={handleDelete}
              loading={loading}
              disabled={loading}
              loadingProps={{ size: 24, color: 'secondary' }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="theme"
              color="secondary"
              onClick={toggleThemeMode}
            >
              <ThemeModeIcon outlined={mode === 'dark'} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <SearchDialog
        open={open}
        defaultWord={searchWord}
        defaultDate={searchDate}
        handleCancel={() => setOpen(false)}
        handleSearch={handleSearch}
      />
    </AppBar>
  );
};
