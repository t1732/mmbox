import { ReactNode } from 'react';
import { Header } from './layouts/Header';
import { MainContainer } from './layouts/MainContainer';

type Props = {
  loading: boolean;
  handleDelete: () => void;
  children: ReactNode;
};

export const LayoutWrapper = ({ loading, handleDelete, children }: Props) => (
  <>
    <Header loading={loading} handleDelete={handleDelete} />
    <MainContainer>{children}</MainContainer>
  </>
);
