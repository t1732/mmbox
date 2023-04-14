/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import { Props as RowProps, MailRow } from './MailBoxRow';

type Props = {
  searchWord: string;
};

const fetchData = async (searchWord: string) => {
  const res = await fetch(
    `http://localhost:8025/mails?word=${searchWord || ''}`,
  );

  return res.json();
};

export const MailBox = ({ searchWord }: Props) => {
  const { data, isError, isLoading } = useQuery<RowProps[], Error>({
    queryKey: ['mails', searchWord],
    queryFn: async () => fetchData(searchWord),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error.</div>;
  }

  return (
    <div>
      {data === undefined || data.length === 0 ? (
        <div>no data</div>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          {data.map((mail) => (
            <MailRow key={mail.messageId} {...mail} />
          ))}
        </div>
      )}
    </div>
  );
};
