# ClaudeCode Playwright Demo

Framework automation testing cho Web UI sử dụng **Playwright + TypeScript**, tích hợp **Claude Code AI Agent** để hỗ trợ sinh test cases, locators, automation scripts và phân tích test.

> **Demo project** cho [anhtester.com](https://anhtester.com) — minh họa cách tích hợp Claude Code vào quy trình QA Automation.

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
git clone https://github.com/anhtester/ClaudeCode_Playwright_Demo.git
cd ClaudeCode_Playwright_Demo

# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers
npx playwright install
```

## Cấu hình Environment

```bash
# Tạo file .env từ template và điền thông tin thực tế
cp .env.example .env
```

Các biến môi trường trong `.env`:

| Biến | Mô tả | Mặc định |
|---|---|---|
| `BASE_URL` | URL ứng dụng cần test | `https://crm.anhtester.com/admin/authentication` |
| `TEST_USER_EMAIL` | Email đăng nhập | — |
| `TEST_USER_PASSWORD` | Mật khẩu đăng nhập | — |
| `HEADED` | Bật headed mode | `false` |
| `ACTION_TIMEOUT` | Timeout cho actions (ms) | `10000` |
| `NAVIGATION_TIMEOUT` | Timeout cho navigation (ms) | `30000` |
| `EXPECT_TIMEOUT` | Timeout cho assertions (ms) | `10000` |

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
ClaudeCode_Playwright_Demo/
├── .claude/                          # Claude Code AI Agent configuration
│   ├── commands/                     # Slash commands (/generate-locator, /generate-manual-testcases-rbt...)
│   ├── rules/                        # Quy tắc automation (playwright, selenium, appium, locator...)
│   ├── skills/                       # AI Skills (qa_automation_engineer, ui_debug_agent...)
│   ├── settings.json                 # Permissions cho project
│   └── settings.local.json           # Permissions local (không commit lên git)
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions CI/CD workflow
├── CLAUDE.md                         # Hướng dẫn và quy tắc cho Claude Code AI Agent
├── playwright.config.ts              # Cấu hình Playwright: browsers, timeouts, reporters
├── package.json                      # Dependencies và npm scripts
├── tsconfig.json                     # Cấu hình TypeScript compiler
├── .env.example                      # Template biến môi trường
├── .env                              # Biến môi trường thực tế (không commit lên git)
├── .gitignore                        # Git ignore rules
├── LICENSE                           # MIT License
├── src/
│   ├── pages/                        # Page Object Model classes
│   │   ├── base.page.ts              # Class cha — methods dùng chung
│   │   ├── login.page.ts             # Locators + actions trang đăng nhập
│   │   └── dashboard.page.ts         # Locators + actions trang dashboard
│   ├── fixtures/                     # Custom Playwright fixtures
│   │   ├── base.fixture.ts           # Inject Page Objects vào test
│   │   └── auth.fixture.ts           # Fixture tự động login trước test
│   ├── utils/                        # Tiện ích dùng chung
│   │   ├── env.config.ts             # Đọc và export biến môi trường (type-safe)
│   │   ├── test-data.ts              # TestDataGenerator — sinh data động, traceable
│   │   ├── helpers.ts                # Hàm tiện ích chung
│   │   └── global-setup.ts           # Global setup chạy trước toàn bộ test suite
│   └── tests/                        # Test specs (tổ chức theo module)
│       └── auth/
│           └── login.spec.ts         # Test cases cho chức năng đăng nhập
└── test-data/                        # Dữ liệu test tĩnh (JSON)
    └── users.json                    # Dataset users: valid, admin, invalid cases
```

## Claude Code AI Integration

Project tích hợp **Claude Code** với bộ slash commands và skills chuyên biệt cho QA Automation:

### Slash Commands

| Command | Mô tả |
|---|---|
| `/generate-locator` | Sinh locator ổn định từ DOM thực tế |
| `/generate-manual-testcases-rbt` | Sinh manual test cases theo quy trình AI-RBT 6 bước |
| `/generate-testcases-from-requirements` | Sinh test cases nhanh từ requirements |
| `/generate-automation-from-ui-flow` | Chạy UI flow thực tế, thu thập locators, sinh automation script |
| `/generate-automation-from-testcases` | Convert manual test cases thành automation scripts |
| `/generate-automation-framework` | Scaffold automation framework hoàn chỉnh |
| `/generate-application-test-plan` | Khám phá ứng dụng và sinh test plan |
| `/generate-requirements-from-website` | Phân tích website và sinh requirements document |
| `/generate-api-tests-from-swagger` | Sinh API tests từ Swagger/OpenAPI spec |
| `/generate-test-data` | Sinh test data có cấu trúc, unique, traceable |
| `/generate-cross-module-test-plan` | Sinh test plan cho tính năng đa module |
| `/generate-combinatorial-test-data` | Sinh test data theo ma trận kết hợp |
| `/analyze-flaky-tests` | Phân tích và khắc phục flaky tests |
| `/analyze-requirement-document` | Phân tích requirement document chi tiết |
| `/fetch-jira-requirements` | Lấy requirements từ Jira ticket |
| `/import-test-results-xray` | Đẩy kết quả test lên Xray Test Management |

### AI Rules

Bộ quy tắc trong `.claude/rules/` được load tự động vào mọi session:

- `playwright_rules.md` — Quy tắc Playwright (locator priority, wait strategy, viewport)
- `selenium_rules.md` — Quy tắc Selenium WebDriver
- `appium_rules.md` — Quy tắc Appium Mobile
- `automation_rules.md` — Quy tắc chung (POM, naming, test independence)
- `locator_strategy.md` — Chiến lược chọn locator tối ưu

## Conventions

### Page Object Model (POM)

- Mỗi page/module UI → 1 Page class trong `src/pages/`
- Locators khai báo `private readonly` ở đầu class
- Methods mô tả hành vi người dùng
- Assertions chỉ đặt trong test files, không trong Page class

### Locator Priority (Playwright)

1. `getByRole()` — Semantic elements (button, link, heading...)
2. `getByLabel()` — Form fields có label
3. `getByPlaceholder()` — Inputs có placeholder
4. `getByText()` — Text content
5. `getByTestId()` — Element có `data-testid`
6. `locator("css")` — Fallback

### Test Data

- Dữ liệu unique dùng `TestDataGenerator`
- Format: `auto_{testName}_{timestamp}_{random}`
- Không hardcode email, username, ID trong test

### Wait Strategy

- Dùng Playwright auto-waiting + `expect()` assertions
- **KHÔNG** dùng `page.waitForTimeout()` hoặc `setTimeout`

## CI/CD

Project hỗ trợ chạy trên CI với GitHub Actions. Khi biến `CI=true`:
- `retries: 2` — tự retry khi fail
- `workers: 1` — chạy tuần tự
- `headless: true` — không mở browser UI
- Artifacts: screenshot, video, trace khi test fail

## License

MIT
