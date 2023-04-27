import { Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const TabContent = ({ children }: Props) => (
  <Box sx={{ minHeight: window.outerHeight * 0.65 }}>{children}</Box>
);
