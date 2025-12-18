import { Container } from "@mui/material";

import type { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => (
  <Container maxWidth="lg" sx={{ marginTop: "94px" }}>
    <main>{children}</main>
  </Container>
);
