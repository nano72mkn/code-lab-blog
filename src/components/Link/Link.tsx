'use client';

import dynamic from 'next/dynamic';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { getTweetId } from 'utils/getTweetId';

const NextLink = dynamic(() => {
  const Component = import('next/link');
  return Component;
});

const OgpCard = dynamic(() => {
  const Component = import('./OgpCard').then((modules) => modules.OgpCard);
  return Component;
});

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
          <div className="my-10">
            <TwitterTweetEmbed
              tweetId={tweetId}
              options={{ align: 'center' }}
            />
          </div>
        );
      default:
        Component = <OgpCard url={href} />;
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
