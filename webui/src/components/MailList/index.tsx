/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import { Props as RowProps, MailRow } from './MailRow';

const fetchData = async () => {
  const res = await fetch('http://localhost:8025/mails');

  return res.json();
};

export const MailList = () => {
  const { data, isSuccess } = useQuery<RowProps[], Error>({
    queryKey: ['mails'],
    queryFn: fetchData,
  });

  if (!isSuccess) {
    return <div>no data</div>;
  }

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-500 rounded border border-slate-500">
      {data?.map((mail) => (
        <MailRow key={mail.messageId} {...mail} />
      ))}
    </div>
  );
};
