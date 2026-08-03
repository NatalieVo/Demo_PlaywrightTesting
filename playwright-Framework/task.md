# Automation Generation Progress — Dashboard Module (24 TCs)

- [x] Bước 1: Phân tích test cases (đọc `testcases_dashboard.csv`, 24 TCs)
- [x] Bước 2: Khảo sát UI (đăng nhập thật qua HTTP, lấy HTML server-render thực tế của `/admin/`; không có Playwright MCP browser tool trong session — dùng chính Playwright Test thật, browser thật, headed mode để verify + auto-heal)
- [x] Bước 3: Thiết kế POM (mở rộng `DashboardPage`, tạo mới `HeaderPage`, `SidebarPage`)
- [x] Bước 4: Chuẩn bị test data (thêm `DASHBOARD_URL` vào config; không cần data sinh động vì Dashboard là module hiển thị/điều hướng, không phải form nhập liệu)
- [x] Bước 5: Sinh automation scripts (3 spec files theo nhóm: page-level, header, sidebar)
- [x] Bước 6: Chạy test + Auto-heal (PASS 2 lần liên tiếp headed + PASS 2 lần liên tiếp toàn bộ 150 test 3 browsers headless)

## Auto-Heal Log

- **Vòng 1** (headed, chromium): 15/24 PASS, 9 FAIL.
  - `TC_002, TC_005`: `getByPlaceholder('Search...')` strict-mode violation — trùng placeholder với 2 ô search khác của DataTables (My Tasks widget) trên cùng trang. **Fix:** đổi sang `#search_input` (id thật, duy nhất).
  - `TC_006, TC_007, TC_008, TC_009`: locator `li[title="Quick Create"] ...` không tìm thấy gì. **Nguyên nhân thật:** Bootstrap tooltip JS xoá attribute `title` khỏi DOM lúc runtime để tránh tooltip native của trình duyệt trùng lặp. **Fix:** đổi sang định vị theo accessible name `getByRole('link', {name: '+'})` cho trigger, và `filter({has: getByText('Quick Create')})` cho dropdown.
  - `TC_003, TC_017`: `getByRole('link', {name: label, exact:true})` không match dù label đúng. **Nguyên nhân thật:** các `<i class="... menu-icon">` không có `aria-hidden`, nên glyph icon-font bị tính vào **accessible name** (nhưng không có trong text nội dung thuần). **Fix:** đổi sang định vị theo `span.menu-text` (text-based, không bị glyph icon lẫn vào) — đồng thời tránh trùng nhãn "Sales/Expenses/Leads" vốn cũng xuất hiện lại trong submenu Reports, nhờ `.menu-text` chỉ dùng cho item cấp 1 (submenu dùng `.sub-menu-text`).
  - `TC_016`: click vào "Language" không mở được submenu. **Nguyên nhân thật:** đây là `dropdown-submenu` kiểu **hover**, không có `onclick`. **Fix:** đổi từ `click()` sang `hover()`.
- **Vòng 2** (headed, chromium): 24/24 PASS.
- **Vòng 3** (headed, chromium, lặp lại xác nhận ổn định): 24/24 PASS.
- **Vòng 4** (headless, 3 browsers, cùng chạy với suite Login — 150 test): 146 PASS, 4 FAIL, toàn bộ trên **webkit**.
  - `TC_009, TC_018, TC_019`: assert URL so với biến `urlBefore` được đọc bằng `page.url()` ngay khi bắt đầu test — trên WebKit, giá trị này đôi khi được đọc sớm hơn thời điểm điều hướng thực sự hoàn tất (race). **Fix:** bỏ hẳn kiểu so sánh "chụp giá trị trước rồi so sánh", thay bằng web-first assertion `expect(page).toHaveURL(/pattern/)` theo URL cố định đã biết trước.
  - `TC_022`: đọc `data-percent` bằng `evaluateAll()` ngay lập tức, không đợi widget hiển thị trước — trên WebKit đôi khi DOM chưa kịp gắn xong tại thời điểm đọc. **Fix:** thêm `assertVisible()` trước khi `evaluateAll()`.
