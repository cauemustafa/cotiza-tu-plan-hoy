import { test, expect } from '@playwright/test';

// Type definitions for JSON-LD structures to avoid 'any'
interface JsonLdObject {
	'@type'?: string;
	[key: string]: unknown; // Allow for arbitrary properties
}

interface SearchActionSchema {
	'@type': 'SearchAction';
	target: string;
	[key: string]: unknown;
}

interface WebSiteSchema extends JsonLdObject {
	'@type': 'WebSite';
	potentialAction?: SearchActionSchema;
}

interface OfferSchema {
	price?: number;
	priceCurrency?: string;
	[key: string]: unknown;
}

interface ProductSchema extends JsonLdObject {
	'@type': 'Product';
	offers?: OfferSchema | OfferSchema[];
	[key: string]: unknown;
}

// Type guards for JSON-LD schemas
const isProductSchema = (o: unknown): o is ProductSchema =>
	typeof o === 'object' &&
	o !== null &&
	(o as JsonLdObject)['@type'] === 'Product';

const isWebSiteSchema = (o: unknown): o is WebSiteSchema =>
	typeof o === 'object' &&
	o !== null &&
	(o as JsonLdObject)['@type'] === 'WebSite';

const routes = ['/', '/isapre', '/seguros-individuales', '/seguros-pyme'];

const expectations: Record<
	string,
	{
		requireOfferWithPrice: boolean;
		requireSearchAction?: boolean;
		requireProduct?: boolean;
		requireService?: boolean;
	}
> = {
	'/': {
		requireOfferWithPrice: false,
		requireSearchAction: true,
		requireProduct: false,
		requireService: true,
	},
	'/isapre': { requireOfferWithPrice: false },
	'/seguros-individuales': { requireOfferWithPrice: true },
	'/seguros-pyme': { requireOfferWithPrice: true },
};

for (const route of routes) {
	test(`structured data present on ${route}`, async ({ page }) => {
		await page.goto(route);

		// wait for scripts to be added by client-side render (attached to DOM)
		await page.waitForSelector('script[type="application/ld+json"]', {
			state: 'attached',
			timeout: 10000,
		});

		const scripts = await page
			.locator('script[type="application/ld+json"]')
			.allTextContents();
		expect(scripts.length).toBeGreaterThan(0);

		// Allow client-side scripts to render and fetch any additional data.
		if (route === '/') await page.waitForLoadState('networkidle');

		// Parse JSON-LD entries safely
		const parsed: unknown[] = [];
		for (const s of scripts) {
			try {
				const j = JSON.parse(s);
				if (Array.isArray(j)) parsed.push(...(j as unknown[]));
				else parsed.push(j as unknown);
			} catch {
				// ignore invalid JSON-LD blocks
			}
		}

		const isProduct = (o: unknown): o is Record<string, unknown> =>
			typeof o === 'object' &&
			o !== null &&
			'@type' in (o as Record<string, unknown>);

		// Basic: at least one Product (optional per-route)
		if (expectations[route].requireProduct !== false) {
			const hasProduct = parsed.some(
				(o) => isProduct(o) && (o as JsonLdObject)['@type'] === 'Product'
			);
			expect(hasProduct).toBeTruthy();
		}

		// If required for the route, assert there is an Offer with numeric price and CLP currency
		if (expectations[route].requireOfferWithPrice) {
			const hasOfferWithPrice = parsed.some((o) => {
				if (!isProductSchema(o)) return false; // Use the new type guard

				const offers = o.offers;
				if (!offers) return false;

				const offerArray = Array.isArray(offers) ? offers : [offers];

				return offerArray.some((offer) => {
					// Ensure offer is treated as OfferSchema
					const typedOffer = offer as OfferSchema;
					return (
						typeof typedOffer?.price === 'number' &&
						typedOffer.price > 0 &&
						typedOffer?.priceCurrency === 'CLP'
					);
				});
			});
			expect(hasOfferWithPrice).toBeTruthy();
		}

		// If required for the route, assert there is a WebSite with SearchAction
		if (expectations[route].requireSearchAction) {
			const hasSearchAction = parsed.some((o) => {
				if (!isWebSiteSchema(o)) return false; // Use the new type guard
				const potentialAction = o.potentialAction;
				return (
					potentialAction?.['@type'] === 'SearchAction' &&
					typeof potentialAction?.target === 'string'
				);
			});
			expect(hasSearchAction).toBeTruthy();
		}

		// If required for the route, assert there is a Service somewhere in the parsed JSON-LD (recursive)
		if (expectations[route].requireService) {
			const containsService = (v: unknown): boolean => {
				if (typeof v !== 'object' || v === null) return false;
				const rv = v as Record<string, unknown>;
				if (rv['@type'] === 'Service') return true;
				for (const val of Object.values(rv)) {
					if (Array.isArray(val)) {
						for (const item of val) if (containsService(item)) return true;
					} else if (containsService(val)) return true;
				}
				return false;
			};

			const hasService = parsed.some((o) => containsService(o));
			expect(hasService).toBeTruthy();
		}
	});
}
