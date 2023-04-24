import { ReactNode } from 'react';
import { Header, Props as HeaderProps } from './layouts/Header';
import { MainContainer } from './layouts/MainContainer';
import { Merge } from '../tools';

type Props = Merge<
  HeaderProps,
  {
    children: ReactNode;
  }
>;

export const LayoutWrapper = ({
  loading,
  colorMode,
  searchingBadge,
  handleDelete,
  handleSearch,
  handleToggleColorMode,
  children,
}: Props) => (
  <>
    <Header
      loading={loading}
      colorMode={colorMode}
      searchingBadge={searchingBadge}
      handleDelete={handleDelete}
      handleSearch={handleSearch}
      handleToggleColorMode={handleToggleColorMode}
    />
    <MainContainer>{children}</MainContainer>
  </>
);
