import { Download } from "@mui/icons-material";

import type { SxProps } from "@mui/material/styles";

type Props = {
  sx?: SxProps;
};

export const DownloadIcon = ({ sx }: Props) => <Download sx={sx} />;

DownloadIcon.defaultProps = {
  sx: undefined,
};
