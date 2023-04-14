import { Merge } from '../../tools';

type MailAddress = {
  address: string;
  name: string;
};

export type Mail = {
  messageId: string;
  subject: string;
  createdAt: string;
  fromAddresses: MailAddress[] | null;
  toAddresses: MailAddress[] | null;
  bccAddresses: MailAddress[] | null;
  ccAddresses: MailAddress[] | null;
  contentType: string;
  html: string;
  text: string;
};

type Props = Merge<
  Mail,
  {
    onClick: () => void;
  }
>;

export const MailDetail = ({
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
  onClick,
}: Props) => (
  <div className="p-3" onClick={onClick} role="button" tabIndex={0} aria-hidden>
    <ul>
      <li>MessageId:{messageId}</li>
      <li>Subject:{subject}</li>
      <li>Date:{createdAt}</li>
      <li>ContentType:{contentType}</li>
      <li>
        {fromAddresses && 'fromAddresses:'}
        {fromAddresses?.map(({ address, name }) => (
          <div key={`from-${address}`}>
            {address}
            {name && `<${name}>`}
          </div>
        ))}
      </li>
      <li>
        {toAddresses && 'toAddresses:'}
        {toAddresses?.map(({ address, name }) => (
          <div key={`to-${address}`}>
            {address}
            {name && `<${name}>`}
          </div>
        ))}
      </li>
      <li>
        {ccAddresses && 'ccAddresses:'}
        {ccAddresses?.map(({ address, name }) => (
          <div key={`cc-${address}`}>
            {address}
            {name && `<${name}>`}
          </div>
        ))}
      </li>
      <li>
        {bccAddresses && 'bccAddresses:'}
        {bccAddresses?.map(({ address, name }) => (
          <div key={`bcc-${address}`}>
            {address}
            {name && `<${name}>`}
          </div>
        ))}
      </li>
      <li className="mail-content">{text}</li>
      <li>
        <div>{html}</div>
      </li>
    </ul>
  </div>
);
