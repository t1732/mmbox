import { useState } from 'react';
import { SmallContent } from './SmallContent';
import { FullContent } from './FullContent';
import { Mail } from './props';
import './mailrow.css';

export type Props = Mail;

export const MailRow = ({
  messageId,
  subject,
  createdAt,
  fromAddresses,
  toAddresses,
  ccAddresses,
  bccAddresses,
  contentType,
  html,
  text,
}: Props) => {
  const [openState, setOpenState] = useState(false);
  const toggleOpen = () => setOpenState(!openState);

  return (
    <div>
      {openState ? (
        <FullContent
          messageId={messageId}
          subject={subject}
          createdAt={createdAt}
          fromAddresses={fromAddresses}
          toAddresses={toAddresses}
          ccAddresses={ccAddresses}
          bccAddresses={bccAddresses}
          contentType={contentType}
          html={html}
          text={text}
          onClick={toggleOpen}
        />
      ) : (
        <SmallContent
          subject={subject}
          createdAt={createdAt}
          fromAddresses={fromAddresses}
          onClick={toggleOpen}
        />
      )}
    </div>
  );
};
