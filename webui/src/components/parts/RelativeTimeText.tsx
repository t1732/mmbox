import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography } from '@mui/material';
import { TimeIcon } from './icon';

extend(relativeTime);

type Props = {
  time: string;
};

export const RelativeTimeText = ({ time }: Props) => (
  <Typography
    variant="body2"
    display="block"
    align="right"
    gutterBottom
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      float: 'right',
    }}
  >
    <TimeIcon />
    {dayjs(time).fromNow()}
  </Typography>
);
