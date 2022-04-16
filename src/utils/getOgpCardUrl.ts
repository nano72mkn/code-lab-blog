export const getOgpCardUrl = (title: string) => {
  const domain =
    process.env.NODE_ENV === 'production'
      ? 'https://blog.code-lab.xyz'
      : 'http://localhost:3000';
  const url = `${domain}/api/ogp_card?title=${encodeURIComponent(title)}`;
  return url;
};
