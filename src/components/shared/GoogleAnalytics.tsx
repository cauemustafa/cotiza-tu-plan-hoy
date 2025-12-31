import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadGtag, pageview } from '@/lib/analytics';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // If the user already consented, load gtag and send initial pageview
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
    if (consent === 'accepted') {
      loadGtag();
      pageview(window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    // send pageview on route change (if loaded)
    pageview(location.pathname + location.search);
  }, [location]);

  return null; // No static script tags: loading is handled by loadGtag (on consent)
};

export default GoogleAnalytics;
