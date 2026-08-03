import { test } from '../../fixtures/auth.fixture';

const SIDEBAR_TOP_LEVEL_ITEMS = [
  'Dashboard', 'Customers', 'Projects', 'Tasks', 'Contracts', 'Sales',
  'Subscriptions', 'Expenses', 'Support', 'Leads', 'Estimate Request',
  'Knowledge Base', 'Utilities', 'Reports',
];

const DIRECT_LINK_ITEMS: Array<[string, RegExp]> = [
  ['Customers', /\/admin\/clients/],
  ['Projects', /\/admin\/projects/],
  ['Tasks', /\/admin\/tasks/],
  ['Contracts', /\/admin\/contracts/],
  ['Subscriptions', /\/admin\/subscriptions/],
  ['Expenses', /\/admin\/expenses/],
  ['Support', /\/admin\/tickets/],
  ['Leads', /\/admin\/leads/],
  ['Estimate Request', /\/admin\/estimate_request/],
  ['Knowledge Base', /\/admin\/knowledge_base/],
];

test.describe('Dashboard Module - Sidebar', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('CRM_DASHBOARD_TC_003 - Sidebar hiển thị đầy đủ các menu cấp 1', async ({ sidebarPage }) => {
    await test.step('Verify the Sidebar lists all 14 top-level menu items', async () => {
      await sidebarPage.assertMenuItemsVisible(SIDEBAR_TOP_LEVEL_ITEMS);
    });
  });

  test('CRM_DASHBOARD_TC_017 - Click các mục Sidebar không có submenu điều hướng đúng URL tương ứng', async ({
    sidebarPage,
    dashboardPage,
  }) => {
    for (const [label, urlPattern] of DIRECT_LINK_ITEMS) {
      await test.step(`Click Sidebar item "${label}" and verify navigation to ${urlPattern}`, async () => {
        await sidebarPage.clickMenuItem(label);
        await sidebarPage.assertHasURL(urlPattern);
        await dashboardPage.goto();
      });
    }
  });

  test('CRM_DASHBOARD_TC_018 - Click "Sales" trên Sidebar mở rộng submenu, không điều hướng ngay', async ({ sidebarPage }) => {
    await test.step('Click "Sales" and verify the submenu expands without navigating away', async () => {
      await sidebarPage.expandSales();
      await sidebarPage.assertHasURL(/\/admin\/#?$/);
      await sidebarPage.assertSalesSubmenuVisible(['Proposals', 'Estimates', 'Invoices', 'Payments', 'Credit Notes', 'Items']);
    });
  });

  test('CRM_DASHBOARD_TC_019 - Click "Utilities" trên Sidebar mở rộng submenu, không điều hướng ngay', async ({ sidebarPage }) => {
    await test.step('Click "Utilities" and verify the submenu expands without navigating away', async () => {
      await sidebarPage.expandUtilities();
      await sidebarPage.assertHasURL(/\/admin\/#?$/);
      await sidebarPage.assertUtilitiesSubmenuVisible(['Media', 'Bulk PDF Export', 'Calendar']);
    });
  });

  test('CRM_DASHBOARD_TC_020 - Click "Reports" trên Sidebar mở rộng submenu, không điều hướng ngay', async ({ sidebarPage }) => {
    await test.step('Click "Reports" and verify the submenu expands without navigating away', async () => {
      await sidebarPage.expandReports();
      await sidebarPage.assertHasURL(/\/admin\/#?$/);
      await sidebarPage.assertReportsSubmenuVisible([
        'Sales', 'Expenses', 'Expenses vs Income', 'Leads', 'Timesheets overview', 'KB Articles',
      ]);
    });
  });
});
