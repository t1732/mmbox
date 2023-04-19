import { useRef } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  defaultValue: string;
  handleCancel: () => void;
  handleSearch: (word: string) => void;
};

export const SearchDialog = ({
  open,
  defaultValue,
  handleCancel,
  handleSearch,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} maxWidth="md" fullWidth sx={{ top: '-50%' }}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <DialogContentText>You can search by text.</DialogContentText>
        <TextField
          id="search-word"
          type="search"
          label="Word"
          variant="outlined"
          color="secondary"
          margin="dense"
          fullWidth
          autoFocus
          defaultValue={defaultValue}
          inputRef={inputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            handleSearch(inputRef.current?.value ?? '');
          }}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};
