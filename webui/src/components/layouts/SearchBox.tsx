import { ComponentProps, useState } from 'react';
import { Box, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDelayedEffect } from '../../hooks';
import { Merge } from '../../tools';

type Props = Merge<
  ComponentProps<'input'>,
  {
    onChange: (text: string) => void;
  }
>;

export const SearchBox = ({ onChange }: Props) => {
  const [text, setText] = useState('');

  useDelayedEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <Grid container sx={{ py: 2 }}>
      <Grid
        xs={12}
        md={8}
        mdOffset={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '80%' }}>
          <Search sx={{ mr: 1, my: 0.5 }} />
          <TextField
            id="input-search"
            label="Search"
            variant="standard"
            placeholder="Search word"
            onChange={(e) => setText(e.target.value)}
            value={text}
            sx={{ width: '100%' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
