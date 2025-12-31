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
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GoogleAnalytics;
