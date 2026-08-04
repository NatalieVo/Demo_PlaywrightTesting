# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard/dashboard-header.spec.ts >> Dashboard Module - Header >> CRM_DASHBOARD_TC_014 - Click avatar mở dropdown tài khoản đầy đủ các mục
- Location: src/tests/dashboard/dashboard-header.spec.ts:86:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('li.header-user-profile').locator('> ul.dropdown-menu')
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('li.header-user-profile').locator('> ul.dropdown-menu')
    22 × locator resolved to <ul class="dropdown-menu animated fadeIn">…</ul>
       - unexpected value "hidden"

```

```yaml
- text: 
- navigation:
  - searchbox "Search..."
  - button ""
  - list:
    - listitem "Quick Create":
      - link "+":
        - /url: "#"
  - list:
    - listitem:
      - link "Share documents, ideas..":
        - /url: "#"
        - img
    - listitem:
      - link "4":
        - /url: https://crm.anhtester.com/admin/todo
        - img
        - text: "4"
    - listitem "Admin Example":
      - link:
        - /url: "#"
        - img
    - listitem:
      - link:
        - /url: "#"
        - img
    - listitem "Notifications":
      - link:
        - /url: "#"
        - img
- complementary:
  - list:
    - listitem:
      - link "Perfex CRM | Anh Tester Demo":
        - /url: https://crm.anhtester.com/admin/
        - img "Perfex CRM | Anh Tester Demo"
    - listitem:
      - link " Dashboard":
        - /url: https://crm.anhtester.com/admin/
    - listitem:
      - link " Customers":
        - /url: https://crm.anhtester.com/admin/clients
    - listitem:
      - link " Projects":
        - /url: https://crm.anhtester.com/admin/projects
    - listitem:
      - link " Tasks":
        - /url: https://crm.anhtester.com/admin/tasks
    - listitem:
      - link " Contracts":
        - /url: https://crm.anhtester.com/admin/contracts
    - listitem:
      - link " Sales ":
        - /url: "#"
    - listitem:
      - link " Subscriptions":
        - /url: https://crm.anhtester.com/admin/subscriptions
    - listitem:
      - link " Expenses":
        - /url: https://crm.anhtester.com/admin/expenses
    - listitem:
      - link " Support":
        - /url: https://crm.anhtester.com/admin/tickets
    - listitem:
      - link " Leads":
        - /url: https://crm.anhtester.com/admin/leads
    - listitem:
      - link " Estimate Request":
        - /url: https://crm.anhtester.com/admin/estimate_request
    - listitem:
      - link " Knowledge Base":
        - /url: https://crm.anhtester.com/admin/knowledge_base
    - listitem:
      - link " Utilities ":
        - /url: "#"
    - listitem:
      - link " Reports ":
        - /url: "#"
- img
- text: Dashboard Options 
- img
- text: Invoices Awaiting Payment 3 / 5
- progressbar
- img
- text: Converted Leads 0 / 0
- progressbar
- img
- text: Projects In Progress 66 / 101
- progressbar
- img
- text: Tasks Not Finished 210 / 211
- progressbar
- text: 
- paragraph:
  - img
  - text: Invoice overview
- link "1 Draft":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?status=6
- text: 16.67%
- progressbar
- link "4 Not Sent":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?filter=not_sent
- text: 66.67%
- progressbar
- link "3 Unpaid":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?status=1
- text: 50.00%
- progressbar
- link "0 Partially Paid":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?status=3
- text: 0.00%
- progressbar
- link "0 Overdue":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?status=4
- text: 0.00%
- progressbar
- link "2 Paid":
  - /url: https://crm.anhtester.com/admin/invoices/list_invoices?status=2
- text: 33.33%
- progressbar
- paragraph:
  - img
  - text: Estimate overview
- link "0 Draft":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?status=1
- text: 0.00%
- progressbar
- link "3 Not Sent":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?not_sent=1
- text: 100.00%
- progressbar
- link "0 Sent":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?status=2
- text: 0.00%
- progressbar
- link "3 Expired":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?status=5
- text: 100.00%
- progressbar
- link "0 Declined":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?status=3
- text: 0.00%
- progressbar
- link "0 Accepted":
  - /url: https://crm.anhtester.com/admin/estimates/list_estimates?status=4
- text: 0.00%
- progressbar
- paragraph:
  - img
  - text: Proposal overview
- link "0 Draft":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=6
- text: 0.00%
- progressbar
- link "1 Sent":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=4
- text: 20.00%
- progressbar
- link "4 Open":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=1
- text: 80.00%
- progressbar
- link "0 Revised":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=5
- text: 0.00%
- progressbar
- link "0 Declined":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=2
- text: 0.00%
- progressbar
- link "0 Accepted":
  - /url: https://crm.anhtester.com/admin/proposals/list_proposals?status=3
- text: 0.00%
- progressbar
- separator
- listbox:
  - option "2026" [selected]
  - option "2025"
  - option "2024"
- combobox "2026"
- term: Outstanding Invoices
- definition: $2.00
- term: Past Due Invoices
- definition: $0.00
- term: Paid Invoices
- definition: $0.00
- text: 
- tablist:
  - tab " My Tasks"
  - tab " My Projects"
  - tab " My Reminders"
  - tab " Tickets"
  - tab " Announcements"
