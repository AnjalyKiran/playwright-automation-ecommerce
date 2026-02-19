
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartLoaded() {
    await expect(this.page).toHaveURL(/rt=checkout\/cart/i);
    await expect(this.page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();
    await expect(this.page.locator('table.table.table-striped.table-bordered').first()).toBeVisible();
  }

  async clickCheckout() {
    const checkoutBtn = this.page.locator('a#cart_checkout2[title="Checkout"]');
    await expect(checkoutBtn).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/rt=account\/login/i),
      checkoutBtn.click(),
    ]);
  }
}

