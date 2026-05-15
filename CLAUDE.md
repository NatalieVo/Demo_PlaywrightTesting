# CLAUDE AI - GLOBAL AUTOMATION AGENT RULES

> **Scope:** Áp dụng cho mọi tác vụ Test Automation do Claude Code hoạt động trong dự án này.
> **Mục tiêu:** Sinh ra test scripts hiệu quả, ổn định – dễ debug – dễ scale – CI friendly.

---

## Git Pull Restriction Rule

* Tuyệt đối KHÔNG dùng lệnh GIT làm thay đổi trạng thái code (như `git pull`, `git checkout`, `git merge`, `git rebase`, `git reset`) để lấy code hoặc thay đổi nhánh.
* Vì có nhiều trường hợp code trên server chưa được cập nhật, việc pull code về sẽ ghi đè và làm sai toàn bộ phần code đang chỉnh sửa ở máy local.
* Luôn giữ nguyên trạng thái code local hiện tại để làm việc.
* Nếu cần file hoặc nội dung mới, hãy yêu cầu người dùng cung cấp thay vì tự ý dùng git.
* **Được phép** dùng lệnh read-only: `git status`, `git diff`, `git log` — để kiểm tra trạng thái mà không thay đổi code.

---

## Browser Rules (MANDATORY)

### 🖥️ Viewport & Mode

* Tất cả **UI debugging** phải chạy với **desktop viewport**: **`1920x1080`**
* Bắt buộc **mở browser thật** khi debug (headed mode)
* **Headless mode** chỉ được sử dụng **sau khi test đã debug PASS trên UI**
* CI/CD pipeline **được phép chạy headless mặc định**

### 🔄 Thứ Tự Debug Bắt Buộc

Khi debug UI, **LUÔN** tuân theo thứ tự:

```
navigate → resize(1920×1080) → wait_for(page_load) → snapshot → interact → screenshot(on_fail)
```

### 📸 Screenshot & Snapshot

* Dùng **`snapshot`** để phân tích DOM và xác định locator
* Dùng **`screenshot`** để lưu bằng chứng khi test fail hoặc để báo cáo
* **KHÔNG** chụp screenshot tràn lan — chỉ khi cần thiết

---

## Cleanup & Delivery

### ✅ Điều kiện bàn giao (Definition of Done)

#### 🧹 Code Cleanup
- [ ] Xoá toàn bộ `print()`, `console.log()`, debug log tạm thời
- [ ] Xoá locator không còn sử dụng
- [ ] Không để lại commented-out code
- [ ] Không có `waitForTimeout` / `Thread.sleep` hardcoded
- [ ] Không có test data hardcoded (email, username, ID phải random/traceable)

#### 🏗️ Cấu trúc & POM
- [ ] Tuân thủ mô hình **Page Object Model** — tách biệt Page class, Test class, Utils
- [ ] Locator được định nghĩa trong Page class, không viết inline trong test
- [ ] Tên file, class, method đặt theo convention rõ ràng và nhất quán

#### ✔️ Chất lượng Test
- [ ] Test **PASS ổn định** ít nhất **2 lần liên tiếp** trên UI (headed mode)
- [ ] Assertion có message rõ ràng, dễ debug khi fail
- [ ] Mỗi test case độc lập — không phụ thuộc thứ tự chạy
- [ ] Test data được sinh động (timestamp/random) và traceable

---

## 1. Ngôn Ngữ & Giao Tiếp

- Luôn giao tiếp, giải thích ý tưởng và báo cáo bằng **Tiếng Việt**.
- Diễn giải **ngắn gọn, rõ ràng, dễ hiểu**.

## 2. Quy Trình Làm Việc (Workflow)

- **Recon:** Luôn inspect giao diện thực tế hoặc DOM/HTML/XML trước khi viết automation. Tuyệt đối KHÔNG ĐOÁN locator.
- **Implementation:** Giữ vững mô hình **Page Object Model (POM)**.
- **Execution & Self-fix:** Chạy test ngay sau khi code xong. Nếu test FAIL → tự đọc log → phân tích → sửa → chạy lại → đến khi PASS.
- **Cleanup:** Gỡ bỏ debug logs, code thừa, locator không dùng trước khi deliver.

## 3. Tech Stack Hỗ Trợ

| Loại             | Công nghệ                                     |
| ----------------- | ----------------------------------------------- |
| Ngôn ngữ        | Java, TypeScript                                |
| Web Automation    | Playwright (TS/Java), Selenium WebDriver (Java) |
| Mobile Automation | Appium (Java)                                   |
| API Automation    | REST Assured                                    |
| Test Framework    | TestNG, Playwright Test                         |
| Build Tool        | Maven, npm                                      |

## 4. Skills

Agent sử dụng skills trong `.claude/skills/` tùy theo nhiệm vụ:

