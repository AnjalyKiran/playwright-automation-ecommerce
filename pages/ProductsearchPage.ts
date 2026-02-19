import { Page, expect } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async searchFor(keyword: string) {
    const searchBox = this.page.getByRole('textbox', { name: /search keywords/i });

    await searchBox.fill(keyword);
   // await searchBox.press('Enter');
     await Promise.all([
      this.page.waitForURL(/rt=product/i),
      searchBox.press('Enter'),
    ]);
  }

  async verifyResultsContain(keyword: string) {
    const productTitles = this.page.locator('span.bgnone',{hasText:'Skinsheen'});
   //  this.page.locator('span.help-block', { hasText: 'Email Address does not appear to be valid!' });

    // Make sure at least one result is visible
    await expect(productTitles.first()).toBeVisible();

    const count = await productTitles.count();
    expect(count).toBeGreaterThan(0);

    const titles = await productTitles.allTextContents();

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyNoResultsMessage() {
    await expect(
      this.page.locator('text=/There is no product that matches the search criter./i')
    ).toBeVisible();
  }
}
