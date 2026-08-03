import { type Locator, type Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './base.page';

export class HeaderPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly quickCreateTrigger: Locator;
  private readonly quickCreateDropdown: Locator;
  private readonly todoLink: Locator;
  private readonly todoBadge: Locator;
  private readonly timersTrigger: Locator;
  private readonly timersDropdown: Locator;
  private readonly notificationsTrigger: Locator;
  private readonly notificationsDropdown: Locator;
  private readonly profileContainer: Locator;
  private readonly avatarTrigger: Locator;
  private readonly profileDropdown: Locator;
  private readonly languageSubmenuTrigger: Locator;
  private readonly languageSubmenu: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_input');
    this.quickCreateTrigger = page.getByRole('link', { name: '+', exact: true });
    this.quickCreateDropdown = page.locator('ul.dropdown-menu').filter({ has: page.getByText('Quick Create', { exact: true }) });
    this.todoLink = page.locator('li.header-todo a');
    this.todoBadge = page.locator('.nav-total-todos');
    this.timersTrigger = page.locator('#top-timers');
    this.timersDropdown = page.locator('#started-timers-top');
    this.notificationsTrigger = page.locator('.notifications-icon');
    this.notificationsDropdown = page.locator('ul.notifications');
    this.profileContainer = page.locator('li.header-user-profile');
    this.avatarTrigger = this.profileContainer.locator('a.dropdown-toggle.profile');
    this.profileDropdown = this.profileContainer.locator('> ul.dropdown-menu');
    this.languageSubmenuTrigger = this.profileContainer.getByText('Language', { exact: true });
    this.languageSubmenu = this.profileContainer.locator('li.header-languages ul.dropdown-menu');
  }

  async assertSearchInputVisible(): Promise<void> {
    await this.assertVisible(this.searchInput, 'Search input');
  }

  async assertCoreIconsVisible(): Promise<void> {
    await step('Verify header displays all core icons', async () => {
      await this.assertVisible(this.quickCreateTrigger, 'Quick Create icon');
      await this.assertVisible(this.todoLink, 'Todo icon');
      await this.assertVisible(this.timersTrigger, 'Timers icon');
      await this.assertVisible(this.notificationsTrigger, 'Notifications icon');
      await this.assertVisible(this.avatarTrigger, 'Avatar/profile icon');
    });
  }

  async openQuickCreate(): Promise<void> {
    await this.click(this.quickCreateTrigger);
    await this.assertVisible(this.quickCreateDropdown, 'Quick Create dropdown');
  }

  async assertQuickCreateItemsVisible(items: string[]): Promise<void> {
    await step('Verify Quick Create dropdown lists all expected shortcut items', async () => {
      for (const item of items) {
        await this.assertVisible(this.quickCreateDropdown.getByText(item, { exact: true }), `Quick Create item "${item}"`);
      }
    });
  }

  async clickQuickCreateItem(name: string): Promise<void> {
    await this.click(this.quickCreateDropdown.getByText(name, { exact: true }));
  }

  async clickTodoIcon(): Promise<void> {
    await this.click(this.todoLink);
  }

  async getTodoBadgeText(): Promise<string> {
    return this.getText(this.todoBadge);
  }

  async openTimers(): Promise<void> {
    await this.click(this.timersTrigger);
    await this.assertVisible(this.timersDropdown, 'Timers dropdown');
  }

  async openNotifications(): Promise<void> {
    await this.click(this.notificationsTrigger);
    await this.assertVisible(this.notificationsDropdown, 'Notifications dropdown');
  }

  async openProfileDropdown(): Promise<void> {
    await this.click(this.avatarTrigger);
    await this.assertVisible(this.profileDropdown, 'Profile dropdown');
  }

  async assertProfileDropdownItemsVisible(items: string[]): Promise<void> {
    await step('Verify profile dropdown lists all expected menu items', async () => {
      for (const item of items) {
        await this.assertVisible(this.profileDropdown.getByText(item, { exact: true }), `Profile dropdown item "${item}"`);
      }
    });
  }

  async clickProfileMenuItem(name: string): Promise<void> {
    await this.click(this.profileDropdown.getByRole('link', { name, exact: true }));
  }

  async openLanguageSubmenu(): Promise<void> {
    // Submenu này là dropdown-submenu kiểu hover (không có onclick), phải hover thay vì click
    await this.hover(this.languageSubmenuTrigger, 'Language submenu trigger');
    await this.assertVisible(this.languageSubmenu, 'Language submenu');
  }

  async assertLanguageOptionsVisible(languages: string[]): Promise<void> {
    await step('Verify Language submenu lists expected languages', async () => {
      for (const lang of languages) {
        await this.assertVisible(this.languageSubmenu.getByText(lang, { exact: true }), `Language option "${lang}"`);
      }
    });
  }

  async assertEnglishIsActiveLanguage(): Promise<void> {
    await this.assertContainsText(this.languageSubmenu.locator('li.active'), 'English');
  }

  async clickLogout(): Promise<void> {
    await this.click(this.profileDropdown.getByText('Logout', { exact: true }));
  }
}
