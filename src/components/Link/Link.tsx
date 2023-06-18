// import { Suspense } from 'react';

// import dynamic from 'next/dynamic';

import NextLink from 'next/link';
// import { ErrorBoundary } from 'react-error-boundary';
import { Tweet } from 'react-tweet';

// import { ErrorFallback } from 'components/ErrorBoundary';

import { getTweetId } from 'utils/getTweetId';


import { OgpCard } from './OgpCard';


// const NextLink = dynamic(() => {
//   const Component = import('next/link');
//   return Component;
// });

// const OgpCard = dynamic(() => {
//   const Component = import('./OgpCard').then((modules) => modules.OgpCard);
//   return Component;
// });

// const Tweet = dynamic(() => {
//   const Component = import('react-tweet').then((modules) => modules.Tweet);
//   return Component;
// });

interface Props {
  href?: string;
  children: React.ReactNode;
}

export const Link: React.FC<Props> = ({ href, children }) => {
  let Component = <span>{children}</span>;

  if (!href) return <></>;

  const isExternalLink = /^http/.test(href);

  const url = isExternalLink ? new URL(href) : undefined;

  if (children === href) {
    switch (url?.host) {
      case 'twitter.com':
        const tweetId = getTweetId({ url: href });
        if (tweetId === undefined) break;
        return (
          <div className="my-10" data-theme="light">
            <Tweet id={tweetId} />
          </div>
        );
      default:
        Component = (
          /* @ts-expect-error Server Component */
          <OgpCard url={href} />
        );
    }
  }

  if (isExternalLink) {
    return (
      <NextLink href={href} rel="noopener noreferrer" target="_blank">
        {Component}
      </NextLink>
    );
  }

  return (
    <NextLink href={href} prefetch={false}>
      {Component}
    </NextLink>
  );
};