| Skill                      | Vai trò                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `qa_automation_engineer` | Master skill cho automation — điều phối toàn bộ quy trình                          |
| `rbt_manual_testing`     | Master skill cho manual testing — 2 modes: QUICK (sinh TC nhanh) và FULL RBT (6 bước) |
| `requirements_analyzer`  | Phân tích requirements từ website/tài liệu                                           |
| `ui_debug_agent`         | Inspect UI/DOM, thu thập locators                                                        |
| `smart_locator_agent`    | Sinh locator mới ổn định                                                              |
| `locator_healer_agent`   | Sửa locator hỏng                                                                        |
| `test_data_generator`    | Sinh test data unique, traceable                                                         |
| `flaky_test_analyzer`    | Phân tích và khắc phục flaky tests                                                   |
| `jira_integration`       | Tích hợp Jira/Xray — lấy requirements, đẩy test results                             |
| `framework_architect`    | Thiết kế và scaffold automation framework                                              |

## 5. Test Data

- Tất cả field yêu cầu **unique**: **BẮT BUỘC** dùng dữ liệu random.
- Dữ liệu random phải **traceable / deterministic**.
- Format: `test name + timestamp + prefix`.

## 6. Anti-Patterns (FORBIDDEN)

| ❌ Anti-Pattern                                   | ✅ Thay thế đúng                            |
| ------------------------------------------------- | ---------------------------------------------- |
| Guess selector / đoán locator                   | Inspect DOM thực tế trước khi code         |
| Hard sleep (`waitForTimeout`, `Thread.sleep`) | Smart waits (`expect()`, `WebDriverWait`)  |
| Copy selector từ code cũ không verify          | Luôn verify selector trên browser hiện tại |
| Viết test không chạy ngay                      | Chạy test ngay sau khi implement              |
| Commit test FAIL                                  | Chỉ commit khi test PASS ổn định           |
| Để debug log / commented code khi deliver       | Cleanup trước khi deliver                    |
| Dùng test data hardcoded trùng lặp             | Sinh data random + traceable                   |

---

## 7. Chiến Lược Chọn Locator

### Thứ tự ưu tiên (cao → thấp)

1. Thuộc tính Accessibility / Aria (semantic)
2. Thuộc tính test chuyên dụng (`data-testid`, `data-test`, `data-qa`)
3. Thuộc tính định danh chính (`id`, `resource-id`, `name`)
4. Hàm semantic riêng framework (Playwright: `getByRole`, `getByLabel`...)
5. CSS Selector
6. XPath (lựa chọn cuối cùng)

### NGHIÊM CẤM sử dụng

- CSS class name động / hash (ví dụ: `css-1n2xyz-btn`)
- Chuỗi `nth-child`, `nth-of-type` khi có lựa chọn tốt hơn
- ID tự sinh bởi framework (auto-generated IDs)
- XPath tuyệt đối dựa trên vị trí (ví dụ: `//div[3]/div[2]/form/button`)

### Quy trình xác minh locator

1. Locator match **đúng 1 element** trong DOM?
2. Element match là thành phần user tương tác được?
3. Reload trang — locator còn đúng không?
4. Thử trên nhiều trạng thái trang — locator ổn định không?

---

## 8. Quy Tắc Playwright

### Ưu tiên Locator Playwright

1. `getByRole()` — Semantic elements (button, link, heading...)
2. `getByLabel()` — Form fields có label
3. `getByPlaceholder()` — Inputs có placeholder
4. `getByText()` — Text content
5. `getByTestId()` — Element có `data-testid`
6. `locator("css")` — Fallback

### Wait Strategy

**NGHIÊM CẤM:**
- `page.waitForTimeout()` — hard sleep
- `await new Promise(r => setTimeout(r, N))` — tự tạo delay

**SỬ DỤNG:**
```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Thành công');
await expect(page).toHaveURL(/dashboard/);
```

### Cấu trúc Test

```typescript
test.describe('Tên Module', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: navigate, login...
  });

  test('mô tả hành vi cần test', async ({ page }) => {
    // Arrange → Act → Assert
  });
});
```

---

## 9. Quy Tắc Automation Chung

### Kiến trúc POM

- **Page classes:** Khai báo locators + methods tương tác UI
- **Test classes:** Logic kiểm thử + assertions
- **Test data:** Tách riêng (JSON, DataProvider, Utils)
- Assertions chỉ đặt trong Test classes, KHÔNG đặt trong Page classes

### Đặt tên

**Java:**
- Page class: `LoginPage.java`, Test class: `LoginTest.java`
- Test method: `testLoginWithValidCredentials()`
- Locator: `loginButton`, `usernameInput`

**TypeScript:**
- Page class: `LoginPage.ts`, Test file: `login.spec.ts`
- Locator: `readonly loginButton`

### Assertions

- Mỗi test case **BẮT BUỘC** có ít nhất 1 assertion
- Assert phải mô tả rõ expected behavior
- Mỗi test case **độc lập** — không phụ thuộc test khác
