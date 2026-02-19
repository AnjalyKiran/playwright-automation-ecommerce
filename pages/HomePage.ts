import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async ContinueToRegister() {
    // Prefer role
     await this.page.getByRole('button', { name: /login/i }).click();
    const continueBtn =this.page.getByRole('button', { name: /^continue$/i });

    await Promise.all([
      this.page.waitForURL(/rt=account\/create/i),
      continueBtn.click(),
    ]);
  }
   async openFirstProductFromHome() {
    await this.page.goto('/');

    const firstProduct = this.page.locator('.fixed_wrapper .prdocutname').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
  }
}
