import { Container } from './Container';

export const Header = () => (
  <header className="justify-betwee md:py-3 flex items-center bg-app-primary-500 py-3">
    <Container>
      <div className="w-fit bg-gradient-to-r from-logo-from to-logo-to bg-clip-text text-4xl font-black text-transparent">
        MMbox
      </div>
    </Container>
  </header>
);
