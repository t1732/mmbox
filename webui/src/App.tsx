import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailList } from './components/MailList';
import { SearchInput } from './components/SearchInput';

const queryClient = new QueryClient();

const App = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchInputOnChange = (text: string) => {
    setSearchWord(text);
  };

  return (
    <LayoutWrapper>
      <QueryClientProvider client={queryClient}>
        <SearchInput onChange={handleSearchInputOnChange} />
        <MailList searchWord={searchWord} />
      </QueryClientProvider>
    </LayoutWrapper>
  );
};

export default App;
