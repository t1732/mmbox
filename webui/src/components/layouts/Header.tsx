import { AppBar, Container, Typography, Toolbar } from '@mui/material';

export const Header = () => (
  <AppBar color="primary" variant="outlined">
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
      </Toolbar>
    </Container>
  </AppBar>
);
