import { type Locator, type Page, expect } from '@playwright/test';
import { attachment, step } from 'allure-js-commons';

export class BasePage {
  constructor(protected readonly page: Page) { }

  private locatorDesc(locator: Locator): string {
    return locator.toString();
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigate(path: string): Promise<void> {
    await step(`Navigate to URL: "${path}"`, async (ctx) => {
      await ctx.parameter('url', path);
      await this.page.goto(path);
    });
  }

  // ─── Interactions ─────────────────────────────────────────────────────────

  async click(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Click on element: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await locator.click();
    });
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await step(`Fill field with value: "${value}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('value', value);
      await locator.clear();
      await locator.fill(value);
    });
  }

  async fillSecure(locator: Locator, value: string): Promise<void> {
    await step('Fill field with a masked value', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('value', value, 'masked');
      await locator.clear();
      await locator.fill(value);
    });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await step(`Select option: "${value}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('value', value);
      await locator.selectOption(value);
    });
  }

  async check(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Check checkbox: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await locator.check();
    });
  }

  async uncheck(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Uncheck checkbox: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await locator.uncheck();
    });
  }

  async hover(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Hover over element: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await locator.hover();
    });
  }

  async pasteText(locator: Locator, value: string): Promise<void> {
    await step('Paste value into field (masked)', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('value', value, 'masked');
      await locator.click();
      await locator.clear();
      await this.page.keyboard.insertText(value);
    });
  }

  // ─── Queries ──────────────────────────────────────────────────────────────

  async getText(locator: Locator): Promise<string> {
    return step('Get text content of element', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const text = (await locator.textContent()) ?? '';
      await ctx.parameter('result', text);
      return text;
    });
  }

  async getInputValue(locator: Locator): Promise<string> {
    return step('Get input value of field', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const value = await locator.inputValue();
      await ctx.parameter('result', value);
      return value;
    });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return step('Check whether element is visible', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const visible = await locator.isVisible();
      await ctx.parameter('result', String(visible));
      return visible;
    });
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return step('Check whether element is enabled', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const enabled = await locator.isEnabled();
      await ctx.parameter('result', String(enabled));
      return enabled;
    });
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return step('Check whether checkbox is checked', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const checked = await locator.isChecked();
      await ctx.parameter('result', String(checked));
      return checked;
    });
  }

  async getAttribute(locator: Locator, name: string): Promise<string | null> {
    return step(`Get attribute "${name}" of element`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const value = await locator.getAttribute(name);
      await ctx.parameter('result', value ?? '');
      return value;
    });
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    return step('Get text content of all matching elements', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const texts = await locator.allTextContents();
      await ctx.parameter('result', texts.join(' | '));
      return texts;
    });
  }

  async getTitle(): Promise<string> {
    return step('Get page title', async (ctx) => {
      const title = await this.page.title();
      await ctx.parameter('result', title);
      return title;
    });
  }

  getCurrentURL(): string {
    return this.page.url();
  }

  // ─── Waits ────────────────────────────────────────────────────────────────

  async waitForVisible(locator: Locator): Promise<void> {
    await step('Wait until element becomes visible', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).toBeVisible();
    });
  }

  async waitForHidden(locator: Locator): Promise<void> {
    await step('Wait until element becomes hidden', async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).toBeHidden();
    });
  }

  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    await step('Wait until page URL matches pattern', async (ctx) => {
      await ctx.parameter('pattern', String(urlPattern));
      await expect(this.page).toHaveURL(urlPattern);
    });
  }

  // ─── Assertions ───────────────────────────────────────────────────────────

  async assertVisible(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify element is visible: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).toBeVisible();
    });
  }

  async assertHidden(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify element is hidden: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).toBeHidden();
    });
  }

  async assertChecked(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify checkbox is checked: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).toBeChecked();
    });
  }

  async assertUnchecked(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify checkbox is unchecked: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await expect(locator).not.toBeChecked();
    });
  }

  async assertAttribute(locator: Locator, name: string, expected: string, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify attribute "${name}" equals "${expected}": "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('attribute', name);
      await ctx.parameter('expected', expected);
      await expect(locator).toHaveAttribute(name, expected);
    });
  }

  async assertValue(locator: Locator, expected: string, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify field value equals: "${expected}" — "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('expected', expected);
      await expect(locator).toHaveValue(expected);
    });
  }

  async assertClassContains(locator: Locator, substring: string, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify class attribute contains "${substring}": "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('expected substring', substring);
      await expect(locator).toHaveClass(new RegExp(substring));
    });
  }

  async assertHtml5Invalid(locator: Locator, description?: string): Promise<void> {
    const label = description ?? this.locatorDesc(locator);
    await step(`Verify native HTML5 validation blocks submission: "${label}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      const isValid = await locator.evaluate((el) => (el as HTMLInputElement).checkValidity());
      expect(isValid, `Expected "${label}" to fail native HTML5 validation (form should not submit)`).toBe(false);
    });
  }

  async assertHasURL(urlPattern: string | RegExp): Promise<void> {
    await step(`Verify page URL matches pattern: "${String(urlPattern)}"`, async (ctx) => {
      await ctx.parameter('actual url', this.page.url());
      await ctx.parameter('expected pattern', String(urlPattern));
      await expect(this.page).toHaveURL(urlPattern);
    });
  }

  async assertHasTitle(expectedTitle: string): Promise<void> {
    await step(`Verify page title equals: "${expectedTitle}"`, async (ctx) => {
      const actualTitle = await this.page.title();
      await ctx.parameter('actual title', actualTitle);
      await ctx.parameter('expected title', expectedTitle);
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }

  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await step(`Verify element text equals: "${expectedText}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('expected', expectedText);
      await expect(locator).toHaveText(expectedText);
    });
  }

  async assertContainsText(locator: Locator, expectedText: string): Promise<void> {
    await step(`Verify element contains text: "${expectedText}"`, async (ctx) => {
      await ctx.parameter('locator', this.locatorDesc(locator));
      await ctx.parameter('expected substring', expectedText);
      await expect(locator).toContainText(expectedText);
    });
  }

  async assertStringContains(actual: string, expected: string, description?: string): Promise<void> {
    const label = description ? `Verify ${description} contains expected text` : 'Verify string contains expected text';
    await step(label, async (ctx) => {
      await ctx.parameter('actual', actual);
      await ctx.parameter('expected to contain', expected);
      expect(actual).toContain(expected);
    });
  }

  // ─── Screenshot ───────────────────────────────────────────────────────────

  async screenshot(name: string): Promise<Uint8Array> {
    return step(`Capture screenshot: "${name}"`, async () => {
      const buffer = await this.page.screenshot({
        path: `test-results/screenshots/${name}.png`,
        fullPage: true,
      });
      await attachment(name, buffer, 'image/png');
      return buffer;
    });
  }
}
