import { expect } from '@playwright/test';
import { test } from '../fixtures/test-data';

test.describe('Verify that user cannot register when Password and Confirm fields do not match', () => {
  test('error message is displayed when Password and Confirm do not match', async ({
    registerPage,
    registrationDataWithMismatchedPassword,
  }) => {
    await registerPage.fillRegistrationFormWithMismatchedPassword(
      registrationDataWithMismatchedPassword
    );
    await registerPage.submitRegistration();

    await expect(registerPage.errorMessages.first()).toBeVisible();
  });
});
