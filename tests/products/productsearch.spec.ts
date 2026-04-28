/*import { test } from '@playwright/test';
import { SearchPage } from '../../pages/ProductsearchPage';
import { env } from '../../utils/envConfig';

test.describe('Product Search', () => {

  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(env.baseUrl);
    searchPage = new SearchPage(page);
  });
  test('Search shows relevant products', async ({ page }) => {

    const keyword = 'Skinsheen';
    await searchPage.searchFor(keyword);
    await searchPage.verifyResultsContain(keyword);
  });

  test('Search shows no results for invalid keyword', async ({ page }) => {
    const searchPage = new SearchPage(page);

    const keyword = 'zzzz-no-product-123';
    await searchPage.searchFor(keyword);
    await searchPage.verifyNoResultsMessage();
  });
});*/
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

