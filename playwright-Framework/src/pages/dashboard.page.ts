import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';
import { ENV } from '../utils/env.config';

export class DashboardPage extends BasePage {
  private readonly quickStatsWidget: Locator;
  private readonly dashboardOptionsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.quickStatsWidget = page.locator('#widget-top_stats');
    this.dashboardOptionsButton = page.locator('.screen-options-btn');
  }

  async goto(): Promise<void> {
    await this.navigate(ENV.DASHBOARD_URL);
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

  async assertQuickStatsLabelsVisible(labels: string[]): Promise<void> {
    await step('Verify Quick Statistics widget displays all expected metric labels', async () => {
      for (const label of labels) {
        await this.assertVisible(this.quickStatsWidget.getByText(label, { exact: true }), `Quick Statistics label "${label}"`);
      }
    });
  }

  async getQuickStatsProgressPercents(): Promise<number[]> {
    return step('Read Quick Statistics progress bar percentages', async (ctx) => {
      const bars = this.quickStatsWidget.locator('.progress-bar[data-percent]');
      await ctx.parameter('locator', bars.toString());
      await this.assertVisible(bars.first(), 'Quick Statistics progress bar');
      const percents = await bars.evaluateAll((elements) => elements.map((el) => Number(el.getAttribute('data-percent'))));
      await ctx.parameter('result', percents.join(', '));
      return percents;
    });
  }

  async assertDashboardOptionsButtonVisible(): Promise<void> {
    await this.assertVisible(this.dashboardOptionsButton, 'Dashboard Options button');
  }

  async clickDashboardOptionsButton(): Promise<void> {
    await this.click(this.dashboardOptionsButton);
  }
}
