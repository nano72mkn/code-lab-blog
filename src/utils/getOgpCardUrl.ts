import { appHost } from 'config/app';

export const getOgpCardUrl = (title: string) => {
  const url = `${appHost}/api/ogp_card?title=${encodeURIComponent(title)}`;
  return url;
};
