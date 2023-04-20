import { focusManager, useMutation } from '@tanstack/react-query';
import { axios } from '../axios';

type MailsDeleteResponse = null;

const deleteData = async () => {
  const { data } = await axios.delete<MailsDeleteResponse>(`/flush`);

  return data;
};

export const useDeleteMailsMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: deleteData,
    onSuccess,
  });
