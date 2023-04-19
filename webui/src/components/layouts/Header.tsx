import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Typography,
  Toolbar,
} from '@mui/material';
import { searchWordState } from '../../atom';
import { SearchDialog } from '../contents/SearchDialog';
import { SearchIcon } from '../parts/icon';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchWord, setSearchWord] = useAtom(searchWordState);

  const handleSearch = (word: string) => {
    setSearchWord(word);
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
              color: 'inherit',
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
            >
              <Badge
                color="secondary"
                variant={searchWord === '' ? 'standard' : 'dot'}
              >
                <SearchIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <SearchDialog
        open={open}
        defaultValue={searchWord}
        handleCancel={() => setOpen(false)}
        handleSearch={handleSearch}
      />
    </AppBar>
  );
};
