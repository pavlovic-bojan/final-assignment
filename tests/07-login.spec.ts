import { expect } from '@playwright/test';
import { test } from '../fixtures/test-data';

test.describe('Verify that registered user can log in', () => {
  test('logged-in user sees Welcome message with first and last name', async ({
    accountsPage,
    registeredUser,
  }) => {
    await accountsPage.expectWelcomeWithFullName(
      registeredUser.firstName,
      registeredUser.lastName
    );
  });
});
