import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly emailInput: Locator;
  private readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Forgot Password' });
    this.emailInput = page.getByLabel('Email Address');
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
  }

  async assertIsDisplayed(): Promise<void> {
    await step('Verify Forgot Password page is displayed', async () => {
      await this.assertHasURL(/forgot_password/);
      await this.assertVisible(this.pageHeading, 'Forgot Password page heading');
      await this.assertVisible(this.emailInput, 'Email Address input');
      await this.assertVisible(this.confirmButton, 'Confirm button');
    });
  }
}
