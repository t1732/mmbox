/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, useState } from 'react';
import { useAtomValue } from 'jotai';
import {
  Alert,
  AlertTitle,
  Card,
  Divider,
  List,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { searchParamsState } from '../../atom';
import { useMailsQuery } from '../../api/hooks/useMailsQuery';
import { messageIdToAnchorId } from '../../tools';
import { MailBoxRow } from './components/MailBoxRow';
import { MailBoxRowSkeleton } from './components/MailBoxRowSkeleton';

export const MailBox = () => {
  const [page, setPage] = useState(1);
  const { word: searchWord, date: searchDate } =
    useAtomValue(searchParamsState);

  const { data, isError, isLoading } = useMailsQuery({
    word: searchWord,
    date: searchDate,
    page,
  });

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Card>
        <MailBoxRowSkeleton count={10} />
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

  if (data === undefined || data.records.length === 0) {
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
    <>
      <Card variant="outlined">
        <List sx={{ width: '100%', padding: 0 }} component="div">
          {data.records.map((mail, i) => (
            <div key={mail.messageId} id={messageIdToAnchorId(mail.messageId)}>
              <MailBoxRow {...mail} />
              {i + 1 < data.records.length && (
                <Divider variant="inset" component="div" />
              )}
            </div>
          ))}
        </List>
      </Card>
      <Stack
        direction="column"
        justifyContent="fix-start"
        alignItems="center"
        color="secondary"
        sx={{
          position: 'sticky',
          bottom: 0,
          paddingTop: '20px',
          paddingBottom: '15px',
        }}
      >
        {data._metadata.page.totalPages <= 1 ? null : (
          <Pagination
            count={data._metadata.page.totalPages}
            color="secondary"
            sx={{ bgcolor: 'primary.main', padding: '5px' }}
            onChange={handlePageChange}
          />
        )}
        <Typography variant="caption">
          {`( ${data._metadata.page.current} / ${data._metadata.page.totalPages} ) total:${data._metadata.page.total}`}
        </Typography>
      </Stack>
    </>
  );
};