- tabpanel:
  - link "View All":
    - /url: https://crm.anhtester.com/admin/tasks/list_tasks
  - combobox:
    - option "10"
    - option "25" [selected]
    - option "50"
    - option "100"
    - option "All"
  - button "Export"
  - button ""
  - text: 
  - searchbox ""
  - grid:
    - rowgroup:
      - row "# activate to sort column ascending Name activate to sort column ascending Status activate to sort column ascending Start Date activate to sort column ascending Tags activate to sort column ascending Priority activate to sort column ascending":
        - columnheader "# activate to sort column ascending": "#"
        - columnheader "Name activate to sort column ascending": Name
        - columnheader "Status activate to sort column ascending": Status
        - columnheader "Start Date activate to sort column ascending": Start Date
        - columnheader "Tags activate to sort column ascending": Tags
        - columnheader "Priority activate to sort column ascending": Priority
    - rowgroup:
      - 'row "1787 go go #2364 - Mua hàng qua app - Công ty Hải Lê Recurring Task Start Timer | Edit | Delete Awaiting Feedback  05-05-2026 Medium "':
        - gridcell "1787":
          - link "1787":
            - /url: https://crm.anhtester.com/admin/tasks/view/1787
        - 'gridcell "go go #2364 - Mua hàng qua app - Công ty Hải Lê Recurring Task Start Timer | Edit | Delete"':
          - link "go go":
            - /url: https://crm.anhtester.com/admin/tasks/view/1787
          - link "#2364 - Mua hàng qua app - Công ty Hải Lê":
            - /url: https://crm.anhtester.com/admin/projects/view/2364
          - text: Recurring Task
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1787
        - gridcell "Awaiting Feedback ":
          - text: Awaiting Feedback
          - link "":
            - /url: "#"
        - gridcell "05-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1648 auto_bva_date_1777940317815 Start Timer | Edit | Delete Not Started  10-05-2026 Medium ":
        - gridcell "1648":
          - link "1648":
            - /url: https://crm.anhtester.com/admin/tasks/view/1648
        - gridcell "auto_bva_date_1777940317815 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777940317815":
            - /url: https://crm.anhtester.com/admin/tasks/view/1648
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1648
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1658 auto_bva_date_1777940837865 Start Timer | Edit | Delete In Progress  10-05-2026 Medium ":
        - gridcell "1658":
          - link "1658":
            - /url: https://crm.anhtester.com/admin/tasks/view/1658
        - gridcell "auto_bva_date_1777940837865 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777940837865":
            - /url: https://crm.anhtester.com/admin/tasks/view/1658
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1658
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1664 auto_bva_date_1777940973417 Start Timer | Edit | Delete In Progress  10-05-2026 Medium ":
        - gridcell "1664":
          - link "1664":
            - /url: https://crm.anhtester.com/admin/tasks/view/1664
        - gridcell "auto_bva_date_1777940973417 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777940973417":
            - /url: https://crm.anhtester.com/admin/tasks/view/1664
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1664
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1667 auto_bva_date_1777945717204 Start Timer | Edit | Delete Not Started  10-05-2026 Medium ":
        - gridcell "1667":
          - link "1667":
            - /url: https://crm.anhtester.com/admin/tasks/view/1667
        - gridcell "auto_bva_date_1777945717204 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777945717204":
            - /url: https://crm.anhtester.com/admin/tasks/view/1667
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1667
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1678 auto_bva_date_1777945985225 Start Timer | Edit | Delete Not Started  10-05-2026 Medium ":
        - gridcell "1678":
          - link "1678":
            - /url: https://crm.anhtester.com/admin/tasks/view/1678
        - gridcell "auto_bva_date_1777945985225 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777945985225":
            - /url: https://crm.anhtester.com/admin/tasks/view/1678
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1678
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1688 auto_bva_date_1777947767478 Start Timer | Edit | Delete Not Started  10-05-2026 Medium ":
        - gridcell "1688":
          - link "1688":
            - /url: https://crm.anhtester.com/admin/tasks/view/1688
        - gridcell "auto_bva_date_1777947767478 Start Timer | Edit | Delete":
          - link "auto_bva_date_1777947767478":
            - /url: https://crm.anhtester.com/admin/tasks/view/1688
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1688
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - 'row "1832 Discuss về plan #2451 - Tổ ấm nhỏ - Công ty CP YHL Recurring Task Start Timer | Edit | Delete In Progress  10-05-2026 nhanhotiennghi Medium "':
        - gridcell "1832":
          - link "1832":
            - /url: https://crm.anhtester.com/admin/tasks/view/1832
        - 'gridcell "Discuss về plan #2451 - Tổ ấm nhỏ - Công ty CP YHL Recurring Task Start Timer | Edit | Delete"':
          - link "Discuss về plan":
            - /url: https://crm.anhtester.com/admin/tasks/view/1832
          - link "#2451 - Tổ ấm nhỏ - Công ty CP YHL":
            - /url: https://crm.anhtester.com/admin/projects/view/2451
          - text: Recurring Task
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1832
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell "nhanhotiennghi"
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - 'row "1837 Lên plan #2464 - Nhà là nơi để về - Công ty vật liệu YHL Recurring Task Start Timer | Edit | Delete In Progress  10-05-2026 nhanhotiennghi Medium "':
        - gridcell "1837":
          - link "1837":
            - /url: https://crm.anhtester.com/admin/tasks/view/1837
        - 'gridcell "Lên plan #2464 - Nhà là nơi để về - Công ty vật liệu YHL Recurring Task Start Timer | Edit | Delete"':
          - link "Lên plan":
            - /url: https://crm.anhtester.com/admin/tasks/view/1837
          - link "#2464 - Nhà là nơi để về - Công ty vật liệu YHL":
            - /url: https://crm.anhtester.com/admin/projects/view/2464
          - text: Recurring Task
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1837
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "10-05-2026"
        - gridcell "nhanhotiennghi"
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1670 Test Date BVA Start Timer | Edit | Delete Not Started  20-05-2026 Medium ":
        - gridcell "1670":
          - link "1670":
            - /url: https://crm.anhtester.com/admin/tasks/view/1670
        - gridcell "Test Date BVA Start Timer | Edit | Delete":
          - link "Test Date BVA":
            - /url: https://crm.anhtester.com/admin/tasks/view/1670
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1670
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "20-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - 'row "1795 rrrrrrrrrrrrrrr #2374 - Mua hàng qua app - Công ty Hải Lê Recurring Task Start Timer | Edit | Delete In Progress  05-05-2026 Medium "':
        - gridcell "1795":
          - link "1795":
            - /url: https://crm.anhtester.com/admin/tasks/view/1795
        - 'gridcell "rrrrrrrrrrrrrrr #2374 - Mua hàng qua app - Công ty Hải Lê Recurring Task Start Timer | Edit | Delete"':
          - link "rrrrrrrrrrrrrrr":
            - /url: https://crm.anhtester.com/admin/tasks/view/1795
          - link "#2374 - Mua hàng qua app - Công ty Hải Lê":
            - /url: https://crm.anhtester.com/admin/projects/view/2374
          - text: Recurring Task
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1795
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "05-05-2026"
        - gridcell
        - gridcell "Medium ":
          - text: Medium
          - link "":
            - /url: "#"
      - row "1851 auto_task_create_20260525165250149Z Start Timer | Edit | Delete In Progress  25-05-2026 High ":
        - gridcell "1851":
          - link "1851":
            - /url: https://crm.anhtester.com/admin/tasks/view/1851
        - gridcell "auto_task_create_20260525165250149Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260525165250149Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1851
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1851
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1858 auto_task_create_20260525171131046Z Start Timer | Edit | Delete In Progress  25-05-2026 High ":
        - gridcell "1858":
          - link "1858":
            - /url: https://crm.anhtester.com/admin/tasks/view/1858
        - gridcell "auto_task_create_20260525171131046Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260525171131046Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1858
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1858
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1865 auto_task_create_20260526085917930Z Start Timer | Edit | Delete In Progress  25-05-2026 High ":
        - gridcell "1865":
          - link "1865":
            - /url: https://crm.anhtester.com/admin/tasks/view/1865
        - gridcell "auto_task_create_20260526085917930Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260526085917930Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1865
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1865
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1873 auto_task_create_20260526090050154Z Start Timer | Edit | Delete In Progress  25-05-2026 High ":
        - gridcell "1873":
          - link "1873":
            - /url: https://crm.anhtester.com/admin/tasks/view/1873
        - gridcell "auto_task_create_20260526090050154Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260526090050154Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1873
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1873
        - gridcell "In Progress ":
          - text: In Progress
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1651 auto_task_create_20260505001832893Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1651":
          - link "1651":
            - /url: https://crm.anhtester.com/admin/tasks/view/1651
        - gridcell "auto_task_create_20260505001832893Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505001832893Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1651
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1651
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1659 auto_task_create_20260505002713693Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1659":
          - link "1659":
            - /url: https://crm.anhtester.com/admin/tasks/view/1659
        - gridcell "auto_task_create_20260505002713693Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505002713693Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1659
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1659
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1662 auto_task_create_20260505002929012Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1662":
          - link "1662":
            - /url: https://crm.anhtester.com/admin/tasks/view/1662
        - gridcell "auto_task_create_20260505002929012Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505002929012Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1662
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1662
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1666 auto_task_create_20260505014826284Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1666":
          - link "1666":
            - /url: https://crm.anhtester.com/admin/tasks/view/1666
        - gridcell "auto_task_create_20260505014826284Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505014826284Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1666
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1666
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1675 auto_task_create_20260505015250408Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1675":
          - link "1675":
            - /url: https://crm.anhtester.com/admin/tasks/view/1675
        - gridcell "auto_task_create_20260505015250408Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505015250408Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1675
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1675
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1687 auto_task_create_20260505022236167Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1687":
          - link "1687":
            - /url: https://crm.anhtester.com/admin/tasks/view/1687
        - gridcell "auto_task_create_20260505022236167Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505022236167Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1687
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1687
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1699 auto_task_create_20260505022436274Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1699":
          - link "1699":
            - /url: https://crm.anhtester.com/admin/tasks/view/1699
        - gridcell "auto_task_create_20260505022436274Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505022436274Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1699
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1699
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1707 auto_task_create_20260505022652485Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1707":
          - link "1707":
            - /url: https://crm.anhtester.com/admin/tasks/view/1707
        - gridcell "auto_task_create_20260505022652485Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505022652485Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1707
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1707
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1716 auto_task_create_20260505022902544Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1716":
          - link "1716":
            - /url: https://crm.anhtester.com/admin/tasks/view/1716
        - gridcell "auto_task_create_20260505022902544Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505022902544Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1716
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1716
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
      - row "1729 auto_task_create_20260505023106010Z Start Timer | Edit | Delete Not Started  25-05-2026 High ":
        - gridcell "1729":
          - link "1729":
            - /url: https://crm.anhtester.com/admin/tasks/view/1729
        - gridcell "auto_task_create_20260505023106010Z Start Timer | Edit | Delete":
          - link "auto_task_create_20260505023106010Z":
            - /url: https://crm.anhtester.com/admin/tasks/view/1729
          - link "Start Timer":
            - /url: "#"
          - text: "|"
          - link "Edit":
            - /url: "#"
          - text: "|"
          - link "Delete":
            - /url: https://crm.anhtester.com/admin/tasks/delete_task/1729
        - gridcell "Not Started ":
          - text: Not Started
          - link "":
            - /url: "#"
        - gridcell "25-05-2026"
        - gridcell
        - gridcell "High ":
          - text: High
          - link "":
            - /url: "#"
  - status: Showing 1 to 25 of 210 entries
  - combobox:
    - option "1" [selected]
    - option "2"
    - option "3"
    - option "4"
    - option "5"
    - option "6"
    - option "7"
    - option "8"
    - option "9"
  - list:
    - listitem:
      - link "Previous":
        - /url: "#"
    - listitem:
      - link "1":
        - /url: "#"
    - listitem:
      - link "2":
        - /url: "#"
    - listitem:
      - link "3":
        - /url: "#"
    - listitem:
      - link "4":
        - /url: "#"
    - listitem:
      - link "5":
        - /url: "#"
    - listitem:
      - link "…":
        - /url: "#"
    - listitem:
      - link "9":
        - /url: "#"
    - listitem:
      - link "Next":
        - /url: "#"
