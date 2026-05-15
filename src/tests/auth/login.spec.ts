import { test } from '../../fixtures/base.fixture';
import { ENV } from '../../utils/env.config';

test.describe('Login Module', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('đăng nhập thành công với credentials hợp lệ', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(ENV.TEST_USER_EMAIL, ENV.TEST_USER_PASSWORD);

    await dashboardPage.expectToBeVisible();
  });

  test('đăng nhập thất bại với email và password sai', async ({ loginPage }) => {
    await loginPage.login('invalid@test.com', 'WrongPassword123!');

    await loginPage.assertErrorContains('Invalid email or password');
  });

  test('đăng nhập thất bại khi bỏ trống email', async ({ loginPage }) => {
    await loginPage.login('', 'AnyPassword123!');

    await loginPage.assertStaysOnLoginPage();
  });

  test('đăng nhập thất bại khi bỏ trống password', async ({ loginPage }) => {
    await loginPage.login('admin@example.com', '');

    await loginPage.assertStaysOnLoginPage();
  });
});
