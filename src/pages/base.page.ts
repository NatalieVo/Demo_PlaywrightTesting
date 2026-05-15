import { type Locator, type Page, expect } from '@playwright/test';
import { attachment, parameter, step } from 'allure-js-commons';

export class BasePage {
  constructor(protected readonly page: Page) { }

  private locatorDesc(locator: Locator): string {
    return locator.toString();
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigate(path: string): Promise<void> {
    await step(`Navigate to: "${path}"`, async () => {
      await this.page.goto(path);
    });
  }

  // ─── Interactions ─────────────────────────────────────────────────────────

  async click(locator: Locator): Promise<void> {
    await step(`Click element: ${this.locatorDesc(locator)}`, async () => {
      await locator.click();
    });
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await step(`Fill "${value}" into ${this.locatorDesc(locator)}`, async () => {
      await locator.clear();
      await locator.fill(value);
    });
  }

  async fillSecure(locator: Locator, value: string): Promise<void> {
    await step(`Fill "***" into ${this.locatorDesc(locator)}`, async () => {
      await locator.clear();
      await locator.fill(value);
    });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await step(`Select option "${value}" in ${this.locatorDesc(locator)}`, async () => {
      await locator.selectOption(value);
    });
  }

  async check(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Check: "${label}"`, async () => {
      await locator.check();
    });
  }

  async uncheck(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Uncheck: "${label}"`, async () => {
      await locator.uncheck();
    });
  }

  // ─── Queries ──────────────────────────────────────────────────────────────

  async getText(locator: Locator): Promise<string> {
    return step(`Get text from ${this.locatorDesc(locator)}`, async () => {
      const text = (await locator.textContent()) ?? '';
      await parameter('Actual text', text, { excluded: true });
      return text;
    });
  }

  async getInputValue(locator: Locator): Promise<string> {
    return step(`Get input value from ${this.locatorDesc(locator)}`, async () => {
      const value = await locator.inputValue();
      await parameter('Actual value', value, { excluded: true });
      return value;
    });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return step(`Check visibility of ${this.locatorDesc(locator)}`, async () => {
      const visible = await locator.isVisible();
      await parameter('Is visible', String(visible), { excluded: true });
      return visible;
    });
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return step(`Check enabled state of ${this.locatorDesc(locator)}`, async () => {
      const enabled = await locator.isEnabled();
      await parameter('Is enabled', String(enabled), { excluded: true });
      return enabled;
    });
  }

  async getTitle(): Promise<string> {
    return step('Get page title', async () => {
      const title = await this.page.title();
      await parameter('Page title', title, { excluded: true });
      return title;
    });
  }

  getCurrentURL(): string {
    return this.page.url();
  }

  // ─── Waits ────────────────────────────────────────────────────────────────

  async waitForVisible(locator: Locator): Promise<void> {
    await step(`Wait for visible: ${this.locatorDesc(locator)}`, async () => {
      await expect(locator).toBeVisible();
    });
  }

  async waitForHidden(locator: Locator): Promise<void> {
    await step(`Wait for hidden: ${this.locatorDesc(locator)}`, async () => {
      await expect(locator).toBeHidden();
    });
  }

  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    await step(`Wait for URL: "${urlPattern}"`, async () => {
      await expect(this.page).toHaveURL(urlPattern);
    });
  }

  // ─── Assertions ───────────────────────────────────────────────────────────

  async assertVisible(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Assert visible: "${label}"`, async () => {
      await expect(locator).toBeVisible();
    });
  }

  async assertHidden(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Assert hidden: "${label}"`, async () => {
      await expect(locator).toBeHidden();
    });
  }

  async assertHasURL(urlPattern: string | RegExp): Promise<void> {
    await step(`Assert page URL matches: "${urlPattern}"`, async () => {
      await parameter('Actual URL', this.page.url(), { excluded: true });
      await parameter('Expected pattern', String(urlPattern), { excluded: true });
      await expect(this.page).toHaveURL(urlPattern);
    });
  }

  async assertHasTitle(expectedTitle: string): Promise<void> {
    await step(`Assert page title equals: "${expectedTitle}"`, async () => {
      const actualTitle = await this.page.title();
      await parameter('Actual title', actualTitle, { excluded: true });
      await parameter('Expected title', expectedTitle, { excluded: true });
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }

  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await step(`Assert text equals: "${expectedText}" in ${this.locatorDesc(locator)}`, async () => {
      await expect(locator).toHaveText(expectedText);
    });
  }

  async assertContainsText(locator: Locator, expectedText: string): Promise<void> {
    await step(`Assert contains text: "${expectedText}" in ${this.locatorDesc(locator)}`, async () => {
      await expect(locator).toContainText(expectedText);
    });
  }

  async assertStringContains(actual: string, expected: string, description?: string): Promise<void> {
    const label = description ? `Assert ${description}` : 'Assert string contains';
    await step(`${label} — actual: "${actual}", expected to contain: "${expected}"`, async () => {
      await parameter('Actual', actual, { excluded: true });
      await parameter('Expected to contain', expected, { excluded: true });
      expect(actual).toContain(expected);
    });
  }

  // ─── Screenshot ───────────────────────────────────────────────────────────

  async screenshot(name: string): Promise<Uint8Array> {
    return step(`Take screenshot: "${name}"`, async () => {
      const buffer = await this.page.screenshot({
        path: `test-results/screenshots/${name}.png`,
        fullPage: true,
      });
      await attachment(name, buffer, 'image/png');
      return buffer;
    });
  }
}
