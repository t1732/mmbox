import { ClockIcon } from '@heroicons/react/24/outline';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Mail } from './props';
import { Merge } from '../../tools';
extend(relativeTime);

type Props = Merge<
  Pick<Mail, 'subject' | 'createdAt' | 'fromAddresses'>,
  {
    onClick: () => void;
  }
>;

export const SmallContent = ({
  subject,
  createdAt,
  fromAddresses,
  onClick,
}: Props) => {
  const concatAddress = (address: string, name: string) => (
    <span>
      {address}
      {name && `<${name}>`}
    </span>
  );

  return (
    <div
      className="flex flex-col bg-white p-3 transition duration-300 ease-in-out hover:bg-slate-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-hidden
    >
      <div>
        <p className="float-left text-xs text-gray-500">
          {fromAddresses?.map(({ address, name }) =>
            concatAddress(address, name),
          )}
        </p>
        <p className="float-right text-xs text-gray-500">
          <ClockIcon className="fh-4 float-left w-4" />
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
      <h5 className="text-ml truncate font-medium leading-tight">{subject}</h5>
    </div>
  );
};