- **Vòng 5** (headless, 150 test): 149 PASS, 1 FAIL — `TC_004` (webkit): class `"active"` được thêm bởi **JS xử lý highlight menu** (không render sẵn từ server) nên đọc `getAttribute('class')` ngay có thể bắt được trạng thái chưa cập nhật. Đồng thời `TC_018` fail lần nữa với URL `".../admin/#"` — click vào `href="#"` đôi khi kịp thêm `#` vào URL trước khi JS `preventDefault()` xử lý xong (WebKit).
  - **Fix:** thêm `assertClassContains()` (web-first, dùng `expect().toHaveClass()`) thay cho đọc snapshot; nới lỏng regex URL cho các test click `href="#"` thành `/\/admin\/#?$/` để chấp nhận fragment `#` vô hại.
- **Vòng 6 & 7** (headless, toàn bộ 150 test, 2 lần liên tiếp để xác nhận ổn định): **150/150 PASS cả 2 lần.** (Có 1 lỗi hạ tầng không liên quan: `worker process did not exit within 300000ms` — quirk cleanup của Playwright+WebKit trên Windows, không phải lỗi test.)

## Kết Quả

| TC ID | Title | File | Status | Ghi chú |
|---|---|---|---|---|
| CRM_DASHBOARD_TC_001 | Dashboard hiển thị đúng sau đăng nhập | dashboard.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_002 | Header đầy đủ thành phần | dashboard-header.spec.ts | ✅ PASS | Auto-healed (searchInput selector) |
| CRM_DASHBOARD_TC_003 | Sidebar đầy đủ menu cấp 1 | dashboard-sidebar.spec.ts | ✅ PASS | Auto-healed (icon glyph trong accessible name) |
| CRM_DASHBOARD_TC_004 | Dashboard active trên Sidebar | dashboard.spec.ts | ✅ PASS | Auto-healed (class active thêm bởi JS) |
| CRM_DASHBOARD_TC_005 | Ô search hiển thị placeholder | dashboard-header.spec.ts | ✅ PASS | Auto-healed |
| CRM_DASHBOARD_TC_006 | Quick Create mở dropdown | dashboard-header.spec.ts | ✅ PASS | Auto-healed (title attribute bị JS xoá) |
| CRM_DASHBOARD_TC_007 | Quick Create → Invoice | dashboard-header.spec.ts | ✅ PASS | Auto-healed |
| CRM_DASHBOARD_TC_008 | Quick Create → Customer | dashboard-header.spec.ts | ✅ PASS | Auto-healed |
| CRM_DASHBOARD_TC_009 | Quick Create → Task (modal JS) | dashboard-header.spec.ts | ✅ PASS | Auto-healed (URL race + fragment `#`) |
| CRM_DASHBOARD_TC_010 | Todo icon điều hướng | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_011 | Todo badge định dạng số | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_012 | Timers dropdown | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_013 | Notifications dropdown | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_014 | Avatar dropdown đầy đủ | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_015 | My Profile điều hướng | dashboard-header.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_016 | Language submenu | dashboard-header.spec.ts | ✅ PASS | Auto-healed (hover thay vì click) |
| CRM_DASHBOARD_TC_017 | Sidebar direct-link navigation (10 mục) | dashboard-sidebar.spec.ts | ✅ PASS | Auto-healed |
| CRM_DASHBOARD_TC_018 | Sales submenu expand | dashboard-sidebar.spec.ts | ✅ PASS | Auto-healed (URL race + fragment `#`) |
| CRM_DASHBOARD_TC_019 | Utilities submenu expand | dashboard-sidebar.spec.ts | ✅ PASS | Auto-healed |
| CRM_DASHBOARD_TC_020 | Reports submenu expand | dashboard-sidebar.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_021 | Quick Statistics đủ 4 chỉ số | dashboard.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_022 | Progress bar % hợp lệ | dashboard.spec.ts | ✅ PASS | Auto-healed (wait trước evaluateAll) |
| CRM_DASHBOARD_TC_023 | Dashboard Options button | dashboard.spec.ts | ✅ PASS | |
| CRM_DASHBOARD_TC_024 | Logout quay lại Login | dashboard.spec.ts | ✅ PASS | Reuse `loginPage.assertStaysOnLoginPage()` |

