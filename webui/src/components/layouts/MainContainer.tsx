import { ReactNode } from 'react';
import { Container } from '@mui/material';

export const MainContainer = ({ children }: { children: ReactNode }) => (
  <Container maxWidth="lg" sx={{ marginTop: '94px' }}>
    <main>{children}</main>
  </Container>
);
