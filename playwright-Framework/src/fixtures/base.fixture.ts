import { test as base } from '@playwright/test';
import { attachment, step } from 'allure-js-commons';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { DashboardWidgetsPage } from '../pages/dashboard-widgets.page';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { HeaderPage } from '../pages/header.page';
import { SidebarPage } from '../pages/sidebar.page';

type AutomationFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  dashboardWidgetsPage: DashboardWidgetsPage;
  forgotPasswordPage: ForgotPasswordPage;
  headerPage: HeaderPage;
  sidebarPage: SidebarPage;
  attachFinalScreenshotOnPass: void;
};

export const test = base.extend<AutomationFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  dashboardWidgetsPage: async ({ page }, use) => {
    await use(new DashboardWidgetsPage(page));
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },

  sidebarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },

  // Runs after every test body. Failed tests already get a screenshot from Playwright's
  // `screenshot: 'only-on-failure'` config, attached automatically by allure-playwright.
  // For passed tests no screenshot is captured by default, so we attach one manually here
  // as the final step of the test — visual proof of the last verified state.
  attachFinalScreenshotOnPass: [async ({ page }, use, testInfo) => {
    await use();

    if (testInfo.status === 'passed' && !page.isClosed()) {
      await step('Attach final screenshot of successful test execution', async () => {
        const screenshot = await page.screenshot({ fullPage: true });
        await attachment('Final screenshot (test passed)', screenshot, 'image/png');
      });
    }
  }, { auto: true }],
});

export { expect } from '@playwright/test';
