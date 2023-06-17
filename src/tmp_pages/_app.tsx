// eslint-disable-next-line import/order
import type { AppProps } from 'next/app';

import { Layout } from 'components/Layout';

import '../styles/globals.css';
import { NextAnalyticsHead } from 'Packages/NextGoogleAnalytics/NextAnalyticsHead';
import { usePageView } from 'Packages/NextGoogleAnalytics/usePageView';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView({ googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID });
  return (
    <Layout>
      <NextAnalyticsHead googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
