/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import { Card, Divider, List } from '@mui/material';
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
    return (
      <div className="flex justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-80 justify-center">
        <div>error</div>
      </div>
    );
  }

  if (data === undefined || data.length === 0) {
    return (
      <div className="flex h-80 justify-center">
        <div>empty</div>
      </div>
    );
  }

  return (
    <Card>
      <List sx={{ width: '100%' }} component="div">
        {data.map((mail, i) => (
          <div key={mail.messageId}>
            <MailRow {...mail} />
            {i + 1 < data.length && <Divider variant="inset" component="div" />}
          </div>
        ))}
      </List>
    </Card>
  );
};
