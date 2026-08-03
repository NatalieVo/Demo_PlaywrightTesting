import { test as baseTest } from './base.fixture';
import { ENV } from '../utils/env.config';

export const test = baseTest.extend<{ authenticatedPage: void }>({
  authenticatedPage: [async ({ loginPage, page }, use) => {
    await loginPage.goto();
    await loginPage.login(ENV.TEST_USER_EMAIL, ENV.TEST_USER_PASSWORD);
    await page.waitForURL(/\/admin\//);
    await use();
  }, { auto: false }],
});

export { expect } from '@playwright/test';
