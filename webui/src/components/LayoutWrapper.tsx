import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <Header />
    <main className="m-auto">{children}</main>
    <Footer />
  </div>
);
