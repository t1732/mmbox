import {
  AppBar,
  Badge,
  Box,
  Container,
  Typography,
  Toolbar,
} from '@mui/material';
import { IconButton } from '../parts/IconButton';
import { DeleteIcon, SearchIcon, ThemeModeIcon } from '../parts/icon';

export type Props = {
  loading: boolean;
  colorMode: string;
  searchingBadge: boolean;
  handleDelete: () => void;
  handleSearch: () => void;
  handleToggleColorMode: () => void;
};

export const Header = ({
  loading,
  colorMode,
  searchingBadge,
  handleDelete,
  handleSearch,
  handleToggleColorMode,
}: Props) => (
  <AppBar color="primary" elevation={1}>
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
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
        <Box>
          <IconButton
            size="large"
            aria-label="search"
            color="secondary"
            onClick={handleSearch}
            disabled={loading}
            loadingProps={{ size: 24, color: 'secondary' }}
          >
            <Badge
              color="secondary"
              variant={searchingBadge ? 'standard' : 'dot'}
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
            onClick={handleToggleColorMode}
          >
            <ThemeModeIcon outlined={colorMode === 'dark'} />
          </IconButton>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
