import { test } from '../../fixtures/baseTest';
test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Search shows relevant products', async ({ search }) => {
    const keyword = 'Skinsheen';

    await search.searchFor(keyword);
    await search.verifyResultsContain(keyword);
  });

  test('Search shows no results for invalid keyword', async ({ search }) => {
    const keyword = 'zzzz-no-product-123';

    await search.searchFor(keyword);
    await search.verifyNoResultsMessage();
  });
});
