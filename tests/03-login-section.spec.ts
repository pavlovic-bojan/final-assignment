import { test, expect } from '../fixtures/pages';

test.describe('Verify that login section contains all required elements and each link navigates to the correct page', () => {
  test('login section contains all required elements', async ({ homePage }) => {
    await expect(homePage.customerLoginHeading).toBeVisible();
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    await expect(homePage.logInButton).toBeVisible();
    await expect(homePage.forgotLoginLink).toBeVisible();
    await expect(homePage.registerLink).toBeVisible();
  });

  test('Forgot login info? link navigates to the correct page', async ({ page, homePage }) => {
    await homePage.clickForgotLogin();
    await expect(page).toHaveURL(/lookup\.htm/);
  });

  test('Register link navigates to the correct page', async ({ page, homePage }) => {
    await homePage.clickRegister();
    await expect(page).toHaveURL(/register\.htm/);
  });
});
