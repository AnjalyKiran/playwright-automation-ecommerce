/*import { Page, expect } from '@playwright/test';

export class SuccessPage {
  constructor(private page: Page) {}

  async verifyOrderSuccess() {
    await expect(this.page).toHaveURL(/rt=checkout\/success/i);

    // Common success heading on AutomationTestStore
    const heading = this.page.locator('h1, h2').filter({ hasText: /processed/i }).first();

    await expect(heading).toBeVisible();
  }
}*/
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { successLocators } from "./success.locators";

export class SuccessPage extends BasePage {
  locators = successLocators;

  constructor(page: Page) {
    super(page);
  }

  successHeading() {
    return this.page
      .locator(this.locators.successHeading.selector)
      .filter({ hasText: this.locators.successHeading.text })
      .first();
  }
}

