import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	timeout: 30_000,
	expect: { timeout: 5000 },
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: 'npm run preview -- --port 5173',
		port: 5173,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
