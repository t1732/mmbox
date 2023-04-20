/* eslint-disable react/jsx-props-no-spreading */
import { useAtomValue } from 'jotai';
import { Card, Divider, List, Stack, Alert, AlertTitle } from '@mui/material';
import { searchParamsState } from '../../atom';
import { useMailsQuery } from '../../api/hooks/useMailsQuery';
import { MailBoxRow } from './MailBoxRow';
import { MailBoxRowSkeleton } from './MailBoxRowSkeleton';

export const MailBox = () => {
  const { word: searchWord, date: searchDate } =
    useAtomValue(searchParamsState);
  const { data, isError, isLoading } = useMailsQuery({
    word: searchWord,
    date: searchDate,
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
    <Card variant="outlined">
      <List sx={{ width: '100%', padding: 0 }} component="div">
        {data.map((mail, i) => (
          <div key={mail.messageId}>
            <MailBoxRow {...mail} />
            {i + 1 < data.length && <Divider variant="inset" component="div" />}
          </div>
        ))}
      </List>
    </Card>
  );
};
