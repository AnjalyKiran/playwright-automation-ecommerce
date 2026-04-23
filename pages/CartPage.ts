
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}
   
  get quantityInput() {
    return this.page.locator('input[name*="quantity[50]"]').first();
  }

  get updateButton() {
    return this.page.getByRole('button', { name: /update/i });
  }
  get emptyCartMessage() {
    return this.page.getByText(/Your shopping cart is empty!/i);
  }
  get removeButton() {
    return this.page.locator('a[title="Remove"], .fa-trash-o').first();
  }
   get cartRows() {
  return this.page.locator('table.table-striped.table-bordered tbody tr').filter({
    has: this.page.locator('a[title="Remove"], .fa-trash-o'),
  });
}
  
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
    async updateQuantity(quantity: string) {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(quantity);
    await this.updateButton.click();
  }
 async verifyQuantity(quantity: string) {
    await expect(this.quantityInput).toHaveValue(quantity);
  }
    async verifyCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

 async removeProductFromCart() {
  await expect(this.removeButton).toBeVisible();
  await this.removeButton.click();
  await expect(this.emptyCartMessage).toBeVisible();
}
    async removeProductByIndex(index: number) {
    const removeButton = this.removeButton.nth(index);
    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }
async verifyCartItemCount(count: number) {
    await expect(this.cartRows).toHaveCount(count);
  }
}

