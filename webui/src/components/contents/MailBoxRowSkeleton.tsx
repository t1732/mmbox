import { ReactNode } from 'react';
import {
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from '@mui/material';
import './MailSummary.css';

const node = (
  <List sx={{ width: '100%' }} component="div">
    <ListItemButton>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
        secondary={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
      />
    </ListItemButton>
  </List>
);

export const MailBoxRowSkeleton = ({ count }: { count: number }) => {
  const nodes = new Array<ReactNode>(count).fill(node);

  return (
    <div>
      {nodes.map((n, i) => (
        <div>
          {n}
          {i + 1 < nodes.length && <Divider variant="inset" component="div" />}
        </div>
      ))}
    </div>
  );
};
