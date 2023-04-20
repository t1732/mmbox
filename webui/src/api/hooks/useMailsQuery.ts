import { useQuery } from '@tanstack/react-query';
import { axios } from '../axios';

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

type MailAddress = {
  address: string;
  name: string;
};

type MailsGetResponse = Mail[];

export const mailsKeys = {
  index: (word?: string, date?: string) => ['mails', word, date] as const,
};

const fetchData = async (word?: string, date?: string) => {
  const { data } = await axios.get<MailsGetResponse>(
    `/mails?word=${word ?? ''}&date=${date ?? ''}`,
  );

  return data;
};

type QueryOptions = {
  word?: string;
  date?: string;
  select?: (data: MailsGetResponse) => MailsGetResponse;
};

export const useMailsQuery = ({ word, date, select }: QueryOptions) =>
  useQuery({
    queryKey: [mailsKeys.index(word, date)],
    queryFn: async () => fetchData(word, date),
    select,
  });
