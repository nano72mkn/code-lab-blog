import NextHeadSeo from 'next-head-seo';

import { appHost } from 'config/app';
import { getOgpCardUrl } from 'utils/getOgpCardUrl';

interface HeadProps {
  title?: string;
  slug?: string;
}

export const Head: React.FC<HeadProps> = ({ title: titleProps, slug }) => {
  const title = `Code Lab Blog${titleProps ? ` | ${titleProps}` : ''}`;
  const url = `${appHost}${slug ? `/${slug}` : ''}`;
  const description = 'Code Lab Blog | 実験サイト兼個人ブログ';
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
      ]}
    />
  );
};
