import { useRef } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';

type Props = {
  open: boolean;
  defaultWord: string;
  defaultDate: string;
  handleCancel: () => void;
  handleSearch: (word: string, date: string) => void;
};

export const SearchDialog = ({
  open,
  defaultWord,
  defaultDate,
  handleCancel,
  handleSearch,
}: Props) => {
  const wordRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} maxWidth="md" fullWidth sx={{ top: '-50%' }}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <DialogContentText>You can search by text and date.</DialogContentText>
        <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
          <TextField
            id="search-word"
            type="search"
            label="Word"
            variant="outlined"
            color="secondary"
            margin="dense"
            fullWidth
            defaultValue={defaultWord}
            inputRef={wordRef}
          />
          <TextField
            id="search-date"
            type="date"
            variant="outlined"
            color="secondary"
            margin="dense"
            defaultValue={defaultDate}
            inputRef={dateRef}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            handleSearch(
              wordRef.current?.value ?? '',
              dateRef.current?.value ?? '',
            );
          }}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};
