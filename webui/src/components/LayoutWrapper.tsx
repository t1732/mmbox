import { ReactNode } from 'react';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import { Container } from './layouts/Container';

export const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto">
    <Header />
    <Container>
      <main className="mb-24 mt-6">{children}</main>
    </Container>
    <Footer />
  </div>
);
