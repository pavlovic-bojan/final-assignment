import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

const SAVINGS_ACCOUNT_TYPE = '1';

/**
 * Page Object for post-login pages (Accounts Overview, Open New Account)
 */
export class AccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  readonly accountsOverviewLink = this.page.getByRole('link', { name: 'Accounts Overview' });
  readonly openNewAccountLink = this.page.getByRole('link', { name: 'Open New Account' });
  readonly accountTable = this.page.locator('#accountTable tbody tr');
  /** Each account row has a link to activity.htm - use this for reliable count */
  readonly accountLinks = this.page.locator('#accountTable a[href*="activity.htm"]');
  /** Welcome text is in a paragraph on the accounts page (e.g. "Welcome John Doe"), not a heading */
  readonly welcomeMessage = this.page.getByText(/Welcome\s+\S+/);
  readonly accountOpenedMessage = this.page.getByRole('heading', { name: 'Account Opened!' });
  readonly accountTypeSelect = this.page.locator('#type');
  readonly fromAccountSelect = this.page.locator('#fromAccountId');

  /**
   * Click Accounts Overview link and wait for overview page to load
   */
  async clickAccountsOverview(): Promise<void> {
    await this.accountsOverviewLink.click();
    await this.page.waitForURL(/overview\.htm/);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Number of accounts in the table. Counts activity links (one per account).
   */
  async getAccountCount(): Promise<number> {
    await this.accountTable.first().waitFor({ state: 'visible', timeout: 15000 });
    return this.accountLinks.count();
  }

  /**
   * Click Open New Account link and wait for the form
   */
  async clickOpenNewAccount(): Promise<void> {
    await this.openNewAccountLink.click();
    await this.page.waitForURL(/openaccount\.htm/);
  }

  /**
   * Open a new Savings account. Requires at least one existing account to transfer from.
   */
  async openSavingsAccount(fromAccountIndex: number = 0): Promise<void> {
    await this.accountTypeSelect.waitFor({ state: 'visible' });
    await this.fromAccountSelect.waitFor({ state: 'visible' });
    await this.accountTypeSelect.selectOption(SAVINGS_ACCOUNT_TYPE);
    await this.fromAccountSelect.selectOption({ index: fromAccountIndex });
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
  }

  /**
   * Assert that Welcome message is visible with first and last name
   */
  async expectWelcomeWithFullName(firstName: string, lastName: string): Promise<void> {
    await expect(
      this.page.getByText(new RegExp(`${firstName}\\s+${lastName}`))
    ).toBeVisible();
  }

  /**
   * Assert that Account Opened message is displayed
   */
  async expectAccountOpened(): Promise<void> {
    await expect(this.accountOpenedMessage).toBeVisible();
  }
}
