import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailList } from './components/MailList';

const queryClient = new QueryClient();

const App = () => (
  <LayoutWrapper>
    <QueryClientProvider client={queryClient}>
      <MailList />
    </QueryClientProvider>
  </LayoutWrapper>
);

export default App;
