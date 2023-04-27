import { ReactNode, useMemo, useState } from 'react';
import {
  Avatar,
  Collapse,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Mail } from '../../../api/hooks/useMailsQuery';
import { RelativeTimeText } from '../../../components/parts';
import { AttachFileIcon } from '../../../components/parts/icon';
import { Merge, messageIdToAnchorId } from '../../../tools';
import './MailSummary.css';

type Props = Merge<
  Pick<Mail, 'messageId' | 'subject' | 'createdAt' | 'fromAddresses'>,
  {
    hasAttachments: boolean;
    children: ReactNode;
  }
>;

const concatAddress = (address: string, name: string) =>
  `${address}${name && `<${name}>`}`;

export const MailSummary = ({
  messageId,
  subject,
  createdAt,
  fromAddresses,
  hasAttachments,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEntered = () => {
    if (!open) {
      return;
    }

    const anchor = document.getElementById(messageIdToAnchorId(messageId));

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
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
          {hasAttachments && (
            <AttachFileIcon
              sx={{
                fontSize: 20,
                position: 'absolute',
                zIndex: 1,
                left: 38,
                top: 12,
              }}
            />
          )}
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{avatarStr}</Avatar>
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
        {open ? (
          <ExpandLess color="secondary" />
        ) : (
          <ExpandMore color="secondary" />
        )}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        onEntered={handleEntered}
      >
        {children}
      </Collapse>
    </>
  );
};
