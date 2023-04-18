import { useMemo } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Mail } from './MailDetail';
import { RelativeTimeText } from '../parts';
import { Merge } from '../../tools';
import './MailSummary.css';

type Props = Merge<
  Pick<Mail, 'subject' | 'createdAt' | 'fromAddresses'>,
  {
    onClick: () => void;
  }
>;

export const MailSummary = ({
  subject,
  createdAt,
  fromAddresses,
  onClick,
}: Props) => {
  const concatAddress = (address: string, name: string) =>
    `${address}${name && `<${name}>`}`;

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
    <ListItem
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-hidden
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>{avatarStr}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<span className="title">{subject}</span>}
          secondary={
            <>
              {joinedFromAddresses}
              <RelativeTimeText time={createdAt} />
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
