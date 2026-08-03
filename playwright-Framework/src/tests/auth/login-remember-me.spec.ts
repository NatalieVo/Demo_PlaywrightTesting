import { test } from '../../fixtures/base.fixture';

test.describe('Login Module - Remember Me Checkbox', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CRM_LOGIN_TC_024 - Checkbox "Remember me" mặc định không được chọn khi tải trang', async ({ loginPage }) => {
    await test.step('Verify "Remember me" is unchecked by default on page load', async () => {
      await loginPage.assertRememberMeUnchecked();
    });
  });

  test('CRM_LOGIN_TC_025 - Tick/Untick checkbox "Remember me" hoạt động đúng', async ({ loginPage }) => {
    await test.step('Check "Remember me" and verify it becomes checked', async () => {
      await loginPage.checkRememberMe();
      await loginPage.assertRememberMeChecked();
    });

    await test.step('Uncheck "Remember me" and verify it becomes unchecked', async () => {
      await loginPage.uncheckRememberMe();
      await loginPage.assertRememberMeUnchecked();
    });
  });
});
