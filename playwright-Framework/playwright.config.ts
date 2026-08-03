import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src/tests',
  globalSetup: './src/utils/global-setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,

  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '10000'),
  },

  reporter: [
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        // detail:false keeps only our custom allure.step()/test.step() entries in the report
        // and drops Playwright's automatic low-level "pw:api" steps (every internal click/fill/expect
        // call), which is what caused noisy, redundant intermediate steps in the Test Body view.
        detail: false,
      },
    ],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://crm.anhtester.com/admin/authentication',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '10000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADED !== 'true',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