- text: 
- button "prev": 
- button "next": 
- button "today" [disabled]
- button "expand"
- heading "August 2026" [level=2]
- button "month"
- button "week"
- button "day"
- button "filter by"
- table:
  - rowgroup:
    - row "Sun Mon Tue Wed Thu Fri Sat":
      - cell "Sun Mon Tue Wed Thu Fri Sat":
        - table:
          - rowgroup:
            - row "Sun Mon Tue Wed Thu Fri Sat":
              - columnheader "Sun"
              - columnheader "Mon"
              - columnheader "Tue"
              - columnheader "Wed"
              - columnheader "Thu"
              - columnheader "Fri"
              - columnheader "Sat"
  - rowgroup:
    - row:
      - cell:
        - table:
          - rowgroup:
            - row "26 AUTO_POM_DELETE_PROJECT_1785060694174 27 28 29 30 9a Auto_Event_1785308715605 9a Auto_Event_1785326686198 9a Auto_Event_1785391502885 31 1 AUTO_POM_ADD_TASK_1784972392019... AUTO_POM_ADD_TASK_1784972454358... AUTO_POM_ADD_TASK_1784972604866... AUTO_POM_ADD_TASK_1784972693160... +4 more":
              - cell "26 AUTO_POM_DELETE_PROJECT_1785060694174":
                - text: "26"
                - link "AUTO_POM_DELETE_PROJECT_1785060694174":
                  - /url: https://crm.anhtester.com/admin/projects/view/2617
              - cell "27"
              - cell "28"
              - cell "29"
              - cell "30 9a Auto_Event_1785308715605 9a Auto_Event_1785326686198 9a Auto_Event_1785391502885"
              - cell "31"
              - cell "1 AUTO_POM_ADD_TASK_1784972392019... AUTO_POM_ADD_TASK_1784972454358... AUTO_POM_ADD_TASK_1784972604866... AUTO_POM_ADD_TASK_1784972693160... +4 more":
                - text: "1"
                - link "AUTO_POM_ADD_TASK_1784972392019...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1784972454358...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1784972604866...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1784972693160...":
                  - /url: "#"
                - text: +4 more
            - row "2 AUTO_POM_ADD_TASK_1785056697533... AUTO_POM_ADD_TASK_1785057312115... AUTO_POM_ADD_TASK_1785057408936... AUTO_POM_ADD_TASK_1785059438127... AUTO_POM_ADD_TASK_1785061221017... 3 4 5 6 7 8":
              - cell "2 AUTO_POM_ADD_TASK_1785056697533... AUTO_POM_ADD_TASK_1785057312115... AUTO_POM_ADD_TASK_1785057408936... AUTO_POM_ADD_TASK_1785059438127... AUTO_POM_ADD_TASK_1785061221017...":
                - text: "2"
                - link "AUTO_POM_ADD_TASK_1785056697533...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1785057312115...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1785057408936...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1785059438127...":
                  - /url: "#"
                - link "AUTO_POM_ADD_TASK_1785061221017...":
                  - /url: "#"
              - cell "3"
              - cell "4"
              - cell "5"
              - cell "6"
              - cell "7"
              - cell "8"
            - row "9 AUTO_POM_ADD_TASK_1785661574530... 10 11 12 13 14 15":
              - cell "9 AUTO_POM_ADD_TASK_1785661574530...":
                - text: "9"
                - link "AUTO_POM_ADD_TASK_1785661574530...":
                  - /url: "#"
              - cell "10"
              - cell "11"
              - cell "12"
              - cell "13"
              - cell "14"
              - cell "15"
            - row "16 17 18 19 20 21 22":
              - cell "16"
              - cell "17"
              - cell "18"
              - cell "19"
              - cell "20"
              - cell "21"
              - cell "22"
            - row "23 24 AUTO_POM_ADD_PROJECT_1784969181204 AUTO_POM_ADD_PROJECT_1784969246851 AUTO_POM_ADD_PROJECT_1784969265338 AUTO_POM_ADD_PROJECT_1784969338238 +10 more 25 AUTO_POM_ADD_PROJECT_1785056440639 AUTO_POM_ADD_PROJECT_1785056676781 AUTO_POM_ADD_PROJECT_1785057291876 AUTO_POM_ADD_PROJECT_1785057388987 +6 more 26 27 28 29 AUTO_POM_ADD_PROJECT_1785397460399 AUTO_POM_ADD_PROJECT_1785403908390":
              - cell "23"
              - cell "24 AUTO_POM_ADD_PROJECT_1784969181204 AUTO_POM_ADD_PROJECT_1784969246851 AUTO_POM_ADD_PROJECT_1784969265338 AUTO_POM_ADD_PROJECT_1784969338238 +10 more":
                - text: "24"
                - link "AUTO_POM_ADD_PROJECT_1784969181204":
                  - /url: https://crm.anhtester.com/admin/projects/view/2584
                - link "AUTO_POM_ADD_PROJECT_1784969246851":
                  - /url: https://crm.anhtester.com/admin/projects/view/2585
                - link "AUTO_POM_ADD_PROJECT_1784969265338":
                  - /url: https://crm.anhtester.com/admin/projects/view/2586
                - link "AUTO_POM_ADD_PROJECT_1784969338238":
                  - /url: https://crm.anhtester.com/admin/projects/view/2587
                - text: +10 more
              - cell "25 AUTO_POM_ADD_PROJECT_1785056440639 AUTO_POM_ADD_PROJECT_1785056676781 AUTO_POM_ADD_PROJECT_1785057291876 AUTO_POM_ADD_PROJECT_1785057388987 +6 more":
                - text: "25"
                - link "AUTO_POM_ADD_PROJECT_1785056440639":
                  - /url: https://crm.anhtester.com/admin/projects/view/2604
                - link "AUTO_POM_ADD_PROJECT_1785056676781":
                  - /url: https://crm.anhtester.com/admin/projects/view/2605
                - link "AUTO_POM_ADD_PROJECT_1785057291876":
                  - /url: https://crm.anhtester.com/admin/projects/view/2607
                - link "AUTO_POM_ADD_PROJECT_1785057388987":
                  - /url: https://crm.anhtester.com/admin/projects/view/2609
                - text: +6 more
              - cell "26"
              - cell "27"
              - cell "28"
              - cell "29 AUTO_POM_ADD_PROJECT_1785397460399 AUTO_POM_ADD_PROJECT_1785403908390":
                - text: "29"
                - link "AUTO_POM_ADD_PROJECT_1785397460399":
                  - /url: https://crm.anhtester.com/admin/projects/view/2633
                - link "AUTO_POM_ADD_PROJECT_1785403908390":
                  - /url: https://crm.anhtester.com/admin/projects/view/2635
            - row "30 Contract_Auto_1785237725 31 1 AUTO_POM_ADD_PROJECT_1785661551151 AUTO_POM_ADD_PROJECT_1785661789456 2 3 4 5":
              - cell "30 Contract_Auto_1785237725":
                - text: "30"
                - link "Contract_Auto_1785237725":
                  - /url: https://crm.anhtester.com/admin/contracts/contract/619
              - cell "31"
              - cell "1 AUTO_POM_ADD_PROJECT_1785661551151 AUTO_POM_ADD_PROJECT_1785661789456":
                - text: "1"
                - link "AUTO_POM_ADD_PROJECT_1785661551151":
                  - /url: https://crm.anhtester.com/admin/projects/view/2647
                - link "AUTO_POM_ADD_PROJECT_1785661789456":
                  - /url: https://crm.anhtester.com/admin/projects/view/2649
              - cell "2"
              - cell "3"
              - cell "4"
              - cell "5"
