import { DarkMode, DarkModeOutlined } from "@mui/icons-material";

import type { SxProps } from "@mui/material/styles";

type Props = {
  outlined?: boolean;
  sx?: SxProps;
};

export const ThemeModeIcon = ({ outlined, sx }: Props) => {
  if (outlined) {
    return <DarkModeOutlined sx={sx} />;
  }

  return <DarkMode sx={sx} />;
};

ThemeModeIcon.defaultProps = {
  outlined: undefined,
  sx: undefined,
};
