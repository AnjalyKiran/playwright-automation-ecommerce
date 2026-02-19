import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    const addToCartBttn = this.page
      .getByRole('link', { name: /add to cart/i }).first();


    if (await addToCartBttn.count()) {
      await expect(addToCartBttn).toBeVisible();
      await Promise.all([
        this.page.waitForURL(/rt=checkout\/cart/i),
        addToCartBttn.click(),
      ]);
      return;
    }

  }
}