- iframe
- text: 
- paragraph:
  - img
  - text: Payment Records
- link "Full Report":
  - /url: https://crm.anhtester.com/admin/reports/sales
- link "Weekly":
  - /url: "#"
- separator
- text: 
- paragraph:
  - img
  - text: Contracts Expiring Soon
- link "View All":
  - /url: https://crm.anhtester.com/admin/contracts
- separator
- combobox:
  - option "10"
  - option "25" [selected]
  - option "50"
  - option "100"
  - option "All"
- button "Export"
- text: 
- searchbox ""
- grid:
  - rowgroup:
    - 'row "Subject # activate to sort column ascending Customer activate to sort column ascending Start Date activate to sort column ascending End Date activate to sort column ascending"':
      - 'columnheader "Subject # activate to sort column ascending"': "Subject #"
      - columnheader "Customer activate to sort column ascending": Customer
      - columnheader "Start Date activate to sort column ascending": Start Date
      - columnheader "End Date activate to sort column ascending": End Date
  - rowgroup:
    - row "TC023 Contract 1779369542 Anh test 21-05-2026 31-07-2026":
      - gridcell "TC023 Contract 1779369542":
        - link "TC023 Contract 1779369542":
          - /url: https://crm.anhtester.com/admin/contracts/contract/645
      - gridcell "Anh test":
        - link "Anh test":
          - /url: https://crm.anhtester.com/admin/clients/client/8961
      - gridcell "21-05-2026"
      - gridcell "31-07-2026"
    - row "Giao hàng tiết kiệm Anh test 31-07-2026 03-08-2026":
      - gridcell "Giao hàng tiết kiệm":
        - link "Giao hàng tiết kiệm":
          - /url: https://crm.anhtester.com/admin/contracts/contract/646
      - gridcell "Anh test":
        - link "Anh test":
          - /url: https://crm.anhtester.com/admin/clients/client/8932
      - gridcell "31-07-2026"
      - gridcell "03-08-2026"
