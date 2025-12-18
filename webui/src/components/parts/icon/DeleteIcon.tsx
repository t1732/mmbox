import { Delete } from "@mui/icons-material";

import type { SxProps } from "@mui/material/styles";

type Props = {
  sx?: SxProps;
};

export const DeleteIcon = ({ sx }: Props) => <Delete sx={sx} />;

DeleteIcon.defaultProps = {
  sx: undefined,
};
