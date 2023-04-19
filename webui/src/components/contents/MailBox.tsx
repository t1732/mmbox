/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import { Card, Divider, List, Stack, Alert, AlertTitle } from '@mui/material';
import { Props as RowProps, MailRow } from './MailBoxRow';
import { MailBoxRowSkeleton } from './MailBoxRowSkeleton';

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
      <Card>
        <MailBoxRowSkeleton count={3} />
      </Card>
    );
  }

  if (isError) {
    return (
      <Stack sx={{ width: '100%', marginTop: '10px' }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to retrieve data.
        </Alert>
      </Stack>
    );
  }

  if (data === undefined || data.length === 0) {
    return (
      <Stack sx={{ width: '100%', marginTop: '10px' }} spacing={2}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          There is no data.
        </Alert>
      </Stack>
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
