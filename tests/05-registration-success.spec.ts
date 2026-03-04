import { expect } from '@playwright/test';
import { test, saveUser } from '../fixtures/test-data';

test.describe('Verify that user can register with valid data', () => {
  test('registration with valid data displays Welcome message', async ({
    registerPage,
    registrationData,
  }) => {
    await registerPage.fillRegistrationForm(registrationData);
    await registerPage.submitRegistration();

    await registerPage.expectWelcomeWithUsername(registrationData.username);

    saveUser({
      username: registrationData.username,
      password: registrationData.password,
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
    });
  });
});