**Tổng: 24/24 PASS — 0 FAIL — 0 SKIP** (đã verify PASS 2 lần liên tiếp headed + PASS 2 lần liên tiếp toàn bộ 150 test 3 browsers headless)

## Files Created / Modified

**Mới tạo:**
- `src/pages/header.page.ts` — Page Object cho Header (search, Quick Create, Todo, Timers, Notifications, Profile dropdown, Language, Logout)
- `src/pages/sidebar.page.ts` — Page Object cho Sidebar (menu cấp 1, submenu Sales/Utilities/Reports, active state)
- `src/tests/dashboard/dashboard.spec.ts` — TC001, 004, 021, 022, 023, 024
- `src/tests/dashboard/dashboard-header.spec.ts` — TC002, 005–016
- `src/tests/dashboard/dashboard-sidebar.spec.ts` — TC003, 017–020

**Mở rộng (giữ nguyên method cũ):**
- `src/pages/base.page.ts` — thêm `hover`, `assertClassContains`
- `src/pages/dashboard.page.ts` — thêm `goto()`, Quick Statistics widget, Dashboard Options button; xoá locator chết `sidebarDashboard` (khai báo nhưng chưa từng dùng, sai selector)
- `src/fixtures/base.fixture.ts` — đăng ký fixture `headerPage`, `sidebarPage`
- `src/utils/env.config.ts`, `.env`, `.env.example` — thêm `DASHBOARD_URL`

## Locator Collection (đã verify trên DOM/hành vi thực tế)

| Page | Element | Locator | Ghi chú |
|---|---|---|---|
| HeaderPage | Search input | `#search_input` | KHÔNG dùng placeholder — trùng với DataTables filter |
| HeaderPage | Quick Create trigger | `getByRole('link', {name: '+'})` | KHÔNG dùng `title` attribute — bị JS xoá runtime |
| HeaderPage | Quick Create item | `getByText(label, {exact:true})` trong dropdown | KHÔNG dùng `getByRole` — icon lẫn vào accessible name |
| HeaderPage | Language submenu trigger | `getByText('Language')` + **hover** | Không phải click |
| SidebarPage | Top-level menu item | `a` chứa `span.menu-text` matching label | Tránh trùng "Sales/Expenses/Leads" với Reports submenu |
| DashboardPage | Dashboard active state | `li.menu-item-dashboard` + `toHaveClass(/active/)` | Class thêm bởi JS, phải dùng web-first assertion |
| DashboardPage | Quick Stats progress % | `.progress-bar[data-percent]` sau khi `assertVisible` | Không đọc ngay — cần đợi widget render |

## Known Issues / Limitations

- Không có Playwright MCP browser tool — DOM verify qua HTTP thực tế (đăng nhập thật) + chạy Playwright Test thật trên browser thật (headed).
- Test data widget (Quick Statistics, Todo badge...) là dữ liệu động của hệ thống demo dùng chung — test chỉ assert định dạng/khoảng giá trị hợp lệ, không assert số liệu cố định (đã ghi rõ trong `requirements_dashboard.md`).
- Ra khỏi phạm vi (theo thống nhất ban đầu): nội dung bên trong từng module con (Customers, Invoices, Projects...), chi tiết dữ liệu từng widget, tính năng tùy chỉnh "Dashboard Options".
- WebKit thể hiện timing nhạy hơn Chromium/Firefox với site thật này (3 vòng auto-heal liên quan trực tiếp đến race condition chỉ xảy ra trên WebKit) — đã xử lý bằng web-first assertions thay vì đọc snapshot tức thời, không còn flaky sau khi fix.
