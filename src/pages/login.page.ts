import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';
import { ENV } from '../utils/env.config';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly pageHeading: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email Address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.alert-danger');
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.pageHeading = page.getByRole('heading', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
  }

  async goto(): Promise<void> {
    await step('Open Login page', async () => {
      await this.navigate(ENV.BASE_URL);
      await this.assertVisible(this.pageHeading, 'Login page heading "Login"');
    });
  }

  async login(email: string, password: string): Promise<void> {
    await step(`Login with email: "${email}"`, async () => {
      await this.fill(this.emailInput, email);
      await this.fillSecure(this.passwordInput, password);
      await this.click(this.loginButton);
    });
  }

  async loginWithRememberMe(email: string, password: string): Promise<void> {
    await step(`Login with Remember Me — email: "${email}"`, async () => {
      await this.fill(this.emailInput, email);
      await this.fillSecure(this.passwordInput, password);
      await this.check(this.rememberMeCheckbox, 'Remember me checkbox');
      await this.click(this.loginButton);
    });
  }

  async getErrorMessage(): Promise<string> {
    return step('Get login error message', async () => {
      await this.assertVisible(this.errorMessage, 'Error alert ".alert-danger"');
      return this.getText(this.errorMessage);
    });
  }

  async assertErrorContains(expectedText: string): Promise<void> {
    const actual = await this.getErrorMessage();
    await this.assertStringContains(actual, expectedText, 'login error message');
  }

  async assertStaysOnLoginPage(): Promise<void> {
    await step('Assert page stays on Login page', async () => {
      await this.assertHasURL(/authentication/);
      await this.assertVisible(this.pageHeading, 'Login page heading "Login"');
    });
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      await this.assertVisible(this.errorMessage, 'Error alert ".alert-danger"');
      return true;
    } catch {
      return false;
    }
  }

  async isPageHeadingVisible(): Promise<boolean> {
    return this.isVisible(this.pageHeading);
  }
}
