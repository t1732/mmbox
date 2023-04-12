import { Container } from './components/Container';
import { LayoutWrapper } from './components/LayoutWrapper';
import { MailList } from './components/MailList';

const App = () => (
  <Container>
    <LayoutWrapper><MailList /></LayoutWrapper>
  </Container>
);

export default App;
