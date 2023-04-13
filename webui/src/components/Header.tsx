import { Container } from './Container';

export const Header = () => (
  <header className="justify-betwee flex items-center bg-slate-500 py-3 md:py-3">
    <Container>
      <div className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-4xl font-black text-transparent selection:bg-transparent">
        MMbox
      </div>
    </Container>
  </header>
);
