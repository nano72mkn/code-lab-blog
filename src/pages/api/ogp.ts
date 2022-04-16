import ogpParser from 'ogp-parser';

import type { NextApiRequest, NextApiResponse } from 'next';

export type OgpResponseType = {
  title: string;
  domain: string;
  favicon: string;
  ogp: {
    ogTitle: string;
    ogUrl: string;
    ogImage: string;
    ogSiteName: string;
  };
  seo: {
    description: string;
  };
};

const ogp = async (
  req: NextApiRequest,
  res: NextApiResponse<OgpResponseType>,
) => {
  if (!req.query.url) {
    res.status(500).end();
  }

  const url = new URL(req.query.url as string);
  const ogp = await ogpParser(url.href, { skipOembed: true });

  res.status(200).json({
    title: ogp.title,
    domain: url.hostname,
    favicon: `http://www.google.com/s2/favicons?sz=32&domain=${url.hostname}`,
    ogp: {
      ogTitle: ogp.ogp['og:title'] ? ogp.ogp['og:title'][0] : '',
      ogUrl: ogp.ogp['og:url'] ? ogp.ogp['og:url'][0] : '',
      ogImage: ogp.ogp['og:image'] ? ogp.ogp['og:image'][0] : '',
      ogSiteName: ogp.ogp['og:site_name'] ? ogp.ogp['og:site_name'][0] : '',
    },
    seo: {
      description: ogp.seo.description ? ogp.seo.description[0] : '',
    },
  });
};

export default ogp;
