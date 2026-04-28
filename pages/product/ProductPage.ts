/*import { Page, expect } from '@playwright/test';

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
    }*/
  import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { productLocators } from "./product.locators";

export class ProductPage extends BasePage {
  locators = productLocators;

  constructor(page: Page) {
    super(page);
  }

  addToCartButton() {
    return this.page.getByRole(
      this.locators.addToCartButton.role,
      { name: this.locators.addToCartButton.name }
    ).first();
  }
}


