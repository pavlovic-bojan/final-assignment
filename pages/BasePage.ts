import { Page } from '@playwright/test';

/**
 * Base page - contains shared methods for all Page Object classes
 */
export abstract class BasePage {
  constructor(protected page: Page) {}
}
