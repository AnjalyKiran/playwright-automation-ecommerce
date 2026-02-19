import { Page, expect } from '@playwright/test';

export class SuccessPage {
  constructor(private page: Page) {}

  async verifyOrderSuccess() {
    await expect(this.page).toHaveURL(/rt=checkout\/success/i);

    // Common success heading on AutomationTestStore
    const heading = this.page.locator('h1, h2').filter({ hasText: /processed/i }).first();

    await expect(heading).toBeVisible();
  }
}
