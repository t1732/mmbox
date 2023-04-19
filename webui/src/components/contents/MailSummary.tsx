import { useMemo, useState, ReactNode } from 'react';
import {
  Avatar,
  Collapse,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Mail } from './MailDetail';
import { RelativeTimeText } from '../parts';
import { Merge } from '../../tools';
import './MailSummary.css';

type Props = Merge<
  Pick<Mail, 'subject' | 'createdAt' | 'fromAddresses'>,
  {
    children: ReactNode;
  }
>;

const concatAddress = (address: string, name: string) =>
  `${address}${name && `<${name}>`}`;

export const MailSummary = ({
  subject,
  createdAt,
  fromAddresses,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const joinedFromAddresses = useMemo<string | undefined>(
    () =>
      fromAddresses
        ?.map(({ address, name }) => concatAddress(address, name))
        .join(','),
    [fromAddresses],
  );

  const avatarStr = useMemo<string>(() => {
    if (fromAddresses === null) {
      return '-';
    }

    if (fromAddresses[0].name) {
      return fromAddresses[0].name.charAt(0);
    }

    return fromAddresses[0].address.charAt(0);
  }, [fromAddresses]);

  return (
    <>
      <ListItemButton onClick={handleClick} dense>
        <ListItemAvatar>
          <Avatar>{avatarStr}</Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle1" noWrap>
              {subject}
            </Typography>
          }
          secondary={
            <div>
              <Typography variant="caption" component="span">
                {joinedFromAddresses}
              </Typography>
              <RelativeTimeText time={createdAt} />
            </div>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
