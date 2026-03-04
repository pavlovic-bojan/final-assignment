import { faker } from '@faker-js/faker';
import { test as pagesTest } from './pages';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountsPage } from '../pages/AccountsPage';
import type { RegistrationData } from '../pages/RegisterPage';
import * as fs from 'fs';
import * as path from 'path';

export interface UserCredentials {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const DATA_FILE = path.join(process.cwd(), 'test-data', 'user.json');

function saveUser(user: UserCredentials): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(user, null, 2), 'utf-8');
}

function createRegistrationData(): RegistrationData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    ssn: faker.string.alphanumeric(9),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
}

function createRegistrationDataWithMismatchedPassword(): RegistrationData & {
  confirmPassword: string;
} {
  const password = faker.internet.password();
  return {
    ...createRegistrationData(),
    password,
    confirmPassword: password + 'xxx',
  };
}

export const test = pagesTest.extend<{
  registrationData: RegistrationData;
  registrationDataWithMismatchedPassword: RegistrationData & { confirmPassword: string };
  registeredUser: UserCredentials;
  accountsPage: AccountsPage;
}>({
  registrationData: async ({}, use) => {
    await use(createRegistrationData());
  },

  registrationDataWithMismatchedPassword: async ({}, use) => {
    await use(createRegistrationDataWithMismatchedPassword());
  },

  registeredUser: async ({ page }, use) => {
    const userData = createRegistrationData();
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickRegister();

    const registerPage = new RegisterPage(page);
    await registerPage.fillRegistrationForm(userData);
    await registerPage.submitRegistration();

    const user: UserCredentials = {
      username: userData.username,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    await use(user);
  },

  accountsPage: async ({ page, registeredUser }, use) => {
    // User is already logged in from registration — navigate directly to overview
    await page.goto('overview.htm');
    await page.waitForLoadState('networkidle');
    const accountsPage = new AccountsPage(page);
    await accountsPage.welcomeMessage.waitFor({ state: 'visible' });
    await use(accountsPage);
  },
});

export { expect } from '@playwright/test';
export { createRegistrationData, createRegistrationDataWithMismatchedPassword, saveUser };
