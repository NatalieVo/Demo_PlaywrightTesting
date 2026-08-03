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
    await step(`Log in with email "${email}" and submit the form`, async () => {
      await this.fill(this.emailInput, email);
      await this.fillSecure(this.passwordInput, password);
      await this.click(this.loginButton);
    });
  }

  async loginWithRememberMe(email: string, password: string): Promise<void> {
    await step(`Log in with email "${email}" and "Remember me" checked`, async () => {
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
    await step('Verify user remains on the Login page', async () => {
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

  async getAllErrorMessages(): Promise<string[]> {
    return step('Get all login error messages', async () => {
      await this.assertVisible(this.errorMessage.first(), 'Error alert ".alert-danger"');
      return this.getAllTexts(this.errorMessage);
    });
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillSecure(this.passwordInput, password);
  }

  async submit(): Promise<void> {
    await this.click(this.loginButton);
  }

  async pasteIntoPassword(value: string): Promise<void> {
    await this.pasteText(this.passwordInput, value);
  }

  async checkRememberMe(): Promise<void> {
    await this.check(this.rememberMeCheckbox, 'Remember me checkbox');
  }

  async uncheckRememberMe(): Promise<void> {
    await this.uncheck(this.rememberMeCheckbox, 'Remember me checkbox');
  }

  async assertRememberMeChecked(): Promise<void> {
    await this.assertChecked(this.rememberMeCheckbox, 'Remember me checkbox');
  }

  async assertRememberMeUnchecked(): Promise<void> {
    await this.assertUnchecked(this.rememberMeCheckbox, 'Remember me checkbox');
  }

  async assertPasswordFieldIsMasked(): Promise<void> {
    await this.assertAttribute(this.passwordInput, 'type', 'password', 'Password input');
  }

  async assertPasswordValue(expected: string): Promise<void> {
    await this.assertValue(this.passwordInput, expected, 'Password input');
  }

  async assertEmailValue(expected: string): Promise<void> {
    await this.assertValue(this.emailInput, expected, 'Email input');
  }

  async assertEmailFieldIsInvalid(): Promise<void> {
    await this.assertHtml5Invalid(this.emailInput, 'Email input');
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }
}
