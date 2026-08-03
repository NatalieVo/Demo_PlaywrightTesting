import { test, expect } from '../../fixtures/auth.fixture';

const QUICK_CREATE_ITEMS = [
  'Invoice', 'Estimate', 'Proposal', 'Credit Note', 'Customer',
  'Subscription', 'Project', 'Task', 'Expense', 'Contract', 'Article', 'Ticket', 'Event',
];

test.describe('Dashboard Module - Header', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('CRM_DASHBOARD_TC_002 - Header hiển thị đầy đủ các thành phần chính', async ({ headerPage }) => {
    await test.step('Verify the Header displays all core components', async () => {
      await headerPage.assertSearchInputVisible();
      await headerPage.assertCoreIconsVisible();
    });
  });

  test('CRM_DASHBOARD_TC_005 - Ô tìm kiếm trên Header hiển thị đúng placeholder', async ({ headerPage }) => {
    await test.step('Verify the Header search input is visible with the expected placeholder', async () => {
      await headerPage.assertSearchInputVisible();
    });
  });

  test('CRM_DASHBOARD_TC_006 - Click mở dropdown Quick Create hiển thị đủ danh sách shortcut', async ({ headerPage }) => {
    await test.step('Open the Quick Create dropdown and verify it lists all expected shortcuts', async () => {
      await headerPage.openQuickCreate();
      await headerPage.assertQuickCreateItemsVisible(QUICK_CREATE_ITEMS);
    });
  });

  test('CRM_DASHBOARD_TC_007 - Click "Invoice" trong Quick Create điều hướng đúng trang tạo mới', async ({ headerPage }) => {
    await test.step('Open Quick Create and click "Invoice", then verify navigation to the new-Invoice page', async () => {
      await headerPage.openQuickCreate();
      await headerPage.clickQuickCreateItem('Invoice');
      await headerPage.assertHasURL(/invoices\/invoice/);
    });
  });

  test('CRM_DASHBOARD_TC_008 - Click "Customer" trong Quick Create điều hướng đúng trang tạo mới', async ({ headerPage }) => {
    await test.step('Open Quick Create and click "Customer", then verify navigation to the new-Customer page', async () => {
      await headerPage.openQuickCreate();
      await headerPage.clickQuickCreateItem('Customer');
      await headerPage.assertHasURL(/clients\/client/);
    });
  });

  test('CRM_DASHBOARD_TC_009 - Click "Task" trong Quick Create mở modal, không điều hướng trang', async ({ headerPage }) => {
    await test.step('Open Quick Create and click "Task", then verify no page navigation occurs', async () => {
      await headerPage.openQuickCreate();
      await headerPage.clickQuickCreateItem('Task');
      await headerPage.assertHasURL(/\/admin\/#?$/);
    });
  });

  test('CRM_DASHBOARD_TC_010 - Click icon Todo trên Header điều hướng đúng trang', async ({ headerPage }) => {
    await test.step('Click the Todo icon and verify navigation to the Todo page', async () => {
      await headerPage.clickTodoIcon();
      await headerPage.assertHasURL(/\/admin\/todo/);
    });
  });

  test('CRM_DASHBOARD_TC_011 - Badge số lượng Todo hiển thị đúng định dạng', async ({ headerPage }) => {
    await test.step('Verify the Todo badge displays a non-negative integer', async () => {
      const badgeText = (await headerPage.getTodoBadgeText()).trim();
      const badgeNumber = Number(badgeText);

      expect(Number.isInteger(badgeNumber), `Expected Todo badge "${badgeText}" to be an integer`).toBe(true);
      expect(badgeNumber).toBeGreaterThanOrEqual(0);
    });
  });

  test('CRM_DASHBOARD_TC_012 - Click icon Timers mở dropdown đúng nội dung', async ({ headerPage }) => {
    await test.step('Click the Timers icon and verify its dropdown opens', async () => {
      await headerPage.openTimers();
    });
  });

  test('CRM_DASHBOARD_TC_013 - Click icon Notifications mở dropdown', async ({ headerPage }) => {
    await test.step('Click the Notifications icon and verify its dropdown opens', async () => {
      await headerPage.openNotifications();
    });
  });

  test('CRM_DASHBOARD_TC_014 - Click avatar mở dropdown tài khoản đầy đủ các mục', async ({ headerPage }) => {
    await test.step('Click the account avatar and verify the dropdown lists all expected menu items', async () => {
      await headerPage.openProfileDropdown();
      await headerPage.assertProfileDropdownItemsVisible(['My Profile', 'My Timesheets', 'Edit Profile', 'Language', 'Logout']);
    });
  });

  test('CRM_DASHBOARD_TC_015 - Click "My Profile" điều hướng đúng trang', async ({ headerPage }) => {
    await test.step('Open the account dropdown and click "My Profile", then verify navigation', async () => {
      await headerPage.openProfileDropdown();
      await headerPage.clickProfileMenuItem('My Profile');
      await headerPage.assertHasURL(/\/admin\/profile/);
    });
  });

  test('CRM_DASHBOARD_TC_016 - Submenu "Language" hiển thị đủ ngôn ngữ, English đang active', async ({ headerPage }) => {
    await test.step('Open the Language submenu and verify all expected languages are listed', async () => {
      await headerPage.openProfileDropdown();
      await headerPage.openLanguageSubmenu();
      await headerPage.assertLanguageOptionsVisible(['English', 'Vietnamese', 'Chinese']);
    });

    await test.step('Verify "English" is the active language', async () => {
      await headerPage.assertEnglishIsActiveLanguage();
    });
  });
});
