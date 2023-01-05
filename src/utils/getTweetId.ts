interface Props {
  url: string;
}

export const getTweetId = ({ url }: Props) => {
  const tweetId = url.split('/').pop();
  return tweetId;
};
