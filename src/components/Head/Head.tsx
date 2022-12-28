import NextHeadSeo from 'next-head-seo';
{
  /* <link rel="author" href="http://www.hatena.ne.jp/あなたのはてなID/" />; */
}

import { appHost } from 'config/app';
import { getOgpCardUrl } from 'utils/getOgpCardUrl';

interface HeadProps {
  title?: string;
  slug?: string;
}

export const Head: React.FC<HeadProps> = ({ title: titleProps, slug }) => {
  const title = `${titleProps ? `${titleProps} | ` : ''}Code Lab Blog`;
  const url = `${appHost}${slug ? `/${slug}` : ''}`;
  const description = 'フロントエンジニア、@shota1995mの個人ブログ&実験サイト';
  return (
    <NextHeadSeo
      title={title}
      description={description}
      canonical={url}
      og={{
        title,
        description,
        url,
        type: slug ? 'article' : 'website',
        siteName: 'code-lab',
        image:
          slug && titleProps
            ? getOgpCardUrl(titleProps)
            : getOgpCardUrl('Code Lab Blog'),
      }}
      twitter={{
        card: 'summary_large_image',
      }}
      customLinkTags={[
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'author',
          href: 'http://www.hatena.ne.jp/shota1995m/',
        },
      ]}
    />
  );
};
