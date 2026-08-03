# Tài Liệu Yêu Cầu (Requirements Document)
## Module: Trang chủ Quản trị (Dashboard) — Perfex CRM Admin

- **Hệ thống:** Perfex CRM (Anh Tester Demo)
- **URL khảo sát:** https://crm.anhtester.com/admin/ (sau khi đăng nhập thành công)
- **Ngày phân tích:** 03/08/2026 (cập nhật mở rộng phạm vi widget content: 03/08/2026)
- **Phương pháp khảo sát (đợt 1 — Header/Sidebar/Quick Statistics):** Đăng nhập thật qua HTTP (session cookie thật với `admin@example.com`/`123456`), lấy HTML server-render đầy đủ của trang Dashboard và phân tích trực tiếp trên DOM thực tế.
- **Phương pháp khảo sát (đợt 2 — chi tiết Widget Content, mở rộng phạm vi):** Đăng nhập thật qua **Playwright MCP** (browser thật, headed, viewport 1920×1080), inspect trực tiếp DOM/accessibility tree của từng widget bằng `browser_snapshot`/`browser_evaluate` (scoped theo từng `#widget-*`). Đã verify từng locator: match đúng 1 phần tử, tương tác thử thật (click tab, đổi năm, chuyển view Calendar, mở dropdown chart mode, mở modal New To Do) trước khi đưa vào tài liệu. Không suy đoán bất kỳ thành phần nào.
- **Phạm vi (Scope) — đã thống nhất với người dùng:** Header, danh sách menu Sidebar (không kiểm thử sâu nội dung từng trang con như Customers/Invoices/Projects...), và **toàn bộ các widget ở khu vực Content** hiển thị trên Dashboard (bao gồm cả chi tiết dữ liệu/tương tác trong từng widget — xem mục 2.8). **KHÔNG** bao gồm chức năng bên trong các module con khi điều hướng ra khỏi Dashboard (vd. không test sâu trang `/admin/tasks/list_tasks` sau khi click "View All").

---

## 1. Tổng Quan (Overview)

Trang **Dashboard** là trang chủ hiển thị ngay sau khi đăng nhập thành công vào khu vực quản trị Perfex CRM. Trang gồm 3 khu vực chính:
1. **Header (thanh trên cùng):** Tìm kiếm, Quick Create (tạo nhanh), Newsfeed, Todo, Timers, Notifications, menu tài khoản (Profile/Ngôn ngữ/Đăng xuất).
2. **Sidebar (menu điều hướng bên trái):** Danh sách các module của hệ thống, một số mục có sub-menu.
3. **Content (khu vực nội dung chính):** Các widget hiển thị số liệu tổng quan (thống kê nhanh, tài chính, lịch, báo cáo...), có thể tùy chỉnh vị trí/hiển thị qua "Dashboard Options".

---

## 2. Yêu Cầu Chức Năng (Functional Requirements)

### 2.1. Chức năng: Hiển thị trang Dashboard sau đăng nhập
- **Mô tả:** Là một Staff/Admin đã đăng nhập, tôi muốn thấy ngay trang tổng quan (Dashboard) để nắm nhanh tình hình hệ thống.
- **Tiêu chí chấp nhận:**
  - AC1: Sau khi đăng nhập thành công, hệ thống điều hướng đến `https://crm.anhtester.com/admin/`, tiêu đề trang là **"Dashboard"**.
  - AC2: Header, Sidebar và các widget khu vực Content đều hiển thị đầy đủ, không lỗi.

### 2.2. Chức năng: Tìm kiếm nhanh (Top Search)
- **Mô tả:** Là người dùng, tôi muốn gõ từ khóa vào ô tìm kiếm trên header để tìm nhanh khách hàng/hóa đơn/dự án... mà không cần vào từng module.
- **Tiêu chí chấp nhận:**
  - AC1: Ô input có placeholder **"Search..."**.
  - AC2: Hỗ trợ tìm theo tag bằng cú pháp `#tagname` (theo tooltip hiển thị: "Use # + tagname to search by tags").
  - AC3: Kết quả tìm kiếm/lịch sử tìm kiếm hiển thị trong dropdown bên dưới ô input.

