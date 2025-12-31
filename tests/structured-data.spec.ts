import { test, expect } from '@playwright/test';

const routes = ['/isapre', '/seguros-individuales', '/seguros-pyme'];

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

		// Check that at least one script contains Product/Offer and CLP currency
		const hasProduct = scripts.some((t) => /"@type"\s*:\s*"Product"/.test(t));
		const hasCurrency = scripts.some((t) =>
			/"priceCurrency"\s*:\s*"CLP"/.test(t)
		);

		expect(hasProduct).toBeTruthy();
		expect(hasCurrency).toBeTruthy();
	});
}