- status: Showing 1 to 2 of 2 entries
- list:
  - listitem:
    - link "Previous":
      - /url: "#"
  - listitem:
    - link "1":
      - /url: "#"
  - listitem:
    - link "Next":
      - /url: "#"
- text: 
- paragraph:
  - img
  - text: My To Do Items
- link "View All":
  - /url: https://crm.anhtester.com/admin/todo
- link "New To Do":
  - /url: "#__todo"
- separator
- heading " Latest to do's" [level=4]
- list:
  - listitem:
    - checkbox
    - text: Auto_Todo_1785308757872
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 29-07-2026 14:05:54
  - listitem:
    - checkbox
    - text: discovery sample query
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 29-07-2026 16:00:12
  - listitem:
    - checkbox
    - text: Auto_Todo_1785326692915
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 29-07-2026 19:04:48
  - listitem:
    - checkbox
    - text: Auto_Todo_1785391509623
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 30-07-2026 13:05:07
- heading " Latest finished to do's" [level=4]
- list:
  - listitem:
    - checkbox [checked]
    - text:  Auto_Todo_1785308162297
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 03-08-2026 15:47:52
  - listitem:
    - checkbox [checked]
    - text:  Auto test description 071e5134-6a9b-4d7d-8d16-75e5025e69a3
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 10-06-2026 11:10:42
  - listitem:
    - checkbox [checked]
    - text:  Auto test description ada27a27-dc8d-4a6d-bdcd-735c76521ed2
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 10-06-2026 11:10:42
  - listitem:
    - checkbox [checked]
    - text:  Auto test description 5162cc99-96a2-46f7-997f-f5b019212d92
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 08-06-2026 16:12:19
  - listitem:
    - checkbox [checked]
    - text:  a
    - link "":
      - /url: "#"
    - link "":
      - /url: "#"
    - text: 10-06-2026 11:10:42
