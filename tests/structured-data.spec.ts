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

		// Basic: at least one Product
		const hasProduct = parsed.some(
			(o) =>
				isProduct(o) && (o as Record<string, unknown>)['@type'] === 'Product'
		);
		expect(hasProduct).toBeTruthy();

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
	});
}