### 2.3. Chức năng: Tạo nhanh (Quick Create)
- **Mô tả:** Là người dùng, tôi muốn tạo nhanh một bản ghi mới (Invoice, Estimate, Proposal...) từ bất kỳ đâu trong hệ thống thông qua icon "+" trên header.
- **Tiêu chí chấp nhận:**
  - AC1: Click vào icon "+" (Quick Create) mở dropdown gồm 12 mục: Invoice, Estimate, Proposal, Credit Note, Customer, Subscription, Project, Task, Expense, Contract, Article, Ticket, Event.
  - AC2: Mỗi mục điều hướng đến đúng trang tạo mới tương ứng (riêng "Task" mở qua JS `new_task()`, không điều hướng trang).

### 2.4. Chức năng: Thông báo & tiện ích trên Header
- **Mô tả:** Là người dùng, tôi muốn xem nhanh Newsfeed, số Todo item đang chờ, Timer đang chạy, và Notifications từ header.
- **Tiêu chí chấp nhận:**
  - AC1: Icon **Newsfeed** — mở popup chia sẻ tài liệu/ý tưởng.
  - AC2: Icon **Todo** — liên kết đến `/admin/todo`, hiển thị badge số lượng todo hiện tại (ví dụ quan sát được: **5**).
  - AC3: Icon **Timers** — dropdown hiển thị danh sách timer đang chạy hoặc thông báo "No started timers found" kèm nút "Start Timer".
  - AC4: Icon **Notifications** — dropdown danh sách thông báo, có tổng số chưa đọc (`data-total-unread`).

### 2.5. Chức năng: Menu tài khoản (User Profile Dropdown)
- **Mô tả:** Là người dùng đã đăng nhập, tôi muốn truy cập nhanh Profile, Timesheets, đổi ngôn ngữ, hoặc đăng xuất từ avatar trên header.
- **Tiêu chí chấp nhận:**
  - AC1: Click avatar mở dropdown gồm: **My Profile**, **My Timesheets**, **Edit Profile**, **Language** (submenu 20 ngôn ngữ bao gồm English [mặc định đang active], Vietnamese, Chinese...), **Logout**.
  - AC2: **Logout** gọi JS `logout()` — kết thúc phiên đăng nhập.

### 2.6. Chức năng: Điều hướng Sidebar
- **Mô tả:** Là người dùng, tôi muốn dùng menu bên trái để di chuyển giữa các module chính của hệ thống.
- **Tiêu chí chấp nhận:**
  - AC1: Sidebar hiển thị đủ các mục cấp 1 (xem bảng 3.2), mỗi mục có icon + label rõ ràng.
  - AC2: Mục **Dashboard** đang active khi ở trang `/admin/`.
  - AC3: Các mục có sub-menu (**Sales**, **Utilities**, **Reports**) hiển thị mũi tên (arrow) và mở rộng danh sách con khi click, không điều hướng trang ngay (href="#").
  - AC4: Các mục không có sub-menu điều hướng thẳng đến URL tương ứng khi click.

### 2.7. Chức năng: Widget tổng quan (Dashboard Widgets)
- **Mô tả:** Là người dùng, tôi muốn xem nhanh các chỉ số quan trọng (hóa đơn, dự án, task, tài chính...) ngay trên Dashboard mà không cần vào từng module.
- **Tiêu chí chấp nhận:**
  - AC1: Widget **"Quick Statistics"** hiển thị 4 chỉ số dạng progress-bar: Invoices Awaiting Payment, Converted Leads, Projects In Progress, Tasks Not Finished (định dạng `x / y` kèm % progress bar).
  - AC2: Các widget khác được quan sát thấy trên trang (tùy vị trí đã cấu hình): Finance Overview, User Widget, Upcoming Events, Calendar, Payment Records, Contracts Expiring Soon, Staff Tickets Report, My To Do Items, Leads Chart, Projects Chart, Tickets Chart, Latest Project Activity.
  - AC3: Nút **"Dashboard Options"** cho phép tùy chỉnh việc hiển thị/vị trí các widget (tính năng customization — chưa xác minh chi tiết hành vi vì nằm ngoài scope trang landing thuần túy).

---

## 3. Đặc Tả Thành Phần (Component Specifications)

### 3.1. Header