- text: 
- paragraph:
  - img
  - text: Leads Overview
- separator
- iframe
- text: 
- paragraph:
  - img
  - text: Statistics by Project Status
- separator
- iframe
- text: 
- paragraph:
  - img
  - text: Latest Project Activity
- separator
- text: 2 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785661789456":
  - /url: https://crm.anhtester.com/admin/projects/view/2649
- paragraph: Admin Example
- text: 2 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785661789456":
  - /url: https://crm.anhtester.com/admin/projects/view/2649
- text: 2 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new task assignee"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785661551151":
  - /url: https://crm.anhtester.com/admin/projects/view/2647
- paragraph: AUTO_POM_ADD_TASK_1785661574530 - Admin Example
- text: 2 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785661551151":
  - /url: https://crm.anhtester.com/admin/projects/view/2647
- paragraph: Admin Example
- text: 2 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785661551151":
  - /url: https://crm.anhtester.com/admin/projects/view/2647
- text: 4 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Task marked as complete"
- text: "Project Name:"
- link "Mua hàng qua app":
  - /url: https://crm.anhtester.com/admin/projects/view/2374
- paragraph: Quin
- text: 4 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Recorded timesheet"
- text: "Project Name:"
- link "Mua hàng qua app":
  - /url: https://crm.anhtester.com/admin/projects/view/2374
- paragraph: "00:00 Task: Quin"
- text: 5 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785403908390":
  - /url: https://crm.anhtester.com/admin/projects/view/2635
- paragraph: Admin Example
- text: 5 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785403908390":
  - /url: https://crm.anhtester.com/admin/projects/view/2635
- text: 5 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785397460399":
  - /url: https://crm.anhtester.com/admin/projects/view/2633
- paragraph: Admin Example
- text: 5 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785397460399":
  - /url: https://crm.anhtester.com/admin/projects/view/2633
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link:
  - /url: https://crm.anhtester.com/admin/projects/view/2629
- paragraph: Admin Example
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link:
  - /url: https://crm.anhtester.com/admin/projects/view/2629
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "Project_Auto_Company_1785294095":
  - /url: https://crm.anhtester.com/admin/projects/view/2628
- paragraph: Admin Example
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "Project_Auto_Company_1785294095":
  - /url: https://crm.anhtester.com/admin/projects/view/2628
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "Project_Auto_Company_1785293971":
  - /url: https://crm.anhtester.com/admin/projects/view/2627
- paragraph: Admin Example
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "Project_Auto_Company_1785293971":
  - /url: https://crm.anhtester.com/admin/projects/view/2627
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new team member"
- text: "Project Name:"
- link "Project_Auto_Company_1785293911":
  - /url: https://crm.anhtester.com/admin/projects/view/2626
