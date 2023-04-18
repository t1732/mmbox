import { useState } from 'react';
import { MailSummary } from './MailSummary';
import { Mail, MailDetail } from './MailDetail';

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

  if (openState) {
    return (
      <MailDetail
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
    );
  }

  return (
    <MailSummary
      subject={subject}
      createdAt={createdAt}
      fromAddresses={fromAddresses}
      onClick={toggleOpen}
    />
  );
};
