import ogpParser from 'ogp-parser';

export const getOgpData = async (targetUrl: string) => {
  const url = new URL(targetUrl);

  const ogp = await ogpParser(url.href, { skipOembed: true });

  return {
    title: ogp.title,
    domain: url.hostname,
    favicon: `http://www.google.com/s2/favicons?sz=32&domain=https://${url.hostname}`,
    ogp: {
      ogTitle: ogp.ogp['og:title'] ? ogp.ogp['og:title'][0] : '',
      ogUrl: ogp.ogp['og:url'] ? ogp.ogp['og:url'][0] : '',
      ogImage: ogp.ogp['og:image'] ? ogp.ogp['og:image'][0] : '',
      ogSiteName: ogp.ogp['og:site_name'] ? ogp.ogp['og:site_name'][0] : '',
    },
    seo: {
      description: ogp.seo.description ? ogp.seo.description[0] : '',
    },
  };
};
