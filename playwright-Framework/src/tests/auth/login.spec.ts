import { test, expect } from '../../fixtures/base.fixture';
import { ENV } from '../../utils/env.config';
import { TestDataGenerator } from '../../utils/test-data';

test.describe('Login Module', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CRM_LOGIN_TC_001 - đăng nhập thành công với Email và Password hợp lệ', async ({ loginPage, dashboardPage }) => {
    await test.step('Enter a valid email and password', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.assertEmailValue(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
      await loginPage.assertPasswordFieldIsMasked();
    });

    await test.step('Submit the login form and verify redirect to the Dashboard', async () => {
      await loginPage.submit();
      await dashboardPage.expectToBeVisible();
    });
  });

  test('CRM_LOGIN_TC_002 - đăng nhập thành công khi tick chọn "Remember me"', async ({ loginPage, dashboardPage }) => {
    await test.step('Enter a valid email and password, then check "Remember me"', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
      await loginPage.checkRememberMe();
      await loginPage.assertRememberMeChecked();
    });

    await test.step('Submit the login form and verify redirect to the Dashboard', async () => {
      await loginPage.submit();
      await dashboardPage.expectToBeVisible();
    });
  });

  test('CRM_LOGIN_TC_003 - bỏ trống trường Email khi Password hợp lệ', async ({ loginPage }) => {
    await test.step('Leave the Email field empty and enter a valid password', async () => {
      await loginPage.enterPassword(ENV.TEST_USER_PASSWORD);
    });

    await test.step('Submit the login form and verify the "Email required" error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('The Email Address field is required.');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_004 - bỏ trống trường Password khi Email hợp lệ', async ({ loginPage }) => {
    await test.step('Enter a valid email and leave the Password field empty', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
    });

    await test.step('Submit the login form and verify the "Password required" error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('The Password field is required.');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_005 - bỏ trống đồng thời cả Email và Password', async ({ loginPage }) => {
    await test.step('Submit the login form with both Email and Password left empty', async () => {
      await loginPage.submit();
    });

    await test.step('Verify both "Email required" and "Password required" errors are shown', async () => {
      const errors = await loginPage.getAllErrorMessages();
      expect(errors.some((e) => e.includes('The Email Address field is required.'))).toBe(true);
      expect(errors.some((e) => e.includes('The Password field is required.'))).toBe(true);
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_006 - Email đúng định dạng nhưng không tồn tại trong hệ thống', async ({ loginPage }) => {
    const nonExistentEmail = TestDataGenerator.generateEmail('tc006nonexistent');

    await test.step('Enter a well-formatted but non-existent email and a password', async () => {
      await loginPage.enterEmail(nonExistentEmail);
      await loginPage.enterPassword('AnyPassword_20260803');
    });

    await test.step('Submit the login form and verify the invalid-credentials error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('Invalid email or password');
      await loginPage.assertStaysOnLoginPage();
    });
  });

  test('CRM_LOGIN_TC_007 - Email tồn tại nhưng sai Password', async ({ loginPage }) => {
    await test.step('Enter a valid email and an incorrect password', async () => {
      await loginPage.enterEmail(ENV.TEST_USER_EMAIL);
      await loginPage.enterPassword('WrongPass_20260803');
    });

    await test.step('Submit the login form and verify the invalid-credentials error', async () => {
      await loginPage.submit();
      await loginPage.assertErrorContains('Invalid email or password');
      await loginPage.assertStaysOnLoginPage();
    });
  });
});
