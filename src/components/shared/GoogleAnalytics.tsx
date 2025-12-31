import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadGtag, pageview } from '@/lib/analytics';

/**
 * Env-driven Google Analytics component
 * - Loads GA only when `VITE_GTAG_ID` is set and in production (see `src/lib/analytics.ts`).
 * - Respects Do Not Track and avoids double-loading.
 * - Calls `pageview` on route changes.
 */
const GoogleAnalytics = ({ nonce }: { nonce?: string } = {}) => {
  const location = useLocation();

  // Load gtag script once on mount (no-op if not configured or not in prod)
  useEffect(() => {
    loadGtag(undefined, { nonce });
  }, [nonce]);

  // Track pageviews on route changes
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
