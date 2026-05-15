# Playwright Automation Framework

Framework automation testing cho Web UI sử dụng Playwright + TypeScript.

## Tech Stack

| Công nghệ | Version |
|---|---|
| Node.js | >= 18.0.0 |
| Playwright | ^1.60.0 |
| TypeScript | ^6.0.3 |
| Allure Playwright | ^3.0.0 |
| dotenv | ^17.4.2 |

## Cài đặt

```bash
# Clone repo
git clone <repo-url>
cd playwright-automation

# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers
npx playwright install
```

## Cấu hình Environment

```bash
# Tạo file .env từ template và chỉnh sửa thông tin thực tế
cp .env.example .env
```

## Chạy Test

```bash
# Chạy tất cả tests (headless)
npm test

# Chạy tests với browser hiển thị (headed)
npm run test:headed

# Chạy tests với Playwright UI mode
npm run test:ui

# Chạy tests debug mode
npm run test:debug

# Chạy tests trên browser cụ thể
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

## Allure Report

Không cần cài Allure global — dùng thẳng từ `node_modules` qua `npx`.

```bash
# Xóa dữ liệu report cũ
npm run allure:clean

# Generate report từ kết quả test
npm run allure:generate

# Mở report đã generate
npm run allure:open

# Serve report trực tiếp (không cần generate trước)
npm run allure:serve
```

## Playwright HTML Report

```bash
npm run report
```

## Project Structure

```
playwright-automation/
├── playwright.config.ts          # Cấu hình Playwright: browsers, timeouts, reporters
├── package.json                  # Dependencies và npm scripts
├── tsconfig.json                 # Cấu hình TypeScript compiler
├── .env                          # Biến môi trường (không commit lên git)
├── src/
│   ├── pages/                    # Page Object Model classes
│   ├── fixtures/                 # Custom Playwright fixtures
│   ├── utils/                    # Tiện ích dùng chung
│   └── tests/                    # Test specs (sắp xếp theo module)
└── test-data/                    # Dữ liệu test tĩnh (JSON)
```

### Mô tả chi tiết

#### `playwright.config.ts`
File cấu hình trung tâm của framework:
- **Browsers:** Chromium, Firefox, WebKit
- **Viewport:** 1920×1080 (desktop)
- **Reporters:** HTML report + Allure + list (console)
- **Timeouts:** `timeout` 60s, `actionTimeout` 10s, `navigationTimeout` 30s
- **CI mode:** tự bật `retries: 2`, `workers: 1`, `headless: true` khi có biến `CI=true`
- **Artifacts khi fail:** screenshot, video, trace

#### `src/pages/`
Chứa toàn bộ **Page Object classes** — mỗi file đại diện cho 1 trang/module UI.

| File | Vai trò |
|---|---|
| `base.page.ts` | Class cha — chứa các methods dùng chung: `navigate`, `click`, `fill`, `getText`, `waitForVisible`, `screenshot`... Mọi Page class đều kế thừa từ đây |
| `login.page.ts` | Locators + actions cho trang đăng nhập |
| `dashboard.page.ts` | Locators + actions cho trang dashboard sau login |

> **Quy tắc:** Locators khai báo `private readonly` ở đầu class. Methods mô tả hành vi người dùng. **Không đặt assertions trong Page class.**

#### `src/fixtures/`
Mở rộng `test` object của Playwright để inject Page Objects tự động vào test.

| File | Vai trò |
|---|---|
| `base.fixture.ts` | Extend `test` base — inject `loginPage`, `dashboardPage` vào mọi test |
| `auth.fixture.ts` | Extend `base.fixture` — thêm fixture `authenticatedPage` tự động login trước khi test chạy |

> **Cách dùng:** Import `test` từ fixture thay vì từ `@playwright/test` để có sẵn Page Objects mà không cần khởi tạo thủ công.

#### `src/utils/`
Các tiện ích dùng chung toàn framework.

| File | Vai trò |
|---|---|
| `env.config.ts` | Đọc biến môi trường từ `.env`, export object `ENV` với đầy đủ type-safe config: `BASE_URL`, `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, timeouts... |
| `test-data.ts` | Class `TestDataGenerator` — sinh dữ liệu test động: `generateEmail`, `generateUsername`, `generatePhone`, `generatePassword`, `generateUniqueId`... Format: `auto_{testName}_{timestamp}_{random}` |
| `helpers.ts` | Hàm tiện ích chung: `waitForPageLoad`, `formatDate`, `parseJsonFile` |

#### `src/tests/`
Chứa test specs, tổ chức theo module/tính năng.

```
tests/
└── auth/
    └── login.spec.ts     # Test cases cho chức năng đăng nhập
```

> Mỗi test file import `test` từ fixture tương ứng. Test độc lập, không phụ thuộc nhau.

#### `test-data/`
Dữ liệu test tĩnh dạng JSON — dùng cho các test cần tập dữ liệu cố định.

| File | Nội dung |
|---|---|
| `users.json` | Tập dữ liệu user: `validUser`, `adminUser`, `invalidUsers` (empty username, empty password, invalid format) |

## Conventions

### Page Object Model (POM)

- Mỗi page/module UI → 1 Page class trong `src/pages/`
- Locators khai báo dạng `private readonly` ở đầu class
- Methods mô tả hành vi người dùng
- Assertions chỉ đặt trong test files, không trong Page class

### Locator Priority

1. `getByRole()` — Semantic elements
2. `getByLabel()` — Form fields
3. `getByPlaceholder()` — Input placeholders
4. `getByText()` — Text content
5. `getByTestId()` — `data-testid` attribute
6. `locator("css")` — Fallback

### Test Data

- Dữ liệu unique dùng `TestDataGenerator`
- Format: `auto_{testName}_{timestamp}_{random}`
- Không hardcode email, username, ID

### Wait Strategy

- Dùng Playwright auto-waiting + `expect()` assertions
- **KHÔNG** dùng `page.waitForTimeout()` hoặc `setTimeout`
