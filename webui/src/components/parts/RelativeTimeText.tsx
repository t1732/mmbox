import { Tooltip, Typography } from '@mui/material';
import { dayjs } from '../../tools/dayjs';

type Props = {
  time: string;
};

export const RelativeTimeText = ({ time }: Props) => {
  const timeObj = dayjs(time);

  return (
    <Tooltip title={timeObj.format('YYYY/MM/DD HH:mm')}>
      <Typography
        variant="caption"
        component="span"
        display="block"
        align="right"
        gutterBottom
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          float: 'right',
          minWidth: '100px',
        }}
      >
        {timeObj.fromNow()}
      </Typography>
    </Tooltip>
  );
};