- paragraph: Admin Example
- text: 6 days ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Created the project"
- text: "Project Name:"
- link "Project_Auto_Company_1785293911":
  - /url: https://crm.anhtester.com/admin/projects/view/2626
- text: a week ago
- paragraph:
  - link "Admin Example":
    - /url: https://crm.anhtester.com/admin/profile/2
  - text: "- Added new task assignee"
- text: "Project Name:"
- link "AUTO_POM_ADD_PROJECT_1785061195721":
  - /url: https://crm.anhtester.com/admin/projects/view/2622
- paragraph: AUTO_POM_ADD_TASK_1785061221017 - Admin Example
```

# Test source

```ts
  96  |       await ctx.parameter('result', text);
  97  |       return text;
  98  |     });
  99  |   }
  100 | 
  101 |   async getInputValue(locator: Locator): Promise<string> {
  102 |     return step('Get input value of field', async (ctx) => {
  103 |       await ctx.parameter('locator', this.locatorDesc(locator));
  104 |       const value = await locator.inputValue();
  105 |       await ctx.parameter('result', value);
  106 |       return value;
  107 |     });
  108 |   }
  109 | 
  110 |   async isVisible(locator: Locator): Promise<boolean> {
  111 |     return step('Check whether element is visible', async (ctx) => {
  112 |       await ctx.parameter('locator', this.locatorDesc(locator));
  113 |       const visible = await locator.isVisible();
  114 |       await ctx.parameter('result', String(visible));
  115 |       return visible;
  116 |     });
  117 |   }
  118 | 
  119 |   async isEnabled(locator: Locator): Promise<boolean> {
  120 |     return step('Check whether element is enabled', async (ctx) => {
  121 |       await ctx.parameter('locator', this.locatorDesc(locator));
  122 |       const enabled = await locator.isEnabled();
  123 |       await ctx.parameter('result', String(enabled));
  124 |       return enabled;
  125 |     });
  126 |   }
  127 | 
  128 |   async isChecked(locator: Locator): Promise<boolean> {
  129 |     return step('Check whether checkbox is checked', async (ctx) => {
  130 |       await ctx.parameter('locator', this.locatorDesc(locator));
  131 |       const checked = await locator.isChecked();
  132 |       await ctx.parameter('result', String(checked));
  133 |       return checked;
  134 |     });
  135 |   }
  136 | 
  137 |   async getAttribute(locator: Locator, name: string): Promise<string | null> {
  138 |     return step(`Get attribute "${name}" of element`, async (ctx) => {
  139 |       await ctx.parameter('locator', this.locatorDesc(locator));
  140 |       const value = await locator.getAttribute(name);
  141 |       await ctx.parameter('result', value ?? '');
  142 |       return value;
  143 |     });
  144 |   }
  145 | 
  146 |   async getAllTexts(locator: Locator): Promise<string[]> {
  147 |     return step('Get text content of all matching elements', async (ctx) => {
  148 |       await ctx.parameter('locator', this.locatorDesc(locator));
  149 |       const texts = await locator.allTextContents();
  150 |       await ctx.parameter('result', texts.join(' | '));
  151 |       return texts;
  152 |     });
  153 |   }
  154 | 
  155 |   async getTitle(): Promise<string> {
  156 |     return step('Get page title', async (ctx) => {
  157 |       const title = await this.page.title();
  158 |       await ctx.parameter('result', title);
  159 |       return title;
  160 |     });
  161 |   }
  162 | 
  163 |   getCurrentURL(): string {
  164 |     return this.page.url();
  165 |   }
  166 | 
  167 |   // ─── Waits ────────────────────────────────────────────────────────────────
  168 | 
  169 |   async waitForVisible(locator: Locator): Promise<void> {
  170 |     await step('Wait until element becomes visible', async (ctx) => {
  171 |       await ctx.parameter('locator', this.locatorDesc(locator));
  172 |       await expect(locator).toBeVisible();
  173 |     });
  174 |   }
  175 | 
  176 |   async waitForHidden(locator: Locator): Promise<void> {
  177 |     await step('Wait until element becomes hidden', async (ctx) => {
  178 |       await ctx.parameter('locator', this.locatorDesc(locator));
  179 |       await expect(locator).toBeHidden();
  180 |     });
  181 |   }
  182 | 
  183 |   async waitForURL(urlPattern: string | RegExp): Promise<void> {
  184 |     await step('Wait until page URL matches pattern', async (ctx) => {
  185 |       await ctx.parameter('pattern', String(urlPattern));
  186 |       await expect(this.page).toHaveURL(urlPattern);
  187 |     });
  188 |   }
  189 | 
  190 |   // ─── Assertions ───────────────────────────────────────────────────────────
  191 | 
  192 |   async assertVisible(locator: Locator, description?: string): Promise<void> {
  193 |     const label = description ?? this.locatorDesc(locator);
  194 |     await step(`Verify element is visible: "${label}"`, async (ctx) => {
  195 |       await ctx.parameter('locator', this.locatorDesc(locator));
> 196 |       await expect(locator).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  197 |     });
  198 |   }
  199 | 
  200 |   async assertHidden(locator: Locator, description?: string): Promise<void> {
  201 |     const label = description ?? this.locatorDesc(locator);
  202 |     await step(`Verify element is hidden: "${label}"`, async (ctx) => {
  203 |       await ctx.parameter('locator', this.locatorDesc(locator));
  204 |       await expect(locator).toBeHidden();
  205 |     });
  206 |   }
  207 | 
  208 |   async assertChecked(locator: Locator, description?: string): Promise<void> {
  209 |     const label = description ?? this.locatorDesc(locator);
  210 |     await step(`Verify checkbox is checked: "${label}"`, async (ctx) => {
  211 |       await ctx.parameter('locator', this.locatorDesc(locator));
  212 |       await expect(locator).toBeChecked();
  213 |     });
  214 |   }
  215 | 
  216 |   async assertUnchecked(locator: Locator, description?: string): Promise<void> {
  217 |     const label = description ?? this.locatorDesc(locator);
  218 |     await step(`Verify checkbox is unchecked: "${label}"`, async (ctx) => {
  219 |       await ctx.parameter('locator', this.locatorDesc(locator));
  220 |       await expect(locator).not.toBeChecked();
  221 |     });
  222 |   }
  223 | 
  224 |   async assertAttribute(locator: Locator, name: string, expected: string, description?: string): Promise<void> {
  225 |     const label = description ?? this.locatorDesc(locator);
  226 |     await step(`Verify attribute "${name}" equals "${expected}": "${label}"`, async (ctx) => {
  227 |       await ctx.parameter('locator', this.locatorDesc(locator));
  228 |       await ctx.parameter('attribute', name);
  229 |       await ctx.parameter('expected', expected);
  230 |       await expect(locator).toHaveAttribute(name, expected);
  231 |     });
  232 |   }
  233 | 
  234 |   async assertValue(locator: Locator, expected: string, description?: string): Promise<void> {
  235 |     const label = description ?? this.locatorDesc(locator);
  236 |     await step(`Verify field value equals: "${expected}" — "${label}"`, async (ctx) => {
  237 |       await ctx.parameter('locator', this.locatorDesc(locator));
  238 |       await ctx.parameter('expected', expected);
  239 |       await expect(locator).toHaveValue(expected);
  240 |     });
  241 |   }
  242 | 
  243 |   async assertClassContains(locator: Locator, substring: string, description?: string): Promise<void> {
  244 |     const label = description ?? this.locatorDesc(locator);
  245 |     await step(`Verify class attribute contains "${substring}": "${label}"`, async (ctx) => {
  246 |       await ctx.parameter('locator', this.locatorDesc(locator));
  247 |       await ctx.parameter('expected substring', substring);
  248 |       await expect(locator).toHaveClass(new RegExp(substring));
  249 |     });
  250 |   }
  251 | 
  252 |   async assertHtml5Invalid(locator: Locator, description?: string): Promise<void> {
  253 |     const label = description ?? this.locatorDesc(locator);
  254 |     await step(`Verify native HTML5 validation blocks submission: "${label}"`, async (ctx) => {
  255 |       await ctx.parameter('locator', this.locatorDesc(locator));
  256 |       const isValid = await locator.evaluate((el) => (el as HTMLInputElement).checkValidity());
  257 |       expect(isValid, `Expected "${label}" to fail native HTML5 validation (form should not submit)`).toBe(false);
  258 |     });
  259 |   }
  260 | 
  261 |   async assertHasURL(urlPattern: string | RegExp): Promise<void> {
  262 |     await step(`Verify page URL matches pattern: "${String(urlPattern)}"`, async (ctx) => {
  263 |       await ctx.parameter('actual url', this.page.url());
  264 |       await ctx.parameter('expected pattern', String(urlPattern));
  265 |       await expect(this.page).toHaveURL(urlPattern);
  266 |     });
  267 |   }
  268 | 
  269 |   async assertHasTitle(expectedTitle: string): Promise<void> {
  270 |     await step(`Verify page title equals: "${expectedTitle}"`, async (ctx) => {
  271 |       const actualTitle = await this.page.title();
  272 |       await ctx.parameter('actual title', actualTitle);
  273 |       await ctx.parameter('expected title', expectedTitle);
  274 |       await expect(this.page).toHaveTitle(expectedTitle);
  275 |     });
  276 |   }
  277 | 
  278 |   async assertText(locator: Locator, expectedText: string): Promise<void> {
  279 |     await step(`Verify element text equals: "${expectedText}"`, async (ctx) => {
  280 |       await ctx.parameter('locator', this.locatorDesc(locator));
  281 |       await ctx.parameter('expected', expectedText);
  282 |       await expect(locator).toHaveText(expectedText);
  283 |     });
  284 |   }
  285 | 
  286 |   async assertContainsText(locator: Locator, expectedText: string): Promise<void> {
  287 |     await step(`Verify element contains text: "${expectedText}"`, async (ctx) => {
  288 |       await ctx.parameter('locator', this.locatorDesc(locator));
  289 |       await ctx.parameter('expected substring', expectedText);
  290 |       await expect(locator).toContainText(expectedText);
  291 |     });
  292 |   }
  293 | 
  294 |   async assertStringContains(actual: string, expected: string, description?: string): Promise<void> {
  295 |     const label = description ? `Verify ${description} contains expected text` : 'Verify string contains expected text';
  296 |     await step(label, async (ctx) => {
```