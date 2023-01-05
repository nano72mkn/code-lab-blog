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

  const url = new URL(href);

  if (children === href) {
    switch (url.host) {
      case 'twitter.com':
        const tweetId = getTweetId({ url: href });
        if (tweetId === undefined) break;
        return (
          <TwitterTweetEmbed tweetId={tweetId} options={{ align: 'center' }} />
        );
      default:
        Component = <OgpCard url={href} />;
    }
  }

  const externalLink = /^http/.test(href);
  if (externalLink) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
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
