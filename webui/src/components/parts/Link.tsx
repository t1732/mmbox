import { ComponentProps } from 'react';

type Props = ComponentProps<'a'>;

export const Link = (props: Props) => {
  const { children } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <a {...props}>{children}</a>;
};
