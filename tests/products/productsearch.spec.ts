
import { test } from "@playwright/test";
import { SearchActions } from "../../pages/product/ProductsearchPage.actions";
import { Env } from "../../config/env.config";

test.describe("Product Search", () => {
  let search: SearchActions;

  test.beforeEach(async ({ page }) => {
    await page.goto(Env.baseUrl);
    search = new SearchActions(page);
  });

  test("Search shows relevant products", async () => {
    const keyword = "Skinsheen";

    await search.searchFor(keyword);
    await search.verifyResultsContain(keyword);
  });

  test("Search shows no results for invalid keyword", async () => {
    const keyword = "zzzz-no-product-123";

    await search.searchFor(keyword);
    await search.verifyNoResultsMessage();
  });
});

