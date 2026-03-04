import { expect } from '@playwright/test';
import { test } from '../fixtures/test-data';

test.describe('Verify that registered user can open a new account', () => {
  test('user can open a new Savings account', async ({ accountsPage }) => {
    await expect(accountsPage.accountsOverviewLink).toBeVisible();

    await accountsPage.clickAccountsOverview();
    const initialAccountCount = await accountsPage.getAccountCount();

    await accountsPage.clickOpenNewAccount();
    await accountsPage.openSavingsAccount(0);

    await accountsPage.expectAccountOpened();

    await accountsPage.clickAccountsOverview();
    const newAccountCount = await accountsPage.getAccountCount();
    expect(newAccountCount).toBeGreaterThan(initialAccountCount);
  });
});
