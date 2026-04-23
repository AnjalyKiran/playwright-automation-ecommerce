import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

 get addToCartButton() {
    return this.page.getByRole('link', { name: /add to cart/i }).first();
  }
  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/rt=checkout\/cart/i),
      this.addToCartButton.click(),
    ]);
  }
    }

