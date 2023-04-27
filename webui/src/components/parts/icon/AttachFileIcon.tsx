import { SxProps } from '@mui/material/styles';
import { AttachFile } from '@mui/icons-material';

type Props = {
  sx?: SxProps;
};

export const AttachFileIcon = ({ sx }: Props) => <AttachFile sx={sx} />;

AttachFileIcon.defaultProps = {
  sx: undefined,
};
