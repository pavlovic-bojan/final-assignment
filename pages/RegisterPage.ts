import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  ssn: string;
  username: string;
  password: string;
  phone?: string;
}

/**
 * Page Object for the ParaBank registration page
 */
export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  readonly signUpHeading = this.page.getByRole('heading', { name: 'Signing up is easy!' });
  readonly formInputs = this.page.locator(
    'form#customerForm input[type="text"], form#customerForm input[type="password"]'
  );
  readonly firstNameInput = this.page.locator('input[name="customer.firstName"]');
  readonly lastNameInput = this.page.locator('input[name="customer.lastName"]');
  readonly addressInput = this.page.locator('input[name="customer.address.street"]');
  readonly cityInput = this.page.locator('input[name="customer.address.city"]');
  readonly stateInput = this.page.locator('input[name="customer.address.state"]');
  readonly zipCodeInput = this.page.locator('input[name="customer.address.zipCode"]');
  readonly phoneInput = this.page.locator('input[name="customer.phoneNumber"]');
  readonly ssnInput = this.page.locator('input[name="customer.ssn"]');
  readonly usernameInput = this.page.locator('input[name="customer.username"]');
  readonly passwordInput = this.page.locator('input[name="customer.password"]');
  readonly confirmPasswordInput = this.page.locator('input[name="repeatedPassword"]');
  readonly registerButton = this.page.getByRole('button', { name: 'Register' });
  readonly errorMessages = this.page.locator('span.error');
  readonly welcomeMessage = this.page.getByRole('heading', { name: /Welcome/ });

  /**
   * Fill the entire registration form
   */
  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    if (data.phone) {
      await this.phoneInput.fill(data.phone);
    }
    await this.ssnInput.fill(data.ssn);
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
  }

  /**
   * Fill form with different Password and Confirm values
   */
  async fillRegistrationFormWithMismatchedPassword(
    data: Omit<RegistrationData, 'password'> & { password: string; confirmPassword: string }
  ): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  /**
   * Click Register button
   */
  async submitRegistration(): Promise<void> {
    await this.registerButton.click();
  }

  /**
   * Assert that username is visible in Welcome message
   */
  async expectWelcomeWithUsername(username: string): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: new RegExp(`Welcome.*${username}`) })
    ).toBeVisible();
  }
}
