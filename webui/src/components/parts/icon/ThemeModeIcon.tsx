import { SxProps } from '@mui/material/styles';
import { DarkMode, DarkModeOutlined } from '@mui/icons-material';

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
