import { AttachFile } from "@mui/icons-material";

import type { SxProps } from "@mui/material/styles";

type Props = {
  sx?: SxProps;
};

export const AttachFileIcon = ({ sx }: Props) => <AttachFile sx={sx} />;

AttachFileIcon.defaultProps = {
  sx: undefined,
};
