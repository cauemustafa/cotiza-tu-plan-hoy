import { test, expect } from '@playwright/test';

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

		// Give client-side scripts a short moment to render (useful for client-only injections)
		if (route === '/') await page.waitForTimeout(500);

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
				(o) =>
					isProduct(o) && (o as Record<string, unknown>)['@type'] === 'Product'
			);
			expect(hasProduct).toBeTruthy();
		}

		// If required for the route, assert there is an Offer with numeric price and CLP currency
		if (expectations[route].requireOfferWithPrice) {
			const hasOfferWithPrice = parsed.some((o) => {
				if (
					!isProduct(o) ||
					(o as Record<string, unknown>)['@type'] !== 'Product'
				)
					return false;
				const offers = (o as Record<string, unknown>)['offers'];
				if (!offers) return false;
				const arr = Array.isArray(offers) ? offers : [offers];
				return arr.some((of) => {
					if (typeof of !== 'object' || of === null) return false;
					const ro = of as Record<string, unknown>;
					return (
						typeof ro['price'] === 'number' &&
						(ro['price'] as number) > 0 &&
						ro['priceCurrency'] === 'CLP'
					);
				});
			});
			expect(hasOfferWithPrice).toBeTruthy();
		}

		// If required for the route, assert there is a WebSite with SearchAction
		if (expectations[route].requireSearchAction) {
			const hasSearchAction = parsed.some((o) => {
				if (typeof o !== 'object' || o === null) return false;
				const ro = o as Record<string, unknown>;
				if (ro['@type'] !== 'WebSite') return false;
				const pa = ro['potentialAction'];
				if (!pa || typeof pa !== 'object') return false;
				const paObj = pa as Record<string, unknown>;
				return (
					paObj['@type'] === 'SearchAction' &&
					typeof paObj['target'] === 'string'
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
