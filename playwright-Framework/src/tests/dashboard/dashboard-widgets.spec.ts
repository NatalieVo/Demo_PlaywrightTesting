import { test } from '../../fixtures/auth.fixture';

test.describe('Dashboard Module - Widget Content', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('CRM_DASHBOARD_TC_025 - Widget "Finance Overview" hiển thị đủ 3 khối overview đúng trạng thái', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertOverviewSectionStatusesVisible('Invoice overview', [
      'Draft', 'Not Sent', 'Unpaid', 'Partially Paid', 'Overdue', 'Paid',
    ]);
    await dashboardWidgetsPage.assertOverviewSectionStatusesVisible('Estimate overview', [
      'Draft', 'Not Sent', 'Sent', 'Expired', 'Declined', 'Accepted',
    ]);
    await dashboardWidgetsPage.assertOverviewSectionStatusesVisible('Proposal overview', [
      'Draft', 'Sent', 'Open', 'Revised', 'Declined', 'Accepted',
    ]);
  });

  test('CRM_DASHBOARD_TC_026 - Click trạng thái "Unpaid" trong Invoice overview điều hướng đúng URL filter', async ({ dashboardWidgetsPage }) => {
    await test.step('Click the "Unpaid" status in Invoice overview and verify the filtered URL', async () => {
      await dashboardWidgetsPage.clickOverviewStatus('Invoice overview', 'Unpaid');
      await dashboardWidgetsPage.assertHasURL(/\/admin\/invoices\/list_invoices\?status=1/);
    });
  });

  test('CRM_DASHBOARD_TC_027 - Dropdown chọn năm trong Finance Overview hiển thị đủ option và mặc định đúng năm hiện tại', async ({ dashboardWidgetsPage }) => {
    const currentYear = String(new Date().getFullYear());
    await dashboardWidgetsPage.assertYearFilterHasOptions([currentYear, String(Number(currentYear) - 1), String(Number(currentYear) - 2)]);
    await dashboardWidgetsPage.assertYearFilterDefaultSelected(currentYear);
  });

  test('CRM_DASHBOARD_TC_028 - Chọn thêm năm trong Finance Overview vẫn hiển thị đúng định dạng tiền tệ', async ({ dashboardWidgetsPage }) => {
    const previousYear = String(new Date().getFullYear() - 1);
    await dashboardWidgetsPage.selectAdditionalYear(previousYear);
    await dashboardWidgetsPage.assertFinanceAmountsHaveCurrencyFormat();
  });

  test('CRM_DASHBOARD_TC_029 - Widget Overview theo tab hiển thị đủ 5 tab, tab "My Tasks" active mặc định', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertUserDataTabsVisible(['My Tasks', 'My Projects', 'My Reminders', 'Tickets', 'Announcements']);
    await dashboardWidgetsPage.assertTabIsActive('My Tasks', 'home_tab_tasks');
  });

  test('CRM_DASHBOARD_TC_030 - Click từng tab chuyển đúng nội dung panel tương ứng', async ({ dashboardWidgetsPage }) => {
    await test.step('Click "My Projects" and verify it becomes the active tab', async () => {
      await dashboardWidgetsPage.clickUserDataTab('home_my_projects');
      await dashboardWidgetsPage.assertTabIsActive('My Projects', 'home_my_projects');
    });

    await test.step('Click "My Reminders" and verify it becomes the active tab', async () => {
      await dashboardWidgetsPage.clickUserDataTab('home_my_reminders');
      await dashboardWidgetsPage.assertTabIsActive('My Reminders', 'home_my_reminders');
    });

    await test.step('Click "Tickets" and verify it becomes the active tab', async () => {
      await dashboardWidgetsPage.clickUserDataTab('home_tab_tickets');
      await dashboardWidgetsPage.assertTabIsActive('Tickets', 'home_tab_tickets');
    });

    await test.step('Click "Announcements" and verify it becomes the active tab', async () => {
      await dashboardWidgetsPage.clickUserDataTab('home_announcements');
      await dashboardWidgetsPage.assertTabIsActive('Announcements', 'home_announcements');
    });
  });

  test('CRM_DASHBOARD_TC_031 - Click "View All" trong tab My Tasks điều hướng đúng trang danh sách Task', async ({ dashboardWidgetsPage }) => {
    await test.step('Click "View All" in the My Tasks tab and verify navigation to the task list page', async () => {
      await dashboardWidgetsPage.clickViewAllInTasksTab();
      await dashboardWidgetsPage.assertHasURL(/\/admin\/tasks\/list_tasks/);
    });
  });

  test('CRM_DASHBOARD_TC_032 - Widget Calendar hiển thị đúng tháng/năm hiện tại và đủ 7 cột thứ', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertCurrentMonthHeadingVisible();
    await dashboardWidgetsPage.assertWeekdayHeadersVisible(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  });

  test('CRM_DASHBOARD_TC_033 - Chuyển view Calendar (week/day/month) hoạt động đúng', async ({ dashboardWidgetsPage }) => {
    await test.step('Switch Calendar to "week" view and verify it becomes active', async () => {
      await dashboardWidgetsPage.switchCalendarView('week');
      await dashboardWidgetsPage.assertCalendarViewActive('week');
    });

    await test.step('Switch Calendar to "day" view and verify it becomes active', async () => {
      await dashboardWidgetsPage.switchCalendarView('day');
      await dashboardWidgetsPage.assertCalendarViewActive('day');
    });

    await test.step('Switch Calendar back to "month" view and verify it becomes active', async () => {
      await dashboardWidgetsPage.switchCalendarView('month');
      await dashboardWidgetsPage.assertCalendarViewActive('month');
    });
  });

  test('CRM_DASHBOARD_TC_034 - Widget "Payment Records" hiển thị đúng tiêu đề và link Full Report điều hướng đúng trang', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertPaymentRecordsTitleVisible();
    await dashboardWidgetsPage.assertFullReportLinkURL('https://crm.anhtester.com/admin/reports/sales');
  });

  test('CRM_DASHBOARD_TC_035 - Dropdown chế độ biểu đồ Payment Records chuyển đổi Weekly/Monthly đúng', async ({ dashboardWidgetsPage }) => {
    await test.step('Open the chart mode dropdown and verify both "Weekly" and "Monthly" options are listed', async () => {
      await dashboardWidgetsPage.openPaymentChartModeDropdown();
      await dashboardWidgetsPage.assertPaymentChartModeOptionsVisible(['Weekly', 'Monthly']);
    });

    await test.step('Select "Monthly" and verify the dropdown label updates', async () => {
      await dashboardWidgetsPage.selectPaymentChartMode('Monthly');
      await dashboardWidgetsPage.assertPaymentChartModeLabel('Monthly');
    });
  });

  test('CRM_DASHBOARD_TC_036 - Widget "Contracts Expiring Soon" hiển thị đúng cột và link View All điều hướng đúng trang', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertContractsExpiringColumnsVisible(['Subject #', 'Customer', 'Start Date', 'End Date']);

    await test.step('Click "View All" and verify navigation to the Contracts page', async () => {
      await dashboardWidgetsPage.clickContractsExpiringViewAll();
      await dashboardWidgetsPage.assertHasURL(/\/admin\/contracts/);
    });
  });

  test('CRM_DASHBOARD_TC_037 - Widget "My To Do Items" hiển thị đủ 2 khối Latest to do\'s / Latest finished to do\'s', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertTodoSectionsVisible(["Latest to do's", "Latest finished to do's"]);
  });

  test('CRM_DASHBOARD_TC_038 - Click "New To Do" mở modal thêm To Do mới', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.openNewTodoModal();
    await dashboardWidgetsPage.assertNewTodoModalContent();
    await dashboardWidgetsPage.closeNewTodoModal();
  });

  test('CRM_DASHBOARD_TC_039 - Click "View All" trong widget My To Do Items điều hướng đúng trang', async ({ dashboardWidgetsPage }) => {
    await test.step('Click "View All" in My To Do Items and verify navigation to the Todo page', async () => {
      await dashboardWidgetsPage.clickTodoViewAll();
      await dashboardWidgetsPage.assertHasURL(/\/admin\/todo/);
    });
  });

  test('CRM_DASHBOARD_TC_040 - Widget "Leads Chart" hiển thị đúng tiêu đề và render biểu đồ', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertLeadsChartRendered();
  });

  test('CRM_DASHBOARD_TC_041 - Widget "Projects Chart" hiển thị đúng tiêu đề và render biểu đồ', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertProjectsChartRendered();
  });

  test('CRM_DASHBOARD_TC_042 - Widget "Latest Project Activity" hiển thị danh sách hoạt động gần nhất', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertProjectActivityHasEntries();
  });

  test('CRM_DASHBOARD_TC_043 - Widget "Staff Tickets Report" và "Tickets Chart" tồn tại trong DOM ở trạng thái không dữ liệu', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertTicketsWidgetsPresentButEmpty();
  });

  test('CRM_DASHBOARD_TC_044 - Widget "Upcoming Events" không hiển thị trên Dashboard với cấu hình hiện tại', async ({ dashboardWidgetsPage }) => {
    await dashboardWidgetsPage.assertUpcomingEventsWidgetHidden();
  });
});
