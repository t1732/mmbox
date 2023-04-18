import { ReactNode } from 'react';
import { Container } from '@mui/material';

export const MainContainer = ({ children }: { children: ReactNode }) => (
  <Container maxWidth="md" sx={{ marginTop: '64px' }}>
    <main>{children}</main>
  </Container>
);
