import { test, expect } from '../fixtures/pages';
import { CLICKABLE_MENU_ITEMS, MENU_ITEMS } from '../constants/menu';

test.describe('Verification that the links section contains all required elements', () => {
  test('all menu elements are visible and have expected text', async ({ homePage }) => {
    for (const item of MENU_ITEMS) {
      const link = homePage.getMenuLink(item);
      await expect(link).toBeVisible();
      await expect(link).toHaveText(item);
    }
  });

  for (const item of CLICKABLE_MENU_ITEMS) {
    test(`${item} is clickable and navigates to the correct page`, async ({
      page,
      homePage,
    }) => {
      const link = homePage.getMenuLink(item);

      await expect(link).toBeVisible();
      await link.click();
      await expect(page).not.toHaveURL(/index\.htm$/);
    });
  }
});
