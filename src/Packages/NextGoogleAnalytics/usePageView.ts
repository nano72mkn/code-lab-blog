import { useEffect } from 'react';

import { useRouter } from 'next/router';

interface UsePageViewProps {
  googleAnalyticsId: string | undefined;
}

export const usePageView = ({ googleAnalyticsId }: UsePageViewProps) => {
  const router = useRouter();
  useEffect(() => {
    if (!googleAnalyticsId) return;
    const handleRouterChange = (url: any) => {
      window.gtag('config', googleAnalyticsId, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);
};
