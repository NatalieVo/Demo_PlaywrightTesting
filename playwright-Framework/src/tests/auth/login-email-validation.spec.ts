import { test, expect } from '../../fixtures/base.fixture';
import { ENV } from '../../utils/env.config';
import { TestDataGenerator } from '../../utils/test-data';

const INVALID_EMAIL_FORMAT_ERROR = 'The Email Address field must contain a valid email address.';

test.describe('Login Module - Email Field Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CRM_LOGIN_TC_008 - Email thiếu ký tự "@"', async ({ loginPage }) => {
    await test.step('Enter an email missing the "@" character and a valid password', async () => {
      await loginPage.enterEmail('adminexample.com');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify native HTML5 validation blocks it', async () => {
      await loginPage.submit();
      // The browser blocks submission at native HTML5 validation (input type="email") since "@" is missing — request never reaches the server
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_009 - Email thiếu phần domain sau "@"', async ({ loginPage }) => {
    await test.step('Enter an email missing the domain part after "@" and a valid password', async () => {
      await loginPage.enterEmail('admin@');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify native HTML5 validation blocks it', async () => {
      await loginPage.submit();
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_010 - Email có domain không hợp lệ (thiếu TLD)', async ({ loginPage }) => {
    await test.step('Enter an email with an invalid domain (missing TLD) and a valid password', async () => {
      await loginPage.enterEmail('admin@example');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify the invalid-email-format error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains(INVALID_EMAIL_FORMAT_ERROR);
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_011 - Email chứa nhiều ký tự "@"', async ({ loginPage }) => {
    await test.step('Enter an email containing multiple "@" characters and a valid password', async () => {
      await loginPage.enterEmail('admin@@example.com');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify native HTML5 validation blocks it', async () => {
      await loginPage.submit();
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_012 - Email chứa ký tự đặc biệt không hợp lệ trước "@"', async ({ loginPage }) => {
    await test.step('Enter an email with invalid special characters before "@" and a valid password', async () => {
      await loginPage.enterEmail('admin!#$%^&*()@example.com');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify native HTML5 validation blocks it', async () => {
      await loginPage.submit();
      // Parentheses "()" are invalid in the native HTML5 email validation pattern
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_013 - Email vượt quá độ dài thông thường (~300 ký tự)', async ({ loginPage }) => {
    const longEmail = `${TestDataGenerator.generateString(290)}@example.com`;

    await test.step('Enter an oversized email (~300 characters) and a valid password', async () => {
      await loginPage.enterEmail(longEmail);
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify it stays on the Login page', async () => {
      await loginPage.submit();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_014 - Email có khoảng trắng ở đầu và cuối', async ({ loginPage, dashboardPage }) => {
    await test.step('Enter a valid email padded with leading/trailing whitespace and a valid password', async () => {
      await loginPage.enterEmail(`  ${ENV.TEST_USER_EMAIL}  `);
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify redirect to the Dashboard', async () => {
      await loginPage.submit();
      await dashboardPage.expectToBeVisible();
    });
  });

  test('CRM_LOGIN_TC_015 - Email không phân biệt chữ hoa/thường', async ({ loginPage, dashboardPage }) => {
    await test.step('Enter the valid email in uppercase and a valid password', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL.toUpperCase());
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify redirect to the Dashboard', async () => {
      await loginPage.submit();
      await dashboardPage.expectToBeVisible();
    });
  });

  test('CRM_LOGIN_TC_016 - Email chứa mã XSS injection', async ({ loginPage, page }) => {
    let dialogTriggered = false;
    page.on('dialog', async (dialog) => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    await test.step('Enter an email containing an XSS payload and a valid password', async () => {
      await loginPage.enterEmail('<script>alert(1)</script>@example.com');
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify the XSS payload is neutralized', async () => {
      await loginPage.submit();
      expect(dialogTriggered, 'XSS script should NOT execute (no JS dialog triggered)').toBe(false);
      // Characters "<" ">" cause native HTML5 validation to block submission — the payload never reaches the server
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_017 - Email chứa mã SQL Injection nhằm bypass đăng nhập', async ({ loginPage }) => {
    await test.step('Enter a SQL injection payload as the email and a valid password', async () => {
      await loginPage.enterEmail("' OR '1'='1' --");
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify the bypass attempt is blocked', async () => {
      await loginPage.submit();
      // The payload contains no "@" so native HTML5 validation blocks submission — no way to bypass to the server
      await loginPage.assertEmailFieldIsInvalid();
      await loginPage.assertStaysOnLoginPage();
    });
  });
});
