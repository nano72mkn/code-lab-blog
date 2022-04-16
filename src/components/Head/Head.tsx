import NextHeadSeo from 'next-head-seo';

interface HeadProps {
  title?: string;
  slug?: string;
}

export const Head: React.FC<HeadProps> = ({ title: titleProps, slug }) => {
  const title = `Code Lab Blog${titleProps ? ` | ${titleProps}` : ''}`;
  const url = `https://blog.code-lab.xyz${slug ? `/${slug}` : ''}`;
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
        image: slug
          ? `https://blog.code-lab.xyz/api/ogp_card?title=${titleProps}`
          : `https://blog.code-lab.xyz/api/ogp_card?title=Code%20Lab%20Blog`,
      }}
      twitter={{
        card: 'summary_large_image',
      }}
      customLinkTags={[
        {
          rel: 'icon',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🤔</text></svg>',
        },
      ]}
    />
  );
};
