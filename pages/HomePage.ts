import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

   get productLinks() {
    return this.page.locator('.fixed_wrapper .prdocutname');
  }

  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async ContinueToRegister() {
    
     await this.page.getByRole('button', { name: /login/i }).click();
    const continueBtn =this.page.getByRole('button', { name: /^continue$/i });

    await Promise.all([
      this.page.waitForURL(/rt=account\/create/i),
      continueBtn.click(),
    ]);
  }
   async openFirstProductFromHome() {
   await this.navigate();

    const firstProduct = this.page.locator('.fixed_wrapper .prdocutname').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
  }
  async openProductByIndex(index: number) {
    await this.navigate();

    const product = this.productLinks.nth(index);
    await expect(product).toBeVisible();
    await product.click();
  }
}