| Thành phần | Locator gợi ý | Loại | Ghi chú |
|---|---|---|---|
| Ô tìm kiếm | `id="search_input"`, placeholder "Search..." | `<input type="search">` | Tooltip: dùng `#tagname` để tìm theo tag |
| Nút Quick Create | icon "+" trong `.navbar-nav`, `data-toggle="dropdown"` | `<a>` + dropdown | 12 shortcut, xem mục 2.3 |
| Icon Newsfeed | `class="open_newsfeed desktop"`, title "Share documents, ideas.." | `<a>` | Mở popup, không điều hướng |
| Icon Todo | `href="/admin/todo"`, badge `.nav-total-todos` | `<a>` | Badge số lượng động |
| Icon Timers | `id="top-timers"` | `<a>` + dropdown | Badge `.icon-started-timers` |
| Icon Notifications | `.notifications-icon`, `data-total-unread` | `<a>` + dropdown | |
| Avatar / Profile dropdown | `.dropdown-toggle.profile`, title "Admin Example" | `<a>` + dropdown | Chứa My Profile/Timesheets/Edit Profile/Language/Logout |
| Logout | `onclick="logout()"` trong dropdown profile | `<a>` | |

### 3.2. Sidebar — Danh sách Menu cấp 1 (không kiểm thử sâu nội dung từng trang)

| # | Label | URL | Có sub-menu |
|---|---|---|---|
| 1 | Dashboard | `/admin/` | Không |
| 2 | Customers | `/admin/clients` | Không |
| 3 | Projects | `/admin/projects` | Không |
| 4 | Tasks | `/admin/tasks` | Không |
| 5 | Contracts | `/admin/contracts` | Không |
| 6 | Sales | `#` (mở submenu) | **Có** — Proposals, Estimates, Invoices, Payments, Credit Notes, Items |
| 7 | Subscriptions | `/admin/subscriptions` | Không |
| 8 | Expenses | `/admin/expenses` | Không |
| 9 | Support | `/admin/tickets` | Không |
| 10 | Leads | `/admin/leads` | Không |
| 11 | Estimate Request | `/admin/estimate_request` | Không |
| 12 | Knowledge Base | `/admin/knowledge_base` | Không |
| 13 | Utilities | `#` (mở submenu) | **Có** — Media, Bulk PDF Export, Calendar |
| 14 | Reports | `#` (mở submenu) | **Có** — Sales, Expenses, Expenses vs Income, Leads, Timesheets overview, KB Articles |

### 3.3. Widget "Quick Statistics" (widget duy nhất có dữ liệu số cụ thể quan sát được tại thời điểm khảo sát)

| Chỉ số | Giá trị quan sát (03/08/2026) | Ghi chú |
|---|---|---|
| Invoices Awaiting Payment | 3 / 5 (60%) | Dữ liệu động, thay đổi theo thời gian thực — KHÔNG dùng làm test data cố định |
| Converted Leads | 0 / 0 (0%) | |
| Projects In Progress | 66 / 101 (65.35%) | |
| Tasks Not Finished | 210 / 211 (99.53%) | |

> **Lưu ý quan trọng:** Toàn bộ số liệu ở widget là **dữ liệu động** (live data), phụ thuộc trạng thái thực tế của hệ thống demo dùng chung. Test case tự động **không nên assert giá trị số cụ thể** — chỉ nên assert: widget hiển thị đúng tên, đúng định dạng `x / y`, progress bar tồn tại và có giá trị hợp lệ (0–100%).

---

## 2.8. Chi Tiết Các Widget Content (mở rộng phạm vi)

> Toàn bộ 13 widget dưới đây được xác nhận tồn tại trong DOM qua `id` duy nhất dạng `widget-*` (khảo sát bằng Playwright MCP thật, tài khoản `admin@example.com`). Vị trí/hiển thị widget phụ thuộc cấu hình "Dashboard Options" của từng tài khoản — 2 widget (`Staff Tickets Report`, `Tickets Chart`) không render nội dung do tài khoản demo không có dữ liệu ticket, và 1 widget (`Upcoming Events`) đang bị ẩn (`class="hide"`, `display:none`) trong cấu hình hiện tại.

