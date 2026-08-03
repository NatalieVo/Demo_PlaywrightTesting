import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Dashboard Module', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('CRM_DASHBOARD_TC_001 - Đăng nhập thành công hiển thị đúng trang Dashboard', async ({ dashboardPage }) => {
    await test.step('Verify the Dashboard page is displayed after a successful login', async () => {
      await dashboardPage.expectToBeVisible();
    });
  });

  test('CRM_DASHBOARD_TC_004 - Mục "Dashboard" trên Sidebar active khi ở trang chủ', async ({ sidebarPage }) => {
    await test.step('Verify the "Dashboard" Sidebar item is highlighted as active', async () => {
      await sidebarPage.assertDashboardItemIsActive();
    });
  });

  test('CRM_DASHBOARD_TC_021 - Widget "Quick Statistics" hiển thị đủ 4 chỉ số', async ({ dashboardPage }) => {
    await test.step('Verify the "Quick Statistics" widget displays all 4 expected metrics', async () => {
      await dashboardPage.assertQuickStatsLabelsVisible([
        'Invoices Awaiting Payment',
        'Converted Leads',
        'Projects In Progress',
        'Tasks Not Finished',
      ]);
    });
  });

  test('CRM_DASHBOARD_TC_022 - Progress bar trong Quick Statistics có giá trị phần trăm hợp lệ', async ({ dashboardPage }) => {
    await test.step('Verify every "Quick Statistics" progress bar reports a percentage between 0 and 100', async () => {
      const percents = await dashboardPage.getQuickStatsProgressPercents();

      expect(percents.length).toBeGreaterThan(0);
      for (const percent of percents) {
        expect(percent).toBeGreaterThanOrEqual(0);
        expect(percent).toBeLessThanOrEqual(100);
      }
    });
  });

  test('CRM_DASHBOARD_TC_023 - Nút "Dashboard Options" hiển thị và có thể click', async ({ dashboardPage }) => {
    await test.step('Verify the "Dashboard Options" button is visible and clickable', async () => {
      await dashboardPage.assertDashboardOptionsButtonVisible();
      await dashboardPage.clickDashboardOptionsButton();
    });
  });

  test('CRM_DASHBOARD_TC_024 - Đăng xuất từ Dashboard quay lại trang Login', async ({ headerPage, loginPage }) => {
    await test.step('Open the account dropdown and click "Logout"', async () => {
      await headerPage.openProfileDropdown();
      await headerPage.clickLogout();
    });

    await test.step('Verify the session ends and the user is redirected to the Login page', async () => {
      await loginPage.assertStaysOnLoginPage();
    });
  });
});
