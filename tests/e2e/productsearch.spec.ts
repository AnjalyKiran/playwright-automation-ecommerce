import { test } from '@playwright/test';
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
});
