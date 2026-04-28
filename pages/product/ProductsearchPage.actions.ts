import { expect } from "@playwright/test";
import { SearchPage } from "./ProductsearchPage";

export class SearchActions extends SearchPage {

  async searchFor(keyword: string): Promise<void> {
    const searchBox = this.searchTextbox();

    await searchBox.fill(keyword);

    await Promise.all([
      this.page.waitForURL(/rt=product/i),
      searchBox.press("Enter")
    ]);
  }

  async verifyResultsContain(keyword: string): Promise<void> {
    const titles = this.productTitles();

    await expect(titles.first()).toBeVisible();

    const allTitles = await titles.allTextContents();
    expect(allTitles.length).toBeGreaterThan(0);

    for (const t of allTitles) {
      expect(t.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyNoResultsMessage(): Promise<void> {
    await expect(this.noResultsMessage()).toBeVisible();
  }
}
