import { ReactNode } from 'react';
import { Header } from './layouts/Header';
import { MainContainer } from './layouts/MainContainer';

export const LayoutWrapper = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <MainContainer>{children}</MainContainer>
  </>
);