### 2.8.1. Finance Overview (`#widget-finance_overview`)
- **Mô tả:** Hiển thị 3 khối tổng quan tài chính theo trạng thái: Invoice overview, Estimate overview, Proposal overview — mỗi trạng thái là 1 link (số lượng) + progress bar (%), điều hướng đến danh sách đã filter theo status.
- **Tiêu chí chấp nhận:**
  - AC1: Invoice overview đủ 6 trạng thái: Draft, Not Sent, Unpaid, Partially Paid, Overdue, Paid.
  - AC2: Estimate overview đủ 6 trạng thái: Draft, Not Sent, Sent, Expired, Declined, Accepted.
  - AC3: Proposal overview đủ 6 trạng thái: Draft, Sent, Open, Revised, Declined, Accepted.
  - AC4: Click vào 1 trạng thái điều hướng đến URL filter tương ứng (vd. "Unpaid" → `/admin/invoices/list_invoices?status=1`).
  - AC5: Dropdown chọn năm (`button[data-id="invoices_total_years"]`, combobox) là **multi-select** (bootstrap-select), có đủ 3 option gần nhất (vd. quan sát được: 2026/2025/2024), mặc định chỉ chọn năm hiện tại của hệ thống.
  - AC6: Chọn thêm 1 năm khác (không bỏ chọn năm hiện tại) cập nhật lại 3 chỉ số bên dưới theo tổng dữ liệu các năm đã chọn: Outstanding Invoices, Past Due Invoices, Paid Invoices — mỗi chỉ số vẫn hiển thị đúng định dạng tiền tệ `$x.xx` (giá trị động, không assert số cụ thể — đã verify thật: chọn thêm năm 2025 làm Outstanding Invoices đổi từ $2.00 → $3.00).

### 2.8.2. Widget "Overview" theo tab (`#widget-user_data`)
- **Mô tả:** Widget dạng tab, gồm 5 tab: My Tasks (mặc định active), My Projects, My Reminders, Tickets, Announcements — mỗi tab hiển thị 1 bảng dữ liệu (DataTable) tương ứng.
- **Tiêu chí chấp nhận:**
  - AC1: Hiển thị đủ 5 tab; tab tương ứng có `<li>` cha mang class `active` và tabpanel cùng id (vd. `#home_tab_tasks`) hiển thị khi được chọn.
  - AC2: Tab "My Tasks" mặc định active, bảng có cột: #, Name, Status, Start Date, Tags, Priority.
  - AC3: Link "View All" trong tab My Tasks điều hướng đến `/admin/tasks/list_tasks`.
  - AC4: Mỗi bảng có control chuẩn DataTable: dropdown số dòng/trang, nút Export, ô tìm kiếm, phân trang.

### 2.8.3. Calendar (`#widget-calendar`)
- **Mô tả:** Lịch dạng FullCalendar hiển thị Event/Task/Project/Invoice/Estimate/Proposal/Contract/Reminders theo ngày.
- **Tiêu chí chấp nhận:**
  - AC1: Toolbar gồm nút prev/next/today/expand, tiêu đề tháng-năm hiện tại (heading level 2, định dạng "Tháng Năm" vd. "August 2026"), nút chuyển view month/week/day, nút "filter by".
  - AC2: Header 7 cột thứ Sun→Sat hiển thị đầy đủ.
  - AC3: Click nút "week"/"day"/"month" chuyển đúng view tương ứng — nút đang active mang class `fc-button-active`.
  - AC4: Nút "filter by" mở dropdown checkbox lọc theo loại (Events, Tasks, Projects, Invoices, Estimates, Proposals, Contracts, các loại Reminders...), có nút Clear/Apply.

### 2.8.4. Payment Records / Payments Chart (`#widget-payments_chart`)
- **Mô tả:** Biểu đồ thống kê thanh toán (canvas, lazy-render khi widget vào viewport), có thể đổi chế độ Weekly/Monthly.
- **Tiêu chí chấp nhận:**
  - AC1: Tiêu đề "Payment Records" hiển thị; link "Full Report" điều hướng đến `/admin/reports/sales`.
  - AC2: Dropdown chế độ (`#PaymentChartmode`) mặc định "Weekly", mở ra đủ 2 option Weekly/Monthly.
  - AC3: Chọn "Monthly" cập nhật label dropdown thành "Monthly" (verify tương tác thật).

### 2.8.5. Contracts Expiring Soon (`#widget-contracts_expiring`)
- **Mô tả:** DataTable danh sách hợp đồng sắp hết hạn.
- **Tiêu chí chấp nhận:**
  - AC1: Bảng có đủ cột: Subject #, Customer, Start Date, End Date.
  - AC2: Link "View All" điều hướng đến `/admin/contracts`.

### 2.8.6. My To Do Items (`#widget-todos`)
- **Mô tả:** Danh sách việc cần làm cá nhân, chia 2 khối: "Latest to do's" và "Latest finished to do's".
- **Tiêu chí chấp nhận:**
  - AC1: Cả 2 heading "Latest to do's" và "Latest finished to do's" hiển thị đầy đủ.
  - AC2: Link "View All" điều hướng đến `/admin/todo`.
  - AC3: Click "New To Do" (href `#__todo`) mở modal (`role="dialog"`, id `__todo`) với heading "Add New Todo", textbox "Description", nút Close/Save.

