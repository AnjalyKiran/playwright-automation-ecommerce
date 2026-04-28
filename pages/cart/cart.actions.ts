import { expect } from "@playwright/test";
import { CartPage } from "./CartPage";

export class CartActions extends CartPage {

  async verifyCartLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/rt=checkout\/cart/i);
    await expect(
      this.page.getByRole(this.locators.cartHeading.role, { name: this.locators.cartHeading.name })
    ).toBeVisible();
    await expect(this.page.locator(this.locators.cartTable).first()).toBeVisible();
  }

  async clickCheckout(): Promise<void> {
    const checkoutBtn = this.page.locator(this.locators.checkoutButton);
    await expect(checkoutBtn).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/rt=account\/login/i),
      checkoutBtn.click()
    ]);
  }

  async getProductNameByIndex(index: number): Promise<string> {
    const product = this.productNames().nth(index);
    await expect(product).toBeVisible();
    return (await product.innerText()).trim();
  }

  async verifyProductIsInCart(productName: string): Promise<void> {
    await expect(
      this.productNames().filter({ hasText: productName })
    ).toBeVisible();
  }

  async verifyProductIsNotInCart(productName: string): Promise<void> {
    await expect(
      this.productNames().filter({ hasText: productName })
    ).toHaveCount(0);
  }

  async updateQuantity(quantity: string): Promise<void> {
    const qty = this.quantityInput();
    await expect(qty).toBeVisible();
    await qty.fill(quantity);
    await this.updateButton().click();
  }

  async verifyQuantity(quantity: string): Promise<void> {
    await expect(this.quantityInput()).toHaveValue(quantity);
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.emptyCartMessage()).toBeVisible();
  }

  async removeProductFromCart(): Promise<void> {
    const removeBtn = this.removeButton();
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
    await expect(this.emptyCartMessage()).toBeVisible();
  }

  async removeProductByIndex(index: number): Promise<void> {
    const removeBtn = this.page.locator(this.locators.removeButton).nth(index);
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  }

  async verifyCartItemCount(count: number): Promise<void> {
    await expect(this.cartRows()).toHaveCount(count);
  }
}
