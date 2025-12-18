import { Header } from "./layouts/Header";
import { MainContainer } from "./layouts/MainContainer";

import type { ReactNode } from "react";
import type { Merge } from "../tools";
import type { Props as HeaderProps } from "./layouts/Header";

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
