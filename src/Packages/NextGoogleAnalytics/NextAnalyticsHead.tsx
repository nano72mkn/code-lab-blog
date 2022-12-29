import { FC } from 'react';

import Script from 'next/script';

interface Props {
  googleAnalyticsId: string | undefined;
}

export const NextAnalyticsHead: FC<Props> = ({ googleAnalyticsId }) => {
  console.log(googleAnalyticsId);
  if (!googleAnalyticsId) return null;
  return (
    <>
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga" defer strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${googleAnalyticsId}');
          `}
      </Script>
    </>
  );
};
