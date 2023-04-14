import { Container } from './Container';
import { Link } from '../parts/Link';
import './Footer.css';

export const Footer = () => (
  <footer className="bottom-0 left-0 right-0 bg-white">
    <hr className="mb-5 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
    <Container>
      <div className="h-12 content-center text-center">
        <Link className="w-fit" href="https://github.com/t1732/mmbox">
          Github
        </Link>
      </div>
    </Container>
  </footer>
);
