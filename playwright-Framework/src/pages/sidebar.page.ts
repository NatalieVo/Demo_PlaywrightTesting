import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';

export class SidebarPage extends BasePage {
  private readonly menu: Locator;
  private readonly dashboardItem: Locator;
  private readonly salesItem: Locator;
  private readonly utilitiesItem: Locator;
  private readonly reportsItem: Locator;

  constructor(page: Page) {
    super(page);
    this.menu = page.locator('#side-menu');
    this.dashboardItem = page.locator('li.menu-item-dashboard');
    this.salesItem = page.locator('li.menu-item-sales');
    this.utilitiesItem = page.locator('li.menu-item-utilities');
    this.reportsItem = page.locator('li.menu-item-reports');
  }

  // Top-level menu items dùng class "menu-text" (khác "sub-menu-text" của submenu),
  // đồng thời link icon+text có ký tự icon-font lẫn vào accessible name nên phải match theo text thuần, không dùng getByRole
  private topLevelItemLink(label: string): Locator {
    return this.menu.locator('li > a').filter({ has: this.page.locator('span.menu-text', { hasText: label }) });
  }

  async assertMenuItemsVisible(labels: string[]): Promise<void> {
    await step('Verify Sidebar lists all expected top-level menu items', async () => {
      for (const label of labels) {
        await this.assertVisible(this.topLevelItemLink(label), `Sidebar item "${label}"`);
      }
    });
  }

  async assertDashboardItemIsActive(): Promise<void> {
    // Class "active" được thêm bởi JS xử lý highlight menu theo URL hiện tại, không render sẵn từ server
    await this.assertClassContains(this.dashboardItem, 'active', 'Dashboard sidebar item');
  }

  async clickMenuItem(label: string): Promise<void> {
    await this.click(this.topLevelItemLink(label));
  }

  async expandSales(): Promise<void> {
    await this.click(this.salesItem.locator('> a'));
  }

  async assertSalesSubmenuVisible(labels: string[]): Promise<void> {
    await step('Verify Sales submenu lists all expected items', async () => {
      for (const label of labels) {
        await this.assertVisible(this.salesItem.getByText(label, { exact: true }), `Sales submenu "${label}"`);
      }
    });
  }

  async expandUtilities(): Promise<void> {
    await this.click(this.utilitiesItem.locator('> a'));
  }

  async assertUtilitiesSubmenuVisible(labels: string[]): Promise<void> {
    await step('Verify Utilities submenu lists all expected items', async () => {
      for (const label of labels) {
        await this.assertVisible(this.utilitiesItem.getByText(label, { exact: true }), `Utilities submenu "${label}"`);
      }
    });
  }

  async expandReports(): Promise<void> {
    await this.click(this.reportsItem.locator('> a'));
  }

  async assertReportsSubmenuVisible(labels: string[]): Promise<void> {
    await step('Verify Reports submenu lists all expected items', async () => {
      for (const label of labels) {
        await this.assertVisible(this.reportsItem.getByText(label, { exact: true }), `Reports submenu "${label}"`);
      }
    });
  }
}