### 2.8.7. Leads Chart & Projects Chart (`#widget-leads_chart`, `#widget-projects_chart`)
- **Mô tả:** 2 biểu đồ canvas (Chart.js), lazy-render khi widget được cuộn vào viewport.
- **Tiêu chí chấp nhận:**
  - AC1: Leads Chart hiển thị tiêu đề "Leads Overview" và render đúng 1 `<canvas>` sau khi cuộn vào viewport.
  - AC2: Projects Chart hiển thị tiêu đề "Statistics by Project Status" và render đúng 1 `<canvas>` sau khi cuộn vào viewport.

### 2.8.8. Latest Project Activity (`#widget-projects_activity`)
- **Mô tả:** Feed hoạt động gần nhất liên quan Project (tạo mới, thêm thành viên, hoàn thành task...).
- **Tiêu chí chấp nhận:**
  - AC1: Tiêu đề "Latest Project Activity" hiển thị.
  - AC2: Danh sách có ít nhất 1 hoạt động, mỗi mục gồm: mốc thời gian tương đối (vd. "22 hrs ago"), link tên người thực hiện, link tên Project — không assert nội dung cụ thể (dữ liệu động).

### 2.8.9. Widget không có dữ liệu hiển thị trong môi trường demo hiện tại
- **Staff Tickets Report** (`#widget-tickets_report`) và **Tickets Chart** (`#widget-tickets_chart`): container tồn tại trong DOM (`data-name="Staff Tickets Report"` với tickets_report) nhưng không render nội dung/canvas nào — kể cả sau khi cuộn vào viewport. Nguyên nhân quan sát được: tài khoản demo dùng chung không có dữ liệu ticket đủ điều kiện. **Không thể viết assertion có ý nghĩa về nội dung** — chỉ có thể assert container tồn tại (attached) trong DOM.
- **Upcoming Events** (`#widget-upcoming_events`): bị ẩn hoàn toàn (`class="widget hide"`, `display:none`) với cấu hình widget hiện tại của tài khoản — xác nhận qua computed style thật. Được xem là **đã tắt qua Dashboard Options**, không hiển thị trên Dashboard nên không có nội dung để kiểm thử chi tiết.

---

## 4. Câu Hỏi / Làm Rõ Với PO-User

1. "Dashboard Options" (tùy chỉnh widget) có phải phạm vi cần test tự động không, hay chỉ để tham khảo? (Hiện đang loại khỏi scope theo thống nhất ban đầu — chỉ xác nhận nút hiển thị/click được, không test kéo-thả/ẩn-hiện.)
2. Số lượng và vị trí các widget trong khu vực Content có cố định cho mọi tài khoản Staff, hay tùy thuộc theo cấu hình/phân quyền từng Staff? (Đã quan sát thực tế: `Upcoming Events` bị ẩn, `Staff Tickets Report`/`Tickets Chart` không có dữ liệu ở tài khoản demo hiện tại — cần PO xác nhận đây là hành vi mong đợi hay do thiếu dữ liệu seed.)
3. Badge số Todo (hiện là 5) và Notifications unread có được xem là dữ liệu cần assert chính xác, hay chỉ cần assert "hiển thị đúng định dạng số"?
4. Có cần seed dữ liệu ticket cho tài khoản demo để widget "Staff Tickets Report" và "Tickets Chart" có nội dung kiểm thử được không?

---

## 5. Ngoài Phạm Vi (Out of Scope — theo thống nhất)

- Nội dung/chức năng bên trong từng trang con của Sidebar (Customers, Invoices, Projects, Sales, Utilities, Reports...) và các trang đích sau khi click "View All"/"Full Report" từ widget.
- Tính năng "Dashboard Options" (kéo-thả, ẩn/hiện, sắp xếp lại widget) — chỉ xác nhận nút hiển thị/click được.
- Luồng thực hiện đầy đủ của Quick Create và "New To Do" (chỉ xác nhận điều hướng/mở modal đúng, không test submit tạo mới thành công).
- Nội dung chi tiết bên trong "Staff Tickets Report" và "Tickets Chart" — do môi trường demo hiện không có dữ liệu để render (xem mục 2.8.9).
- Widget "Upcoming Events" — hiện bị ẩn theo cấu hình tài khoản, không có gì để kiểm thử trên Dashboard.
