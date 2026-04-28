import { expect } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class ProductActions extends ProductPage {

  async addToCart(): Promise<void> {
    const addBtn = this.addToCartButton();

    await expect(addBtn).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/rt=checkout\/cart/i),
      addBtn.click(),
    ]);
  }
}
