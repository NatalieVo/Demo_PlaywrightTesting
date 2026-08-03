import { test } from '../../fixtures/base.fixture';

test.describe('Login Module - Navigation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('CRM_LOGIN_TC_026 - Click liên kết "Forgot Password?" điều hướng đúng trang', async ({ loginPage, forgotPasswordPage }) => {
    await test.step('Click the "Forgot Password?" link and verify navigation to the Forgot Password page', async () => {
      await loginPage.clickForgotPasswordLink();
      await forgotPasswordPage.assertIsDisplayed();
    });
  });
});
