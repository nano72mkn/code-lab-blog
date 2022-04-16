import NextLink from 'next/link';

import { OgpCard } from './OgpCard';

interface Props {
  href?: string;
  children: React.ReactNode;
}

export const Link: React.FC<Props> = ({ href, children }) => {
  let Component = <span>{children}</span>;

  if (!href) return <></>;

  if (children === href) {
    Component = <OgpCard url={href} />;
  }

  const externalLink = /^http/.test(href);
  if (externalLink) {
    return (
      <a href={href} rel="noopener noreferrer">
        {Component}
      </a>
    );
  }

  return (
    <NextLink href={href} prefetch={false} passHref>
      <a>{Component}</a>
    </NextLink>
  );
};
