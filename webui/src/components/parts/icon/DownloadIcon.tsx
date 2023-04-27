import { SxProps } from '@mui/material/styles';
import { Download } from '@mui/icons-material';

type Props = {
  sx?: SxProps;
};

export const DownloadIcon = ({ sx }: Props) => <Download sx={sx} />;

DownloadIcon.defaultProps = {
  sx: undefined,
};
