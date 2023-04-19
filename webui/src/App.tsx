import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailBox } from './components/contents/MailBox';

const queryClient = new QueryClient();

const App = () => (
  <LayoutWrapper>
    <QueryClientProvider client={queryClient}>
      <MailBox />
    </QueryClientProvider>
  </LayoutWrapper>
);

export default App;
