import { type Locator, type Page, expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';

export class DashboardWidgetsPage extends BasePage {
  private readonly financeOverview: Locator;
  private readonly yearFilterCombobox: Locator;
  private readonly financeAmountDefinitions: Locator;

  private readonly userDataWidget: Locator;
  private readonly userDataTabs: Locator;

  private readonly calendarWidget: Locator;
  private readonly calendarToolbar: Locator;

  private readonly paymentsChartWidget: Locator;
  private readonly paymentChartModeToggle: Locator;

  private readonly contractsExpiringWidget: Locator;

  private readonly todosWidget: Locator;
  private readonly newTodoLink: Locator;
  private readonly todoModal: Locator;

  private readonly leadsChartWidget: Locator;
  private readonly projectsChartWidget: Locator;

  private readonly projectsActivityWidget: Locator;

  private readonly ticketsReportWidget: Locator;
  private readonly ticketsChartWidget: Locator;
  private readonly upcomingEventsWidget: Locator;

  constructor(page: Page) {
    super(page);
    this.financeOverview = page.locator('#widget-finance_overview');
    this.yearFilterCombobox = page.locator('button[data-id="invoices_total_years"]');
    this.financeAmountDefinitions = this.financeOverview.locator('dl dd');

    this.userDataWidget = page.locator('#widget-user_data');
    this.userDataTabs = this.userDataWidget.locator('.nav-tabs');

    this.calendarWidget = page.locator('#widget-calendar');
    this.calendarToolbar = this.calendarWidget.locator('.fc-toolbar');

    this.paymentsChartWidget = page.locator('#widget-payments_chart');
    this.paymentChartModeToggle = page.locator('#PaymentChartmode');

    this.contractsExpiringWidget = page.locator('#widget-contracts_expiring');

    this.todosWidget = page.locator('#widget-todos');
    this.newTodoLink = this.todosWidget.getByRole('link', { name: 'New To Do' });
    this.todoModal = page.locator('#__todo');

    this.leadsChartWidget = page.locator('#widget-leads_chart');
    this.projectsChartWidget = page.locator('#widget-projects_chart');

    this.projectsActivityWidget = page.locator('#widget-projects_activity');

    this.ticketsReportWidget = page.locator('#widget-tickets_report');
    this.ticketsChartWidget = page.locator('#widget-tickets_chart');
    this.upcomingEventsWidget = page.locator('#widget-upcoming_events');
  }

  // ─── Finance Overview ───────────────────────────────────────────────────

  private overviewSection(title: string): Locator {
    return this.financeOverview.locator('.row.home-summary > div').filter({ hasText: title });
  }

  private overviewStatusLink(sectionTitle: string, status: string): Locator {
    // Tên link luôn là "<số lượng động> <status>" -> neo bằng ^\d+ để tránh trùng khớp con chuỗi (vd. "Paid" khớp nhầm vào "Partially Paid")
    return this.overviewSection(sectionTitle).getByRole('link', { name: new RegExp(`^\\d+ ${status}$`) });
  }

  async assertOverviewSectionStatusesVisible(sectionTitle: string, statuses: string[]): Promise<void> {
    await step(`Verify "${sectionTitle}" section displays all expected statuses: ${statuses.join(', ')}`, async () => {
      const section = this.overviewSection(sectionTitle);
      await this.assertVisible(section, sectionTitle);
      for (const status of statuses) {
        await this.assertVisible(this.overviewStatusLink(sectionTitle, status), `"${status}" status in ${sectionTitle}`);
      }
    });
  }

  async clickOverviewStatus(sectionTitle: string, status: string): Promise<void> {
    await this.click(this.overviewStatusLink(sectionTitle, status));
  }

  private financeYearOption(year: string): Locator {
    // Bootstrap-select giữ lại <select> gốc (role=option trùng tên) song song với danh sách option hiển thị dạng <a> -> chỉ lấy <a> để tránh trùng locator.
    // Option đang được chọn có thêm icon check khiến accessible name lệch khoảng trắng (vd. " 2026") -> match theo hậu tố thay vì exact.
    return this.page.getByRole('option', { name: new RegExp(`${year}$`) }).and(this.page.locator('a'));
  }

  async assertYearFilterHasOptions(years: string[]): Promise<void> {
    await step('Verify year filter dropdown lists all expected year options', async () => {
      await this.click(this.yearFilterCombobox);
      for (const year of years) {
        await this.assertVisible(this.financeYearOption(year), `"${year}" year option`);
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async assertYearFilterDefaultSelected(currentYear: string): Promise<void> {
    await this.assertContainsText(this.yearFilterCombobox, currentYear);
  }

  async selectAdditionalYear(year: string): Promise<void> {
    await step(`Select an additional year "${year}" in Finance Overview`, async () => {
      await this.click(this.yearFilterCombobox);
      await this.click(this.financeYearOption(year));
    });
  }

  async assertFinanceAmountsHaveCurrencyFormat(): Promise<void> {
    await step('Verify all 3 finance figures display valid currency format', async () => {
      const count = await this.financeAmountDefinitions.count();
      expect(count, 'Number of finance figures (Outstanding/Past Due/Paid Invoices)').toBe(3);
      const texts = await this.getAllTexts(this.financeAmountDefinitions);
      for (const text of texts) {
        expect(text, `Currency format of "${text}"`).toMatch(/\$[\d,]+\.\d{2}/);
      }
    });
  }

  // ─── User Data tab widget ───────────────────────────────────────────────

  async assertUserDataTabsVisible(tabs: string[]): Promise<void> {
    await step('Verify Overview widget displays all expected tabs', async () => {
      for (const tab of tabs) {
        await this.assertVisible(this.userDataTabs.getByText(tab, { exact: true }), `Tab "${tab}"`);
      }
    });
  }

  async assertTabIsActive(tabLabel: string, tabHrefFragment: string): Promise<void> {
    await step(`Verify tab "${tabLabel}" is active`, async () => {
      const activeTabLink = this.userDataTabs.locator(`li.active a[href="#${tabHrefFragment}"]`);
      await this.assertVisible(activeTabLink, `Tab "${tabLabel}" active`);
      await this.assertVisible(this.userDataWidget.locator(`#${tabHrefFragment}`), `Tabpanel "${tabHrefFragment}"`);
    });
  }

  async clickUserDataTab(tabHrefFragment: string): Promise<void> {
    await this.click(this.userDataWidget.locator(`a[href="#${tabHrefFragment}"]`));
  }

  async clickViewAllInTasksTab(): Promise<void> {
    await this.click(this.userDataWidget.locator('#home_tab_tasks').getByRole('link', { name: 'View All' }));
  }

  // ─── Calendar ───────────────────────────────────────────────────────────

  async assertCurrentMonthHeadingVisible(): Promise<void> {
    const expectedTitle = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    await this.assertContainsText(this.calendarWidget.getByRole('heading', { level: 2 }), expectedTitle);
  }

  async assertWeekdayHeadersVisible(weekdays: string[]): Promise<void> {
    await step('Verify Calendar displays all 7 weekday columns', async () => {
      for (const day of weekdays) {
        await this.assertVisible(this.calendarWidget.getByRole('columnheader', { name: day, exact: true }), `"${day}" column`);
      }
    });
  }

  async switchCalendarView(view: 'month' | 'week' | 'day'): Promise<void> {
    await this.click(this.calendarToolbar.getByRole('button', { name: view, exact: true }));
  }

  async assertCalendarViewActive(view: 'month' | 'week' | 'day'): Promise<void> {
    await this.assertClassContains(this.calendarToolbar.getByRole('button', { name: view, exact: true }), 'fc-button-active');
  }

  // ─── Payment Records ────────────────────────────────────────────────────

  async assertPaymentRecordsTitleVisible(): Promise<void> {
    await this.assertContainsText(this.paymentsChartWidget, 'Payment Records');
  }

  async assertFullReportLinkURL(expectedURL: string): Promise<void> {
    const link = this.paymentsChartWidget.getByRole('link', { name: 'Full Report' });
    await this.assertAttribute(link, 'href', expectedURL, 'Full Report link');
  }

  async clickFullReportLink(): Promise<void> {
    await this.click(this.paymentsChartWidget.getByRole('link', { name: 'Full Report' }));
  }

  async openPaymentChartModeDropdown(): Promise<void> {
    await this.click(this.paymentChartModeToggle);
  }

  private paymentChartModeOption(mode: string): Locator {
    return this.paymentsChartWidget.locator('ul.dropdown-menu').getByRole('link', { name: mode, exact: true });
  }

  async assertPaymentChartModeOptionsVisible(modes: string[]): Promise<void> {
    await step('Verify Payment Records chart mode dropdown lists all expected options', async () => {
      for (const mode of modes) {
        await this.assertVisible(this.paymentChartModeOption(mode), `"${mode}" mode`);
      }
    });
  }

  async selectPaymentChartMode(mode: string): Promise<void> {
    await this.click(this.paymentChartModeOption(mode));
  }

  async assertPaymentChartModeLabel(expectedMode: string): Promise<void> {
    await this.assertContainsText(this.paymentChartModeToggle, expectedMode);
  }

  // ─── Contracts Expiring Soon ────────────────────────────────────────────

  async assertContractsExpiringColumnsVisible(columns: string[]): Promise<void> {
    await step('Verify Contracts Expiring Soon table displays all expected columns', async () => {
      for (const column of columns) {
        await this.assertVisible(this.contractsExpiringWidget.getByRole('columnheader', { name: new RegExp(column) }), `"${column}" column`);
      }
    });
  }

  async clickContractsExpiringViewAll(): Promise<void> {
    await this.click(this.contractsExpiringWidget.getByRole('link', { name: 'View All' }));
  }

  // ─── My To Do Items ──────────────────────────────────────────────────────

  async assertTodoSectionsVisible(sections: string[]): Promise<void> {
    await step('Verify My To Do Items widget displays both sections', async () => {
      for (const section of sections) {
        await this.assertVisible(this.todosWidget.getByRole('heading', { name: section }), `"${section}" section`);
      }
    });
  }

  async clickTodoViewAll(): Promise<void> {
    await this.click(this.todosWidget.getByRole('link', { name: 'View All' }));
  }

  async openNewTodoModal(): Promise<void> {
    await this.click(this.newTodoLink);
    await this.assertVisible(this.todoModal, 'Modal "Add New Todo"');
  }

  async assertNewTodoModalContent(): Promise<void> {
    await step('Verify Add New Todo modal displays all expected elements', async () => {
      await this.assertVisible(this.todoModal.getByRole('heading', { name: 'Add New Todo' }), 'Heading modal');
      await this.assertVisible(this.todoModal.getByLabel('Description'), 'Textbox Description');
      await this.assertVisible(this.todoModal.getByRole('button', { name: 'Save' }), 'Save button');
    });
  }

  async closeNewTodoModal(): Promise<void> {
    await this.click(this.todoModal.getByLabel('Close'));
  }

  // ─── Leads Chart / Projects Chart ───────────────────────────────────────

  private async assertChartWidgetRendered(widget: Locator, title: string): Promise<void> {
    await step(`Verify widget "${title}" displays its title and renders a chart canvas`, async () => {
      await this.assertContainsText(widget, title);
      await widget.scrollIntoViewIfNeeded();
      await expect(widget.locator('canvas')).toHaveCount(1);
    });
  }

  async assertLeadsChartRendered(): Promise<void> {
    await this.assertChartWidgetRendered(this.leadsChartWidget, 'Leads Overview');
  }

  async assertProjectsChartRendered(): Promise<void> {
    await this.assertChartWidgetRendered(this.projectsChartWidget, 'Statistics by Project Status');
  }

  // ─── Latest Project Activity ────────────────────────────────────────────

  async assertProjectActivityHasEntries(): Promise<void> {
    await step('Verify Latest Project Activity widget displays at least one activity entry', async () => {
      await this.assertContainsText(this.projectsActivityWidget, 'Latest Project Activity');
      const entries = this.projectsActivityWidget.locator('a[href*="/admin/profile/"]');
      expect(await entries.count(), 'Number of displayed activity entries').toBeGreaterThan(0);
    });
  }

  // ─── Widget không có dữ liệu / bị ẩn ────────────────────────────────────

  async assertTicketsWidgetsPresentButEmpty(): Promise<void> {
    await step('Verify Staff Tickets Report / Tickets Chart widgets exist in the DOM with no rendered content', async () => {
      await expect(this.ticketsReportWidget).toBeAttached();
      await expect(this.ticketsChartWidget).toBeAttached();
      await expect(this.ticketsReportWidget.locator('canvas')).toHaveCount(0);
      await expect(this.ticketsChartWidget.locator('canvas')).toHaveCount(0);
    });
  }

  async assertUpcomingEventsWidgetHidden(): Promise<void> {
    await this.assertHidden(this.upcomingEventsWidget, 'Widget Upcoming Events');
  }
}
