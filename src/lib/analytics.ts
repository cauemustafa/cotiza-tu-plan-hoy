// Google Analytics tracking functions
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
export const GA_TRACKING_ID = 'G-XXXXXXXXXX';

// Track page views
export const pageview = (url: string) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (typeof window !== 'undefined' && (window as any).gtag) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).gtag('config', GA_TRACKING_ID, {
			page_path: url,
		});
	}
};

// Track custom events
export const event = ({
	action,
	category,
	label,
	value,
}: {
	action: string;
	category: string;
	label: string;
	value?: number;
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (typeof window !== 'undefined' && (window as any).gtag) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		});
	}
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
	event({
		action: 'form_submit',
		category: 'engagement',
		label: formName,
	});
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (location: string) => {
	event({
		action: 'whatsapp_click',
		category: 'engagement',
		label: location,
	});
};

// Track phone clicks
export const trackPhoneClick = (location: string) => {
	event({
		action: 'phone_click',
		category: 'engagement',
		label: location,
	});
};

// Track plan views
export const trackPlanView = (planType: string) => {
	event({
		action: 'plan_view',
		category: 'engagement',
		label: planType,
	});
};

// Track quote requests
export const trackQuoteRequest = (planType: string) => {
	event({
		action: 'quote_request',
		category: 'conversion',
		label: planType,
	});
};
