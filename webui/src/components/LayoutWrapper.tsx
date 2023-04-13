import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';

export const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto">
    <Header />
    <Container>
      <main className="mb-24 mt-6">{children}</main>
    </Container>
    <Footer />
  </div>
);
