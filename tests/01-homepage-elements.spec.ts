import { test, expect } from '../fixtures/pages';
import { MENU_ITEMS } from '../constants/menu';

test.describe('Verification of visibility of all key elements on the home page', () => {
  test('page loads successfully', async ({ page, homePage }) => {
    await expect(page).toHaveURL(/parabank\.parasoft\.com/);
    await expect(page).toHaveTitle(/ParaBank/);
  });

  test('verify that main page elements are visible', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.customerLoginHeading).toBeVisible();
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    await expect(homePage.logInButton).toBeVisible();
    await expect(homePage.forgotLoginLink).toBeVisible();
    await expect(homePage.registerLink).toBeVisible();
    await expect(homePage.latestNewsSection).toBeVisible();
    await expect(homePage.contactUsLink).toBeVisible();
    await expect(homePage.siteMapLink).toBeVisible();
    await expect(homePage.footer).toBeVisible();

    for (const menuItem of MENU_ITEMS) {
      await expect(homePage.getMenuLink(menuItem)).toBeVisible();
    }
  });
});
