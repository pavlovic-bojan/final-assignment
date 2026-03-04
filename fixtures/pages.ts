import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

export type PageFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
};

/**
 * Fixtures for Page Object models - per Playwright documentation.
 * homePage and registerPage are automatically initialized and navigated.
 */
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },

  registerPage: async ({ page }, use) => {
    await page.goto('register.htm');
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
