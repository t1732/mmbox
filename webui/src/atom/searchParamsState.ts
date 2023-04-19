import { atom } from 'jotai';

type Params = {
  word: string;
  date: string;
};

export const searchParamsState = atom<Params>({
  word: '',
  date: '',
});
