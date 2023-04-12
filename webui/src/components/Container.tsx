import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="container mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
    {children}
  </div>
);
