import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';
import { useEffect, useState } from 'react';

const useSegment = () => {
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
  const [writeKey, setWriteKey] = useState('4TeWCt1kFP32yi2z02MP0yLhXaDjECqs');

  useEffect(() => {
    const loadAnalytics = async () => {
      let [response] = await AnalyticsBrowser.load({ writeKey });
      setAnalytics(response);
    };
    loadAnalytics();
    analytics?.page();
  }, [writeKey]);

  return {
    analytics,
  };
};

export default useSegment;
