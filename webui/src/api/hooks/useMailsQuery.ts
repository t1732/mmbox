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

type MailsGetResponse = {
  _metadata: {
    page: { current: number; per: number; total: number; totalPages: number };
  };
  records: Mail[];
};

export const mailsKeys = {
  index: (word?: string, date?: string, page?: number) =>
    ['mails', word, date, page] as const,
};

const fetchData = async (word?: string, date?: string, page?: number) => {
  const { data } = await axios.get<MailsGetResponse>(
    `/mails?word=${word ?? ''}&date=${date ?? ''}&page=${page ?? 1}&per=100`,
  );

  return data;
};

type QueryOptions = {
  word?: string;
  date?: string;
  page?: number;
};

export const useMailsQuery = ({ word, date, page }: QueryOptions) =>
  useQuery({
    queryKey: [mailsKeys.index(word, date, page)],
    queryFn: async () => fetchData(word, date, page),
    keepPreviousData: true,
  });
