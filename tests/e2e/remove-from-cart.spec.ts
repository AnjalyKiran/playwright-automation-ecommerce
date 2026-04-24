import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Remove product from cart', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.openFirstProductFromHome();
    await productPage.addToCart();
  });

 test('Remove single item → cart empty', async () => {
    await cartPage.removeProductFromCart();
    await cartPage.verifyCartIsEmpty();
  });

  test('Remove one item from multiple items', async () => {
   
    await homePage.openProductByIndex(1);
    await productPage.addToCart();

    await cartPage.verifyCartItemCount(2);

    await cartPage.removeProductByIndex(0);

    await cartPage.verifyCartItemCount(1);
  });
  test('Product B remains in cart after removing Product A', async ({ page }) => {
    await homePage.openProductByIndex(1);
    await productPage.addToCart();
    const productA = await cartPage.getProductNameByIndex(0);
    const productB = await cartPage.getProductNameByIndex(1);
   // console.log('Product B:', productB);

  await cartPage.verifyCartItemCount(2);

  await cartPage.removeProductByIndex(0);

  await cartPage.verifyCartItemCount(1);
  await cartPage.verifyProductIsNotInCart(productA);
  await cartPage.verifyProductIsInCart(productB);
  });
});