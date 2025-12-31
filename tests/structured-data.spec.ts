import { test, expect } from '@playwright/test';

const routes = ['/isapre', '/seguros-individuales', '/seguros-pyme'];

const expectations: Record<string, { requireOfferWithPrice: boolean }> = {
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

		// Parse JSON-LD entries (handle arrays and objects)
		const parsed: any[] = [];
		for (const s of scripts) {
			try {
				const j = JSON.parse(s);
				if (Array.isArray(j)) parsed.push(...j);
				else parsed.push(j);
			} catch (e) {
				// ignore invalid JSON-LD blocks
			}
		}

		// Basic: at least one Product
		const hasProduct = parsed.some((o) => o && o['@type'] === 'Product');
		expect(hasProduct).toBeTruthy();

		// If required for the route, assert there is an Offer with numeric price and CLP currency
		if (expectations[route].requireOfferWithPrice) {
			const hasOfferWithPrice = parsed.some((o) => {
				if (!o || o['@type'] !== 'Product' || !o.offers) return false;
				const offers = Array.isArray(o.offers) ? o.offers : [o.offers];
				return offers.some(
					(of: any) =>
						typeof of.price === 'number' &&
						of.price > 0 &&
						of.priceCurrency === 'CLP'
				);
			});
			expect(hasOfferWithPrice).toBeTruthy();
		}
	});
}
