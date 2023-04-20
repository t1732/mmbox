import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: MMBOX_API_BASE_URL,
  timeout: 1000,
});

export { instance as axios, AxiosError };
