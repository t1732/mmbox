import { MouseEvent } from 'react';
import { Fab, Fade, Box, useScrollTrigger } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

export const ScrollTop = ({ targetId }: { targetId: string }) => {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(`#${targetId}`);

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top" color="secondary">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
};
