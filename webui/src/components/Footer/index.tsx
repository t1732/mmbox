import { Container } from '../Container';
import { Link } from '../Link';
import './footer.css';

export const Footer = () => (
  <footer className="bottom-0 left-0 right-0">
    <Container>
      <div className="grid h-16 grid-cols-1 content-center text-center">
        <Link href="https://github.com/t1732/mmbox">Github</Link>
      </div>
    </Container>
  </footer>
);
