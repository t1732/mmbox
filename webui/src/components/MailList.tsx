import { useQuery } from '@tanstack/react-query';

type Mail = {
  messageId: string;
  subject: string;
  createdAt: string;
};

const fetchData = async () => {
  const res = await fetch('http://localhost:8025/mails');

  return res.json();
};

export const MailList = () => {
  const { data, isSuccess } = useQuery<Mail[], Error>({
    queryKey: ['mails'],
    queryFn: fetchData,
  });

  if (!isSuccess) {
    return <div>no data</div>;
  }

  return (
    <div>
      <ul>
        {data?.map((mail: Mail) => (
          <li key={mail.messageId}>{mail.subject} / {mail.createdAt}</li>
        ))}
      </ul>
    </div>
  );
};
