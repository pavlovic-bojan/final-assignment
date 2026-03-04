import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the ParaBank application home page
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators - main elements
  readonly logo = this.page.getByText('ParaBank').first();
  readonly customerLoginHeading = this.page.getByRole('heading', { name: 'Customer Login' });
  readonly usernameInput = this.page.locator('input[name="username"]');
  readonly passwordInput = this.page.locator('input[name="password"]');
  readonly logInButton = this.page.getByRole('button', { name: 'Log In' });
  readonly forgotLoginLink = this.page.getByRole('link', { name: 'Forgot login info?' });
  readonly registerLink = this.page.getByRole('link', { name: 'Register' });
  readonly latestNewsSection = this.page.getByText('Latest News');
  readonly contactUsLink = this.page.getByRole('link', { name: 'Contact Us' });
  readonly siteMapLink = this.page.getByRole('link', { name: 'Site Map' });
  readonly footer = this.page.locator('#footerPanel');

  // Menu links
  readonly solutionsLink = this.page.getByRole('link', { name: 'Solutions' });
  readonly aboutUsLink = this.page.getByRole('link', { name: 'About Us' });
  readonly servicesLink = this.page.getByRole('link', { name: 'Services' });
  readonly productsLink = this.page.getByRole('link', { name: 'Products' });
  readonly locationsLink = this.page.getByRole('link', { name: 'Locations' });
  readonly adminPageLink = this.page.getByRole('link', { name: 'Admin Page' });

  /**
   * Navigate to home page (uses baseURL from playwright.config)
   */
  async navigate(): Promise<void> {
    await this.page.goto('index.htm');
  }

  /**
   * Login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }

  /**
   * Click Register link
   */
  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Click Forgot login info? link
   */
  async clickForgotLogin(): Promise<void> {
    await this.forgotLoginLink.click();
  }

  /**
   * Get menu item by name. Solutions is not a link (plain text), others are links.
   * Scoped to #headerPanel to avoid matching footer duplicates.
   */
  getMenuLink(name: string) {
    const header = this.page.locator('#headerPanel');
    if (name === 'Solutions') {
      return header.getByText('Solutions', { exact: true });
    }
    return header.getByRole('link', { name });
  }
}
