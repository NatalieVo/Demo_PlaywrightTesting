import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private readonly sidebarDashboard: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarDashboard = page.locator('#sidebar .sidebar-nav a', { hasText: 'Dashboard' });
  }

  async expectToBeVisible(): Promise<void> {
    await step('Verify Dashboard page is displayed', async () => {
      await this.assertHasURL(/\/admin\//);
      await this.assertHasTitle('Dashboard');
    });
  }

  async isDashboardURL(): Promise<boolean> {
    return this.page.url().includes('/admin/');
  }
}
