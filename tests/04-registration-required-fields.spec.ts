import { test, expect } from '../fixtures/pages';

test.describe('Verify that all registration form fields are required except phone number', () => {
  test('registration page opens', async ({ page, registerPage }) => {
    await expect(page).toHaveURL(/register\.htm/);
    await expect(registerPage.signUpHeading).toBeVisible();
  });

  test('section contains 11 input fields and 1 Register button', async ({ registerPage }) => {
    await expect(registerPage.formInputs).toHaveCount(11);
    await expect(registerPage.registerButton).toBeVisible();
  });

  test('error messages are displayed for each required field when fields are empty', async ({
    registerPage,
  }) => {
    await registerPage.submitRegistration();

    await expect(registerPage.errorMessages).toHaveCount(10);
  });
});
