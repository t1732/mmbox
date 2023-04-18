import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';
import { Mail } from './MailDetail';
import { Merge } from '../../tools';

extend(relativeTime);

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

  return (
    <div
      className="flex flex-col bg-white p-3 transition duration-300 ease-in-out hover:bg-slate-200 shadow-md rounded-md"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-hidden
    >
      <div>
        <p className="float-left text-xs text-gray-500">
          {joinedFromAddresses}
        </p>
        <p className="float-right text-xs text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
      <h5 className="text-ml truncate font-medium leading-tight">{subject}</h5>
    </div>
  );
};
