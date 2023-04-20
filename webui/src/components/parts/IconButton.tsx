import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import { Merge } from '../../tools/typeMerger';

type LoadingProps = {
  size: number | string;
  color: 'primary' | 'secondary';
};

type Props = Merge<
  IconButtonProps,
  {
    loading?: boolean;
    loadingProps?: LoadingProps;
  }
>;

const IconBtn = ({
  size,
  color,
  sx,
  onClick,
  disabled,
  children,
  loading,
  loadingProps,
}: Props) => (
  <IconButton size={size} color={color} sx={sx} onClick={onClick} disabled={disabled}>
    {loading ? (
      <CircularProgress size={loadingProps?.size} color={loadingProps?.color} />
    ) : (
      children
    )}
  </IconButton>
);

export { IconBtn as IconButton };
