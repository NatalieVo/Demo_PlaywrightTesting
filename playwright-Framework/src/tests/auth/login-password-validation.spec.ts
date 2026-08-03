import { test } from '../../fixtures/base.fixture';
import { ENV } from '../../utils/env.config';
import { TestDataGenerator } from '../../utils/test-data';

test.describe('Login Module - Password Field Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CRM_LOGIN_TC_018 - Password chứa mã SQL Injection nhằm bypass đăng nhập', async ({ loginPage }) => {
    await test.step('Enter a valid email and a SQL injection payload as the password', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword("' OR '1'='1' --");
    });

    await test.step('Submit the login form and verify the bypass attempt is blocked', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('Invalid email or password');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_019 - Password chỉ chứa khoảng trắng (whitespace-only)', async ({ loginPage }) => {
    await test.step('Enter a valid email and a whitespace-only password', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword('     ');
    });

    await test.step('Submit the login form and verify it stays on the Login page', async () => {
      await loginPage.submit();
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_020 - Password có độ dài rất lớn (~500 ký tự)', async ({ loginPage }) => {
    const longPassword = TestDataGenerator.generateString(500);

    await test.step('Enter a valid email and an oversized password (~500 characters)', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword(longPassword);
    });

    await test.step('Submit the login form and verify the invalid-credentials error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('Invalid email or password');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_021 - Password chứa ký tự Unicode/Emoji', async ({ loginPage }) => {
    await test.step('Enter a valid email and a password containing Unicode/emoji characters', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword('🔒Mật khẩu测试123');
    });

    await test.step('Submit the login form and verify the invalid-credentials error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('Invalid email or password');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_022 - Ký tự Password được ẩn (mask) khi nhập', async ({ loginPage }) => {
    await test.step('Type a password and verify the field is masked with the correct value', async () => {
      await loginPage.enterPassword('Test@123456');
      await loginPage.assertPasswordFieldIsMasked();
      await loginPage.assertPasswordValue('Test@123456');
    });
  });

  test('CRM_LOGIN_TC_023 - Dán (paste) giá trị vào trường Password', async ({ loginPage }) => {
    await test.step('Paste a value into the Password field and verify it was applied', async () => {
      await loginPage.pasteIntoPassword('PasteTest_123456');
      await loginPage.assertPasswordValue('PasteTest_123456');
    });
  });
});
