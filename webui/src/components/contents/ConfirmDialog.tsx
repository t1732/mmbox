import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  title: string;
  message: string;
  handleCancel: () => void;
  handleApply: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  message,
  handleCancel,
  handleApply,
}: Props) => (
  <Dialog open={open} maxWidth="xs" fullWidth sx={{ top: '-50%' }}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button color="secondary" onClick={handleApply}>
        Apply
      </Button>
    </DialogActions>
  </Dialog>
);
