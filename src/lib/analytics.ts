/**
 * analytics.ts
 * Improved Google Analytics loader and wrappers
 * - Uses VITE_GTAG_ID env variable
 * - Respects Do Not Track
 * - Supports opt-out via setConsent
 * - Exposes isGtagLoaded for tests
 */

declare global {
	interface Window {
		dataLayer?: Array<unknown>;
		gtag?: (...args: unknown[]) => void;
		[index: string]: unknown;
	}
}

const GA_ID = (import.meta.env.VITE_GTAG_ID as string | undefined) || undefined;
let _Loaded = false;

/** Returns whether gtag has been loaded */
export const isGtagLoaded = () => _Loaded;

/**
 * Load Google Analytics (gtag.js) safely.
 * - Only loads in production
 * - Respects navigator.doNotTrack
 * - Avoids double-loading
 * - Optional nonce for CSP
 */
export const loadGtag = (
	id = GA_ID,
	options?: { nonce?: string; anonymizeIp?: boolean }
) => {
	if (!id || typeof window === 'undefined' || _Loaded) return;
	if (!import.meta.env.PROD) return;
	if (
		typeof navigator !== 'undefined' &&
		(navigator as Navigator & { doNotTrack?: string }).doNotTrack === '1'
	)
		return;
	if (
		typeof navigator !== 'undefined' &&
		(navigator as Navigator & { doNotTrack?: string }).doNotTrack === '1'
	)
		return;

	const { nonce, anonymizeIp = true } = options || {};

	const s = document.createElement('script');
	s.async = true;
	if (nonce) s.setAttribute('nonce', nonce);
	s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
	document.head.appendChild(s);

	window.dataLayer = window.dataLayer || [];
	window.gtag = (...args: unknown[]) => {
		window.dataLayer!.push(args);
	};
	window.gtag('js', new Date());
	window.gtag('config', id, { anonymize_ip: anonymizeIp });

	// standard opt-out var recommended by Google
	window[`ga-disable-${id}`] = false;
	_Loaded = true;
};

/** Disable or enable tracking (opt-out) */
export const setConsent = (consented: boolean, id = GA_ID) => {
	if (!id || typeof window === 'undefined') return;
	window[`ga-disable-${id}`] = !consented;
};

/** Pageview wrapper */
export const pageview = (url: string, id = GA_ID) => {
	if (typeof window === 'undefined' || !window.gtag || !id) return;
	window.gtag('config', id, { page_path: url });
};

/** Flexible event wrapper */
export const event = (action: string, params: Record<string, unknown> = {}) => {
	if (typeof window === 'undefined' || !window.gtag) return;
	window.gtag('event', action, params);
};

// Convenience wrappers
export const trackFormSubmit = (formName: string) =>
	event('form_submit', { event_category: 'engagement', event_label: formName });
export const trackWhatsAppClick = (location: string) =>
	event('whatsapp_click', {
		event_category: 'engagement',
		event_label: location,
	});
export const trackPhoneClick = (location: string) =>
	event('phone_click', { event_category: 'engagement', event_label: location });
export const trackPlanView = (planType: string) =>
	event('plan_view', { event_category: 'engagement', event_label: planType });
export const trackQuoteRequest = (planType: string) =>
	event('quote_request', {
		event_category: 'conversion',
		event_label: planType,
	});
	