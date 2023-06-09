import { Mail } from '../../../api/hooks/useMailsQuery';
import { MailSummary } from './MailSummary';
import { MailDetail } from './MailDetail';

type Props = Mail;

export const MailBoxRow = ({
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
  extraHeaders,
  attachedFiles,
}: Props) => (
  <MailSummary
    messageId={messageId}
    subject={subject}
    createdAt={createdAt}
    fromAddresses={fromAddresses}
    hasAttachments={(attachedFiles ?? []).length > 0}
  >
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
      extraHeaders={extraHeaders}
      attachedFiles={attachedFiles}
    />
  </MailSummary>
);
