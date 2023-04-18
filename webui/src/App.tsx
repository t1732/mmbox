import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailBox } from './components/contents/MailBox';
import { SearchBox } from './components/layouts/SearchBox';

const queryClient = new QueryClient();

const App = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchInputOnChange = (text: string) => {
    setSearchWord(text);
  };

  return (
    <LayoutWrapper>
      <QueryClientProvider client={queryClient}>
        <SearchBox onChange={handleSearchInputOnChange} />
        <MailBox searchWord={searchWord} />
      </QueryClientProvider>
    </LayoutWrapper>
  );
};

export default App;
