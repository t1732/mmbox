import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tooltip, Typography } from '@mui/material';
import { TimeIcon } from './icon';

extend(relativeTime);

type Props = {
  time: string;
};

export const RelativeTimeText = ({ time }: Props) => (
  <Tooltip title={dayjs(time).format('YYYY/MM/DD hh:mm')}>
    <Typography
      variant="body2"
      display="block"
      align="right"
      gutterBottom
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        float: 'right',
        minWidth: '150px',
      }}
    >
      <TimeIcon />
      {dayjs(time).fromNow()}
    </Typography>
  </Tooltip>
);
