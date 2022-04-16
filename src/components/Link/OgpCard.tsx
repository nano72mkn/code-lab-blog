// import { Box, Typography } from '@material-ui/core';
// import { styled } from '@material-ui/core/styles';
// import { Skeleton } from '@material-ui/lab';
// import { useGetOgpQuery } from 'gen/graphql';
import Image from 'next/image';
import useSWR from 'swr';

interface Props {
  url: string;
}

export const OgpCard: React.FC<Props> = ({ url }) => {
  const { data } = useSWR('/api/ogp?url=' + url, (url) =>
    fetch(url).then((r) => r.json()),
  );

  console.log(data);

  if (!data) return <div className="animate-pulse">{url}</div>;
  return (
    <div className="my-10 border rounded-xl overflow-hidden">
      <div className="flex content-center">
        <div className=" p-5">
          <div className="mb-2">
            <p className="font-bold">{data.title}</p>
            {data.seo.description && (
              <p className="text-sm">{data.seo.description}</p>
            )}
          </div>
          <div className="flex items-center">
            <div className="mr-1">
              <Image src={data.favicon} width={12} height={12} layout="fixed" />
            </div>
            <p>{data.domain}</p>
          </div>
        </div>
        {data.ogp.ogImage && (
          <img src={data.ogp.ogImage} className="object-cover h-fill w-48" />
        )}
      </div>
    </div>
  );
};
