import { SxProps } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';

type Props = {
  sx?: SxProps;
};

export const DeleteIcon = ({ sx }: Props) => <Delete sx={sx} />;

DeleteIcon.defaultProps = {
  sx: undefined,
};
