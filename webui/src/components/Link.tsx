type Props = Pick<JSX.IntrinsicElements['a'], 'href' | 'className' | 'children'>

export const Link = ({ href, className, children }: Props) => (
  <a href={href} className={className}>{children}</a>
);
